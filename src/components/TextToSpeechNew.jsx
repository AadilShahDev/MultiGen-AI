import React, { useState } from 'react';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [voice, setVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);

  const sampleTexts = [
    "Hello! Welcome to our AI-powered Text to Speech converter.",
    "The quick brown fox jumps over the lazy dog.",
    "Artificial Intelligence is transforming the way we interact with technology.",
    "This is a demonstration of text-to-speech functionality with customizable voice settings."
  ];

  const speak = () => {
    if (!text.trim()) return;

    // Stop any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice properties
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    // Find and set the selected voice
    const voices = speechSynthesis.getVoices();
    if (voice && voices.length > 0) {
      const selectedVoice = voices.find(v => v.name === voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const downloadAudio = () => {
    // This is a placeholder for audio download functionality
    // In a real implementation, you'd use a service like AWS Polly, Google TTS, etc.
    alert('Download functionality would be implemented with a backend TTS service like AWS Polly, Google Cloud TTS, or Azure Speech Services.');
  };

  const loadSampleText = (sampleText) => {
    setText(sampleText);
  };

  // Get available voices
  const voices = speechSynthesis.getVoices();

  return (
    <div className="app-container" style={{ padding: '100px 20px 20px' }}>
      <div className="form-container">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: '700' }}>
          🔊 Text to Speech
        </h1>

        <div className="form-group">
          <label className="form-label">Enter Text to Convert:</label>
          <textarea
            className="form-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            rows="6"
            style={{ resize: 'vertical' }}
          />
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
            Character count: {text.length}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Sample Texts:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {sampleTexts.map((sample, index) => (
              <button
                key={index}
                onClick={() => loadSampleText(sample)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '15px',
                  color: '#333',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Sample {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Voice:</label>
            <select
              className="form-input"
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
            >
              <option value="">Default Voice</option>
              {voices.map((v, index) => (
                <option key={index} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Speed: {rate}</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Pitch: {pitch}</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Volume: {volume}</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="form-input"
            />
          </div>
        </div>

        <div className="media-controls">
          <button
            onClick={speak}
            disabled={!text.trim() || isPlaying}
            className="media-button"
            style={{ borderRadius: '25px', padding: '15px 30px' }}
          >
            {isPlaying ? '🔊 Playing...' : '▶️ Speak'}
          </button>
          
          <button
            onClick={stop}
            disabled={!isPlaying}
            className="media-button"
            style={{ borderRadius: '25px', padding: '15px 30px' }}
          >
            ⏹️ Stop
          </button>

          <button
            onClick={downloadAudio}
            disabled={!text.trim()}
            className="media-button"
            style={{ borderRadius: '25px', padding: '15px 30px' }}
          >
            💾 Download
          </button>
        </div>

        {isPlaying && (
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '100%', animation: 'pulse 1s infinite' }}></div>
            </div>
            <p style={{ marginTop: '1rem' }}>Speaking... Click stop to interrupt.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextToSpeech;