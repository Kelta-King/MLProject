from sklearn.linear_model import LogisticRegression
import pandas as pd
from sklearn.preprocessing import LabelEncoder

model = LogisticRegression()
data = pd.read_excel('covid.xlsx')
data['test_indication_numerical'] = pd.factorize(data.test_indication)[0]
print(data.head(20))

le = LabelEncoder()

X = data[['cough', 'fever', 'sore_throat', 'shortness_of_breath', 'head_ache']]
#print(X)
data['predict'] = le.fit_transform(data.corona_result)
y = data['predict']

#print(data['corona_result'][0])
#print(data['predict'][0])
#print(y)
model.fit(X, y)

print(model.predict([[0, 0, 0, 0, 0]]))
