
import ai
from db import get_db, set_db 
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return get_db('foo')

@app.route('/estimate/<task>')
def estimate(task):
    return ai.estimateDifficulty(task)

if __name__ == '__main__':
    app.run(debug=True) 
