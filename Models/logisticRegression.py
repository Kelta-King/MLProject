from sklearn.linear_model import LogisticRegression
import pandas as pd
from sklearn.preprocessing import LabelEncoder

model = LogisticRegression()
data = pd.read_excel('E:\ML Project\Project\MLProject\Dataset\covid_prediction_ds.xlsx')

le = LabelEncoder()
data['test_indication_numeric'] = le.fit_transform(data.test_indication)
data['gender_numeric'] = le.fit_transform(data.gender)
data['age_60_and_above_numeric'] = le.fit_transform(data.age_60_and_above)

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
"""


X = data[['cough', 'fever', 'sore_throat', 'shortness_of_breath', 'head_ache', 'age_60_and_above_numeric', 'gender_numeric', 'test_indication_numeric']]
#print(X)
data['predict'] = le.fit_transform(data.corona_result)
y = data['predict']
#print(data[['predict', 'corona_result']])
"""
negative 0
positive 1
"""

#print(data['corona_result'][0])
#print(data['predict'][0])
#print(y)
model.fit(X, y)

print(model.predict([[0, 0, 0, 0, 0, 0, 0, 0]]))
