from data import students
from sklearn.tree import DecisionTreeClassifier
print(students)
convert = {"yes": 1,"no":0}
x = []
y = []

for student in students :

    studied = convert[student[1].lower()]
    project = convert[student[2].lower()]
    x.append([studied,project])
    y.append(student[3])
print("input = ",x)
print("output = ",y)
model = DecisionTreeClassifier(criterion="entropy", random_state=42)
model.fit(x,y)


studied = input("Did you study? (Yes/No): ").strip().lower()
project = input("Did you do the project? (Yes/No): ").strip().lower()


studied = convert[studied]
project = convert[project]

new_student = [[studied, project]]

prediction = model.predict(new_student)
print('**********************************\n')
print("Prediction:", prediction[0])