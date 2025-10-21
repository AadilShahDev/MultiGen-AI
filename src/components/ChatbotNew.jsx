import React, { useState, useEffect, useRef } from "react";

function Chatbot() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([
    { 
      id: 1, 
      sender: "bot", 
      message: "Hello! I'm your AI assistant. How can I help you today?", 
      timestamp: new Date() 
    }
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { 
      id: Date.now(), 
      sender: "user", 
      message: query, 
      timestamp: new Date() 
    };
    
    setConversation(prev => [...prev, userMessage]);
    const currentQuery = query;
    setQuery("");
    setLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: "bot",
        message: `I received your message: "${currentQuery}". This is a demo response. In a real implementation, this would connect to your preferred AI service (OpenAI, Google Gemini, Claude, etc.) to provide intelligent, contextual responses.`,
        timestamp: new Date()
      };
      setConversation(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setConversation([
      { 
        id: 1, 
        sender: "bot", 
        message: "Hello! I'm your AI assistant. How can I help you today?", 
        timestamp: new Date() 
      }
    ]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-status">
          <div className="status-indicator online"></div>
          <div>
            <h2>AI Assistant</h2>
            <p>Online • Ready to help</p>
          </div>
        </div>
        <div className="chatbot-actions">
          <button onClick={clearChat} className="action-btn" title="Clear Chat">
            🗑️
          </button>
          <button className="action-btn" title="Settings">
            ⚙️
          </button>
        </div>
      </div>

      <div className="messages-container">
        <div className="messages-wrapper">
          {conversation.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
              <div className="message-avatar">
                {msg.sender === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <p>{msg.message}</p>
                </div>
                <div className="message-time">
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="message bot-message">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="message-bubble loading">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input-container">
        <div className="input-wrapper">
          <textarea
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="chat-input"
            rows="1"
            disabled={loading}
          />
          <div className="input-actions">
            <button className="action-btn" title="Attach File">📎</button>
            <button className="action-btn" title="Voice Input">🎤</button>
            <button className="action-btn" title="Add Emoji">😊</button>
            <button
              onClick={sendMessage}
              disabled={!query.trim() || loading}
              className="send-button"
            >
              {loading ? '⏳' : '➤'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;