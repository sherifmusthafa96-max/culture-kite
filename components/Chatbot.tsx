"use client";

import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 I’m Culture Kite Assistant" }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input }
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Thanks! HR team will contact you 🚀" }
      ]);
    }, 800);

    setInput("");
  };

  return (
    <>
      {/* floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full"
      >
        💬
      </button>

      {/* chat box */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-black/70 text-white p-4 rounded-xl">

          <div className="h-60 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className="p-2 bg-white/10 rounded">
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex mt-2 gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 text-black"
              placeholder="Ask..."
            />
            <button onClick={sendMessage} className="bg-blue-500 px-3">
              Send
            </button>
          </div>

        </div>
      )}
    </>
  );
}