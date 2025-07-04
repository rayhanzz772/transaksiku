

export const transferDummy = {

// --- Dummy Data for Rekening Favorit ---
dummyFavoriteAccounts: [
  { id: 'fav1', name: 'Budi Santoso', number: '1234567890', bank: 'Bank ABC' },
  { id: 'fav2', name: 'Ani Wijaya', number: '0987654321', bank: 'Bank DEF' },
  { id: 'fav3', name: 'Toko Elektronik Jaya', number: '1122334455', bank: 'Bank XYZ' },
  { id: 'fav4', name: 'Dana Pendidikan', number: '5544332211', bank: 'Bank ABC' },
],

// --- Dummy Data for Transfer Templates ---
dummyTransferTemplates: [
  { id: 'temp1', name: 'Bayar Listrik Bulanan', recipientId: 'fav1', amount: 150000, description: 'Pembayaran tagihan listrik' },
  { id: 'temp2', name: 'Transfer Gaji Karyawan', recipientId: 'fav2', amount: 5000000, description: 'Gaji bulan ini' },
],

}