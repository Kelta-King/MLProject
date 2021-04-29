
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import pickle

data = pd.read_excel('E:\ML Project\Project\MLProject\Dataset\covid_prediction_ds.xlsx')

le = LabelEncoder()
data['test_indication_numeric'] = le.fit_transform(data.test_indication)
data['gender_numeric'] = le.fit_transform(data.gender)
data['age_60_and_above_numeric'] = le.fit_transform(data.age_60_and_above)

X = data[['cough', 'fever', 'sore_throat', 'shortness_of_breath', 'head_ache', 'age_60_and_above_numeric', 'gender_numeric', 'test_indication_numeric']]

data['predict'] = le.fit_transform(data.corona_result)
y = data['predict']

lr = pickle.load(open('Pkls/lr_model.pkl', 'rb'))
rf = pickle.load(open('Pkls/rf_model.pkl', 'rb'))
nb = pickle.load(open('Pkls/nb_model.pkl', 'rb'))
dt = pickle.load(open('Pkls/dt_model.pkl', 'rb'))

y_pred_lr = lr.predict(X)
y_pred_rf = rf.predict(X)
y_pred_nb = nb.predict(X)
y_pred_dt = dt.predict(X)

from sklearn.metrics import accuracy_score, precision_score, recall_score, confusion_matrix

# LR model
print("Logistic regression Confusion matrix")

print("Accuracy: ", accuracy_score(y, y_pred_lr))
print(confusion_matrix(y, y_pred_lr))


# RF model
print("Random Forest Confusion matrix")

print("Accuracy: ", accuracy_score(y, y_pred_rf))
print(confusion_matrix(y, y_pred_rf))


# NB model
print("Naive Bayes Confusion matrix")

print("Accuracy: ", accuracy_score(y, y_pred_nb))
print(confusion_matrix(y, y_pred_nb))


# DT model
print("Decision Tree Confusion matrix")

print("Accuracy: ", accuracy_score(y, y_pred_dt))
print(confusion_matrix(y, y_pred_dt))
