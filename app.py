from flask import Flask, jsonify, request, render_template
import mysql.connector
from mysql.connector import errorcode

app = Flask(__name__)

try:
    con = mysql.connector.connect(user="divyansh", password="23ab89DS!", host="divyansh-quiz.mysql.database.azure.com",  database="quiz")
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with the user name or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(err)
    @app.route('/')
    def error():
        return render_template('error.html')
else:
  cursor = con.cursor()


cur = con.cursor()
cur.execute("select count(*) from questions")

no_of_rows = cur.fetchone()
question = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/quizAPI", methods=["GET"])
def get_quesion():

    cur.execute("select * from questions")
    ques_data = cur.fetchall()

    for data in ques_data:
        question.extend([data])


    return jsonify(question)

if __name__== '__main__':
    app.run()