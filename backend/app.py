from flask import Flask
from db import init_db
from api import api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize DB
init_db(app)

# Register API blueprint
app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)