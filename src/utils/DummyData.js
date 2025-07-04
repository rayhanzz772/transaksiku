// ---------------------------------------------
// Dashboard Dummy Data
// ---------------------------------------------
export const dashboardDummy = {
  totalBalance: 21500000,
  todayTransactionCount: 5,
  mostType: "Incoming",
  transactions7Days: [
    { date: "2025-06-27", amount: 250000 },
    { date: "2025-06-28", amount: 0 },
    { date: "2025-06-29", amount: 150000 },
    { date: "2025-06-30", amount: 450000 },
    { date: "2025-07-01", amount: 300000 },
    { date: "2025-07-02", amount: 600000 },
    { date: "2025-07-03", amount: 400000 },
  ],
  topAccounts: [
    { name: "Dana", amount: 3200000 },
    { name: "BCA", amount: 2500000 },
    { name: "ShopeePay", amount: 1900000 },
    { name: "OVO", amount: 1600000 },
    { name: "Mandiri", amount: 1250000 },
  ],
  categorySummary: [
    { name: "Transfer", value: 12 },
    { name: "Top Up", value: 4 },
    { name: "Pembayaran", value: 7 },
  ],
};

// ---------------------------------------------
// Laporan Transaksi Dummy Data
// ---------------------------------------------
export const transaksiDummy = {
  dummyTransactions: [
    { id: 't1', date: '2025-06-25', amount: 500000, status: 'Berhasil', recipient: 'Bank ABC', category: 'Transfer' },
    { id: 't2', date: '2025-06-25', amount: 150000, status: 'Pending', recipient: 'E-Wallet XYZ', category: 'Top Up' },
    { id: 't3', date: '2025-06-26', amount: 75000, status: 'Berhasil', recipient: 'Toko Online A', category: 'Pembayaran' },
    { id: 't4', date: '2025-06-26', amount: 1200000, status: 'Gagal', recipient: 'Bank DEF', category: 'Transfer' },
    { id: 't5', date: '2025-06-27', amount: 250000, status: 'Berhasil', recipient: 'Bank ABC', category: 'Transfer' },
    { id: 't6', date: '2025-06-27', amount: 50000, status: 'Berhasil', recipient: 'Pulsa Seluler', category: 'Top Up' },
    { id: 't7', date: '2025-06-28', amount: 1000000, status: 'Berhasil', recipient: 'Bank XYZ', category: 'Transfer' },
    { id: 't8', date: '2025-06-28', amount: 300000, status: 'Pending', recipient: 'E-Wallet XYZ', category: 'Pembayaran' },
    { id: 't9', date: '2025-06-29', amount: 800000, status: 'Berhasil', recipient: 'Bank ABC', category: 'Transfer' },
    { id: 't10', date: '2025-06-29', amount: 100000, status: 'Berhasil', recipient: 'Toko Online A', category: 'Pembayaran' },
    { id: 't11', date: '2025-06-30', amount: 400000, status: 'Berhasil', recipient: 'Bank DEF', category: 'Transfer' },
    { id: 't12', date: '2025-06-30', amount: 200000, status: 'Gagal', recipient: 'Pulsa Seluler', category: 'Top Up' },
    { id: 't13', date: '2025-07-01', amount: 600000, status: 'Berhasil', recipient: 'Bank XYZ', category: 'Transfer' },
    { id: 't14', date: '2025-07-01', amount: 90000, status: 'Berhasil', recipient: 'Toko Online A', category: 'Pembayaran' },
    { id: 't15', date: '2025-07-02', amount: 700000, status: 'Berhasil', recipient: 'Bank ABC', category: 'Transfer' },
    { id: 't16', date: '2025-07-02', amount: 180000, status: 'Pending', recipient: 'E-Wallet XYZ', category: 'Top Up' },
    { id: 't17', date: '2025-07-03', amount: 350000, status: 'Berhasil', recipient: 'Bank DEF', category: 'Transfer' },
    { id: 't18', date: '2025-07-03', amount: 70000, status: 'Berhasil', recipient: 'Pulsa Seluler', category: 'Pembayaran' },
    { id: 't19', date: '2025-07-04', amount: 900000, status: 'Berhasil', recipient: 'Bank XYZ', category: 'Transfer' },
    { id: 't20', date: '2025-07-04', amount: 220000, status: 'Berhasil', recipient: 'Toko Online A', category: 'Top Up' },
  ],
};

