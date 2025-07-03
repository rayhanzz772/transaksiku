import React, { useState, useEffect, useCallback } from 'react';

// --- Dummy Data ---
const initialAccounts = [
  { id: 'acc1', name: 'Rekening Utama', number: '1234567890', bank: 'Bank ABC', addedDate: '2023-01-15T10:00:00Z' },
  { id: 'acc2', name: 'Tabungan Keluarga', number: '0987654321', bank: 'Bank DEF', addedDate: '2023-03-20T11:30:00Z' },
  { id: 'acc3', name: 'Investasi Saham', number: '1122334455', bank: 'Bank XYZ', addedDate: '2023-05-01T09:00:00Z' },
  { id: 'acc4', name: 'Dana Darurat', number: '5544332211', bank: 'Bank ABC', addedDate: '2023-02-10T14:00:00Z' },
  { id: 'acc5', name: 'Pembayaran Online', number: '9988776655', bank: 'E-Wallet A', addedDate: '2023-06-25T16:00:00Z' },
  { id: 'acc6', name: 'Gaji Bulanan', number: '1029384756', bank: 'Bank DEF', addedDate: '2023-04-12T08:00:00Z' },
  { id: 'acc7', name: 'Rekening Bisnis', number: '6789012345', bank: 'Bank XYZ', addedDate: '2023-07-01T13:00:00Z' },
  { id: 'acc8', name: 'Pulsa & Data', number: '1112223334', bank: 'Telco Bank', addedDate: '2023-08-10T10:00:00Z' },
];

const banks = ['All Banks', 'Bank ABC', 'Bank DEF', 'Bank XYZ', 'E-Wallet A', 'Telco Bank'];

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

    // Uniqueness validation
    const isNumberUnique = existingAccounts.every(acc =>
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
  const [accounts, setAccounts] = useState(initialAccounts);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBank, setFilterBank] = useState('All Banks');
  const [sortBy, setSortBy] = useState('addedDate');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 5;

  // --- Debounced Search Term ---
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // --- Filtered and Sorted Accounts ---
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = debouncedSearchTerm
      ? account.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        account.bank.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      : true;
    const matchesFilter = filterBank === 'All Banks' ? true : account.bank === filterBank;
    return matchesSearch && matchesFilter;
  });

  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    let valA, valB;
    if (sortBy === 'addedDate') {
      valA = new Date(a.addedDate);
      valB = new Date(b.addedDate);
    } else {
      valA = a[sortBy].toLowerCase();
      valB = b[sortBy].toLowerCase();
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // --- Pagination Logic ---
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = sortedAccounts.slice(indexOfFirstAccount, indexOfLastAccount);
  const totalPages = Math.ceil(sortedAccounts.length / accountsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- CRUD Operations (Simulating React Query Mutations) ---

  // Simulate API call delay
  const simulateApiCall = (data) => {
    return new Promise(resolve => setTimeout(() => resolve(data), 500));
  };

  // Add Account
  const addAccount = async (newAccount) => {
    // Optimistic update
    setAccounts(prev => [...prev, { ...newAccount, id: crypto.randomUUID() }]);
    try {
      // Simulate API call
      await simulateApiCall(newAccount);
      // In a real app, you'd get the actual ID from the backend and update
      // setAccounts(prev => prev.map(acc => acc.tempId === newAccount.tempId ? { ...acc, id: backendId } : acc));
      console.log('Account added successfully (simulated)');
    } catch (error) {
      console.error('Failed to add account (simulated):', error);
      // Revert optimistic update if API fails
      setAccounts(prev => prev.filter(acc => acc.id !== newAccount.id));
    }
  };

  // Update Account
  const updateAccount = async (updatedAccount) => {
    // Optimistic update
    setAccounts(prev => prev.map(acc => acc.id === updatedAccount.id ? updatedAccount : acc));
    try {
      // Simulate API call
      await simulateApiCall(updatedAccount);
      console.log('Account updated successfully (simulated)');
    } catch (error) {
      console.error('Failed to update account (simulated):', error);
      // Revert optimistic update if API fails (would need to store original account state)
    }
  };

  // Delete Account
  const deleteAccount = async (id) => {
    // Optimistic update
    const originalAccounts = accounts;
    setAccounts(prev => prev.filter(acc => acc.id !== id));
    try {
      // Simulate API call
      await simulateApiCall({ id });
      console.log('Account deleted successfully (simulated)');
    } catch (error) {
      console.error('Failed to delete account (simulated):', error);
      // Revert optimistic update if API fails
      setAccounts(originalAccounts);
    } finally {
      setIsConfirmationModalOpen(false);
      setAccountToDelete(null);
      setSelectedAccounts(prev => prev.filter(accId => accId !== id)); // Deselect if deleted
    }
  };

  // Bulk Delete Accounts
  const bulkDeleteAccounts = async () => {
    // Optimistic update
    const originalAccounts = accounts;
    setAccounts(prev => prev.filter(acc => !selectedAccounts.includes(acc.id)));
    try {
      // Simulate API call
      await simulateApiCall({ ids: selectedAccounts });
      console.log('Bulk accounts deleted successfully (simulated)');
    } catch (error) {
      console.error('Failed to bulk delete accounts (simulated):', error);
      // Revert optimistic update if API fails
      setAccounts(originalAccounts);
    } finally {
      setIsConfirmationModalOpen(false);
      setSelectedAccounts([]); // Clear selections after bulk delete
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter">
      <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Manajemen Rekening Tersimpan</h1>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Cari nama atau bank..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
            />
            <select
              value={filterBank}
              onChange={(e) => setFilterBank(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full sm:w-48"
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
                  setAccountToDelete(null); // Indicate bulk delete
                  setIsConfirmationModalOpen(true);
                }}
                className="px-5 py-2 bg-red-600 text-black rounded-md shadow-md hover:bg-red-700 transition duration-200 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd"></path></svg>
                Hapus ({selectedAccounts.length})
              </button>
            )}
            <button
              onClick={handleAddClick}
              className="px-5 py-2 bg-blue-600 text-black rounded-md shadow-md hover:bg-blue-700 transition duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              Tambah Rekening
            </button>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                  <input
                    type="checkbox"
                    onChange={handleSelectAllChange}
                    checked={currentAccounts.length > 0 && selectedAccounts.length === currentAccounts.length}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  Nama Rekening
                  {sortBy === 'name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('number')}
                >
                  Nomor Rekening
                  {sortBy === 'number' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('bank')}
                >
                  Bank
                  {sortBy === 'bank' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('addedDate')}
                >
                  Tanggal Ditambahkan
                  {sortBy === 'addedDate' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentAccounts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                    Tidak ada rekening ditemukan.
                  </td>
                </tr>
              ) : (
                currentAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedAccounts.includes(account.id)}
                        onChange={() => handleCheckboxChange(account.id)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {account.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {account.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {account.bank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(account.addedDate).toLocaleDateString('id-ID', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(account)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(account)}
                        className="text-red-600 hover:text-red-900"
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
                className={`px-4 py-2 rounded-md ${currentPage === number + 1 ? 'bg-blue-600 text-black' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
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
          existingAccounts={accounts}
        />

        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => {
            setIsConfirmationModalOpen(false);
            setAccountToDelete(null); // Clear account to delete
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
