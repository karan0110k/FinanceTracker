import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('login'); 

  const handleLogin = (email, password) => {
    console.log('Login attempt with:', email, password);
    setCurrentView('dashboard');
  };

  const handleSignup = (name, email, password) => {
    console.log('Signup attempt with:', name, email, password);
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'signup':
        return <Signup onSignup={handleSignup} onSwitchToLogin={() => setCurrentView('login')} />;
      case 'dashboard':
        return <Dashboard />;
      case 'login':
      default:
        return <Login onLogin={handleLogin} onSwitchToSignup={() => setCurrentView('signup')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {renderContent()}
      </div>
    </div>
  );
}