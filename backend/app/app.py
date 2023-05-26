from flask import request, Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import telebot
import configparser
import os

basedir = os.path.abspath(os.path.dirname(__file__))
config = configparser.ConfigParser()
config.read(f"{basedir}/config.ini")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
bot = telebot.TeleBot(config["Config"]["bot_token"])


class Lead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(64))
    name = db.Column(db.String(64))

    def to_dict(self):
        return {
            '_id': self.id,
            'phone_number': self.phone_number,
            'name': self.name,
        }


class Prices(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pos = db.Column(db.String(64))
    rent = db.Column(db.String(64))
    redemption = db.Column(db.String(64))

    def to_dict(self):
        return {
            '_id': self.id,
            'pos': self.pos,
            'rent': self.rent,
            'redemption': self.redemption
        }


class Admins(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer)

    def to_dict(self):
        return {
            '_id': self.id,
            'chat_id': self.chat_id
        }


app.app_context().push()
db.create_all()


@cross_origin()
@app.route('/lead', methods=['POST', 'GET'])
def new_lead():
    if request.method == 'POST':
        try:
            lead = Lead(phone_number=request.get_json().get(
                'phone_number'), name=request.get_json().get('name'))
            db.session.add(lead)
            db.session.commit()
            admins_chatids = [x.chat_id for x in Admins.query]
            for chat_id in admins_chatids:
                bot.send_message(
                    chat_id, f"Новый заказ!\n\nИмя: {lead.name}\nТелефон: {lead.phone_number}")
            return jsonify({"action": "add new lead", "lead_id": lead.id})

        except Exception as e:
            return jsonify(e)
    if request.method == 'GET':
        return [lead.to_dict() for lead in Lead.query]


@cross_origin()
@app.route('/init', methods=['GET'])
def init():
    if request.method == 'GET':
        db.session.add(
            Prices(pos='1 Авто', rent='36 000', redemption='36 000'))
        db.session.add(
            Prices(pos='5 Авто', rent='180 000', redemption='180 000'))
        db.session.add(
            Prices(pos='10 Авто', rent='360 000', redemption='360 000'))
        db.session.commit()
        return "Added"


@cross_origin()
@app.route('/prices', methods=['POST', 'GET'])
def prices():
    if request.method == 'POST':
        try:
            if Prices.query.filter_by(pos=request.get_json().get("pos")).first():
                p = Prices.query.filter_by(
                    pos=request.get_json().get("pos")).first()
                p.rent = request.get_json().get("rent") if request.get_json().get(
                    "rent") is not None else p.rent
                p.redemption = request.get_json().get("redemption") if request.get_json().get(
                    "redemption") is not None else p.redemption
                db.session.commit()
                return jsonify({"action": "update pos", "position_name": p.pos})
            else:
                price = Prices(pos=request.get_json().get('pos'), rent=request.get_json().get(
                    'rent'),  redemption=request.get_json().get('redemption'))
                db.session.add(price)
                db.session.commit()
                return jsonify({"action": "add new pos", "position_name": price.pos})

        except Exception as e:
            return jsonify(e)
    if request.method == 'GET':
        return [prices.to_dict() for prices in Prices.query]


@cross_origin()
@app.route('/admin', methods=['POST', 'GET'])
def admin():
    if request.method == 'POST':
        try:
            if Admins.query.filter_by(chat_id=request.get_json().get("chat_id")).first():
                return jsonify({"action": "already added", "chat_id": request.get_json().get("chat_id")})
            else:
                ad = Admins(chat_id=request.get_json().get('chat_id'))
                db.session.add(ad)
                db.session.commit()
                return jsonify({"action": "add new admin", "chat_id": ad.chat_id})

        except Exception as e:
            return jsonify(e)

    if request.method == 'GET':
        return [x.chat_id for x in Admins.query]


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
