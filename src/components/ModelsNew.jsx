import React from 'react';
import { Link } from 'react-router-dom';

function Models() {
  const models = [
    {
      name: 'GPT-4',
      provider: 'OpenAI',
      description: 'Most advanced language model with superior reasoning capabilities',
      features: ['Text Generation', 'Code Assistance', 'Creative Writing', 'Analysis'],
      icon: '🧠',
      status: 'Available',
      color: '#10a37f'
    },
    {
      name: 'Claude 3',
      provider: 'Anthropic',
      description: 'Constitutional AI model focused on helpfulness and safety',
      features: ['Long Context', 'Reasoning', 'Creative Tasks', 'Code Generation'],
      icon: '🤖',
      status: 'Available',
      color: '#ff6b35'
    },
    {
      name: 'Gemini Pro',
      provider: 'Google',
      description: 'Multimodal AI model with strong performance across tasks',
      features: ['Text & Image', 'Code Generation', 'Math & Science', 'Multilingual'],
      icon: '💎',
      status: 'Available',
      color: '#4285f4'
    },
    {
      name: 'Llama 2',
      provider: 'Meta',
      description: 'Open-source large language model for research and commercial use',
      features: ['Open Source', 'Customizable', 'Local Deployment', 'Code Friendly'],
      icon: '🦙',
      status: 'Available',
      color: '#1877f2'
    },
    {
      name: 'DALL-E 3',
      provider: 'OpenAI',
      description: 'Advanced text-to-image generation model',
      features: ['High Quality Images', 'Text Understanding', 'Style Control', 'Safe Generation'],
      icon: '🎨',
      status: 'Available',
      color: '#10a37f'
    },
    {
      name: 'Whisper',
      provider: 'OpenAI',
      description: 'Automatic speech recognition system',
      features: ['Multi-language', 'High Accuracy', 'Real-time', 'Noise Robust'],
      icon: '🎤',
      status: 'Available',
      color: '#10a37f'
    }
  ];

  return (
    <div className="app-container" style={{ padding: '100px 20px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            AI Models Hub
          </h1>
          <p className="hero-subtitle" style={{ fontSize: '1.1rem' }}>
            Explore the latest AI models and their capabilities
          </p>
        </div>

        <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
          {models.map((model, index) => (
            <div key={index} className="feature-card" style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '2.5rem' }}>{model.icon}</div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', color: model.color }}>{model.name}</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>by {model.provider}</p>
                  </div>
                </div>
                <span style={{
                  background: model.status === 'Available' ? '#d4edda' : '#f8d7da',
                  color: model.status === 'Available' ? '#155724' : '#721c24',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}>
                  {model.status}
                </span>
              </div>

              <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                {model.description}
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#333' }}>Key Features:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {model.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      style={{
                        background: 'rgba(102, 126, 234, 0.1)',
                        color: '#667eea',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        border: '1px solid rgba(102, 126, 234, 0.2)'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary" style={{ flex: 1, padding: '0.75rem' }}>
                  Try {model.name}
                </button>
                <button 
                  className="btn-secondary" 
                  style={{ padding: '0.75rem 1rem' }}
                  onClick={() => window.open(`https://www.google.com/search?q=${model.name}+${model.provider}+API`, '_blank')}
                >
                  📚 Docs
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <div className="card" style={{ padding: '2rem', display: 'inline-block', maxWidth: '600px' }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Ready to Build?</h3>
            <p style={{ marginBottom: '1.5rem', color: '#666' }}>
              Get started with our AI-powered features and integrate these models into your workflow.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/chat">
                <button className="btn-primary">Start Chatting</button>
              </Link>
              <Link to="/text-to-img">
                <button className="btn-secondary">Generate Images</button>
              </Link>
              <Link to="/voice-to-text">
                <button className="btn-primary">Voice Recognition</button>
              </Link>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '15px', fontSize: '0.9rem' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'white' }}>Integration Guide:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <strong style={{ color: '#ff6b6b' }}>API Keys:</strong>
              <p style={{ margin: '0.5rem 0', color: 'rgba(255, 255, 255, 0.8)' }}>
                Obtain API keys from respective providers (OpenAI, Anthropic, Google, etc.)
              </p>
            </div>
            <div>
              <strong style={{ color: '#4ecdc4' }}>Backend Setup:</strong>
              <p style={{ margin: '0.5rem 0', color: 'rgba(255, 255, 255, 0.8)' }}>
                Create secure endpoints to handle API calls and manage rate limits
              </p>
            </div>
            <div>
              <strong style={{ color: '#45b7d1' }}>Security:</strong>
              <p style={{ margin: '0.5rem 0', color: 'rgba(255, 255, 255, 0.8)' }}>
                Never expose API keys in frontend code. Use environment variables and proxy requests
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Models;