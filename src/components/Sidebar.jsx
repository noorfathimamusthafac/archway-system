
import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({
    activeConversationId,
    setActiveConversationId,
    conversations,
    createNewChat,
    activeSection,
    setActiveSection
}) => {
    const sections = [
        { id: 'design', label: 'Design Assistant', icon: '📐' },
        { id: 'boq', label: 'BOQ & Costing', icon: '💰' },
        { id: 'elements', label: 'Elements Library', icon: '🏗️' },
        { id: 'sop', label: 'SOPs & Ops', icon: '📋' },
    ];

    const [integrations, setIntegrations] = React.useState([
        { id: 'drive', label: 'Google Drive', icon: '📂', connected: true },
        { id: 'revit', label: 'Autodesk Revit', icon: '🏠', connected: false },
    ]);

    const toggleIntegration = (id) => {
        setIntegrations(prev => prev.map(item =>
            item.id === id ? { ...item, connected: !item.connected } : item
        ));
    };

    return (
        <aside className="workstation-sidebar">
            <div className="sidebar-brand">
                <span className="brand-icon">🏛️</span>
                <span className="brand-name">ARCHWAY</span>
            </div>

            <button className="sidebar-new-btn" onClick={createNewChat}>
                + New Project
            </button>

            <nav className="sidebar-scroller">
                <div className="sidebar-group">
                    <label className="sidebar-label">WORKSPACES</label>
                    <div className="sidebar-list">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
                                onClick={() => setActiveSection(section.id)}
                            >
                                <span className="item-icon">{section.icon}</span>
                                <span className="item-text">{section.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sidebar-group">
                    <label className="sidebar-label">RECENT LOGS</label>
                    <div className="sidebar-list">
                        {conversations.map((conv) => (
                            <div
                                key={conv.id}
                                className={`sidebar-item ${activeConversationId === conv.id ? 'active' : ''}`}
                                onClick={() => setActiveConversationId(conv.id)}
                            >
                                <span className="item-icon">📄</span>
                                <span className="item-text truncate">{conv.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="sidebar-group">
                    <label className="sidebar-label">SYSTEMS</label>
                    <div className="sidebar-list">
                        {integrations.map((item) => (
                            <div
                                key={item.id}
                                className="sidebar-item"
                                onClick={() => toggleIntegration(item.id)}
                            >
                                <span className="item-icon">{item.icon}</span>
                                <span className="item-text">{item.label}</span>
                                <span className={`indicator ${item.connected ? 'active' : ''}`}></span>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="sidebar-profile">
                <div className="avatar">NF</div>
                <div className="info">
                    <div className="name">Noor Fathima</div>
                    <div className="plan">PRO STATION</div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
