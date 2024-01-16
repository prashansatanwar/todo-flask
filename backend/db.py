from flask_pymongo import PyMongo
from pymongo import MongoClient
from bson.objectid import ObjectId

import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.environ.get('MONGO_URI')
DATABASE = os.environ.get('DATABASE')

# Config PyMongo
client = MongoClient(MONGO_URI)
db = client[DATABASE]
mongo = PyMongo()
users_collection = db.users
todos_collection = db.todos

def readAllTodos():
    todos = []
    cursor = todos_collection.find({})
    for t in cursor:
        t['_id'] = str(t['_id'])
        todos += [t]
    return todos

def readTodoById(todoId):
    todo = todos_collection.find_one({'_id' : ObjectId(todoId)})
    todo['_id'] = str(todo['_id'])

    return todo


def addTodo(todo_data):
    todos_collection.insert_one(todo_data)

def deleteTodoById(todoId):
    todos_collection.delete_one({'_id':ObjectId(todoId)})

def updateTodo(todoId, updates):
    updated_data = {
        '$set': updates
    }
    todos_collection.update_one({'_id':ObjectId(todoId)}, updated_data)

def init_db(app):
    app.config['MONGO_URI'] = MONGO_URI

    mongo.init_app(app)