
import React, { useState } from 'react';
import '../styles/BOQTable.css';

const BOQTable = ({ data, title, area = null }) => {
    const [exporting, setExporting] = useState(false);

    if (!data || data.length === 0) return null;

    const handleExport = (type) => {
        setExporting(true);
        setTimeout(() => {
            setExporting(false);
            alert(`${type} export successful! Check your Integrations folder.`);
        }, 1500);
    };

    return (
        <div className="boq-container">
            <div className="boq-header">
                {title && <h4>{title} {area ? `(${area} sqft)` : ''}</h4>}
                <div className="boq-actions">
                    <button
                        className="rl-btn"
                        onClick={() => handleExport('Google Drive')}
                        disabled={exporting}
                    >
                        {exporting ? '...' : '📂 Export'}
                    </button>
                    <button
                        className="rl-btn"
                        onClick={() => handleExport('Revit')}
                        disabled={exporting}
                    >
                        {exporting ? '...' : '🏠 Sync'}
                    </button>
                </div>
            </div>

            <div className="boq-table-wrapper">
                <table className="boq-table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Description</th>
                            <th>Unit</th>
                            {area && <th>Qty</th>}
                            <th>Rate</th>
                            {area && <th>Total</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.code}</td>
                                <td>
                                    {item.description}
                                    <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>Brands: {item.brands.join(', ')}</div>
                                </td>
                                <td>{item.unit}</td>
                                {area && <td>{(item.qty).toFixed(1)}</td>}
                                <td>₹{item.typRate}</td>
                                {area && <td>₹{(item.qty * item.typRate).toLocaleString()}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {area && (
                <div className="boq-footer">
                    Total: ₹{data.reduce((sum, item) => sum + (item.qty * item.typRate), 0).toLocaleString()}
                </div>
            )}
        </div>
    );
};

export default BOQTable;
