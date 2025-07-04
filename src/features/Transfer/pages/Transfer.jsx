// Transfer.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useTransferFormLogic } from '../hooks/useTransferFormLogic';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
        {children}
      </div>
    </div>
  );
};

const Transfer = () => {
  const {
    isLoading, isError,
    favorites, templates, amount, recipientId, customRecipientName,
    customRecipientNumber, customRecipientBank, description,
    selectedTemplateId, scheduledDate, scheduledTime,
    isConfirmationModalOpen, isReceiptModalOpen, transferDetails, errors,
    setAmount, setRecipientId, setCustomRecipientName, setCustomRecipientNumber, setCustomRecipientBank,
    setDescription, setSelectedTemplateId, setScheduledDate, setScheduledTime,
    setIsConfirmationModalOpen, setIsReceiptModalOpen,
    handleTransfer, confirmTransfer, saveTransferTemplate, formatCurrency
  } = useTransferFormLogic();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter">
      <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Halaman Transfer</h1>

        {/* Transfer Template Section */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">Transfer Template</h2>
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="flex-grow w-full">
              <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">Pilih Template</label>
              <select
                id="template"
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Pilih Template --</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>{template.name}</option>
                ))}
              </select>
            </div>
            <button
              onClick={saveTransferTemplate}
              className="px-5 py-2 bg-purple-600 text-black rounded-md shadow-md hover:bg-purple-700 transition duration-200 flex-shrink-0"
            >
              Simpan Sebagai Template
            </button>
          </div>
        </div>

        {/* Main Transfer Form */}
        <form onSubmit={handleTransfer} className="space-y-6">
          {/* Nominal */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Nominal Transfer</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Masukkan nominal transfer"
              className={`mt-1 block w-full px-3 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>

          {/* Rekening Tujuan */}
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Rekening Tujuan</label>
            <select
              id="recipient"
              value={recipientId}
              onChange={(e) => {
                setRecipientId(e.target.value);
                // Clear custom recipient fields if a favorite is selected
                if (e.target.value !== 'custom') {
                  setCustomRecipientName('');
                  setCustomRecipientNumber('');
                  setCustomRecipientBank('');
                }
              }}
              className={`mt-1 block w-full px-3 py-2 border ${errors.recipient ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">-- Pilih Rekening Favorit --</option>
              {favorites.map(account => (
                <option key={account.id} value={account.id}>{account.name} ({account.bank} - {account.number})</option>
              ))}
              <option value="custom">-- Masukkan Rekening Baru --</option>
            </select>
            {errors.recipient && <p className="text-red-500 text-xs mt-1">{errors.recipient}</p>}

            {recipientId === 'custom' && (
              <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50 space-y-3">
                <h3 className="text-md font-semibold text-gray-700">Detail Rekening Baru</h3>
                <div>
                  <label htmlFor="customName" className="block text-sm font-medium text-gray-700">Nama Penerima</label>
                  <input
                    type="text"
                    id="customName"
                    value={customRecipientName}
                    onChange={(e) => setCustomRecipientName(e.target.value)}
                    placeholder="Nama penerima"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.customRecipientName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.customRecipientName && <p className="text-red-500 text-xs mt-1">{errors.customRecipientName}</p>}
                </div>
                <div>
                  <label htmlFor="customNumber" className="block text-sm font-medium text-gray-700">Nomor Rekening</label>
                  <input
                    type="text"
                    id="customNumber"
                    value={customRecipientNumber}
                    onChange={(e) => setCustomRecipientNumber(e.target.value)}
                    placeholder="Nomor rekening penerima"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.customRecipientNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.customRecipientNumber && <p className="text-red-500 text-xs mt-1">{errors.customRecipientNumber}</p>}
                </div>
                <div>
                  <label htmlFor="customBank" className="block text-sm font-medium text-gray-700">Bank</label>
                  <input
                    type="text"
                    id="customBank"
                    value={customRecipientBank}
                    onChange={(e) => setCustomRecipientBank(e.target.value)}
                    placeholder="Nama bank penerima"
                    className={`mt-1 block w-full px-3 py-2 border ${errors.customRecipientBank ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.customRecipientBank && <p className="text-red-500 text-xs mt-1">{errors.customRecipientBank}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Deskripsi */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi (Opsional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              placeholder="Misal: Pembayaran belanja online"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Scheduled Transfer Simulation */}
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h2 className="text-xl font-semibold text-yellow-800 mb-3">Simulasi Jadwal Transfer</h2>
            <p className="text-sm text-yellow-700 mb-4">Fitur ini hanya simulasi tampilan, tidak akan menjadwalkan transfer secara nyata.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700">Tanggal Transfer</label>
                <input
                  type="date"
                  id="scheduledDate"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="scheduledTime" className="block text-sm font-medium text-gray-700">Waktu Transfer</label>
                <input
                  type="time"
                  id="scheduledTime"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-black rounded-md shadow-lg hover:bg-blue-700 transition duration-200 text-lg font-semibold"
            >
              Transfer Sekarang
            </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        <Modal isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)} title="Konfirmasi Transfer">
          {transferDetails && (
            <div className="space-y-4 text-gray-700">
              <p><strong>Nominal:</strong> {formatCurrency(transferDetails.amount)}</p>
              <p><strong>Penerima:</strong> {transferDetails.recipient?.name}</p>
              <p><strong>Nomor Rekening:</strong> {transferDetails.recipient?.number}</p>
              <p><strong>Bank:</strong> {transferDetails.recipient?.bank}</p>
              {transferDetails.description && <p><strong>Deskripsi:</strong> {transferDetails.description}</p>}
              {transferDetails.scheduledDate && <p><strong>Tanggal Jadwal:</strong> {new Date(transferDetails.scheduledDate).toLocaleDateString('id-ID')}</p>}
              {transferDetails.scheduledTime && <p><strong>Waktu Jadwal:</strong> {transferDetails.scheduledTime}</p>}
              <p className="text-red-600 font-medium">Pastikan semua detail di atas sudah benar.</p>
            </div>
          )}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setIsConfirmationModalOpen(false)}
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Batal
            </button>
            <button
              onClick={confirmTransfer}
              className="px-5 py-2 bg-green-600 text-black rounded-md hover:bg-green-700 transition duration-200"
            >
              Konfirmasi & Transfer
            </button>
          </div>
        </Modal>

        {/* Receipt Modal */}
        <Modal isOpen={isReceiptModalOpen} onClose={() => setIsReceiptModalOpen(false)} title="Bukti Transfer Berhasil">
          {transferDetails && (
            <div className="space-y-4 text-gray-800 p-4 border border-green-300 bg-green-50 rounded-lg">
              <p className="text-center text-green-700 font-bold text-xl">Transfer Berhasil!</p>
              <hr className="border-green-200" />
              <p><strong>Jumlah Transfer:</strong> {formatCurrency(transferDetails.amount)}</p>
              <p><strong>Tanggal Transfer:</strong> {new Date().toLocaleDateString('id-ID')} {new Date().toLocaleTimeString('id-ID')}</p>
              <p><strong>Penerima:</strong> {transferDetails.recipient?.name}</p>
              <p><strong>Nomor Rekening:</strong> {transferDetails.recipient?.number}</p>
              <p><strong>Bank Tujuan:</strong> {transferDetails.recipient?.bank}</p>
              {transferDetails.description && <p><strong>Catatan:</strong> {transferDetails.description}</p>}
              <p className="text-sm text-gray-600 mt-4">Simpan bukti ini untuk referensi Anda.</p>
            </div>
          )}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setIsReceiptModalOpen(false)}
              className="px-5 py-2 bg-blue-600 text-black rounded-md hover:bg-blue-700 transition duration-200"
            >
              Tutup
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Transfer;