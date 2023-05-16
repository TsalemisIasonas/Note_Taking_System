from flask import Flask, request, render_template,jsonify,send_from_directory
from flask_cors import CORS
import json,os

# CORS(app)

app = Flask(__name__)



@app.route('/')
def index():
    data_path = os.path.join(os.path.dirname(__file__), 'data', 'data.json') 
    with open(data_path,'r') as filename:
        data = json.load(filename)
    return render_template('app.html',data = data)

def append_data(category,title_value,content_value):
    data_file_path = os.path.join(os.path.dirname(__file__), 'data', 'data.json') 
    with open(data_file_path, 'r') as f:
        existing_data = json.load(f)
    if category not in existing_data:
        existing_data[category] = [{title_value: content_value}]
    else:
        existing_data[category].append({title_value: content_value})
    with open(data_file_path, 'w') as f:
        json.dump(existing_data, f, indent=2)

def delete_data(category, title_value, content_value):
    data_file_path = os.path.join(os.path.dirname(__file__), 'data', 'data.json')
    with open(data_file_path, 'r') as f:
        existing_data = json.load(f)

    if category in existing_data:
        # Iterate over the items in the category and look for a match
        for item in existing_data[category]:
            if title_value in item and item[title_value] == content_value:
                # Remove the item from the list and exit the loop
                existing_data[category].remove(item)
                break

    # Write the updated data back to the file
    with open(data_file_path, 'w') as f:
        json.dump(existing_data, f, indent=2)

def remove_category(category):
    data_file_path = os.path.join(os.path.dirname(__file__), 'data', 'data.json')
    with open(data_file_path, 'r') as f:
        existing_data = json.load(f)
    if category in existing_data:
        del existing_data[category]
    with open(data_file_path, 'w') as f:
        json.dump(existing_data, f, indent=2)

    

@app.route('/save-accordion', methods=['POST'])
def save_accordion():
    req_data = request.get_json()
    category = req_data['category']
    titleValue = req_data['titleValue']
    contentValue = req_data['contentValue']

    append_data(category,titleValue,contentValue)

    return 'Data recieved and processed successfully'

@app.route('/delete-accordion', methods=['POST'])
def delete_accordion():
    req_data = request.get_json()
    category = req_data['category']
    titleValue = req_data['titleValue']
    contentValue = req_data['contentValue']
    delete_data(category,titleValue,contentValue) 
    return 'Data recieved and processed successfully'

@app.route('/delete-category', methods = ['POST'])
def delete_category():
    req_data = request.get_json()
    category = req_data['category']
    remove_category(category)
    return 'Data recieved and processed successfully'



if __name__ == '__main__':
    app.run(debug=True)
    #append_data('Differential Equations','Data Link Layer','Frames')
    #remove_category('New Option')