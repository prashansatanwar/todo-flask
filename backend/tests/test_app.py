import os
import unittest
from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from datetime import datetime
from bson.objectid import ObjectId

import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from db import init_db, db
from api import api

class AppTestCase(unittest.TestCase):
    def setUp(self):
        load_dotenv()

        self.app = Flask(__name__)
        self.app.config['TESTING'] = True

        init_db(self.app)

        self.app.register_blueprint(api, url_prefix='/api')

        self.client = self.app.test_client()
    
    def tearDown(self):
        db.todos.delete_many({})

    def test_add_todo(self):
        response = self.client.post('/api/addTodo', json={'title':'Test TODO', 'description':'Test Description'})
        self.assertEqual(response.status_code, 200)

        # retrieve all todos from DB
        todos = list(db.todos.find({}))
        self.assertEqual(len(todos),1)

    def test_get_todos(self):
        # add sample Todo
        db.todos.insert_one(
            {
                'title': 'Test TODO',
                'description': 'Test Description',
                'completed': False,
                'create_date': datetime.now(),
                'last_updated':datetime.now()
            }
        )

        # retrieve all todos
        response = self.client.get('/api/todos')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(len(data),1)
        self.assertEqual(data[0]['title'],'Test TODO')
    
    def test_update_todo(self):
        # add sample Todo
        db.todos.insert_one(
            {
                'title': 'Test TODO',
                'description': 'Test Description',
                'completed': False,
                'create_date': datetime.now(),
                'last_updated':datetime.now()
            }
        )

        # retrieve todo from DB
        todos = db.todos.find({})
        todo = todos[0]

        # updates
        updates = {
            'description':'Updated Test Description'
        }

        # update Todo
        response = self.client.put('api/todos/'+ str(todo['_id']), json=updates)
        self.assertEqual(response.status_code,200)

        data = response.get_json()
        self.assertEqual(data['message'],'TODO updated successfully')

        # retrieve Todo by ID
        data = db.todos.find_one({'_id':todo['_id']})
        self.assertEqual(data['description'], 'Updated Test Description')

    def test_delete_todo(self):
        # add sample Todo
        db.todos.insert_one(
            {
                'title': 'Test TODO',
                'description': 'Test Description',
                'completed': False,
                'create_date': datetime.now(),
                'last_updated':datetime.now()
            }
        )

        # retrieve todo from DB
        todos = db.todos.find({})
        todo = todos[0]

        # delete todo
        response = self.client.delete('api/todos/'+str(todo['_id']))
        self.assertEqual(response.status_code,200)

        # retrieve all todos from DB
        todos = list(db.todos.find({}))
        self.assertEqual(len(todos),0)
    

if __name__ == '__main__':
    unittest.main()