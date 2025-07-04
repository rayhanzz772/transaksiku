// === molecules/FilterForm.js ===
import React from 'react';
import { Input, Select, Label } from '../atoms/index';

export const FilterForm = ({ filters, handleFilterChange, allRecipients, transactionStatuses, isDarkMode }) => {
  const inputClass = `mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${isDarkMode ? "border-gray-600 bg-gray-700 text-gray-100" : "border-gray-300 bg-white text-gray-900"}`;
  return (
    <div className={`p-6 rounded-lg shadow-inner mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
      <div>
        <Label htmlFor="startDate">Dari Tanggal</Label>
        <Input type="date" id="startDate" name="startDate" value={filters.startDate} onChange={handleFilterChange} className={inputClass} />
      </div>
      <div>
        <Label htmlFor="endDate">Sampai Tanggal</Label>
        <Input type="date" id="endDate" name="endDate" value={filters.endDate} onChange={handleFilterChange} className={inputClass} />
      </div>
      <div>
        <Label htmlFor="minAmount">Min Nominal</Label>
        <Input type="number" id="minAmount" name="minAmount" value={filters.minAmount} onChange={handleFilterChange} className={inputClass} />
      </div>
      <div>
        <Label htmlFor="maxAmount">Max Nominal</Label>
        <Input type="number" id="maxAmount" name="maxAmount" value={filters.maxAmount} onChange={handleFilterChange} className={inputClass} />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select id="status" name="status" value={filters.status} onChange={handleFilterChange} className={inputClass}>
          {transactionStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="recipient">Rekening Tujuan</Label>
        <Select id="recipient" name="recipient" value={filters.recipient} onChange={handleFilterChange} className={inputClass}>
          {allRecipients.map(recipient => (
            <option key={recipient} value={recipient}>{recipient}</option>
          ))}
        </Select>
      </div>
    </div>
  );
};