import React, { useState } from 'react';

function TextToImg() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageStyle, setImageStyle] = useState('realistic');
  const [imageSize, setImageSize] = useState('512x512');

  const styles = [
    { value: 'realistic', label: 'Realistic', emoji: '📸' },
    { value: 'artistic', label: 'Artistic', emoji: '🎨' },
    { value: 'cartoon', label: 'Cartoon', emoji: '🎭' },
    { value: 'anime', label: 'Anime', emoji: '🌸' },
    { value: 'cyberpunk', label: 'Cyberpunk', emoji: '🌆' },
    { value: 'fantasy', label: 'Fantasy', emoji: '🧙‍♂️' },
    { value: 'minimalist', label: 'Minimalist', emoji: '⚡' },
    { value: 'vintage', label: 'Vintage', emoji: '📻' }
  ];

  const sizes = [
    { value: '256x256', label: '256×256 (Square)' },
    { value: '512x512', label: '512×512 (Square)' },
    { value: '768x768', label: '768×768 (Square)' },
    { value: '512x768', label: '512×768 (Portrait)' },
    { value: '768x512', label: '768×512 (Landscape)' }
  ];

  const samplePrompts = [
    "A majestic lion sitting on a rocky cliff at sunset",
    "Futuristic cityscape with flying cars and neon lights",
    "A peaceful forest with sunlight filtering through the trees",
    "Abstract geometric shapes in vibrant colors",
    "A cozy coffee shop on a rainy day with warm lighting"
  ];

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneratedImage(null);

    // Simulate image generation (replace with actual API call)
    setTimeout(() => {
      // This would be replaced with actual API call to DALL-E, Stable Diffusion, etc.
      const placeholder = `https://picsum.photos/${imageSize.replace('x', '/')}?random=${Date.now()}`;
      setGeneratedImage(placeholder);
      setLoading(false);
    }, 3000);
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `generated-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const loadSamplePrompt = (samplePrompt) => {
    setPrompt(samplePrompt);
  };

  return (
    <div className="app-container" style={{ padding: '100px 20px 20px' }}>
      <div className="form-container" style={{ maxWidth: '800px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: '700' }}>
          🎨 Text to Image Generator
        </h1>

        <div className="form-group">
          <label className="form-label">Describe your image:</label>
          <textarea
            className="form-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A beautiful landscape with mountains and a lake at sunrise..."
            rows="4"
            style={{ resize: 'vertical' }}
          />
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
            Be descriptive! Include details about style, colors, lighting, and composition.
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Sample Prompts:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {samplePrompts.map((sample, index) => (
              <button
                key={index}
                onClick={() => loadSamplePrompt(sample)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '15px',
                  color: '#333',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  textAlign: 'left'
                }}
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Image Style:</label>
            <select
              className="form-input"
              value={imageStyle}
              onChange={(e) => setImageStyle(e.target.value)}
            >
              {styles.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.emoji} {style.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Image Size:</label>
            <select
              className="form-input"
              value={imageSize}
              onChange={(e) => setImageSize(e.target.value)}
            >
              {sizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Negative Prompt (Optional):</label>
          <textarea
            className="form-input"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="What you DON'T want in the image (e.g., blurry, low quality, text, watermark)"
            rows="2"
            style={{ resize: 'vertical' }}
          />
        </div>

        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="btn-primary"
            style={{ padding: '15px 30px', fontSize: '1.1rem' }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="loading"></div>
                Generating Image...
              </span>
            ) : (
              '🎨 Generate Image'
            )}
          </button>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '100%', animation: 'pulse 2s infinite' }}></div>
            </div>
            <p style={{ marginTop: '1rem', color: '#666' }}>
              Creating your masterpiece... This may take a few moments.
            </p>
          </div>
        )}

        {generatedImage && !loading && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 152, 0, 0.2))', 
              border: '2px solid rgba(255, 193, 7, 0.5)',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '0.95rem',
              color: '#333'
            }}>
              <strong>⚠️ Demo Mode:</strong> Currently showing placeholder images. AI image generation with DALL-E or Stable Diffusion will be integrated soon!
            </div>
            
            <h3 style={{ marginBottom: '1rem' }}>Generated Image:</h3>
            <div style={{ display: 'inline-block', position: 'relative' }}>
              <img
                src={generatedImage}
                alt="Generated artwork"
                className="image-preview"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '15px' }}
              />
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={downloadImage} className="btn-primary">
                  💾 Download Image
                </button>
                <button onClick={generateImage} className="btn-secondary">
                  🔄 Generate Another
                </button>
              </div>
            </div>
            
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', fontSize: '0.9rem' }}>
              <strong>Prompt used:</strong> "{prompt}"
              {negativePrompt && (
                <div style={{ marginTop: '0.5rem' }}>
                  <strong>Negative prompt:</strong> "{negativePrompt}"
                </div>
              )}
              <div style={{ marginTop: '0.5rem' }}>
                <strong>Style:</strong> {styles.find(s => s.value === imageStyle)?.label} • 
                <strong> Size:</strong> {imageSize}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', fontSize: '0.9rem' }}>
          <strong>💡 Pro Tips for Better Images:</strong>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            <li>Be specific about details, lighting, and composition</li>
            <li>Include art style references (e.g., "in the style of Van Gogh")</li>
            <li>Use negative prompts to exclude unwanted elements</li>
            <li>Mention camera angles and perspectives</li>
            <li>Add quality modifiers like "high resolution", "detailed", "masterpiece"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TextToImg;