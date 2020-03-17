import os  # импортируем библиотеку для работы с ОС
from flask import Flask, render_template, request  # импортируем библиотеку для работы с веб приложеним
from flask_cors import \
    CORS  # импортируем библиотеку для работы cors'ами, чтобы не заморачиваться с безопасностью запросов
import crypto  # импортируем наш модуль для работы с блокчейном

path = os.path.join('.', '..', 'front', 'build')  # относительный путь собранного фронтенда
abs_path = os.path.abspath(path)  # делаем абсолютный путь, для избежания проблем с совместимостью ОС
abs_static = os.path.join(abs_path, 'static')  # путь до статики: стили и скомпилированного js

app = Flask(__name__, static_folder=abs_static, template_folder=abs_path)  # инициализация веб приложения
CORS(app)  # инициализация модуля cors


# Далее определяется маршрутизация

@app.route('/')  # декоратор, указывам корневой маршрут
def index():
    """
    Возвращаем файл index.html,
    хоть и не используем функционал шаблонизатора,
    просто так легче, достаточно правильно инициализировать приложение
    """
    return render_template('index.html')


@app.route('/create-acc', methods=['GET', 'POST'])
def create_acc():
    """
    Для обоих методов запроса.
    Если метод POST пытаемя из запроса JSON взять поле **secret**
    """
    secret = ''
    if request.method == 'POST':
        try:
            secret = request.json['secret']
        except Exception as e:
            print(e)
            return 'Invalid secret', 400  # Если не удалось извлеч параметр, отвучаем со статус-кодом 400 (Bad Request)
    return crypto.create_acc(secret)


@app.route('/get-balance/')
@app.route('/get-balance/<address>')
def get_balance(address=None):
    """
    Можно запрашивать как с, так и без параметра,
    но при отсутствии кидаем 400,
    в другом случае обращаемся к crypto
    """
    if address is None:
        return 'Пустой адрес', 400
    return str(crypto.get_balance(address))


@app.route('/get-block')
@app.route('/get-block/<block>')
def get_block(block):
    """
    Можно запрашикать без номера блока.
    """
    return crypto.get_block(block)


# Можно запускать как и с помощью flask CLI, так и с помощью обычного питона. Это для питона.
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081)
