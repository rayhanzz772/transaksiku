// ManajemenRekening.jsx (Main Component)
import React, { useState } from 'react';
import { useManajemenData } from '../hooks/useManajemenData';
import { useManajemenRekening } from '../hooks/useManajemenRekening';
import { useUserPreferences } from '../../../context/UserPreferencesContext';
import AccountFormModal from '../components/molecules/index';
import ConfirmationModal from '../components/organisms/ConfirmationModal';
import { Input, Button } from '../components/atoms/index';

const ManajemenRekening = () => {
  const { data, isLoading, isError } = useManajemenData();
  const {
    banks,
    currentAccounts,
    totalPages,
    searchTerm,
    filterBank,
    selectedAccounts,
    sortBy,
    sortOrder,
    addAccount,
    updateAccount,
    deleteAccount,
    bulkDeleteAccounts,
    setSearchTerm,
    setFilterBank,
    setSortBy,
    setSortOrder,
    setSelectedAccounts,
    currentPage,
    setCurrentPage,
  } = useManajemenRekening(data);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const { isDarkMode } = useUserPreferences();

  const handleAddClick = () => {
    setEditingAccount(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (account) => {
    setEditingAccount(account);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (account) => {
    setAccountToDelete(account);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (accountToDelete) deleteAccount(accountToDelete.id);
    else if (selectedAccounts.length > 0) bulkDeleteAccounts();
    setIsConfirmationModalOpen(false);
    setAccountToDelete(null);
  };

  const handleCheckboxChange = (id) => {
    setSelectedAccounts(prev =>
      prev.includes(id) ? prev.filter(accId => accId !== id) : [...prev, id]
    );
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedAccounts(currentAccounts.map(acc => acc.id));
    } else {
      setSelectedAccounts([]);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const paginate = (page) => setCurrentPage(page);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data...</div>;

  return (
    <div className={`min-h-screen p-4 font-inter ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`container mx-auto p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-3xl font-bold mb-8 text-center">Manajemen Rekening Tersimpan</h1>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama atau bank..."
            />
            <select
              value={filterBank}
              onChange={(e) => setFilterBank(e.target.value)}
              className={`px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full sm:w-48 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
            >
              {banks.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 w-full md:w-auto justify-end">
            {selectedAccounts.length > 0 && (
              <Button
                onClick={() => {
                  setAccountToDelete(null);
                  setIsConfirmationModalOpen(true);
                }}
                className="bg-red-600 text-black hover:bg-red-700 flex items-center"
              >
                Hapus ({selectedAccounts.length})
              </Button>
            )}
            <Button
              onClick={handleAddClick}
              className="bg-blue-600 text-black hover:bg-blue-700 flex items-center"
            >
              Tambah Rekening
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className={`overflow-x-auto rounded-lg shadow-md border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <table className="min-w-full divide-y">
            <thead className={`${isDarkMode ? 'bg-gray-700 divide-gray-600' : 'bg-gray-50 divide-gray-200'}`}>
              <tr>
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    onChange={handleSelectAllChange}
                    checked={currentAccounts.length > 0 && selectedAccounts.length === currentAccounts.length}
                  />
                </th>
                {['name', 'number', 'bank', 'addedDate'].map(field => (
                  <th key={field} onClick={() => handleSort(field)} className="px-6 py-3 cursor-pointer">
                    {field} {sortBy === field && (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                ))}
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className={isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}>
              {currentAccounts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Tidak ada rekening ditemukan.</td>
                </tr>
              ) : (
                currentAccounts.map(account => (
                  <tr key={account.id}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedAccounts.includes(account.id)}
                        onChange={() => handleCheckboxChange(account.id)}
                      />
                    </td>
                    <td className="px-6 py-4">{account.name}</td>
                    <td className="px-6 py-4">{account.number}</td>
                    <td className="px-6 py-4">{account.bank}</td>
                    <td className="px-6 py-4">
                      {new Date(account.addedDate).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEditClick(account)} className="text-blue-600 hover:underline mr-4">Edit</button>
                      <button onClick={() => handleDeleteClick(account)} className="text-red-600 hover:underline">Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalPages).keys()].map(number => (
              <Button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={currentPage === number + 1
                  ? 'bg-blue-600 text-black'
                  : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              >
                {number + 1}
              </Button>
            ))}
          </div>
        )}

        {/* Modals */}
        <AccountFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={editingAccount ? updateAccount : addAccount}
          editingAccount={editingAccount}
          existingAccounts={currentAccounts}
        />
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => {
            setIsConfirmationModalOpen(false);
            setAccountToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          message={accountToDelete
            ? `Apakah Anda yakin ingin menghapus rekening "${accountToDelete.name}"?`
            : `Apakah Anda yakin ingin menghapus ${selectedAccounts.length} rekening yang dipilih?`}
        />
      </div>
    </div>
  );
};

export default ManajemenRekening;