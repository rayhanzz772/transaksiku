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

  balanceOverTime: [
    { date: "2025-06-27", balance: 20000000 },
    { date: "2025-06-28", balance: 19800000 },
    { date: "2025-06-29", balance: 19950000 },
    { date: "2025-06-30", balance: 20400000 },
    { date: "2025-07-01", balance: 20700000 },
    { date: "2025-07-02", balance: 21300000 },
    { date: "2025-07-03", balance: 21500000 },
  ],

  monthlyComparison: [
    { month: "Jan", year2024: 1200000, year2025: 1350000 },
    { month: "Feb", year2024: 1500000, year2025: 1400000 },
    { month: "Mar", year2024: 1800000, year2025: 1900000 },
    { month: "Apr", year2024: 1700000, year2025: 1600000 },
    { month: "May", year2024: 2000000, year2025: 2200000 },
    { month: "Jun", year2024: 2100000, year2025: 2300000 },
    { month: "Jul", year2024: 1000000, year2025: 1150000 },
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
    { id: 't21', date: '2025-07-03', amount: 953638, status: 'Pending', recipient: 'OVO', category: 'Top Up' },
    { id: 't22', date: '2025-06-29', amount: 959048, status: 'Berhasil', recipient: 'Alfamart', category: 'Transfer' },
    { id: 't23', date: '2025-06-19', amount: 688263, status: 'Gagal', recipient: 'Toko Online B', category: 'Top Up' },
    { id: 't24', date: '2025-06-03', amount: 739861, status: 'Gagal', recipient: 'Gopay', category: 'Transfer' },
    { id: 't25', date: '2025-06-08', amount: 712788, status: 'Gagal', recipient: 'Restoran X', category: 'Top Up' },
    { id: 't26', date: '2025-06-07', amount: 146406, status: 'Pending', recipient: 'Lazada', category: 'Top Up' },
    { id: 't27', date: '2025-06-20', amount: 213902, status: 'Berhasil', recipient: 'Shopee', category: 'Pembayaran' },
    { id: 't28', date: '2025-06-14', amount: 537278, status: 'Gagal', recipient: 'Lazada', category: 'Pembayaran' },
    { id: 't29', date: '2025-06-14', amount: 735184, status: 'Gagal', recipient: 'Restoran X', category: 'Top Up' },
    { id: 't30', date: '2025-06-30', amount: 969831, status: 'Gagal', recipient: 'Restoran X', category: 'Transfer' },
    { id: 't31', date: '2025-06-16', amount: 48784, status: 'Pending', recipient: 'Alfamart', category: 'Pembayaran' },
    { id: 't32', date: '2025-06-10', amount: 736773, status: 'Pending', recipient: 'Indomaret', category: 'Pembayaran' },
    { id: 't33', date: '2025-07-03', amount: 365185, status: 'Pending', recipient: 'Gopay', category: 'Pembayaran' },
    { id: 't34', date: '2025-06-13', amount: 980678, status: 'Pending', recipient: 'Indomaret', category: 'Transfer' },
    { id: 't35', date: '2025-06-28', amount: 897882, status: 'Berhasil', recipient: 'Indomaret', category: 'Transfer' },
    { id: 't36', date: '2025-06-20', amount: 786031, status: 'Berhasil', recipient: 'Toko Online B', category: 'Transfer' },
    { id: 't37', date: '2025-06-12', amount: 776328, status: 'Gagal', recipient: 'Restoran X', category: 'Transfer' },
    { id: 't38', date: '2025-06-14', amount: 762207, status: 'Gagal', recipient: 'Lazada', category: 'Transfer' },
    { id: 't39', date: '2025-07-02', amount: 866825, status: 'Pending', recipient: 'Alfamart', category: 'Transfer' },
    { id: 't40', date: '2025-06-15', amount: 957520, status: 'Gagal', recipient: 'Indomaret', category: 'Top Up' },
    { id: 't41', date: '2025-06-14', amount: 123420, status: 'Pending', recipient: 'Restoran X', category: 'Top Up' },
    { id: 't42', date: '2025-06-18', amount: 758328, status: 'Gagal', recipient: 'Restoran X', category: 'Top Up' },
    { id: 't43', date: '2025-06-22', amount: 495729, status: 'Pending', recipient: 'Indomaret', category: 'Transfer' },
    { id: 't44', date: '2025-06-22', amount: 262790, status: 'Gagal', recipient: 'OVO', category: 'Pembayaran' },
    { id: 't45', date: '2025-06-30', amount: 683471, status: 'Berhasil', recipient: 'Toko Online A', category: 'Top Up' },
    { id: 't46', date: '2025-06-17', amount: 68400, status: 'Berhasil', recipient: 'Restoran X', category: 'Top Up' },
    { id: 't47', date: '2025-06-18', amount: 993448, status: 'Gagal', recipient: 'OVO', category: 'Pembayaran' },
    { id: 't48', date: '2025-06-20', amount: 480888, status: 'Gagal', recipient: 'Lazada', category: 'Transfer' },
    { id: 't49', date: '2025-06-25', amount: 511465, status: 'Berhasil', recipient: 'OVO', category: 'Pembayaran' },
    { id: 't50', date: '2025-07-02', amount: 479503, status: 'Berhasil', recipient: 'Indomaret', category: 'Top Up' }
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
    { id: 'acc9', name: 'Tabungan Anak', number: '2233445566', bank: 'Bank ABC', addedDate: '2023-09-05T09:30:00Z' },
  { id: 'acc10', name: 'Kebutuhan Rumah', number: '3344556677', bank: 'Bank DEF', addedDate: '2023-10-15T11:15:00Z' },
  { id: 'acc11', name: 'Simpanan Umroh', number: '4455667788', bank: 'Bank XYZ', addedDate: '2023-11-01T14:45:00Z' },
  { id: 'acc12', name: 'Dana Liburan', number: '5566778899', bank: 'Bank ABC', addedDate: '2023-11-20T10:20:00Z' },
  { id: 'acc13', name: 'Rekening Freelance', number: '6677889900', bank: 'Bank DEF', addedDate: '2023-12-05T12:00:00Z' },
  { id: 'acc14', name: 'Marketplace A', number: '7788990011', bank: 'E-Wallet B', addedDate: '2024-01-10T15:30:00Z' },
  { id: 'acc15', name: 'Marketplace B', number: '8899001122', bank: 'E-Wallet C', addedDate: '2024-02-14T09:00:00Z' },
  { id: 'acc16', name: 'Tabungan Pendidikan', number: '9900112233', bank: 'Bank XYZ', addedDate: '2024-03-01T13:10:00Z' },
  { id: 'acc17', name: 'Rekening Orang Tua', number: '1011121314', bank: 'Bank ABC', addedDate: '2024-04-20T17:00:00Z' },
  { id: 'acc18', name: 'Pembayaran Tagihan', number: '1213141516', bank: 'Bank DEF', addedDate: '2024-05-10T08:45:00Z' },
  { id: 'acc19', name: 'E-wallet Belanja', number: '1314151617', bank: 'E-Wallet A', addedDate: '2024-06-25T11:00:00Z' },
  { id: 'acc20', name: 'Dana Sosial', number: '1415161718', bank: 'Bank XYZ', addedDate: '2024-07-02T14:00:00Z' }
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
