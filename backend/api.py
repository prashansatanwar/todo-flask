from flask import Flask, Blueprint, jsonify, request
from db import *
from datetime import datetime

api = Blueprint('api', __name__)

# Create new Todo
@api.route('/addTodo', methods=['POST'])
def createTodo():
    data = request.get_json()
    new_todo = {
        'title': data['title'],
        'description': data['description'],
        'completed': False,
        'create_date': datetime.now(),
        'last_updated':datetime.now()
    }
    # print('new_todo',new_todo)
    addTodo(new_todo)
    return jsonify({'message':'TODO created successfully'})

# Get all Todo items
@api.route('/todos', methods=['GET'])
def getAllTodos():
    todos = readAllTodos()
    if len(todos):
        return jsonify(todos)
    return jsonify({'message':'TODOs not found'})

# Get Todo by ID
@api.route('/todos/<string:id>', methods=['GET'])
def getTodo(todoId):
    todo = readTodoById(todoId)
    if todo:
        return jsonify(todo)
    return jsonify({'message':'TODO not found'})

# Update Todo
@api.route('/todos/<string:todoId>', methods=['PUT'])
def editTodo(todoId):
    updates = request.get_json()
    updates['last_updated'] = datetime.now()
    updateTodo(todoId, updates)
    return jsonify({'message':'TODO updated successfully'})

# Delete Todo
@api.route('/todos', methods=['DELETE'])
def deleteTodo(todoId):
    result = deleteTodoById(todoId)
    if result:
        return jsonify({'message':'TODO deleted successfully'})
    else:
        return jsonify({'message':'TODO not found'})

