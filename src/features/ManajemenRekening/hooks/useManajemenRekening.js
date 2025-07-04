import { useState, useEffect } from 'react';

// Simulate API call
const simulateApiCall = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), 500));

export function useManajemenRekening(data) {
  const [accounts, setAccounts] = useState([]);
  const [banks, setBanks] = useState([]);

  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBank, setFilterBank] = useState('All Banks');
  const [sortBy, setSortBy] = useState('addedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const accountsPerPage = 5;

  useEffect(() => {
    if (data) {
      setAccounts(data.initialAccounts);
      setBanks(data.banks);
    }
  }, [data]);

  // Debounce Search Term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filter & Sort
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch = debouncedSearchTerm
      ? account.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        account.bank.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      : true;
    const matchesFilter = filterBank === 'All Banks' ? true : account.bank === filterBank;
    return matchesSearch && matchesFilter;
  });

  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    let valA = sortBy === 'addedDate' ? new Date(a.addedDate) : a[sortBy].toLowerCase();
    let valB = sortBy === 'addedDate' ? new Date(b.addedDate) : b[sortBy].toLowerCase();
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = sortedAccounts.slice(indexOfFirstAccount, indexOfLastAccount);
  const totalPages = Math.ceil(sortedAccounts.length / accountsPerPage);

// Simulasi API call
const simulateApiCall = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const failRandomly = Math.random() < 0.2; // 20% error simulasi
      if (failRandomly) {
        reject(new Error('API gagal!'));
      } else {
        resolve(data);
      }
    }, 1000);
  });
};

// ✅ Optimistic Add
const addAccount = async (newAccount) => {
  const prevAccounts = accounts; // backup
  setAccounts((prev) => [...prev, newAccount]);

  try {
    await simulateApiCall(newAccount);
    console.log('Berhasil simpan ke server');
  } catch (error) {
    console.error('Gagal simpan:', error);
    // Rollback:
    setAccounts(prevAccounts);
    alert('Gagal menambah rekening. Perubahan dibatalkan.');
  }
};

// ✅ Optimistic Update
const updateAccount = async (updatedAccount) => {
  const prevAccounts = accounts; // backup
  setAccounts((prev) =>
    prev.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc))
  );

  try {
    await simulateApiCall(updatedAccount);
    console.log('Update berhasil');
  } catch (error) {
    console.error('Update gagal:', error);
    // Rollback:
    setAccounts(prevAccounts);
    alert('Gagal memperbarui rekening. Perubahan dibatalkan.');
  }
};

// ✅ Optimistic Delete
const deleteAccount = async (id) => {
  const prevAccounts = accounts; // backup
  setAccounts((prev) => prev.filter((acc) => acc.id !== id));
  setSelectedAccounts((prev) => prev.filter((accId) => accId !== id));

  try {
    await simulateApiCall({ id });
    console.log('Hapus berhasil');
  } catch (error) {
    console.error('Hapus gagal:', error);
    // Rollback:
    setAccounts(prevAccounts);
    alert('Gagal menghapus rekening. Perubahan dibatalkan.');
  }
};

// ✅ Optimistic Bulk Delete
const bulkDeleteAccounts = async () => {
  const prevAccounts = accounts; // backup
  const prevSelected = selectedAccounts; // backup
  setAccounts((prev) =>
    prev.filter((acc) => !selectedAccounts.includes(acc.id))
  );
  setSelectedAccounts([]);

  try {
    await simulateApiCall({ ids: selectedAccounts });
    console.log('Hapus massal berhasil');
  } catch (error) {
    console.error('Hapus massal gagal:', error);
    // Rollback:
    setAccounts(prevAccounts);
    setSelectedAccounts(prevSelected);
    alert('Gagal menghapus massal. Perubahan dibatalkan.');
  }
};


  return {
    accounts,
    banks,
    selectedAccounts,
    searchTerm,
    filterBank,
    sortBy,
    sortOrder,
    currentPage,
    currentAccounts,
    totalPages,
    setSearchTerm,
    setFilterBank,
    setSortBy,
    setSortOrder,
    setCurrentPage,
    setSelectedAccounts,
    addAccount,
    updateAccount,
    deleteAccount,
    bulkDeleteAccounts,
  };
}
