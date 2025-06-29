import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data = [] }) => {
    // Defensive: filter out undefined/null and ensure value is a number
    const filteredData = Array.isArray(data)
        ? data.filter(d => d && typeof d.value === 'number' && d.label)
        : [];
    if (!filteredData.length) {
        return <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No data available</div>;
    }
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis allowDecimals={true} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#57a6ff" name="Value" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;
