import os
from flask import Flask, render_template
from flask_cors import CORS

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


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081)
