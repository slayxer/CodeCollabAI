function AIMessage({ sender, message }) {
  return (
    <div
      className={`ai-message ${
        sender === "user" ? "user-message" : "assistant-message"
      }`}
    >
      <div className="message-bubble">
        {message}
      </div>
    </div>
  );
}

export default AIMessage;