import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockMonthlyData } from '../../data/mockData';

const MonthlySpendingChart = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.dataKey === 'amount' ? 'Spent' : 'Budget'}:</span> ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending Trends</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockMonthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} barGap={10}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="rect" />
            <Bar dataKey="amount" fill="#2563EB" name="Actual Spending" radius={[4, 4, 0, 0]} />
            <Bar dataKey="budget" fill="#E5E7EB" name="Budget" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">${mockMonthlyData.reduce((sum, month) => sum + month.amount, 0).toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total Spent</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">${mockMonthlyData.reduce((sum, month) => sum + month.budget, 0).toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total Budget</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">${mockMonthlyData.reduce((sum, month) => sum + (month.budget - month.amount), 0).toLocaleString()}</p>
          <p className="text-sm text-gray-500">Savings</p>
        </div>
      </div>
    </div>
  );
};

export default MonthlySpendingChart;