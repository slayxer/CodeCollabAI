import { useState } from "react";

function AIInput({ onSend }) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    onSend(prompt);

    setPrompt("");
  };

  return (
    <form className="ai-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ask AI anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button type="submit">
        Send
      </button>
    </form>
  );
}

export default AIInput;