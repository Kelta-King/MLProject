"""
---- Later prediction code ----
"""
import pickle

loaded_model = pickle.load(open('Pkls/lr_model.pkl', 'rb'))
result = loaded_model.predict([[1, 0, 0, 0, 1, 1, 2, 2]])
print(result)



#Model training code is below


"""


from sklearn.linear_model import LogisticRegression
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import pickle

model = LogisticRegression()
data = pd.read_excel('E:\ML Project\Project\MLProject\Dataset\covid_prediction_ds.xlsx')

le = LabelEncoder()
data['test_indication_numeric'] = le.fit_transform(data.test_indication)
data['gender_numeric'] = le.fit_transform(data.gender)
data['age_60_and_above_numeric'] = le.fit_transform(data.age_60_and_above)

X = data[['cough', 'fever', 'sore_throat', 'shortness_of_breath', 'head_ache', 'age_60_and_above_numeric', 'gender_numeric', 'test_indication_numeric']]

data['predict'] = le.fit_transform(data.corona_result)
y = data['predict']

model.fit(X, y)

#filename = "lr_model.pkl"
#pickle.dump(model, open(filename, 'wb'))

print(model.predict([[0, 0, 0, 0, 0, 0, 2, 2]]))
"""


"""
male 2
female 1

test_indication
other 2
Contact 1
Abroad 0

60 and above
No 0
Yes 2
None 1

negative 0
positive 1
"""