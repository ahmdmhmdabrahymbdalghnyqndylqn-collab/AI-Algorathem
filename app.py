from flask import Flask, request, jsonify, send_from_directory
from sklearn.tree import DecisionTreeClassifier
from data import students

app = Flask(__name__, static_folder="frontend")

convert = {"yes": 1, "no": 0}

x = []
y = []

for student in students:
    studied = convert[student[1].strip().lower()]
    project = convert[student[2].strip().lower()]

    x.append([studied, project])
    y.append(student[3])

model = DecisionTreeClassifier(criterion="entropy", random_state=42)
model.fit(x, y)

@app.route("/style.css")
def serve_css():
    return send_from_directory("frontend", "style.css")

@app.route("/script.js")
def serve_js():
    return send_from_directory("frontend", "script.js")

@app.route("/")
def home():
    return send_from_directory("frontend", "index.html")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True) or {}

    studied = str(data.get("studied", "")).strip().lower()
    project = str(data.get("project", "")).strip().lower()

    if studied not in convert or project not in convert:
        return jsonify({"error": "Please enter Yes or No."}), 400

    new_student = [[convert[studied], convert[project]]]

    prediction = model.predict(new_student)

    return jsonify({"prediction": prediction[0]})


if __name__ == "__main__":
    app.run(debug=True)