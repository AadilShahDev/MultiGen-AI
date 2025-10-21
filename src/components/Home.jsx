import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="app-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to MultiGen AI</h1>
        <p className="hero-subtitle">
          From Thought to Reality — Text, Talk, and Generate.
        </p>
        <p className="hero-subtitle" style={{ fontSize: '1rem', marginBottom: '3rem' }}>
          Your all-in-one AI assistant featuring smart chatbots, voice recognition, text-to-speech, OCR, and powerful image generation.
        </p>

        <div className="features-grid">
          {/* AI Chatbot */}
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h2 className="feature-title">AI Chatbot</h2>
            <p className="feature-description">Chat with advanced AI models. Get intelligent answers, creative insights, and assistance with any task.</p>
            <Link to="/chat">
              <button className="btn-primary">Start Chatting</button>
            </Link>
          </div>

          {/* Image to Text (OCR) */}
          <div className="feature-card">
            <div className="feature-icon">📷</div>
            <h2 className="feature-title">Image to Text</h2>
            <p className="feature-description">Extract text from images using advanced OCR technology. Perfect for digitizing documents and images.</p>
            <Link to="/image-to-text">
              <button className="btn-secondary">Try OCR</button>
            </Link>
          </div>

          {/* Text to Speech */}
          <div className="feature-card">
            <div className="feature-icon">🔊</div>
            <h2 className="feature-title">Text to Speech</h2>
            <p className="feature-description">Convert any text into natural-sounding speech. Great for accessibility and content consumption.</p>
            <Link to="/text-to-speech">
              <button className="btn-primary">Convert to Speech</button>
            </Link>
          </div>

          {/* Voice to Text */}
          <div className="feature-card">
            <div className="feature-icon">🎤</div>
            <h2 className="feature-title">Voice to Text</h2>
            <p className="feature-description">Convert speech to text with high accuracy. Perfect for transcription and voice commands.</p>
            <Link to="/voice-to-text">
              <button className="btn-secondary">Start Recording</button>
            </Link>
          </div>

          {/* Text to Image */}
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h2 className="feature-title">Text to Image</h2>
            <p className="feature-description">Generate stunning images from text descriptions using AI. Bring your imagination to life.</p>
            <Link to="/text-to-img">
              <button className="btn-primary">Generate Images</button>
            </Link>
          </div>

          {/* Models Hub - Hidden for now */}
          {/* <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h2 className="feature-title">AI Models</h2>
            <p className="feature-description">Explore different AI models and their capabilities. Compare performance and find the best fit.</p>
            <Link to="/model">
              <button className="btn-secondary">Explore Models</button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
