import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import './App.css';

function App() {
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeSection, setActiveSection] = useState('design');
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('archway_conversations');
    return saved ? JSON.parse(saved) : [{
      id: 'initial',
      title: 'Current Project Workspace',
      section: 'design',
      messages: [],
      timestamp: new Date().getTime()
    }];
  });

  useEffect(() => {
    localStorage.setItem('archway_conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Sync section when switching conversations
  useEffect(() => {
    const active = conversations.find(c => c.id === activeConversationId);
    if (active) {
      setActiveSection(active.section);
    }
  }, [activeConversationId]);

  useEffect(() => {
    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [activeConversationId, conversations]);

  const activeConversation = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const updateMessages = (setter) => {
    setConversations(prev => prev.map(c => {
      if (c.id === activeConversationId) {
        const nextMessages = typeof setter === 'function' ? setter(c.messages) : setter;
        return { ...c, messages: nextMessages };
      }
      return c;
    }));
  };

  const createNewChat = () => {
    const newId = Date.now().toString();
    const newChat = {
      id: newId,
      title: `New Chat - ${new Date().toLocaleDateString()}`,
      section: activeSection,
      messages: [],
      timestamp: new Date().getTime()
    };
    setConversations([newChat, ...conversations]);
    setActiveConversationId(newId);
  };

  return (
    <div className="app-layout">
      <Sidebar
        activeConversationId={activeConversationId}
        setActiveConversationId={setActiveConversationId}
        conversations={conversations}
        createNewChat={createNewChat}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="main-content">
        <div className="glass-container" style={{
          position: 'absolute',
          top: '0', left: '0', right: '0', bottom: '0',
          background: 'radial-gradient(circle at 10% 10%, rgba(0, 210, 255, 0.03) 0%, transparent 40%)',
          pointerEvents: 'none'
        }}></div>
        <ChatInterface
          activeConversation={activeConversation}
          updateMessages={updateMessages}
          activeSection={activeSection}
        />
      </main>
    </div>
  );
}

export default App;
