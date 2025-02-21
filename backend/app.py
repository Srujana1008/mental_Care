from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app, resources={r"/analyze": {"origins": "*"}})  # Allow all origins

@app.route('/analyze', methods=['POST'])
def analyze():
    # Add explicit content type handling
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    data = request.json
    responses = data.get("responses", [])
    
    # Convert responses to a more readable format for the LLM
    formatted_responses = []
    for i, response in enumerate(responses):
        if response is not None:  # Skip unanswered questions
            formatted_responses.append(f"Q{i+1}: {response}")
    
    response_text = "\n".join(formatted_responses)
    
    prompt = f"""
You are a mental health assessment analyzer. Given a user's responses to a set of mental health questions, categorize their mental health status based on predefined scoring.

Each response is rated as follows:

'Never' = 0  
'Rarely' = 1  
'Sometimes' = 2  
'Often' = 3  
'Always' = 4  

There are 20 questions. Responses correspond to indices (0-19).

Anxiety-related questions: 0, 1, 5, 9, 10, 12, 14, 16, 19  
Depression-related questions: 2, 3, 4, 6, 7, 8, 11, 13, 15, 18  

**Scoring:**  
- Anxiety score = Sum of scores for anxiety-related questions  
- Depression score = Sum of scores for depression-related questions  

**Results Interpretation:**  
- If **anxietyScore > 25** and **depressionScore > 25** → Output exactly: `Signs of Both Anxiety and Depression`  
- If **anxietyScore > 25** → Output exactly: `Signs of Anxiety`  
- If **depressionScore > 25** → Output exactly: `Signs of Depression`  
- Otherwise → Output exactly: `No significant anxiety or depression`  

**User Responses:**  
{response_text}  

Output only one of the above categories. Do not provide explanations, scores, or any other text.
"""


    try:
        response = ollama.chat(model="llama2:7b", messages=[{"role": "user", "content": prompt}])
        return jsonify({"result": response["message"]["content"]})
    except Exception as e:
        print(f"Error communicating with Ollama: {str(e)}")
        return jsonify({"error": str(e)}), 500

# This should be outside the analyze function
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5500, debug=True)