import React from 'react';
import { Terminal, Calendar } from 'lucide-react';

interface NavbarProps {
  years: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ years, selectedYear, onYearChange }) => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-semibold text-blue-600">Running.Stats</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
              <Calendar className="w-4 h-4 text-blue-600" />
              <select 
                value={selectedYear}
                onChange={(e) => onYearChange(Number(e.target.value))}
                className="bg-transparent text-gray-700 border-none focus:ring-0 text-sm"
              >
                {years.map(year => (
                  <option key={year} value={year} className="bg-white">
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