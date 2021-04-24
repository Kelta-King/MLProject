from sklearn.linear_model import LogisticRegression
import pandas as pd
from sklearn.preprocessing import LabelEncoder

def setColumn(data, column):

    i = 0
    l = list()

    print(data[column].unique())
    """
    for value in data[column]:
        if value.strip() == "None":
            data[column][i] = 2

    #data[column] = pd.to_numeric(data[column])
    print(data['cough'].unique())
    return data
    """

model = LogisticRegression()
data = pd.read_excel('covid.xlsx')

le = LabelEncoder()

X = data[['cough', 'fever', 'sore_throat', 'shortness_of_breath', 'head_ache']]
#print(X)
data['predict'] = le.fit_transform(data.corona_result)
y = data['predict']

print(data['corona_result'][0])
print(data['predict'][0])
#print(y)
model.fit(X, y)

print(model.predict([[0, 0, 0, 1, 1]]))
