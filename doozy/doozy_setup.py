from doozy_setup_db import MySQL_DB
from werkzeug.wrappers import BaseRequest
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import data
import json

app = Flask(__name__)
CORS(app)

# initialize doozy database
user = "root"
host = "localhost"
port = 3306
password = "***SENSITIVE INFORMATION***"
database = "doozy"

doozy_db = MySQL_DB(user, host, port, password, database, True)

# populate db with user data
initial_user_count = 100
# data.generate_users(doozy_db.db, 'users', initial_user_count)

# request chats for users
# for i in range(1,100):
    # print(data.request_chat(doozy_db.db, str(i)))

@app.route("/", methods = ['POST'])
def register():

    input_data = request.get_json()
    return (data.update_db(doozy_db.db, input_data))

@app.route("/<id>", methods = ['GET'])
def get_user(id):
    return (data.find_user_by_id(doozy_db.db, str(id)))

@app.route("/login", methods = ['GET'])
def login():
    email = request.args.get('email', type = str)
    password = request.args.get('password', type = str)

    return (data.login_user(doozy_db.db, email, password))

@app.route("/match", methods = ['GET'])
def chat_request():

    user_id = request.args.get('userId', type = str)
    return (data.request_chat(doozy_db.db, user_id))

if __name__ == '__main__':
    app.run()