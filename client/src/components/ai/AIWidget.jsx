import { useState } from "react";
import "./AIWidget.css";

function AIWidget() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = () => {
    if (!prompt.trim()) return;

    setResponse(
      "🤖 AI Assistant is under development. Soon you'll be able to generate code, debug errors, and get explanations!"
    );

    setPrompt("");
  };

  return (
    <div className="ai-widget">
      <h2>🤖 AI Assistant</h2>

      <textarea
        placeholder="Ask me anything about coding..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={handleAsk}>Ask AI</button>

      {response && (
        <div className="ai-response">
          {response}
        </div>
      )}
    </div>
  );
}

export default AIWidget;