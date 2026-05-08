import { useState, useEffect, useRef } from "react";
import axios from "axios";
import heroImg from "../assets/images/back4.jpg";

const Help = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/ask", {
        question: userMessage.text,
      });

      const aiMessage = { sender: "ai", text: res.data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMsg = {
        sender: "ai",
        text: "⚠️ Error communicating with AI. Try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setLoading(false);
  };

  // Enter key sends message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center -mt-[90px]"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="max-w-2xl mx-auto h-screen flex flex-col pt-24">
        {/* <h1 className="text-3xl font-bold text-center mb-5">
          AI Cooking Chat Assistant
        </h1> */}
        <h1 className="text-4xl font-bold text-white mb-5 mt-3 text-center">
          AI Cooking <span className="text-amber-500">Chat Assistant</span>
        </h1>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg shadow-inner">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-xl max-w-[75%] whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-amber-500 text-white rounded-br-none"
                    : "bg-white text-gray-900 border-amber-500 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* AI typing indicator */}
          {loading && (
            <div className="my-2 flex justify-start">
              <div className="bg-white border p-3 rounded-xl rounded-bl-none">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-400"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Input area */}
        <div className="mt-3  mb-3 flex gap-3">
          <textarea
            className="bg-white flex-1 rounded-md p-3 resize-none h-12"
            placeholder="Ask me anything about cooking, recipes, ingredients..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={sendMessage}
            className="bg-amber-500 text-white px-10 py-2 rounded-md h-12"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
