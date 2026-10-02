import React, { useState } from 'react';
import { X, Code2, Database, GitBranch, Cpu, Check, Copy, BookOpen, Layers, Terminal, Sparkles } from 'lucide-react';
import { BACKEND_ARCHITECTURE } from '../data/mockData';

interface ResumeTechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ActiveSubTab = 'spring' | 'hibernate' | 'mysql' | 'mongodb' | 'jenkins' | 'maven' | 'resume';

export const ResumeTechStackModal: React.FC<ResumeTechStackModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ActiveSubTab>('spring');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAllBullets, setCopiedAllBullets] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopiedAllBullets(true);
      setTimeout(() => setCopiedAllBullets(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 text-slate-100 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] border border-slate-800">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 rounded-xl flex items-center justify-center font-extrabold shadow-lg shadow-emerald-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  Swiggy Replica Architecture Inspector
                </h2>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Resume Showcase
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Full-stack engineering details showcasing Java, Spring Boot, Hibernate, MySQL, MongoDB, Jenkins & Maven.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            id="close-resume-modal-btn"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center space-x-1 p-2 bg-slate-950/60 border-b border-slate-800 overflow-x-auto scrollbar-none shrink-0 px-4">
          <button
            onClick={() => setActiveSubTab('spring')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeSubTab === 'spring'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
            id="tab-spring-boot"
          >
            <Code2 className="w-4 h-4" />
            <span>1. Spring Boot Controllers</span>
          </button>

          <button
            onClick={() => setActiveSubTab('hibernate')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeSubTab === 'hibernate'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
            id="tab-hibernate"
          >
            <Layers className="w-4 h-4" />
            <span>2. Hibernate / JPA Entities</span>
          </button>

          <button
            onClick={() => setActiveSubTab('mysql')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeSubTab === 'mysql'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
            id="tab-mysql"
          >
            <Database className="w-4 h-4" />
            <span>3. MySQL Relational DDL</span>
          </button>

          <button
            onClick={() => setActiveSubTab('mongodb')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeSubTab === 'mongodb'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
            id="tab-mongodb"
          >
            <Cpu className="w-4 h-4" />
            <span>4. MongoDB Telemetry</span>
          </button>

          <button
            onClick={() => setActiveSubTab('jenkins')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeSubTab === 'jenkins'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
            id="tab-jenkins"
          >
            <GitBranch className="w-4 h-4" />
            <span>5. Jenkins CI/CD</span>
          </button>

          <button
            onClick={() => setActiveSubTab('maven')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeSubTab === 'maven'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
            id="tab-maven"
          >
            <Terminal className="w-4 h-4" />
            <span>6. Maven pom.xml</span>
          </button>

          <button
            onClick={() => setActiveSubTab('resume')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
              activeSubTab === 'resume'
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-orange-500/20'
                : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
            }`}
            id="tab-resume-bullets"
          >
            <Sparkles className="w-4 h-4" />
            <span>Resume Bullet Points</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 bg-slate-950">
          
          {/* Tech Matrix Chips */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Tech Skills Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {BACKEND_ARCHITECTURE.techSkillsUsed.map((skill) => (
                <span
                  key={skill.name}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold px-3 py-1 rounded-lg flex items-center space-x-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({skill.category})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Spring Tab */}
          {activeSubTab === 'spring' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Spring Boot REST Controllers & Service Layer</h3>
                  <p className="text-xs text-slate-400">RESTful API endpoint routing for live order placement and GPS tracking</p>
                </div>
                <button
                  onClick={() => handleCopyText(BACKEND_ARCHITECTURE.codeSnippets.springController)}
                  className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Java Code</span>
                </button>
              </div>

              <pre className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                {BACKEND_ARCHITECTURE.codeSnippets.springController}
              </pre>
            </div>
          )}

          {/* Hibernate Tab */}
          {activeSubTab === 'hibernate' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Hibernate / JPA Entity Mapping</h3>
                  <p className="text-xs text-slate-400">Object-Relational Mapping (ORM) with @Entity, @OneToMany, and Lazy Loading</p>
                </div>
                <button
                  onClick={() => handleCopyText(BACKEND_ARCHITECTURE.codeSnippets.javaEntity)}
                  className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Entity Code</span>
                </button>
              </div>

              <pre className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-amber-300 overflow-x-auto leading-relaxed">
                {BACKEND_ARCHITECTURE.codeSnippets.javaEntity}
              </pre>
            </div>
          )}

          {/* MySQL Tab */}
          {activeSubTab === 'mysql' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">MySQL Relational DDL & ACID Schema</h3>
                  <p className="text-xs text-slate-400">Indexed transactional tables for users, restaurants, menu items, and orders</p>
                </div>
                <button
                  onClick={() => handleCopyText(BACKEND_ARCHITECTURE.codeSnippets.mysqlDDL)}
                  className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SQL DDL</span>
                </button>
              </div>

              <pre className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                {BACKEND_ARCHITECTURE.codeSnippets.mysqlDDL}
              </pre>
            </div>
          )}

          {/* MongoDB Tab */}
          {activeSubTab === 'mongodb' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">MongoDB NoSQL High-Velocity Driver Telemetry</h3>
                  <p className="text-xs text-slate-400">Document store collection schema for real-time GPS coordinates and audit trace logs</p>
                </div>
                <button
                  onClick={() => handleCopyText(BACKEND_ARCHITECTURE.codeSnippets.mongoDBSchema)}
                  className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy MongoDB Schema</span>
                </button>
              </div>

              <pre className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                {BACKEND_ARCHITECTURE.codeSnippets.mongoDBSchema}
              </pre>
            </div>
          )}

          {/* Jenkins Tab */}
          {activeSubTab === 'jenkins' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Jenkinsfile Pipeline (CI/CD)</h3>
                  <p className="text-xs text-slate-400">Automated multi-stage deployment build, unit testing, SonarQube static analysis, Docker packaging</p>
                </div>
                <button
                  onClick={() => handleCopyText(BACKEND_ARCHITECTURE.codeSnippets.jenkinsfile)}
                  className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Jenkinsfile</span>
                </button>
              </div>

              <pre className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-purple-300 overflow-x-auto leading-relaxed">
                {BACKEND_ARCHITECTURE.codeSnippets.jenkinsfile}
              </pre>
            </div>
          )}

          {/* Maven Tab */}
          {activeSubTab === 'maven' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Maven Dependencies (pom.xml)</h3>
                  <p className="text-xs text-slate-400">Spring Boot starters, Spring Data JPA, MySQL Connector, MongoDB starter</p>
                </div>
                <button
                  onClick={() => handleCopyText(BACKEND_ARCHITECTURE.codeSnippets.pomXml)}
                  className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy pom.xml</span>
                </button>
              </div>

              <pre className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-rose-300 overflow-x-auto leading-relaxed">
                {BACKEND_ARCHITECTURE.codeSnippets.pomXml}
              </pre>
            </div>
          )}

          {/* Resume Bullet Points Tab */}
          {activeSubTab === 'resume' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-extrabold text-amber-200">
                      Ready-to-Use Resume Bullet Points
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Copy these professionally formatted achievements directly into your Software Engineer Resume under "Projects"!
                  </p>
                </div>

                <button
                  onClick={() => handleCopyText(BACKEND_ARCHITECTURE.resumeBulletPoints.join('\n\n'))}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center space-x-2 shrink-0"
                  id="copy-all-resume-bullets-btn"
                >
                  {copiedAllBullets ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950" />
                      <span>Copied All Bullets!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy All Resume Bullets</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-3">
                {BACKEND_ARCHITECTURE.resumeBulletPoints.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-start justify-between gap-3 group hover:border-amber-500/50 transition-colors"
                  >
                    <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <span className="text-amber-400 font-extrabold mt-0.5">•</span>
                      <span>{bullet}</span>
                    </div>

                    <button
                      onClick={() => handleCopyText(bullet, idx)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors shrink-0"
                      id={`copy-bullet-${idx}`}
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
