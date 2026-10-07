import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { Rocket, Code2, Monitor, Send, X, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Editor from "@monaco-editor/react";

function WebsiteEditor() {
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const iframeRef = useRef(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [showCode, setShowCode] = useState("");
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const thinkingSteps = [
    "Understanding your request...",
    "Planning layout changes...",
    "Improving responsiveness...",
    "Applying animations...",
    "Finalizing update...",
  ];

  const handleUpdate = async () => {
    const i = setInterval(() => {
      setThinkingIndex((i) => (i + 1) % thinkingSteps.length);
    }, 1200);
    setUpdateLoading(true);
    if (!prompt) return;
    const text = prompt;
    setPrompt("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    try {
      const result = await axios.post(
        `${serverUrl}/api/website/update/${id}`,
        { prompt },
        { withCredentials: true },
      );
      console.log(result);
      setUpdateLoading(false);
      setMessages((m) => [...m, { role: "ai", content: result.data.message }]);
      setCode(result.data.code);
      clearInterval(i);
    } catch (err) {
      setUpdateLoading(false);
      console.log(err);
      clearInterval(i);
    }
  };

  // useEffect(() => {
  //   // if (!updateLoading) return;
  //   console.log("////////////");
  //   const i = setInterval(() => {
  //     setThinkingIndex((i) => (i + 1) % thinkingSteps.length);
  //   }, 1200);

  //   return () => clearInterval(i);
  // }, [updateLoading]);

  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/website/get-by-id/${id}`,
          { withCredentials: true },
        );
        setWebsite(result.data);
        setCode(result.data.latestCode);
        setMessages(result.data.conversation);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load website");
      }
    };
    handleGetWebsite();
  }, [id]);

  useEffect(() => {
    if (!website || !iframeRef.current || !code) return;

    iframeRef.current.srcdoc = code;
  }, [code, website]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    );
  }

  if (!website) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">
      <aside className="hidden lg:flex w-95 flex-col border-r border-white/10 bg-black/80">
        <Header onclose={() => setShowChat(false)} />
        <>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] ${
                  m.role === "user" ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-white text-black"
                      : "bg-white/5 border border-white/10 text-zinc-200"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {updateLoading && (
              <div className="max-w-[85%] mr-auto">
                <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5">
                  {thinkingSteps[thinkingIndex]}
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                placeholder="Describe Changes..."
                className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
              />
              <button
                className="px-4 py-3 rounded-2xl bg-white text-black"
                onClick={handleUpdate}
                disabled={updateLoading}
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </>
      </aside>
      <div className="flex-1 flex flex-col">
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
          <span className="text-xs text-zinc-400">Live Preview</span>
          <div className="flex justify-between">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition">
              <Rocket size={14} />
              Deploy
            </button>
            <button
              className="p-2 lg:hidden cursor-pointer"
              onClick={() => setShowChat(true)}
            >
              <MessageSquare size={18} />
            </button>
            <button className="p-2 cursor-pointer">
              <Code2 size={18} onClick={() => setShowCode(true)} />
            </button>
            <button
              className="p-2 cursor-pointer"
              onClick={() => setShowFullPreview(true)}
            >
              <Monitor size={18} />
            </button>
          </div>
        </div>
        <iframe
          ref={iframeRef}
          title="Website preview"
          className="flex-1 w-full bg-white"
        ></iframe>
      </div>
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col"
          >
            <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
              <span className="font-semibold truncate">{website.title}</span>
              <button
                className="p-2 cursor-pointer"
                onClick={() => setShowChat(false)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] ${
                    m.role === "user" ? "ml-auto" : "mr-auto"
                  }`}
                >
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-white text-black"
                        : "bg-white/5 border border-white/10 text-zinc-200"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {updateLoading && (
                <div className="max-w-[85%] mr-auto">
                  <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5">
                    {thinkingSteps[thinkingIndex]}
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  placeholder="Describe Changes..."
                  className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none"
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                />
                <button
                  className="px-4 py-3 rounded-2xl bg-white text-black cursor-pointer"
                  onClick={handleUpdate}
                  disabled={updateLoading}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#1e1e1e] flex flex-col"
          >
            <div className="h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]">
              <span className="text-sm font-medium">index.html</span>
              <button
                className="cursor-pointer"
                onClick={() => setShowCode(false)}
              >
                <X size={18} />
              </button>
            </div>
            <Editor
              theme="vs-dark"
              value={code}
              language="html"
              onChange={(e) => setCode(e)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* you can write motion.div completely on its own as well without animate presence
      you need animatepresence if you want to animate the component as it is being removed (unmounted)from the DOM  */}
      <AnimatePresence>
        {showFullPreview && (
          <motion.div className="fixed inset-0 z-[9999] bg-black">
            <iframe className="w-full h-full bg-white" srcDoc={code} />
            <button
              className="absolute top-4 right-4 p-2 bg-black/70 rounded-lg"
              onClick={() => {
                setShowFullPreview(false);
              }}
            >
              <X />
            </button>
            {/* src contains the url or file path to fetch external content while srcDoc contains the actual raw HTML code to be rendered directly inline */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  function Header({ onclose }) {
    return (
      <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
        <span className="font-semibold truncate">{website.title}</span>
        {onclose && (
          <button onClick={onclose}>
            <X size={18} color="white" />
          </button>
        )}
      </div>
    );
  }
}

export default WebsiteEditor;
