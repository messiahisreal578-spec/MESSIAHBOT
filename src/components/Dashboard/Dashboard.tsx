import React, { useState } from 'react';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import ProfessionalSignalGenerator from '../Analysis/ProfessionalSignalGenerator';
import SignalsList from '../Signals/SignalsList';
import PerformanceMetrics from '../Performance/PerformanceMetrics';
import TradingPairsList from '../TradingPairs/TradingPairsList';
import { useSignals } from '../../hooks/useSignals';
import { useTradingData } from '../../hooks/useTradingData';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('generator');
  const { signals, isLoading: signalsLoading } = useSignals();
  const { pairs, performance, isLoading: dataLoading } = useTradingData();

  const renderContent = () => {
    switch (activeTab) {
      case 'generator':
        return <ProfessionalSignalGenerator />;
      case 'signals':
        return <SignalsList signals={signals} isLoading={signalsLoading} />;
      case 'performance':
        return <PerformanceMetrics metrics={performance} isLoading={dataLoading} />;
      case 'pairs':
        return <TradingPairsList pairs={pairs} isLoading={dataLoading} />;
      case 'bots':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Bot Management</h2>
            <p className="text-gray-600">Advanced bot configuration and management features coming soon...</p>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">User Management</h2>
            <p className="text-gray-600">User management features coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Configuration settings coming soon...</p>
          </div>
        );
      default:
        return <ProfessionalSignalGenerator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
