import React, { useState, useEffect, useCallback } from 'react';
import { useManajemenData } from '../hooks/useManajemenData';
import { useManajemenRekening } from '../hooks/useManajemenRekening';
import { useUserPreferences } from "../../../context/UserPreferencesContext";

// --- Generic Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// --- Confirmation Modal Component ---
const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Konfirmasi">
      <p className="text-gray-700 mb-6">{message}</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Batal
        </button>
        <button
          onClick={onConfirm}
          className="px-5 py-2 bg-red-600 text-black rounded-md hover:bg-red-700 transition duration-200"
        >
          Hapus
        </button>
      </div>
    </Modal>
  );
};

// --- Account Form Modal Component ---
const AccountFormModal = ({ isOpen, onClose, onSubmit, editingAccount, existingAccounts }) => {
  const [name, setName] = useState(editingAccount?.name || '');
  const [number, setNumber] = useState(editingAccount?.number || '');
  const [bank, setBank] = useState(editingAccount?.bank || '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingAccount) {
      setName(editingAccount.name);
      setNumber(editingAccount.number);
      setBank(editingAccount.bank);
    } else {
      setName('');
      setNumber('');
      setBank('');
    }
    setErrors({}); // Clear errors when modal opens/changes account
  }, [editingAccount, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Nama rekening wajib diisi.';
    if (!number.trim()) newErrors.number = 'Nomor rekening wajib diisi.';
    if (!bank.trim()) newErrors.bank = 'Bank wajib diisi.';

    // Basic number format validation (e.g., only digits)
    if (number.trim() && !/^\d+$/.test(number.trim())) {
      newErrors.number = 'Nomor rekening harus berupa angka.';
    }

    // Uniqueness validation (SAFE)
    const safeAccounts = Array.isArray(existingAccounts) ? existingAccounts : [];
    const isNumberUnique = safeAccounts.every(acc =>
      acc.id === editingAccount?.id || acc.number !== number.trim()
    );
    if (!isNumberUnique) {
      newErrors.number = 'Nomor rekening sudah ada.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        id: editingAccount?.id || crypto.randomUUID(), // Use existing ID or generate new
        name: name.trim(),
        number: number.trim(),
        bank: bank.trim(),
        addedDate: editingAccount?.addedDate || new Date().toISOString(),
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingAccount ? 'Edit Rekening' : 'Tambah Rekening Baru'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Rekening</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">Nomor Rekening</label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${errors.number ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
        </div>
        <div>
          <label htmlFor="bank" className="block text-sm font-medium text-gray-700">Bank</label>
          <input
            type="text"
            id="bank"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${errors.bank ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.bank && <p className="text-red-500 text-xs mt-1">{errors.bank}</p>}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-black rounded-md hover:bg-blue-700 transition duration-200"
          >
            {editingAccount ? 'Simpan Perubahan' : 'Tambah Rekening'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// --- Main ManajemenRekening Component ---
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

// --- Handlers ---
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
    if (accountToDelete) {
      deleteAccount(accountToDelete.id);
    } else if (selectedAccounts.length > 0) {
      bulkDeleteAccounts();
    }

      // Tutup modal setelah hapus
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
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data...</div>;

   const { isDarkMode } = useUserPreferences();

  return (
    <div className={`min-h-screen p-4 font-inter ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`container mx-auto p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-3xl font-bold mb-8 text-center">Manajemen Rekening Tersimpan</h1>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Cari nama atau bank..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
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
              <button
                onClick={() => {
                  setAccountToDelete(null);
                  setIsConfirmationModalOpen(true);
                }}
                className="px-5 py-2 bg-red-600 text-black rounded-md shadow-md hover:bg-red-700 transition duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd"></path>
                </svg>
                Hapus ({selectedAccounts.length})
              </button>
            )}
            <button
              onClick={handleAddClick}
              className="px-5 py-2 bg-blue-600 text-black rounded-md shadow-md hover:bg-blue-700 transition duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
              </svg>
              Tambah Rekening
            </button>
          </div>
        </div>

        {/* Accounts Table */}
        <div className={`overflow-x-auto rounded-lg shadow-md border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <table className="min-w-full divide-y">
            <thead className={`${isDarkMode ? 'bg-gray-700 divide-gray-600' : 'bg-gray-50 divide-gray-200'}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAllChange}
                    checked={currentAccounts.length > 0 && selectedAccounts.length === currentAccounts.length}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                </th>
                {['name', 'number', 'bank', 'addedDate'].map(field => (
                  <th
                    key={field}
                    onClick={() => handleSort(field)}
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    {field === 'name' && 'Nama Rekening'}
                    {field === 'number' && 'Nomor Rekening'}
                    {field === 'bank' && 'Bank'}
                    {field === 'addedDate' && 'Tanggal Ditambahkan'}
                    {sortBy === field && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                  </th>
                ))}
                <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className={`${isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
              {currentAccounts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada rekening ditemukan.
                  </td>
                </tr>
              ) : (
                currentAccounts.map(account => (
                  <tr key={account.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedAccounts.includes(account.id)}
                        onChange={() => handleCheckboxChange(account.id)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {account.name}
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {account.number}
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {account.bank}
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {new Date(account.addedDate).toLocaleDateString('id-ID', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(account)}
                        className={`mr-3 ${isDarkMode ? 'text-blue-400 hover:text-blue-200' : 'text-blue-600 hover:text-blue-900'}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(account)}
                        className={`${isDarkMode ? 'text-red-400 hover:text-red-200' : 'text-red-600 hover:text-red-900'}`}
                      >
                        Hapus
                      </button>
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
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-4 py-2 rounded-md ${currentPage === number + 1
                  ? 'bg-blue-600 text-black'
                  : isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {number + 1}
              </button>
            ))}
          </div>
        )}

        {/* Modals */}
        <AccountFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={editingAccount ? updateAccount : addAccount}
          editingAccount={editingAccount}
          existingAccounts={data}
        />

        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => {
            setIsConfirmationModalOpen(false);
            setAccountToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          message={
            accountToDelete
              ? `Apakah Anda yakin ingin menghapus rekening "${accountToDelete.name}"?`
              : `Apakah Anda yakin ingin menghapus ${selectedAccounts.length} rekening yang dipilih?`
          }
        />
      </div>
    </div>
  );
};

export default ManajemenRekening;