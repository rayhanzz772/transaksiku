// ConfirmationModal.js (Organisms)
import React, { useState, useEffect } from 'react';
import Modal from '../organisms/Modal';
import { Button } from '../atoms/index';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Konfirmasi">
      <p className="text-gray-700 mb-6">{message}</p>
      <div className="flex justify-end space-x-3">
        <Button onClick={onClose} className="bg-gray-300 text-gray-800 hover:bg-gray-400">Batal</Button>
        <Button onClick={onConfirm} className="bg-red-600 text-black hover:bg-red-700">Hapus</Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;