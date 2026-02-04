
import React from 'react';
import '../styles/ElementCard.css';

const ElementCard = ({ element }) => {
    return (
        <div className="element-card animate-fade-in">
            <div className="element-image-wrapper">
                <img src={element.image} alt={element.name} />
                <span className="element-category">{element.category}</span>
            </div>
            <div className="element-info">
                <h3>{element.name}</h3>
                <p className="element-desc">{element.description}</p>

                <div className="element-specs">
                    {Object.entries(element.specs).map(([key, value]) => (
                        <div key={key} className="spec-item">
                            <span className="spec-key">{key.toUpperCase()}:</span>
                            <span className="spec-value">{value}</span>
                        </div>
                    ))}
                </div>

                {element.mood && (
                    <div className="element-meta">
                        <strong>Mood:</strong> {element.mood}
                    </div>
                )}
                {element.application && (
                    <div className="element-meta">
                        <strong>Application:</strong> {element.application}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ElementCard;
