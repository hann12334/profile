import React, { useEffect, useState } from "react";
import { Skill, Project } from "../types";
import { Zap, Package, ExternalLink, Swords, Shield, Trophy } from "lucide-react";
import { motion } from "motion/react";

export default function Stats() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, projectsRes] = await Promise.all([
          fetch("/api/skills"),
          fetch("/api/projects")
        ]);
        setSkills(await skillsRes.json());
        setProjects(await projectsRes.json());
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
          Loading Inventory...
        </div>
      </div>
    );
  }

  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-orange-500 selection:text-white pb-32">
      {/* Skills - Ability Tree */}
      <section className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 border-2 border-white flex items-center justify-center rounded-sm">
                <Zap className="text-white w-5 h-5" />
              </div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">Ability Tree</h2>
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Mastered Skills & Technologies</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="space-y-8 bg-[#111] border-4 border-[#1a1a1a] p-8 rounded-sm"
            >
              <h3 className="text-xl font-bold uppercase italic tracking-tighter text-orange-500 border-b-2 border-orange-500/20 pb-4">
                {cat}
              </h3>
              <div className="space-y-6">
                {skills.filter(s => s.category === cat).map(skill => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#1a1a1a] border border-[#333] rounded-sm overflow-hidden p-[1px]">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="h-full bg-orange-500"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects - Loot Inventory */}
      <section className="mt-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 border-2 border-white flex items-center justify-center rounded-sm">
                <Package className="text-white w-5 h-5" />
              </div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">Loot Inventory</h2>
            </div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Rare Items & Projects Built</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-[#1a1a1a] border-4 border-[#333] overflow-hidden hover:border-orange-500 transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-bold uppercase tracking-tighter italic">{project.title}</h3>
                  <a href={project.link} className="p-2 bg-[#222] border-2 border-[#444] hover:bg-orange-500 hover:border-white transition-all group/btn">
                    <ExternalLink className="w-4 h-4 group-hover/btn:text-white" />
                  </a>
                </div>
                <p className="text-gray-500 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="px-3 py-1 bg-[#222] border border-[#333] text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Rare Item
                  </div>
                  <div className="px-3 py-1 bg-[#222] border border-[#333] text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Web App
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
