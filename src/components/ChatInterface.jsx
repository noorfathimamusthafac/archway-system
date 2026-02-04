
import React, { useState, useEffect, useRef } from 'react';
import BOQTable from './BOQTable';
import ElementCard from './ElementCard';
import '../styles/ChatInterface.css';

const ChatInterface = ({ activeConversation, updateMessages, activeSection }) => {
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const messages = activeConversation?.messages || [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const setMessages = (setter) => {
        updateMessages(setter);
    };

    // USER REQUIREMENT: sendQuestion function for wiring
    const sendQuestion = async () => {
        if (!input.trim()) return;

        const question = input;

        // 1. Show user question in chat window
        const userMessage = {
            id: Date.now().toString(),
            content: question,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Critical: Update state to show user message immediately
        setMessages(prev => [...prev, userMessage]);

        // 2. Clear input after sending
        setInput('');
        setIsTyping(true);

        try {
            // 3. POST to Live Localtunnel Backend
            const response = await fetch('https://moody-chairs-accept.loca.lt/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'bypass-tunnel-reminder': 'true'
                },
                body: JSON.stringify({ question })
            });

            if (!response.ok) {
                throw new Error(`Technical Error: ${response.status}`);
            }

            const data = await response.json();

            // 4. Receive answer and append to chat window
            const botMessage = {
                id: (Date.now() + 1).toString(),
                content: data.answer,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                boqData: data.boq_data,
                elementData: data.element_data,
                citations: data.sources
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Fetch Error:', error);
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                content: `REAL SYSTEM ERROR: ${error.message}. Ensure backend/server.py is running.`,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="workstation-container">
            <header className="workstation-header">
                <div className="header-left">
                    <span className="brand-title">ARCHWAY Vision 4.0</span>
                    <span className="brand-separator">—</span>
                    <span className="brand-subtitle">Enterprise Architectural Intelligence</span>
                </div>
                <div className="header-right">
                    <span className="status-badge">Integration Active</span>
                </div>
            </header>

            <div className="command-console-wrapper">
                <div className="command-input-container">
                    <input
                        className="command-input"
                        type="text"
                        placeholder={`Ask ARCHWAY in ${activeSection} mode...`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendQuestion()}
                    />
                    {/* USER REQUIREMENT: Button onclick="sendQuestion()" */}
                    <button className="command-send-btn" onClick={sendQuestion} disabled={!input.trim()}>
                        Send Command
                    </button>
                </div>
            </div>

            <div id="chat-window" className="conversation-scroll-area">
                <div className="conversation-flow">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`workstation-message ${msg.sender}-message-wrapper`}>
                            <div className="message-header">
                                <span className={`sender-label ${msg.sender}`}>
                                    {msg.sender === 'user' ? 'YOU' : 'ARCHWAY AI'}
                                </span>
                                <span className="message-time">{msg.timestamp}</span>
                            </div>

                            <div className={`${msg.sender === 'user' ? 'user-msg' : 'ai-msg'}`}>
                                {msg.content && msg.content.split('\n').map((line, i) => (
                                    <p key={i} className="content-para">{line}</p>
                                ))}

                                {msg.boqData && (
                                    <div className="data-layer">
                                        <BOQTable data={msg.boqData} title="PRICE ESTIMATION" />
                                    </div>
                                )}

                                {msg.elementData && (
                                    <div className="data-layer">
                                        <ElementCard element={msg.elementData} />
                                    </div>
                                )}

                                {msg.citations && msg.citations.length > 0 && (
                                    <div className="citations-layer">
                                        <div className="citations-label">REFERENCED STANDARDS</div>
                                        <div className="citations-list">
                                            {msg.citations.map((c, idx) => (
                                                <span key={idx} className="citation-pill">{c}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="workstation-message bot">
                            <div className="message-header">
                                <span className="sender-label bot">ARCHWAY AI</span>
                                <span className="typing-status">Consulting RAG Engine...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
