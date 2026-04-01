import React from "react";
import { Swords, Shield, Trophy, MessageSquare } from "lucide-react";

interface HeaderProps {
  currentPage: "home" | "stats";
  setPage: (page: "home" | "stats") => void;
}

export default function Header({ currentPage, setPage }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#1a1a1a] border-b-4 border-[#333] px-6 py-4 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage("home")}>
        <div className="w-10 h-10 bg-orange-500 border-2 border-white flex items-center justify-center rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Swords className="text-white w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tighter text-white uppercase italic">
          Hero <span className="text-orange-500">Quest</span>
        </h1>
      </div>

      <nav className="flex items-center gap-6">
        <button
          onClick={() => setPage("home")}
          className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all ${
            currentPage === "home" ? "text-orange-500 scale-110" : "text-gray-400 hover:text-white"
          }`}
        >
          <Shield className="w-4 h-4" />
          Profile
        </button>
        <button
          onClick={() => setPage("stats")}
          className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all ${
            currentPage === "stats" ? "text-orange-500 scale-110" : "text-gray-400 hover:text-white"
          }`}
        >
          <Trophy className="w-4 h-4" />
          Stats & Loot
        </button>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <div className="px-3 py-1 bg-[#222] border-2 border-[#444] text-[10px] font-mono text-gray-400 uppercase tracking-tighter">
          Server: Online
        </div>
      </div>
    </header>
  );
}
