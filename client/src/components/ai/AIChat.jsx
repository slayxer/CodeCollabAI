import AIMessage from "./AIMessage";

function AIChat({ messages }) {
  return (
    <div className="ai-chat">

      {messages.length === 0 ? (

        <div className="empty-chat">

          <h3>🤖 AI Assistant</h3>

          <p>
            Ask me anything about your code.
          </p>

        </div>

      ) : (

        messages.map((msg, index) => (

          <AIMessage
            key={index}
            sender={msg.sender}
            message={msg.message}
          />

        ))

      )}

    </div>
  );
}

export default AIChat;