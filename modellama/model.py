import ollama

def evaluate(input_text, question):
    prompt = f'''
        Evaluate the pseudocode on the basis of readability, clarity, conciseness, and ease of translation into code and rate it out of 20. and just give a two digit number as output no other text.
        Question : 
        {question}
        Pseudocode:
        {input_text}
   
    '''

    response = ollama.chat(model='mistral', messages=[{'role':'user', 'content':prompt }])

    return response['message']['content']


code = '''
    Algorithm: Sequential-Bubble-Sort (A)
        for i ← 1 to length [A] do
        for j ← length [A] down-to i +1 do
            if A[A] < A[j-1] then
                Exchange A[j] ⟷ A[j-1]
'''
# ans = evaluate(code)
# print(ans)