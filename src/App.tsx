import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Stats from "./pages/Stats";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "stats">("home");

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans selection:bg-orange-500 selection:text-white">
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      
      <main className="min-h-[calc(100vh-80px)]">
        {currentPage === "home" ? <Home /> : <Stats />}
      </main>

      <Footer />
    </div>
  );
}
