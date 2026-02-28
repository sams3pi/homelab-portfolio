import React, { useState } from 'react';

const App = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'bot', text: 'Hi! I am Shubham’s local AI agent. Ask me about his Cloud Migrations, GitOps architecture, or this Home Lab setup.' }
  ]);

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatHistory([...chatHistory, { role: 'user', text: userMsg }]);
    setChatInput('');
    
    try {
      // This routes through Nginx to your backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg }),
      });
      const data = await response.json();
      setChatHistory(prev => [...prev, { role: 'bot', text: data.response }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'bot', text: 'Connecting to inference node...' }]);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-gray-900 text-gray-100">
      <header className="max-w-5xl mx-auto py-16 px-6">
        <h1 className="text-5xl font-bold text-blue-400">Shubham Thakur</h1>
        <p className="text-xl mt-4 text-gray-300">DevOps & Platform Engineer</p>
        <div className="mt-6 inline-block bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-green-400 font-mono">
          <span className="animate-pulse mr-2">●</span> Live Status: Hosted on bare-metal k3s cluster via GitOps
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-800 pb-2">Architecture & Platforms</h2>
            <div className="space-y-4">
              <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                <h3 className="text-blue-300 font-bold text-lg">Cloud Infrastructure & Migration</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Architected and executed a full tech stack migration from GCP to Azure. Developed custom Terraform modules from scratch for zero-downtime infrastructure provisioning, including AKS clusters, storage, and networking for Cyber Security departments.
                </p>
              </div>
              
              <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                <h3 className="text-blue-300 font-bold text-lg">Internal Developer Platforms (IDP)</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Hosted and configured Backstage as a self-serve developer portal and component CMDB. Transitioned deployments to a declarative GitOps architecture using ArgoCD, drastically reducing deployment lead times.
                </p>
              </div>

              <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
                <h3 className="text-blue-300 font-bold text-lg">CI/CD & Reliability Automation</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Engineered extensive CI/CD workflows using GitLab CI and Octopus Deploy. Automated Dynatrace monitoring pipelines (reducing config time from 30m to 2m) and built one-click patching systems using Ansible and Rundeck.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-800 pb-2">Core Stack</h2>
            <div className="flex flex-wrap gap-2">
              {['Kubernetes', 'Terraform', 'Azure', 'GCP', 'ArgoCD', 'Ansible', 'GitLab CI', 'Python', 'GoLang', 'Docker'].map(skill => (
                <span key={skill} className="bg-gray-800 border border-gray-700 px-3 py-1 rounded text-sm text-gray-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex flex-col h-[650px] sticky top-6">
          <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-400 p-1.5 rounded-lg">🤖</span> RAG Agent
            </h2>
            <span className="text-xs text-gray-500 font-mono">Backend: FastAPI + Local LLM</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 text-sm pr-2 custom-scrollbar">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className={`inline-block px-4 py-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-gray-700 text-gray-200 rounded-bl-sm'
                }`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2 pt-4 border-t border-gray-700">
            <input 
              className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="E.g., How did you reduce configuration times?"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChat()}
            />
            <button 
              onClick={handleChat} 
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              Ask
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;