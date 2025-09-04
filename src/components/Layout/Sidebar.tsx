import React from 'react';
import { TrendingUp, Bot, PieChart, Settings, List, Users, Target, Brain } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'generator', label: 'AI Signal Generator', icon: Brain },
    { id: 'signals', label: 'Live Signals', icon: TrendingUp },
    { id: 'performance', label: 'Performance', icon: PieChart },
    { id: 'pairs', label: 'Trading Pairs', icon: List },
    { id: 'bots', label: 'Bot Management', icon: Bot },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-full">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">TradingBot Pro</span>
          </div>
          <p className="text-xs text-gray-400">Professional Trading Suite</p>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.id === 'generator' && activeTab === item.id && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
        
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">95.3%</div>
            <div className="text-xs text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
