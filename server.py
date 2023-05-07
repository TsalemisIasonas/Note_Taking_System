from flask import Flask, request, render_template,jsonify,send_from_directory
from flask_cors import CORS
import json,os



# CORS(app)



app = Flask(__name__)



@app.route('/')
def index():
    data_path = os.path.join(os.path.dirname(__file__), 'data', 'data.json') 
    return render_template('app.html',data_path = data_path)

@app.route("/data")
def get_data():
    data_folder = os.path.join(os.getcwd(), "data")
    return send_from_directory(data_folder, "data.json")


# def append_data(category,title_value,content_value):
#      # Load existing data from a file or database
#     with open(data_file_path, 'r') as f:
#         existing_data = json.load(f)

#     # Add the new entry to the existing data
#     if category not in existing_data:
#         existing_data[category] = []
#     existing_data[category].append({title_value: content_value})

#     # Write the updated data back to the file or database
#     with open(data_file_path, 'w') as f:
#         json.dump(existing_data, f)


# @app.route('/save-accordion', methods=['POST'])
# def save_accordion():
#     req_data = request.get_json()
#     category = req_data['category']
#     titleValue = req_data['titleValue']
#     contentValue = req_data['contentValue']

#     append_data(category,titleValue,contentValue)

#     return 'Data received and processed!'



if __name__ == '__main__':
    app.run(debug=True)