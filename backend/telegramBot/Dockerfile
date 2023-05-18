FROM python:3.8-slim-buster

WORKDIR /tgbot_hyptaxi

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "bot.py"]