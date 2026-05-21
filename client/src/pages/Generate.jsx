import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios"


function Generate() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleGenerateWebsite = async() => {
    try {
      const result = await axios.post( )
    }
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-[#050505] via-[#0b0b0b] to-[#050505] text-white">
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex item-center gap-4">
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-lg font-semibold">
              GenWeb<span className="text-zinc-400">.ai</span>
            </h1>
          </div>
          <button
            className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition"
            onClick={() => navigate("/generate")}
          >
            + New Website
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Build Websites with
            <span className="block bg-linear-to-r from-white to zinc-400 bg-clip-text text-transparent">
              Real AI Power
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            This process may take several minutes. GenWeb.ai focuses on quality,
            not shortcuts.
          </p>
        </motion.div>
        <div className="mb-14 text-left my-16">
          <h1 className="text-x font-semibold mb-2">Describe your website</h1>
          <div className="relative">
            <textarea
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              placeholder="Describe your website in detail"
              className="w-full h-56 p-6 rounded-3xl bg-black/60 border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-2 focus:ring-white/20"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="px-4 py-4 rounded-2xl font-semibold text-lg bg-white text-black"
          >
            Generate Website
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Generate;
