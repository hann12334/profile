import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import cors from "cors";

const db = new Database("portfolio.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    title TEXT,
    bio TEXT,
    image_url TEXT,
    level INTEGER,
    hp INTEGER,
    mp INTEGER
  );

  CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT,
    role TEXT,
    period TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    level INTEGER,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    image_url TEXT,
    link TEXT
  );

  CREATE TABLE IF NOT EXISTS education (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    school TEXT,
    period TEXT,
    status TEXT
  );
`);

// Seed Data (only if empty)
const profileCount = db.prepare("SELECT count(*) as count FROM profile").get() as { count: number };
if (profileCount.count === 0) {
  db.prepare(`
    INSERT INTO profile (name, title, bio, image_url, level, hp, mp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    "Alexsander Handaka Wijaya",
    "Fullstack Developer & Game Enthusiast",
    "A passionate developer who treats every project as a quest. Specializing in building immersive web experiences with modern technologies.",
    "/han.jpg", 
    25,
    100,
    85
  );

  const experiences = [
    { company: "Freelance", role: "Web Developer", period: "2023 - Present", description: "Completed various web development quests for local clients." },
    { company: "SMAK Frateran Surabaya", role: "Student Developer", period: "2022 - 2024", description: "Led the school's tech club and built internal tools." }
  ];
  const insertExp = db.prepare("INSERT INTO experience (company, role, period, description) VALUES (?, ?, ?, ?)");
  experiences.forEach(e => insertExp.run(e.company, e.role, e.period, e.description));

  const education = [
    { school: "SMPK Angelus Custos 1 Surabaya", period: "2019 - 2022", status: "Completed" },
    { school: "SMAK Frateran Surabaya", period: "2022 - Present", status: "Current" },
    { school: "University", period: "Future", status: "Locked" }
  ];
  const insertEdu = db.prepare("INSERT INTO education (school, period, status) VALUES (?, ?, ?)");
  education.forEach(e => insertEdu.run(e.school, e.period, e.status));

  const skills = [
    { name: "React", level: 70, category: "Frontend" },
    { name: "Node.js", level: 60, category: "Backend" },
    { name: "SQLite", level: 50, category: "Database" },
    { name: "TailwindCSS", level: 80, category: "Styling" },
    { name: "TypeScript", level: 40, category: "Language" }
  ];
  const insertSkill = db.prepare("INSERT INTO skills (name, level, category) VALUES (?, ?, ?)");
  skills.forEach(s => insertSkill.run(s.name, s.level, s.category));

  const projects = [
    { title: "Quest Tracker", description: "A gamified task management app.", image_url: "https://picsum.photos/seed/quest/400/300", link: "#" },
    { title: "Loot Box Simulator", description: "A fun web game using React and Motion.", image_url: "https://picsum.photos/seed/loot/400/300", link: "#" }
  ];
  const insertProject = db.prepare("INSERT INTO projects (title, description, image_url, link) VALUES (?, ?, ?, ?)");
  projects.forEach(p => insertProject.run(p.title, p.description, p.image_url, p.link));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/profile", (req, res) => {
    const profile = db.prepare("SELECT * FROM profile LIMIT 1").get();
    res.json(profile);
  });

  app.get("/api/experience", (req, res) => {
    const experience = db.prepare("SELECT * FROM experience").all();
    res.json(experience);
  });

  app.get("/api/education", (req, res) => {
    const education = db.prepare("SELECT * FROM education").all();
    res.json(education);
  });

  app.get("/api/skills", (req, res) => {
    const skills = db.prepare("SELECT * FROM skills").all();
    res.json(skills);
  });

  app.get("/api/projects", (req, res) => {
    const projects = db.prepare("SELECT * FROM projects").all();
    res.json(projects);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
