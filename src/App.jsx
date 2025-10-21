import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Chatbot from "./components/ChatbotNew";
import ImageToText from "./components/ImageToTextNew";
import Models from "./components/ModelsNew";
import OpenRouter from "./components/OpenRouterNew";
import TextToImg from "./components/TextToImgNew";
import VoiceToText from "./components/VoiceToTextNew";
import TextToSpeech from "./components/TextToSpeechNew";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/image-to-text" element={<ImageToText />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          <Route path="/voice-to-text" element={<VoiceToText />} />
          <Route path="/text-to-img" element={<TextToImg />} />
          {/* Hidden routes - still accessible via direct URL */}
          <Route path="/model" element={<Models />} />
          <Route path="/open-router" element={<OpenRouter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
