import React, { useState } from 'react';

function ImageToText() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        // Here you would typically send the image to your OCR service
        // For demo purposes, we'll simulate the OCR process
        simulateOCR();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateOCR = () => {
    setLoading(true);
    setExtractedText('');
    
    // Simulate OCR processing time
    setTimeout(() => {
      setExtractedText(`📝 OCR Demo Mode

This is a demonstration of the OCR feature. The text extraction functionality requires backend integration with OCR services.

Currently showing: Demo placeholder text

In the full version, this area would display the actual text extracted from your uploaded image with high accuracy.`);
      setLoading(false);
    }, 2000);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="app-container" style={{ padding: '100px 20px 20px' }}>
      <div className="form-container">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: '700' }}>
          📷 Image to Text (OCR)
        </h1>

        <div
          className={`file-upload ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          
          {selectedImage ? (
            <div>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="image-preview"
                style={{ maxHeight: '200px', marginBottom: '1rem' }}
              />
              <p>Click to change image or drag a new one here</p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</div>
              <p>Click to select an image or drag and drop here</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Supports: JPG, PNG, GIF, WebP</p>
            </div>
          )}
        </div>

        {selectedImage && (
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <button
              onClick={simulateOCR}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Extracting Text...' : 'Extract Text'}
            </button>
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <div className="loading" style={{ margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem' }}>Processing image... This may take a moment.</p>
          </div>
        )}

        {extractedText && !loading && (
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3>Extracted Text:</h3>
              <button onClick={copyToClipboard} className="btn-secondary">
                📋 Copy Text
              </button>
            </div>
            <div style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '10px',
              border: '1px solid #ddd',
              whiteSpace: 'pre-wrap',
              maxHeight: '300px',
              overflowY: 'auto',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: '#333'
            }}>
              {extractedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageToText;