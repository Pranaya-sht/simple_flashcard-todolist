# This is a simple Flask backend for a Todo and Flashcard application.
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from Next.js

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)

# Flashcard model
class Flashcard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(200), nullable=False)
    answer = db.Column(db.String(200), nullable=False)

# Create database
with app.app_context():
    db.create_all()

# Task routes
@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{'id': task.id, 'content': task.content} for task in tasks])

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = Task(content=data['content'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'id': new_task.id, 'content': new_task.content}), 201

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'})

# Flashcard routes
@app.route('/flashcards', methods=['GET'])
def get_flashcards():
    flashcards = Flashcard.query.all()
    return jsonify([{'id': fc.id, 'question': fc.question, 'answer': fc.answer} for fc in flashcards])

@app.route('/flashcards', methods=['POST'])
def add_flashcard():
    data = request.get_json()
    new_flashcard = Flashcard(question=data['question'], answer=data['answer'])
    db.session.add(new_flashcard)
    db.session.commit()
    return jsonify({'id': new_flashcard.id, 'question': new_flashcard.question, 'answer': new_flashcard.answer}), 201

# NEW: Delete a single flashcard by ID
@app.route('/flashcards/<int:id>', methods=['DELETE'])
def delete_flashcard(id):
    flashcard = Flashcard.query.get_or_404(id)
    db.session.delete(flashcard)
    db.session.commit()
    return jsonify({'message': 'Flashcard deleted'})

# NEW: Delete all flashcards
@app.route('/flashcards', methods=['DELETE'])
def delete_all_flashcards():
    Flashcard.query.delete()
    db.session.commit()
    return jsonify({'message': 'All flashcards deleted'}), 204

if __name__ == '__main__':
    app.run(debug=True, port=5000)