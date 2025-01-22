import React from 'react';
import { Terminal, Calendar } from 'lucide-react';

interface NavbarProps {
  years: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ years, selectedYear, onYearChange }) => {
  return (
    <nav className="bg-black/80 backdrop-blur-sm border-b border-green-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Terminal className="w-6 h-6 text-green-400" />
            <span className="text-xl font-mono font-bold text-green-400">Running.Stats</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-md border border-green-500/20">
              <Calendar className="w-4 h-4 text-green-400" />
              <select 
                value={selectedYear}
                onChange={(e) => onYearChange(Number(e.target.value))}
                className="bg-transparent text-green-400 font-mono border-none focus:ring-0 text-sm"
              >
                {years.map(year => (
                  <option key={year} value={year} className="bg-gray-900">
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};