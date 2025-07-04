import { useState, useEffect, useMemo } from "react";
import { useTransferData } from "./useTransferData"; // Sesuaikan path

export function useTransferFormLogic() {
  const { data, isLoading, isError } = useTransferData();
  const [favorites, setFavorites] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [amount, setAmount] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [customRecipientName, setCustomRecipientName] = useState('');
  const [customRecipientNumber, setCustomRecipientNumber] = useState('');
  const [customRecipientBank, setCustomRecipientBank] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [transferDetails, setTransferDetails] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data?.dummyFavoriteAccounts) setFavorites(data.dummyFavoriteAccounts);
    if (data?.dummyTransferTemplates) setTemplates(data.dummyTransferTemplates);
  }, [data]);

  const selectedRecipient = useMemo(() => {
    if (recipientId === 'custom') {
      return { name: customRecipientName, number: customRecipientNumber, bank: customRecipientBank };
    }
    return favorites.find(acc => acc.id === recipientId);
  }, [recipientId, customRecipientName, customRecipientNumber, customRecipientBank, favorites]);

  useEffect(() => {
    if (selectedTemplateId) {
      const template = templates.find(t => t.id === selectedTemplateId);
      if (template) {
        setAmount(template.amount.toString());
        setRecipientId(template.recipientId);
        setDescription(template.description);
      }
    }
  }, [selectedTemplateId, templates]);

  const validateForm = () => {
    const newErrors = {};
    if (!amount || parseFloat(amount) <= 0) newErrors.amount = 'Nominal harus lebih dari 0.';
    if (!recipientId) {
      newErrors.recipient = 'Pilih rekening tujuan atau masukkan detail baru.';
    } else if (recipientId === 'custom') {
      if (!customRecipientName.trim()) newErrors.customRecipientName = 'Nama penerima wajib diisi.';
      if (!customRecipientNumber.trim() || !/^\d+$/.test(customRecipientNumber)) newErrors.customRecipientNumber = 'Nomor rekening wajib diisi dan harus angka.';
      if (!customRecipientBank.trim()) newErrors.customRecipientBank = 'Bank penerima wajib diisi.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setTransferDetails({
        amount: parseFloat(amount),
        recipient: selectedRecipient,
        description: description.trim(),
        scheduledDate,
        scheduledTime,
      });
      setIsConfirmationModalOpen(true);
    }
  };

  const confirmTransfer = () => {
    setIsConfirmationModalOpen(false);
    setIsReceiptModalOpen(true);
    console.log('Transfer confirmed:', transferDetails);
    setAmount(''); setRecipientId(''); setCustomRecipientName('');
    setCustomRecipientNumber(''); setCustomRecipientBank(''); setDescription('');
    setSelectedTemplateId(''); setScheduledDate(''); setScheduledTime('');
  };

  const saveTransferTemplate = () => {
    if (validateForm()) {
      const name = prompt('Masukkan nama untuk template ini:');
      if (name) {
        const newTemplate = {
          id: crypto.randomUUID(),
          name,
          recipientId,
          amount: parseFloat(amount),
          description: description.trim(),
        };
        setTemplates(prev => [...prev, newTemplate]);
        alert('Template berhasil disimpan!');
      }
    }
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(value);

  return {
    data, isLoading, isError,
    favorites, templates, amount, recipientId,
    customRecipientName, customRecipientNumber, customRecipientBank,
    description, selectedTemplateId, scheduledDate, scheduledTime,
    isConfirmationModalOpen, isReceiptModalOpen, transferDetails, errors,
    setAmount, setRecipientId, setCustomRecipientName, setCustomRecipientNumber, setCustomRecipientBank,
    setDescription, setSelectedTemplateId, setScheduledDate, setScheduledTime,
    setIsConfirmationModalOpen, setIsReceiptModalOpen,
    handleTransfer, confirmTransfer, saveTransferTemplate, formatCurrency
  };
}
