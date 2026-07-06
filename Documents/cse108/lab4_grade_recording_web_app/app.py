from flask import Flask, request, jsonify, render_template 
import json
import os

app = Flask(__name__)

DATA_FILE = "grades.json"

def load_grades(): 
    if not os.path.exists(DATA_FILE): 
        return {}
    
    with open(DATA_FILE, "r") as file: 
        return json.load(file)
    
def save_grades(grades):
    with open(DATA_FILE, "w") as file: 
        json.dump(grades, file, indent=4)
         
         
@app.route("/")
def home(): 
    return render_template("index.html")

@app.route("/grades", methods=["GET"])
def get_all_grades():
    grades = load_grades()
    return jsonify(grades)

@app.route("/grades/<student_name>" , methods=["GET"])
def get_student_grade(student_name):
    grades = load_grades()

    if student_name in grades: 
        return jsonify({student_name: grades[student_name]})
    
    return jsonify({"error": "Student not found"}), 404


@app.route("/grades", methods=["POST"])
def add_student_grade():
    data = request.get_json()

    name=data["name"]
    grade=data["grade"]
    grades=load_grades()
    grades[name] = grade
    save_grades(grades)
    return jsonify(grades)

@app.route("/grades/<student_name>", methods=["PUT"])
def edit_student_grade(student_name):
    data = request.get_json()

    grades= load_grades()
    if student_name in grades:
        grades[student_name] = data["grade"]
        save_grades(grades)
        return jsonify(grades)
    return jsonify({"error": "Student not found"}), 404

@app.route("/grades/<student_name>" , methods=["DELETE"])
def delete_student_grade(student_name):
    grades=load_grades()

    if student_name in grades:
        del grades[student_name]
        save_grades(grades)
        return jsonify(grades)
    return jsonify({"error: Student wasn't found"}), 404



if __name__ == "__main__": 
    app.run(debug=True)
