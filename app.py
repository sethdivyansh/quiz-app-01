from flask import Flask, jsonify, request, render_template
import mysql.connector

app = Flask(__name__)

con = mysql.connector.connect(host="localhost", user="root", password = "Divyansh@08", database="quiz")
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
    app.run(host="0.0.0.0", port=5000)