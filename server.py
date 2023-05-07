from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)




@app.route('/save-accordion', methods=['POST'])
def save_accordion():
    req_data = request.get_json()
    category = req_data['category']
    title_value = req_data['titleValue']
    content_value = req_data['contentValue']

    print(category,title_value,content_value)

    return 'Data received and processed!'



if __name__ == '__main__':
    app.run(debug=True)