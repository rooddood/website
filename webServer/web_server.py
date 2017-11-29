from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/sampleurl', methods = ['GET'])
def samplefunction():
    #access your DB get your results here
    data = {"data":"Processed Data"}
    # print('hello')
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)


