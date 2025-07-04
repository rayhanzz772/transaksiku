import { useState, useEffect, useMemo } from 'react';
import { useTransaksiData } from '../hooks/useTransaksiData';

// Format Rupiah
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const useLaporanTransaksi = () => {
  const { data, isLoading, isError } = useTransaksiData();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (data?.dummyTransactions) {
      setTransactions(data.dummyTransactions);
    }
  }, [data]);

  const [filters, setFilters] = useState({
    startDate: '2025-06-25',
    endDate: '2025-07-04',
    minAmount: '',
    maxAmount: '',
    status: 'All',
    recipient: 'All',
  });

  const allRecipients = useMemo(() => {
    const recipients = new Set(transactions.map(t => t.recipient));
    return ['All', ...Array.from(recipients).sort()];
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const start = filters.startDate ? new Date(filters.startDate) : null;
      const end = filters.endDate ? new Date(filters.endDate) : null;

      if (start && transactionDate < start) return false;
      if (end && transactionDate > end) return false;

      if (filters.minAmount && transaction.amount < parseFloat(filters.minAmount)) return false;
      if (filters.maxAmount && transaction.amount > parseFloat(filters.maxAmount)) return false;

      if (filters.status !== 'All' && transaction.status !== filters.status) return false;

      if (filters.recipient !== 'All' && transaction.recipient !== filters.recipient) return false;

      return true;
    });
  }, [transactions, filters]);

  const totalTransactionsCount = filteredTransactions.length;
  const totalNominal = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const averagePerTransaction = totalTransactionsCount > 0 ? totalNominal / totalTransactionsCount : 0;

  const trendChartData = useMemo(() => {
    const dailyAmounts = {};
    filteredTransactions.forEach(t => {
      const date = t.date;
      dailyAmounts[date] = (dailyAmounts[date] || 0) + t.amount;
    });

    const data = [];
    let currentDate = filters.startDate ? new Date(filters.startDate) : new Date(Math.min(...transactions.map(t => new Date(t.date))));
    let endDate = filters.endDate ? new Date(filters.endDate) : new Date(Math.max(...transactions.map(t => new Date(t.date))));

    if (isNaN(currentDate.getTime()) || isNaN(endDate.getTime())) {
      currentDate = new Date();
      endDate = new Date();
    }

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      data.push({
        date: dateString,
        amount: dailyAmounts[dateString] || 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return data.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [filteredTransactions, filters.startDate, filters.endDate, transactions]);

  const statusDistributionData = useMemo(() => {
    const statusCounts = {};
    filteredTransactions.forEach(t => {
      statusCounts[t.status] = (statusCounts[t.status] || 0) + 1;
    });
    return Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status],
    }));
  }, [filteredTransactions]);

  const topRecipientsData = useMemo(() => {
    const recipientAmounts = {};
    filteredTransactions.forEach(t => {
      recipientAmounts[t.recipient] = (recipientAmounts[t.recipient] || 0) + t.amount;
    });
    return Object.keys(recipientAmounts)
      .map(recipient => ({
        name: recipient,
        amount: recipientAmounts[recipient],
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [filteredTransactions]);

  return {
    isLoading,
    isError,
    filters,
    setFilters,
    allRecipients,
    filteredTransactions,
    totalTransactionsCount,
    totalNominal,
    averagePerTransaction,
    trendChartData,
    statusDistributionData,
    topRecipientsData,
    formatCurrency,
  };
};
