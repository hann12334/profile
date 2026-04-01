import React from "react";
import { Github, Instagram, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111] border-t-4 border-[#333] px-10 py-12 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 border-2 border-white flex items-center justify-center rounded-sm">
              <Mail className="text-white w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold uppercase italic tracking-tighter">Contact Quest</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Ready to start a new adventure? Drop a message and let's build something epic together.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Social Links</h4>
          <div className="flex flex-col gap-4">
            <a href="https://github.com/hann12334" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-medium hover:text-orange-500 transition-colors group">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://instagram.com/handaka2" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-medium hover:text-orange-500 transition-colors group">
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Quest Status</h4>
          <div className="bg-[#1a1a1a] border-2 border-[#333] p-4 rounded-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase font-bold text-gray-400">Availability</span>
              <span className="text-[10px] uppercase font-bold text-green-500">Open for Hire</span>
            </div>
            <div className="w-full h-1 bg-[#333] rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#222] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
        <p>© 2026 Alexsander Handaka Wijaya. All Rights Reserved.</p>
        <p>Built with React & SQLite</p>
      </div>
    </footer>
  );
}
