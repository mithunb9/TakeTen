import pandas as pd

df = pd.read_csv('data/grades.csv')

df['ParsedName'] = df['Subject'] + df['CatalogNumber'].astype(str)

# Define the columns for passing and failing grades
passing_grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'CR']
failing_grades = ['F', 'NF', 'I', 'NC', 'W']

# Calculate the sum of passing and failing grades for each class
df['Pass'] = df[passing_grades].sum(axis=1)
df['Fail'] = df[failing_grades].sum(axis=1)

# Create the final DataFrame with required columns
final_df = df[['ParsedName', 'Pass', 'Fail']]

output_file = 'grades.jsonl'
final_df.to_json(output_file, orient='records', lines=True)
