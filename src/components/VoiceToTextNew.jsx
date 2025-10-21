import React, { useState, useRef } from 'react';

function VoiceToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const recognitionRef = useRef(null);

  const languages = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'fr-FR', name: 'French (France)' },
    { code: 'de-DE', name: 'German (Germany)' },
    { code: 'it-IT', name: 'Italian (Italy)' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)' },
    { code: 'ja-JP', name: 'Japanese (Japan)' },
    { code: 'ko-KR', name: 'Korean (South Korea)' },
    { code: 'zh-CN', name: 'Chinese (Mandarin)' },
  ];

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Safari, or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = language;

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(prev => prev + finalTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setIsListening(false);
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
    alert('Transcript copied to clipboard!');
  };

  const downloadTranscript = () => {
    const element = document.createElement('a');
    const file = new Blob([transcript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `transcript_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="app-container" style={{ padding: '100px 20px 20px' }}>
      <div className="form-container">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: '700' }}>
          🎤 Voice to Text
        </h1>

        <div className="form-group">
          <label className="form-label">Select Language:</label>
          <select
            className="form-input"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={isRecording}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: isRecording 
              ? 'linear-gradient(45deg, #ff6b6b, #ee5a24)' 
              : 'linear-gradient(45deg, #667eea, #764ba2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: isListening ? 'scale(1.1)' : 'scale(1)',
            boxShadow: isRecording ? '0 0 30px rgba(255, 107, 107, 0.5)' : '0 8px 25px rgba(102, 126, 234, 0.4)',
            animation: isListening ? 'pulse 1.5s infinite' : 'none'
          }}
          onClick={isRecording ? stopRecording : startRecording}>
            <span style={{ fontSize: '3rem', color: 'white' }}>
              {isRecording ? '⏹️' : '🎤'}
            </span>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            {isRecording ? (
              <div>
                <p style={{ color: '#ff6b6b', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  🔴 Recording... Click to stop
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#ff6b6b',
                        animation: `blink 1.5s infinite ${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <p style={{ color: '#667eea', fontWeight: 'bold' }}>
                Click the microphone to start recording
              </p>
            )}
          </div>

          <div className="media-controls">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`media-button ${isRecording ? 'btn-secondary' : 'btn-primary'}`}
              style={{ borderRadius: '25px', padding: '12px 24px' }}
            >
              {isRecording ? '⏹️ Stop Recording' : '🎤 Start Recording'}
            </button>
            
            <button
              onClick={clearTranscript}
              disabled={!transcript}
              className="media-button"
              style={{ borderRadius: '25px', padding: '12px 24px' }}
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {transcript && (
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Transcript:</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={copyToClipboard} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                  📋 Copy
                </button>
                <button onClick={downloadTranscript} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                  💾 Download
                </button>
              </div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid #ddd',
              whiteSpace: 'pre-wrap',
              maxHeight: '300px',
              overflowY: 'auto',
              fontSize: '1rem',
              lineHeight: '1.6',
              color: '#333'
            }}>
              {transcript || 'Your speech will appear here...'}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
              Word count: {transcript.split(' ').filter(word => word.trim() !== '').length}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1.1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1.1); }
        }
        
        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default VoiceToText;