// ---------------------------------------------
// Manajemen Rekening Dummy Data
// ---------------------------------------------
export const manajemenDummy = {
  initialAccounts: [
    { id: 'acc1', name: 'Rekening Utama', number: '1234567890', bank: 'Bank ABC', addedDate: '2023-01-15T10:00:00Z' },
    { id: 'acc2', name: 'Tabungan Keluarga', number: '0987654321', bank: 'Bank DEF', addedDate: '2023-03-20T11:30:00Z' },
    { id: 'acc3', name: 'Investasi Saham', number: '1122334455', bank: 'Bank XYZ', addedDate: '2023-05-01T09:00:00Z' },
    { id: 'acc4', name: 'Dana Darurat', number: '5544332211', bank: 'Bank ABC', addedDate: '2023-02-10T14:00:00Z' },
    { id: 'acc5', name: 'Pembayaran Online', number: '9988776655', bank: 'E-Wallet A', addedDate: '2023-06-25T16:00:00Z' },
    { id: 'acc6', name: 'Gaji Bulanan', number: '1029384756', bank: 'Bank DEF', addedDate: '2023-04-12T08:00:00Z' },
    { id: 'acc7', name: 'Rekening Bisnis', number: '6789012345', bank: 'Bank XYZ', addedDate: '2023-07-01T13:00:00Z' },
    { id: 'acc8', name: 'Pulsa & Data', number: '1112223334', bank: 'Telco Bank', addedDate: '2023-08-10T10:00:00Z' },
  ],
  banks: ['All Banks', 'Bank ABC', 'Bank DEF', 'Bank XYZ', 'E-Wallet A', 'Telco Bank'],
};

// ---------------------------------------------
// Profile Dummy Data
// ---------------------------------------------
export const profileDummy = {
  dummyUserProfile: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: 'https://placehold.co/100x100/A0CED9/000000?text=JD',
  },
  dummyActiveSessions: [
    { id: 'sess1', device: 'Desktop (Windows)', location: 'Jakarta, Indonesia', ipAddress: '192.168.1.100', lastActive: '2025-07-04 09:00 AM' },
    { id: 'sess2', device: 'Mobile (Android)', location: 'Bandung, Indonesia', ipAddress: '10.0.0.50', lastActive: '2025-07-03 05:30 PM' },
    { id: 'sess3', device: 'Tablet (iOS)', location: 'Surabaya, Indonesia', ipAddress: '172.16.0.1', lastActive: '2025-07-02 11:15 AM' },
  ],
};

// ---------------------------------------------
// Transfer Dummy Data
// ---------------------------------------------
export const transferDummy = {
  dummyFavoriteAccounts: [
    { id: 'fav1', name: 'Budi Santoso', number: '1234567890', bank: 'Bank ABC' },
    { id: 'fav2', name: 'Ani Wijaya', number: '0987654321', bank: 'Bank DEF' },
    { id: 'fav3', name: 'Toko Elektronik Jaya', number: '1122334455', bank: 'Bank XYZ' },
    { id: 'fav4', name: 'Dana Pendidikan', number: '5544332211', bank: 'Bank ABC' },
  ],
  dummyTransferTemplates: [
    { id: 'temp1', name: 'Bayar Listrik Bulanan', recipientId: 'fav1', amount: 150000, description: 'Pembayaran tagihan listrik' },
    { id: 'temp2', name: 'Transfer Gaji Karyawan', recipientId: 'fav2', amount: 5000000, description: 'Gaji bulan ini' },
  ],
};
