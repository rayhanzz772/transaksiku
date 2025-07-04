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

  // CRUD Simulasi
  const addAccount = async (newAccount) => {
    setAccounts((prev) => [...prev, newAccount]);
    await simulateApiCall(newAccount);
  };

  const updateAccount = async (updatedAccount) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === updatedAccount.id ? updatedAccount : acc))
    );
    await simulateApiCall(updatedAccount);
  };

  const deleteAccount = async (id) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    await simulateApiCall({ id });
    setSelectedAccounts((prev) => prev.filter((accId) => accId !== id));
  };

  const bulkDeleteAccounts = async () => {
    setAccounts((prev) => prev.filter((acc) => !selectedAccounts.includes(acc.id)));
    await simulateApiCall({ ids: selectedAccounts });
    setSelectedAccounts([]);
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
