'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Brain, Cpu, Database, Menu, X, Sparkles, ChevronRight, BookOpen, Award, GraduationCap, FileText } from 'lucide-react';
import emailjs from 'emailjs-com';
import Image from 'next/image';

export default function PortfolioPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  // State dan ref untuk form kontak
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', atau null

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => { setMounted(true); }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const projects = [
    {
      title: "MyDiaryAI",
      desc: "Smart journaling website with Gemini AI integration for intelligent diary writing experience",
      tags: ["Next.js", "Gemini API", "AI"],
      category: "web",
      color: "from-purple-500 to-pink-500",
      featured: true
    },
    {
      title: "Coffee Shop Landing Page",
      desc: "Modern and elegant landing page for coffee shop with responsive design",
      tags: ["HTML", "CSS", "JavaScript"],
      category: "web",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "AI Website",
      desc: "AI-powered platform with intelligent features and user-friendly interface",
      tags: ["React", "AI", "API Integration"],
      category: "web",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "School Management System",
      desc: "Comprehensive information system for school administration with various features",
      tags: ["PHP", "MySQL", "Bootstrap"],
      category: "web",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Village Information System",
      desc: "Digital platform for managing village data and information efficiently",
      tags: ["Laravel", "MySQL", "AdminLTE"],
      category: "web",
      color: "from-indigo-500 to-purple-600"
    },
    {
      title: "Product Classification & Clustering",
      desc: "Machine learning model for e-commerce product classification and clustering",
      tags: ["Python", "Scikit-learn", "Pandas"],
      category: "ml",
      color: "from-rose-500 to-red-600"
    },
    {
      title: "Breast Cancer Classification",
      desc: "Predictive model using SVM and Decision Tree for breast cancer detection",
      tags: ["Python", "SVM", "Decision Tree"],
      category: "ml",
      color: "from-pink-500 to-rose-600",
      featured: true
    },
    {
      title: "Fashion Product Sales Segmentation",
      desc: "Random Forest model with SMOTE and hyperparameter optimization for Shopee fashion products",
      tags: ["Python", "Random Forest", "SMOTE"],
      category: "ml",
      color: "from-violet-500 to-purple-600",
      badge: "Published",
      link: "https://jiki.jurnal-id.com/index.php/jiki/article/view/280"
    },
    {
      title: "Dasai Mochi Clone",
      desc: "IoT automation project using ESP32-C3 SuperMini microcontroller",
      tags: ["ESP32", "C++", "IoT"],
      category: "iot",
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "ESP32 GPS Navigation",
      desc: "Real-time GPS navigation system using ESP32 with maps integration",
      tags: ["ESP32", "GPS", "Maps API"],
      category: "iot",
      color: "from-teal-500 to-cyan-600",
      featured: true
    },
    {
      title: "Dasai Small Passenger",
      desc: "Automated small passenger vehicle system powered by ESP32",
      tags: ["ESP32", "Arduino", "Sensors"],
      category: "iot",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "AI-Powered ESP32 Robot",
      desc: "Intelligent robot with ESP32 featuring AI-based object detection capabilities",
      tags: ["ESP32", "AI", "Computer Vision"],
      category: "iot",
      color: "from-blue-600 to-indigo-600"
    },
    {
      title: "WhatsApp Finance Bot",
      desc: "Personal finance management bot for WhatsApp built with Node.js",
      tags: ["Node.js", "WhatsApp API", "Bot"],
      category: "other",
      color: "from-green-600 to-emerald-600"
    }
  ];

  const skills = [
    { name: "Web Development", icon: Code2, level: 88, desc: "Next.js, React, Laravel, PHP" },
    { name: "Machine Learning", icon: Brain, level: 85, desc: "Python, Scikit-learn, TensorFlow" },
    { name: "IoT & Embedded Systems", icon: Cpu, level: 82, desc: "ESP32, Arduino, Sensors" },
    { name: "Database & APIs", icon: Database, level: 80, desc: "MySQL, API Integration" }
  ];

  const education = {
    university: "Universitas Amikom Yogyakarta",
    major: "Informatics Engineering",
    status: "Undergraduate Student",
    focus: "Software Development, Machine Learning & IoT"
  };

  const experience = {
    company: "PT Telkom Indonesia",
    location: "Lubuklinggau",
    role: "IT Intern",
    description: "Gained hands-on experience in one of Indonesia's largest telecommunications companies"
  };

  const publication = {
    title: "Enhancing Fashion Product Sales Segmentation Using Random Forest with SMOTE and Hyperparameter Optimization",
    journal: "JIKI (Jurnal Ilmu Komputer dan Informatika)",
    year: "2025",
    link: "https://jiki.jurnal-id.com/index.php/jiki/article/view/280"
  };

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'web', name: 'Web Dev', count: projects.filter(p => p.category === 'web').length },
    { id: 'ml', name: 'Machine Learning', count: projects.filter(p => p.category === 'ml').length },
    { id: 'iot', name: 'IoT', count: projects.filter(p => p.category === 'iot').length },
    { id: 'other', name: 'Others', count: projects.filter(p => p.category === 'other').length }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Menggunakan kredensial yang Anda berikan
    emailjs.sendForm('service_jlerpu3', 'template_ocn0ufa', form.current, 'NIIowD2CNO4bYRH1Y')
      .then((result) => {
          console.log('Email sent successfully:', result.text);
          setSubmitStatus('success');
          setIsSubmitting(false);
          form.current.reset();
          // Sembunyikan pesan setelah 5 detik
          setTimeout(() => {
            setSubmitStatus(null);
          }, 5000);
      }, (error) => {
          console.error('Failed to send email:', error.text);
          setSubmitStatus('error');
          setIsSubmitting(false);
          // Sembunyikan pesan setelah 5 detik
          setTimeout(() => {
            setSubmitStatus(null);
          }, 5000);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      {mounted && (
        <div className="fixed inset-0 z-0">
          <div 
            className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
            style={{
              left: `${mousePosition.x / 50}px`,
              top: `${mousePosition.y / 50}px`,
              transition: 'all 0.3s ease-out'
            }}
          ></div>
          <div 
            className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
            style={{
              right: `${mousePosition.x / 30}px`,
              bottom: `${mousePosition.y / 30}px`,
              transition: 'all 0.5s ease-out'
            }}
          ></div>
        </div>
      )}

      <div className="relative z-10">
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 shadow-lg shadow-cyan-500/5' : ''}`}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
              Guntur TA
            </div>
            
            <div className="hidden md:flex gap-6">
              {['Home', 'About', 'Education', 'Projects', 'Publication', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative hover:text-cyan-400 transition-colors group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            <button 
              className="md:hidden hover:scale-110 transition-transform"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 animate-in slide-in-from-top">
              <div className="flex flex-col gap-4 px-6 py-4">
                {['Home', 'About', 'Education', 'Projects', 'Publication', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-left hover:text-cyan-400 transition-colors py-2 hover:translate-x-2 transition-transform"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl text-center">
            {/* Profile Image Placeholder */}
            <div className="mb-8 inline-block group">
              <div className="relative">
                {/* Ganti bagian ini dengan image Anda */}
                <Image
                  src="/gemini.png"
                  alt="Guntur Tri Atmaja"
                  width={224}
                  height={224}
                  className="mx-auto rounded-full border-4 border-slate-800 shadow-2xl shadow-cyan-500/50 group-hover:scale-110 transition-transform duration-500 object-cover"
                />
                
                
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 animate-bounce"></div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent animate-fade-in">
              Guntur Tri Atmaja
            </h1>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="text-cyan-400 animate-bounce" size={24} />
              <p className="text-lg md:text-xl text-cyan-400 font-semibold">
                Informatics Student | Tech Enthusiast
              </p>
            </div>
            
            <p className="text-base md:text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              I&apos;m a passionate informatics student who loves exploring various technologies, from Web Development and Machine Learning to IoT. I believe technology can make a real difference in everyday life, and I&apos;m constantly learning to turn ideas into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
              >
                Explore Projects
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-cyan-500/50 rounded-full font-semibold hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </button>
            </div>

            <div className="flex gap-6 justify-center">
              {[
                { Icon: Github, link: "github.com/Gunturaa", label: "GitHub" },
                { Icon: Linkedin, link: "#", label: "LinkedIn" },
                { Icon: Mail, link: "mailto:gunturhanabi222@gmail.com", label: "Email" }
              ].map(({ Icon, link, label }, i) => (
                <a
                  key={i}
                  href={link}
                  aria-label={label}
                  className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110 hover:rotate-12"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

            {/* Floating Particles */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-slate-900/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              About Me
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-transform">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Passionate Learner</h3>
                      <p className="text-slate-300 leading-relaxed">
                        I&apos;m a passionate informatics student who loves exploring various technologies, from Web Development and Machine Learning to IoT. I believe technology can make a real difference in everyday life, and I&apos;m constantly learning to turn ideas into reality.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Code2 className="text-cyan-400" size={24} />
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Next.js', 'React', 'Laravel', 'Python', 'Node.js', 'ESP32', 'MySQL', 'TensorFlow', 'Scikit-learn', 'Arduino'].map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-slate-700/50 rounded-lg text-cyan-300 border border-slate-600 text-sm hover:scale-110 hover:bg-cyan-500/20 transition-all cursor-default"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {skills.map((skill, i) => (
                  <div 
                    key={i} 
                    className="group bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 hover:border-cyan-500/50 transition-all hover:scale-105"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                        <skill.icon className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <span className="text-slate-200 font-semibold">{skill.name}</span>
                        <p className="text-xs text-slate-400">{skill.desc}</p>
                      </div>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education & Experience Section */}
        <section id="education" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Education & Experience
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Education */}
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all hover:scale-105 group">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <GraduationCap size={24} />
                </div>
                
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{education.major}</h3>
                  <p className="text-cyan-400 font-semibold mb-1">{education.university}</p>
                  <p className="text-slate-400 mb-4">{education.status}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{education.focus}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-cyan-300 border border-slate-600">
                    Undergraduate
                  </span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-cyan-300 border border-slate-600">
                    Yogyakarta
                  </span>
                </div>
              </div>

              {/* Experience */}
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all hover:scale-105 group">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Award size={24} />
                </div>
                
                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{experience.role}</h3>
                  <p className="text-purple-400 font-semibold mb-1">{experience.company}</p>
                  <p className="text-slate-400 mb-4">{experience.location}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{experience.description}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-purple-300 border border-slate-600">
                    Internship
                  </span>
                  <span className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-purple-300 border border-slate-600">
                    Telecommunications
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 bg-slate-900/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            
            <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
              Collection of {projects.length}+ projects spanning Web Development, Machine Learning, and IoT
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-110 ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-cyan-500/50'
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {cat.name} <span className="text-sm opacity-75">({cat.count})</span>
                </button>
              ))}
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, i) => (
                <div
                  key={i}
                  className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:-rotate-1"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {project.badge && (
                    <div className="absolute -top-3 -right-3 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold animate-bounce">
                      {project.badge}
                    </div>
                  )}

                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <Sparkles className="text-yellow-400 animate-pulse" size={20} />
                    </div>
                  )}
                  
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  <div className={`w-12 h-12 bg-gradient-to-br ${project.color} rounded-xl mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                    <ExternalLink className="text-white" size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 text-xs bg-slate-700/50 rounded-full text-cyan-300 border border-slate-600 hover:scale-110 transition-transform"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
                    >
                      View Publication <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Publication Section */}
        <section id="publication" className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Research Publication
            </h2>

            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 group">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50 group-hover:rotate-12 transition-transform">
                <BookOpen size={32} />
              </div>

              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-bold">
                  Published Research
                </span>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                  {publication.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-purple-400">
                    <FileText size={18} />
                    <span className="font-semibold">{publication.journal}</span>
                  </div>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-400">{publication.year}</span>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  This research focuses on enhancing sales segmentation for fashion products using advanced machine learning techniques. The study implements Random Forest algorithm combined with SMOTE (Synthetic Minority Over-sampling Technique) and hyperparameter optimization to improve classification accuracy for Shopee fashion product sales data.
                </p>

                <a
                  href={publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  Read Full Paper
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 bg-slate-900/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Lets Collaborate
            </h2>
            <p className="text-slate-300 text-lg mb-12">
              Interested in collaborating or discussing projects? Feel free to reach out!
            </p>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12 hover:border-cyan-500/50 transition-all duration-500">
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <label htmlFor="name" className="sr-only">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder:text-slate-500"
                  />
                  <label htmlFor="email" className="sr-only">Your Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    required
                    className="px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder:text-slate-500"
                  />
                </div>
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  required
                  className="w-full px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all text-white placeholder:text-slate-500 resize-none"
                ></textarea>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : 'Send Message'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-400 mt-4">Message sent successfully! I&apos;ll get back to you soon.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 mt-4">
                    Oops! Something went wrong. Please try again or contact me directly via{' '}
                    <a href="mailto:gunturhanabi222@gmail.com" className="underline hover:text-cyan-400">
                      email
                    </a>.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-slate-800">
          <div className="max-w-6xl mx-auto text-center text-slate-400">
            <p className="mb-2">© 2025 Guntur Tri Atmaja. Built with Next.js & Tailwind CSS.</p>
            <p className="text-sm">Informatics Student at Universitas Amikom Yogyakarta</p>
            <p className="text-xs mt-2 text-slate-500">Passionate about Technology, Innovation & Problem Solving</p>
          </div>
        </footer>
      </div>
    </div>
  );
}