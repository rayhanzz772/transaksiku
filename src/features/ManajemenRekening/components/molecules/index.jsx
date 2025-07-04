// MOLECULES (FormAccount.js)
import React, { useState, useEffect } from 'react';
import { Input, Label, Button } from '../atoms/index';
import Modal from '../organisms/Modal';

const AccountFormModal = ({ isOpen, onClose, onSubmit, editingAccount, existingAccounts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [bank, setBank] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingAccount) {
      setName(editingAccount.name);
      setNumber(editingAccount.number);
      setBank(editingAccount.bank);
    } else {
      setName(''); setNumber(''); setBank('');
    }
    setErrors({});
  }, [editingAccount, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Nama rekening wajib diisi.';
    if (!number.trim()) newErrors.number = 'Nomor rekening wajib diisi.';
    if (!bank.trim()) newErrors.bank = 'Bank wajib diisi.';
    if (number.trim() && !/^[0-9]+$/.test(number.trim())) newErrors.number = 'Harus angka.';
    const isNumberUnique = existingAccounts.every(acc => acc.id === editingAccount?.id || acc.number !== number.trim());
    if (!isNumberUnique) newErrors.number = 'Nomor sudah ada.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      id: editingAccount?.id || crypto.randomUUID(),
      name: name.trim(),
      number: number.trim(),
      bank: bank.trim(),
      addedDate: editingAccount?.addedDate || new Date().toISOString(),
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingAccount ? 'Edit Rekening' : 'Tambah Rekening Baru'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nama Rekening</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
        </div>
        <div>
          <Label htmlFor="number">Nomor Rekening</Label>
          <Input id="number" value={number} onChange={(e) => setNumber(e.target.value)} error={errors.number} />
        </div>
        <div>
          <Label htmlFor="bank">Bank</Label>
          <Input id="bank" value={bank} onChange={(e) => setBank(e.target.value)} error={errors.bank} />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <Button onClick={onClose} className="bg-gray-300 text-gray-800 hover:bg-gray-400">Batal</Button>
          <Button type="submit" className="bg-blue-600 text-black hover:bg-blue-700">
            {editingAccount ? 'Simpan Perubahan' : 'Tambah Rekening'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AccountFormModal;