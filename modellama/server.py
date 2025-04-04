from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import model

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@cross_origin()
@app.route('/evaluate', methods=['POST'])
def evaluate():

    data = request.json
    code = data.get('pseudocode', '')

    response = model.evaluate(data['pseudocode'], data['question'])


    return jsonify({"evaluation": response})

if __name__ == '__main__':
    app.run(port=8181,debug=True)
