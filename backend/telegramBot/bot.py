import telebot
from telebot import types
import requests
import configparser
from telegram_bot_pagination import InlineKeyboardPaginator
import os

basedir = os.path.abspath(os.path.dirname(__file__))
config = configparser.ConfigParser()
config.read(f"{basedir}/config.ini")
bot = telebot.TeleBot(config["Config"]["bot_token"])
server_url = f'{config["Config"]["server_host"]}:{config["Config"]["sever_port"]}/'

hide = types.ReplyKeyboardRemove()
menu = types.ReplyKeyboardMarkup(row_width=1, resize_keyboard=True).add(types.KeyboardButton("/leads"),
                                                                        types.KeyboardButton("/price"))
price_menu = types.ReplyKeyboardMarkup(row_width=2, resize_keyboard=True)
btn1rent = types.KeyboardButton("/1rent")
btn1redemption = types.KeyboardButton("/1redemption")
btn5rent = types.KeyboardButton("/5rent")
btn5redemption = types.KeyboardButton("/5redemption")
btn10rent = types.KeyboardButton("/10rent")
btn10redemption = types.KeyboardButton("/10redemption")
btn_menu = types.KeyboardButton("/menu")
price_menu.add(btn1rent, btn1redemption, btn5rent, btn5redemption, btn10rent, btn10redemption, btn_menu)


def extract_unique_code(text):
    return text.split()[1] if len(text.split()) > 1 else None


def get_leads_list():
    response = requests.get(url=f'{server_url}/lead')
    return [f"Имя: {x.get('name')}\nТелефон: {x.get('phone_number')}\n---------------------\n" for x in response.json()]


def get_prices_list():
    response = requests.get(url=f'{server_url}/prices')
    return [f"{x.get('pos')}\n\nРента: {x.get('rent')}\nВыкуп: {x.get('redemption')}\n---------------------\n" for x in
            response.json()]


def is_admin(chat_id):
    r = requests.get(
        url=f'{server_url}/admin',
        headers={'Content-type': 'application/json', 'Accept': 'text/plain'}
    )
    if chat_id in r.json():
        return True
    else:
        return False


def add_to_admin(chat_id, code):
    if code == config['Config']['admin_pass']:
        requests.post(
            url=f'{server_url}/admin',
            json={
                "chat_id": chat_id,
            },
            headers={'Content-type': 'application/json', 'Accept': 'text/plain'}
        )
        return True
    else:
        return False


@bot.message_handler(commands=["start"])
def start(message) -> None:
    unique_code = extract_unique_code(message.text)
    if add_to_admin(chat_id=message.chat.id, code=unique_code):
        bot.send_message(
            message.chat.id,
            "Меню",
            reply_markup=menu,
            parse_mode="MARKDOWN"
        )
    else:
        bot.send_message(
            message.chat.id,
            "Неверный пароль",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )


@bot.message_handler(commands=["menu"])
def menu_state(message) -> None:
    if is_admin(chat_id=message.chat.id):
        bot.send_message(
            message.chat.id,
            "Меню",
            reply_markup=menu,
            parse_mode="MARKDOWN"
        )
    else:
        bot.send_message(message.chat.id, "Вы не админ")


@bot.message_handler(commands=["leads"])
def leads(message) -> None:
    if is_admin(chat_id=message.chat.id):
        send_lead_page(message)
    else:
        bot.send_message(
            message.chat.id,
            "Вы не админ",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )


@bot.callback_query_handler(func=lambda call: call.data.split('#')[0] == 'lead')
def leads_page_callback(call):
    page = int(call.data.split('#')[1])
    bot.delete_message(
        call.message.chat.id,
        call.message.message_id
    )
    send_lead_page(call.message, page)


def send_lead_page(message, page=1):
    try:
        output_lead_list = []
        output_msg = ''
        for i, x in enumerate(get_leads_list()):
            output_msg += x
            if i + 1 == len(get_leads_list()):
                output_lead_list.append(output_msg)
            elif i == 0:
                pass
            elif i % 3 == 0:
                output_lead_list.append(output_msg)
                output_msg = ''

        paginator = InlineKeyboardPaginator(
            len(output_lead_list),
            current_page=page,
            data_pattern='lead#{page}'
        )

        bot.send_message(
            message.chat.id,
            output_lead_list[page - 1],
            reply_markup=paginator.markup,
            parse_mode='Markdown'
        )
    except Exception as e:
        bot.send_message(message.chat.id, f"Лидов нет или ошибка сервера: {e}")


@bot.message_handler(commands=["price"])
def price(message) -> None:
    if is_admin(chat_id=message.chat.id):
        msg = ''
        for x in get_prices_list():
            msg += x
        bot.send_message(
            message.chat.id,
            msg,
            reply_markup=price_menu,
            parse_mode="MARKDOWN"
        )
    else:
        bot.send_message(
            message.chat.id,
            "Вы не админ",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )


