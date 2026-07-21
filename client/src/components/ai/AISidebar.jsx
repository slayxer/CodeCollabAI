import { useState } from "react";

import AIChat from "./AIChat";
import AIInput from "./AIInput";

import { askAI } from "../../services/aiService";

import "../../styles/ai.css";

function AISidebar({ code }) {

    const [messages, setMessages] = useState([
        {
            sender: "assistant",
            message:
                "👋 Hello Slayxer!\n\nI'm your AI Coding Assistant.\n\nI can help you:\n\n✨ Explain Code\n🐞 Debug Code\n⚡ Optimize Code\n🔍 Review Code\n\nOr ask me anything!",
        },
    ]);

    const sendMessage = async (prompt) => {

        const userMessage = {
            sender: "user",
            message: prompt,
        };

        setMessages((prev) => [...prev, userMessage]);

        try {

            const response = await askAI(prompt, code);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    message: response.reply,
                },
            ]);

        } catch (error) {

            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    message: "❌ Unable to contact AI server.",
                },
            ]);

        }

    };

    const explainCode = () => {
        sendMessage("Explain this code");
    };

    const debugCode = () => {
        sendMessage("Debug this code");
    };

    const optimizeCode = () => {
        sendMessage("Optimize this code");
    };

    const reviewCode = () => {
        sendMessage("Review this code");
    };

    return (

        <div className="ai-sidebar">

            <div className="ai-header">

                <h2>🤖 AI Assistant</h2>

                <div className="ai-tools">

                    <button onClick={explainCode}>
                        ✨ Explain
                    </button>

                    <button onClick={debugCode}>
                        🐞 Debug
                    </button>

                    <button onClick={optimizeCode}>
                        ⚡ Optimize
                    </button>

                    <button onClick={reviewCode}>
                        🔍 Review
                    </button>

                </div>

            </div>

            <AIChat messages={messages} />

            <AIInput onSend={sendMessage} />

        </div>

    );

}

export default AISidebar;