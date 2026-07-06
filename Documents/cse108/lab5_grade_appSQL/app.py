from flask import Flask, request, jsonify, render_template 
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///grades.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] =False

db = SQLAlchemy(app)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    grade = db.Column(db.Float, nullable=False)
         
         
def grades_to_dict():
    students = Student.query.all()

    grades={}
    for student in students:
        grades[student.name] = student.grade

    return grades


@app.route("/")
def home(): 
    return render_template("index.html")

@app.route("/grades", methods=["GET"])
def get_all_grades():
    grades = grades_to_dict()
    return jsonify(grades)

@app.route("/grades/<student_name>" , methods=["GET"])
def get_student_grade(student_name):
    student = Student.query.filter_by(name=student_name).first()

    if student: 
        return jsonify({student.name: student.grade})
    
    return jsonify({"error": "Student not found"}), 404


@app.route("/grades", methods=["POST"])
def add_student_grade():
    data = request.get_json()

    name=data["name"]
    grade=data["grade"]

    new_student = Student(name=name, grade=grade)
    
    db.session.add(new_student)
    db.session.commit()
    return jsonify(grades_to_dict())

@app.route("/grades/<student_name>", methods=["PUT"])
def edit_student_grade(student_name):
    data = request.get_json()
    student = Student.query.filter_by(name=student_name).first()

    if student:
        student.grade = data["grade"]
        db.session.commit()
        return jsonify(grades_to_dict())
    return jsonify({"error": "Student not found"}), 404

@app.route("/grades/<student_name>" , methods=["DELETE"])
def delete_student_grade(student_name):
    
    student = Student.query.filter_by(name=student_name).first()


    if student:
        db.session.delete(student)
        db.session.commit()
        return jsonify(grades_to_dict())
    return jsonify({"error: Student wasn't found"}), 404



if __name__ == "__main__": 
    with app.app_context():
        db.create_all()
    
    
    app.run(debug=True)
