import React, { useState } from 'react';
import './AskAstronaut.css'; // Importing the updated CSS for space theme

export function AskAstronaut({}) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    try {
      // Clear previous answer and error
      setAnswer('');
      setError('');

      const response = await fetch(`${process.env.REACT_APP_SPACE_QUESTIONS}?question=${encodeURIComponent(question)}`);

      if (response.ok) {
        const data = await response.json();
        setAnswer(data); // This assumes the response is just text
      } else {
        throw new Error('Failed to fetch the answer');
      }
    } catch (err) {
      setError('An error occurred while fetching the answer. Please try again.');
    }
  };

  return (
    <div className="ask-astronaut-container">
      <img src="/assets/astronautrocket.png" alt="Astronaut" className="astronaut-img" />
      <h1 className="space-header">Ask a Space Question</h1>
      <form className="space-form" onSubmit={handleQuestionSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your space-related question here"
          required
          className="space-input"
        />
        <button type="submit" className="space-submit-btn">
          {answer ? 'Ask Another Question' : 'Get Answers'} {/* Dynamic button text */}
        </button>
      </form>

      {answer && (
        <div className="response-box">
          <div className="answer-text">
            <h2>Answer:</h2>
            <p>{answer}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="error-box">
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
