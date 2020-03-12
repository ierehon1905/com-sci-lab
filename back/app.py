import os
from flask import Flask, render_template, request
from flask_cors import CORS
import crypto

path = os.path.join('.', '..', 'front', 'build')
abs_path = os.path.abspath(path)
abs_static = os.path.join(abs_path, 'static')

app = Flask(__name__, static_folder=abs_static, template_folder=abs_path)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/test')
def test():
    return 'test'


@app.route('/create-acc', methods=['GET', 'POST'])
def create_acc():
    if request.method == 'POST':
        secret = 'test secret'
    return crypto.create_acc(secret)


@app.route('/get-balance/')
@app.route('/get-balance/<address>')
def get_balance(address=None):
    if address is None:
        return 'Пустой адрес'
    return str(crypto.get_balance(address))


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081)
