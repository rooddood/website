
#imports the methods for mysql for python
import pymysql.cursors

#flash importation and jsonify to convert data to a json readable execution
from flask import Flask, jsonify

# Connect to the database
connection = pymysql.connect(
    db='new_db', user='root', passwd='nebulae1', unix_socket="/var/run/mysqld/mysqld.sock")

#create a json list
#TODO: fix this so that it can output images
json = []

    
# try:
#     # code from github, adjust as necessary
# 
#     # inserting into the database
#     # TODO: insert path into the database
#     with connection.cursor() as cursor:
#         # Create a new record
#         sql = "INSERT INTO `users` (`email`, `password`) VALUES (%s, %s)"
#         cursor.execute(sql, ('suraj98@gwu.edu', 'very-secret'))
# 
#     # connection is not autocommit by default. So you must commit to save
#     # your changes.
#     connection.commit()
# 
# 
#     # Selecting what you want to put into the database
#     with connection.cursor() as cursor:
#         # Read a single record
#         sql = "SELECT `email`, `password` FROM `users` WHERE `email`=%s"
#         cursor.execute(sql, ('suraj98@gwu.edu',))
#         result = cursor.fetchone()
#         print(json)
#         json = result

finally:
    connection.close()

#create a new web server (need to run ngrok to host it)
app = Flask(__name__)

#route the app to the specific url, after the ngrok given address
@app.route('/sampleurl', methods=['GET'])
def samplefunction():
    # access your DB get your results here
    # data = {"data":"Processed Data"}
    # print('hello')
    return jsonify(json)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)


