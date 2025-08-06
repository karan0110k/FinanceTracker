import React from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  LogOut,
} from 'lucide-react';
import FileUpload from '../components/dashboard/FileUpload';
import ExpensePieChart from '../components/dashboard/ExpensePieChart';
import MonthlySpendingChart from '../components/dashboard/MonthlySpendingChart';
import { totalExpenses, mockMonthlyData } from '../data/mockData';

const Dashboard = ({ onLogout }) => {
  const currentMonth = mockMonthlyData[mockMonthlyData.length - 1];
  const previousMonth = mockMonthlyData[mockMonthlyData.length - 2];
  const monthlyChange = currentMonth.amount - previousMonth.amount;
  const budgetRemaining = currentMonth.budget - currentMonth.amount;

  const stats = [
    {
      name: 'Total Expenses',
      value: `$${totalExpenses.toLocaleString()}`,
      change: `${monthlyChange >= 0 ? '+' : ''}${monthlyChange}`,
      changeType: monthlyChange >= 0 ? 'increase' : 'decrease',
      icon: DollarSign,
    },
    {
      name: 'Monthly Budget',
      value: `$${currentMonth.budget.toLocaleString()}`,
      change: `${budgetRemaining >= 0 ? '$' + budgetRemaining : '-$' + Math.abs(budgetRemaining)} remaining`,
      changeType: budgetRemaining >= 0 ? 'positive' : 'negative',
      icon: Target,
    },
    {
      name: 'This Month',
      value: `$${currentMonth.amount.toLocaleString()}`,
      change: `vs last month`,
      changeType: monthlyChange >= 0 ? 'increase' : 'decrease',
      icon: monthlyChange >= 0 ? TrendingUp : TrendingDown,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Finance Tracker Dashboard</h1>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </header>

      {}
      <main className="p-6 space-y-8">
        {}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white rounded-xl p-6 shadow hover:shadow-md border transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p
                className={`mt-4 text-sm font-medium ${
                  stat.changeType === 'increase'
                    ? 'text-green-600'
                    : stat.changeType === 'decrease'
                    ? 'text-red-600'
                    : 'text-blue-600'
                }`}
              >
                {stat.change}
              </p>
            </div>
          ))}
        </section>

        {/* File Upload */}
        <section className="bg-white rounded-xl p-6 shadow border">
          <FileUpload />
        </section>

        {}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow border">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Expense Breakdown</h2>
            <ExpensePieChart />
          </div>
          <div className="bg-white rounded-xl p-6 shadow border">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Monthly Spending</h2>
            <MonthlySpendingChart />
          </div>
        </section>

        {}
        <section className="bg-white rounded-xl p-6 shadow border">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { type: 'expense', category: 'Food & Dining', amount: 45.67, date: '2 hours ago', description: 'Restaurant dinner' },
              { type: 'expense', category: 'Transportation', amount: 12.5, date: '1 day ago', description: 'Uber ride' },
              { type: 'income', category: 'Salary', amount: 2500.0, date: '3 days ago', description: 'Monthly salary' },
              { type: 'expense', category: 'Bills & Utilities', amount: 89.99, date: '1 week ago', description: 'Internet bill' },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === 'expense' ? 'bg-red-100' : 'bg-green-100'
                    }`}
                  >
                    <DollarSign
                      className={`h-5 w-5 ${
                        activity.type === 'expense' ? 'text-red-600' : 'text-green-600'
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {activity.category} • {activity.date}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-bold ${
                    activity.type === 'expense' ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {activity.type === 'expense' ? '-' : '+'}${activity.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;