@bot.message_handler(commands=["1rent"])
def rent1(message) -> None:
    if is_admin(chat_id=message.chat.id):
        msg = bot.send_message(
            message.chat.id,
            "Укажите цену для арены | 1 авто",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )

        bot.register_next_step_handler(msg, set_rent1)
    else:
        bot.send_message(
            message.chat.id,
            "Вы не админ",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )


def set_rent1(message):
    try:
        requests.post(
            url=f'{server_url}/prices',
            json={
                "pos": "1 Авто",
                "rent": message.text
            },
            headers={'Content-type': 'application/json', 'Accept': 'text/plain'}
        )

        bot.send_message(message.chat.id, f"Цена для позиции аренда 1 Авто: {message.text}", reply_markup=menu)
    except Exception as e:
        bot.send_message(message.chat.id, f"Server Error: {e}")


@bot.message_handler(commands=["5rent"])
def rent5(message) -> None:
    if is_admin(chat_id=message.chat.id):
        msg = bot.send_message(
            message.chat.id,
            "Укажите цену для арены | 5 авто",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )

        bot.register_next_step_handler(msg, set_rent5)
    else:
        bot.send_message(
            message.chat.id,
            "Вы не админ",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )


def set_rent5(message):
    try:
        requests.post(
            url=f'{server_url}/prices',
            json={
                "pos": "5 Авто",
                "rent": message.text
            },
            headers={'Content-type': 'application/json', 'Accept': 'text/plain'}
        )

        bot.send_message(message.chat.id, f"Цена для позиции аренда 5 Авто: {message.text}", reply_markup=menu)
    except Exception as e:
        bot.send_message(message.chat.id, f"Server Error: {e}")


@bot.message_handler(commands=["10rent"])
def rent10(message) -> None:
    if is_admin(chat_id=message.chat.id):
        msg = bot.send_message(
            message.chat.id,
            "Укажите цену для арены | 10 авто",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )

        bot.register_next_step_handler(msg, set_rent10)
    else:
        bot.send_message(
            message.chat.id,
            "Вы не админ",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )



def set_rent10(message):
    try:
        requests.post(
            url=f'{server_url}/prices',
            json={
                "pos": "10 Авто",
                "rent": message.text
            },
            headers={'Content-type': 'application/json', 'Accept': 'text/plain'}
        )

        bot.send_message(message.chat.id, f"Цена для позиции аренда 10 Авто: {message.text}", reply_markup=menu)
    except Exception as e:
        bot.send_message(message.chat.id, f"Server Error: {e}")


@bot.message_handler(commands=["1redemption"])
def redemption1(message) -> None:
    if is_admin(chat_id=message.chat.id):
        msg = bot.send_message(
            message.chat.id,
            "Укажите цену для выкупа | 1 авто",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )

        bot.register_next_step_handler(msg, set_redemption1)
    else:
        bot.send_message(
            message.chat.id,
            "Вы не админ",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )


def set_redemption1(message):
    try:
        requests.post(
            url=f'{server_url}/prices',
            json={
                "pos": "1 Авто",
                "redemption": message.text
            },
            headers={'Content-type': 'application/json', 'Accept': 'text/plain'}
        )

        bot.send_message(message.chat.id, f"Цена для позиции на выкуп 1 Авто: {message.text}", reply_markup=menu)
    except Exception as e:
        bot.send_message(message.chat.id, f"Server Error: {e}")


@bot.message_handler(commands=["5redemption"])
def redemption5(message) -> None:
    if is_admin(chat_id=message.chat.id):
        msg = bot.send_message(
            message.chat.id,
            "Укажите цену для выкупа | 5 авто",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )

        bot.register_next_step_handler(msg, set_redemption5)

    else:
        bot.send_message(
            message.chat.id,
            "Вы не админ",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )


def set_redemption5(message):
    try:
        requests.post(
            url=f'{server_url}/prices',
            json={
                "pos": "5 Авто",
                "redemption": message.text
            },
            headers={'Content-type': 'application/json', 'Accept': 'text/plain'}
        )

        bot.send_message(message.chat.id, f"Цена для позиции на выкуп 5 Авто: {message.text}", reply_markup=menu)
    except Exception as e:
        bot.send_message(message.chat.id, f"Server Error: {e}")


@bot.message_handler(commands=["10redemption"])
def redemption10(message) -> None:
    if is_admin(chat_id=message.chat.id):
        msg = bot.send_message(
            message.chat.id,
            "Укажите цену для выкупа | 10 авто",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )

        bot.register_next_step_handler(msg, set_redemption10)

    else:
        bot.send_message(
            message.chat.id,
            "Вы не админ",
            reply_markup=hide,
            parse_mode="MARKDOWN"
        )


def set_redemption10(message):
    try:
        requests.post(
            url=f'{server_url}/prices',
            json={
                "pos": "10 Авто",
                "redemption": message.text
            },
            headers={'Content-type': 'application/json', 'Accept': 'text/plain'}
        )

        bot.send_message(message.chat.id, f"Цена для позиции выкуп 10 Авто: {message.text}", reply_markup=menu)
    except Exception as e:
        bot.send_message(message.chat.id, f"Server Error: {e}")


if __name__ == "__main__":
    bot.infinity_polling()
