import React, { useEffect, useState } from "react";
import { Profile, Experience, Education } from "../types";
import { Shield, Zap, Swords, Scroll, Trophy, ExternalLink, GraduationCap, Lock, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, expRes, eduRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/experience"),
          fetch("/api/education")
        ]);
        setProfile(await profileRes.json());
        setExperience(await expRes.json());
        setEducation(await eduRes.json());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-orange-500 font-mono text-xl animate-pulse uppercase tracking-widest">
          Loading Character Data...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-orange-500 selection:text-white">
      {/* Hero Section - Character Stats */}
      <section className="relative pt-24 pb-32 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#1a1a1a] border-2 border-[#333] rounded-sm text-xs font-bold uppercase tracking-widest text-orange-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Shield className="w-4 h-4" />
            Class: Fullstack Developer
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85]">
            {profile?.name}
          </h1>
          
          <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-xl">
            {profile?.bio}
          </p>

          <div className="grid grid-cols-2 gap-6 max-w-md">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-red-500">
                <span>HP (Health)</span>
                <span>{profile?.hp}/100</span>
              </div>
              <div className="w-full h-3 bg-[#1a1a1a] border-2 border-[#333] rounded-sm overflow-hidden p-[2px]">
                <div className="h-full bg-red-600 w-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-blue-500">
                <span>MP (Mana)</span>
                <span>{profile?.mp}/100</span>
              </div>
              <div className="w-full h-3 bg-[#1a1a1a] border-2 border-[#333] rounded-sm overflow-hidden p-[2px]">
                <div className="h-full bg-blue-600 w-[85%]"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="text-center">
              <div className="text-4xl font-black text-orange-500 tracking-tighter italic">LVL {profile?.level}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Experience</div>
            </div>
            <div className="h-12 w-[2px] bg-[#333]"></div>
            <div className="text-center">
              <div className="text-4xl font-black text-white tracking-tighter italic">99+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Quests Done</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-orange-500/20 blur-3xl group-hover:bg-orange-500/30 transition-all duration-500"></div>
          <div className="relative aspect-[4/5] bg-[#1a1a1a] border-8 border-[#333] rounded-sm overflow-hidden shadow-[20px_20px_0px_0px_rgba(255,100,0,0.1)]">
            <img 
              src={profile?.image_url || "https://picsum.photos/seed/alex/800/1000"} 
              alt={profile?.name} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1 italic">Active Quest:</div>
              <div className="text-sm font-medium">Building the next generation of web apps</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Me - Backstory */}
      <section className="bg-[#111] py-32 border-y-4 border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-24">
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 border-2 border-white flex items-center justify-center rounded-sm">
                <Scroll className="text-white w-5 h-5" />
              </div>
              <h2 className="text-3xl font-bold uppercase italic tracking-tighter">Backstory</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed uppercase tracking-widest font-bold">
              The Origin Story of a Developer
            </p>
          </div>
          <div className="md:col-span-2 space-y-8">
            <p className="text-2xl text-gray-300 font-medium leading-relaxed">
              Every journey starts with a single line of code. My adventure began in Surabaya, where I discovered the power of creating worlds through the browser. 
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              I believe that code is more than just logic; it's a craft. Like a master blacksmith forging a legendary sword, I strive to build applications that are robust, performant, and delightful to use. My focus is on the intersection of design and technology, ensuring that every user interaction feels like a reward.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Journey Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-b-4 border-[#1a1a1a]">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-orange-500 border-2 border-white flex items-center justify-center rounded-sm">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">Academic Journey</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 border-4 transition-all duration-300 ${
                edu.status === 'Locked' 
                  ? 'bg-[#0a0a0a] border-[#222] opacity-50 grayscale' 
                  : 'bg-[#1a1a1a] border-[#333] hover:border-orange-500'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-orange-500 italic">
                    {edu.period}
                  </div>
                  {edu.status === 'Locked' ? (
                    <Lock className="w-4 h-4 text-gray-600" />
                  ) : edu.status === 'Current' ? (
                    <div className="px-2 py-1 bg-blue-500/20 text-blue-500 text-[8px] font-bold uppercase tracking-widest border border-blue-500/50">
                      In Progress
                    </div>
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                </div>
                
                <h3 className={`text-xl font-bold uppercase tracking-tighter italic ${edu.status === 'Locked' ? 'text-gray-600' : 'text-white'}`}>
                  {edu.status === 'Locked' ? 'Locked (Next Chapter)' : edu.school}
                </h3>
                
                {edu.status !== 'Locked' && (
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                    {edu.status === 'Current' ? 'Currently Leveling Up' : 'Quest Completed'}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience - Quest Log */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 border-2 border-white flex items-center justify-center rounded-sm">
                <Trophy className="text-white w-5 h-5" />
              </div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">Quest Log</h2>
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Completed Missions & Adventures</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {experience.map((exp, idx) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-[#1a1a1a] border-4 border-[#333] p-8 hover:border-orange-500 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-orange-500 italic">{exp.period}</div>
                  <h3 className="text-3xl font-bold uppercase tracking-tighter italic">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-xs">
                    <Swords className="w-3 h-3" />
                    {exp.company}
                  </div>
                  <p className="text-gray-500 max-w-2xl leading-relaxed">
                    {exp.description}
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="px-4 py-2 bg-[#222] border-2 border-[#444] text-[10px] font-bold uppercase tracking-widest text-green-500">
                    Completed
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
