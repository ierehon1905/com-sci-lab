import os
from flask import Flask, render_template

path = os.path.join('.', '..', 'front', 'build')
abs_path = os.path.abspath(path)
abs_static = os.path.join(abs_path, 'static')

app = Flask(__name__, static_folder=abs_static, template_folder=abs_path)


@app.route('/')
def hello():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081)
