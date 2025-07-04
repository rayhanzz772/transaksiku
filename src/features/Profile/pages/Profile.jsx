import React from 'react';
import useProfileLogic from '../hooks/useProfileLogic';

const Profile = () => {
  const {
    isLoading,
    isError,
    userProfile,
    activeSessions,
    editProfile,
    isEditingProfile,
    isDarkMode,
    currentPassword,
    newPassword,
    confirmNewPassword,
    passwordChangeMessage,
    isTwoFactorEnabled,

    setEditProfile,
    setIsDarkMode,
    setIsTwoFactorEnabled,
    setCurrentPassword,
    setNewPassword,
    setConfirmNewPassword,

    handleEditProfileClick,
    handleSaveProfile,
    handleCancelEditProfile,
    handleChangePassword,
  } = useProfileLogic();

  if (isLoading) return <p className="p-10 text-center">Loading...</p>;
  if (isError) return <p className="p-10 text-center text-red-500">Terjadi kesalahan</p>;
  if (!userProfile) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 font-inter transition-colors duration-300">
      <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Pengaturan & Profil</h1>

                {/* Profile Management Section */}
        <div className="mb-10 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-5 text-blue-700 dark:text-blue-300">Manajemen Profil</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0">
              <img
                src={userProfile.profilePicture}
                alt="Foto Profil"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 dark:border-blue-500 shadow-md"
              />
            </div>
            <div className="flex-grow w-full">
              {!isEditingProfile ? (
                <div className="space-y-2">
                  <p className="text-lg font-medium"><strong>Nama:</strong> {userProfile.name}</p>
                  <p className="text-lg font-medium"><strong>Email:</strong> {userProfile.email}</p>
                  <button
                    onClick={handleEditProfileClick}
                    className="mt-4 px-5 py-2 bg-blue-600 text-black rounded-md shadow-md hover:bg-blue-700 transition duration-200"
                  >
                    Edit Profil
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-3">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama</label>
                    <input
                      type="text"
                      id="name"
                      value={editProfile.name}
                      onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={editProfile.email}
                      onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-green-600 text-black rounded-md shadow-md hover:bg-green-700 transition duration-200"
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEditProfile}
                      className="px-5 py-2 bg-blue-600 text-gray-800 dark:bg-gray-600 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-200"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* App Settings Section */}
        <div className="mb-10 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-5 text-blue-700 dark:text-blue-300">Pengaturan Aplikasi</h2>
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Mode Gelap/Terang</span>
            <label htmlFor="darkModeToggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="darkModeToggle"
                  className="sr-only"
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform duration-300 ease-in-out"
                  style={{ transform: isDarkMode ? 'translateX(100%)' : 'translateX(0)' }}
                ></div>
              </div>
            </label>
          </div>
        </div>

        {/* Security Settings Section */}
        <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-5 text-blue-700 dark:text-blue-300">Pengaturan Keamanan</h2>

          {/* Change Password Form */}
          <div className="mb-8 border-b border-gray-200 dark:border-gray-600 pb-6">
            <h3 className="text-xl font-semibold mb-4">Ubah Kata Sandi</h3>
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kata Sandi Saat Ini</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kata Sandi Baru</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Konfirmasi Kata Sandi Baru</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {passwordChangeMessage && (
                <p className={`text-sm ${passwordChangeMessage.includes('berhasil') ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordChangeMessage}
                </p>
              )}
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-black rounded-md shadow-md hover:bg-blue-700 transition duration-200"
              >
                Ubah Kata Sandi
              </button>
            </form>
          </div>

          {/* Two-factor Authentication Toggle */}
          <div className="mb-8 border-b border-gray-200 dark:border-gray-600 pb-6">
            <h3 className="text-xl font-semibold mb-4">Autentikasi Dua Faktor (2FA)</h3>
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Aktifkan 2FA</span>
              <label htmlFor="twoFactorToggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="twoFactorToggle"
                    className="sr-only"
                    checked={isTwoFactorEnabled}
                    onChange={() => setIsTwoFactorEnabled(!isTwoFactorEnabled)}
                  />
                  <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform duration-300 ease-in-out"
                    style={{ transform: isTwoFactorEnabled ? 'translateX(100%)' : 'translateX(0)' }}
                  ></div>
                </div>
              </label>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Tambahkan lapisan keamanan ekstra ke akun Anda. (Simulasi UI saja)
            </p>
          </div>

          {/* Active Sessions List */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Sesi Aktif</h3>
            <div className="space-y-4">
              {activeSessions.map(session => (
                <div key={session.id} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <p className="font-medium">{session.device}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{session.location} - {session.ipAddress}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Terakhir aktif: {session.lastActive}</p>
                  </div>
                  <button className="mt-3 sm:mt-0 px-4 py-2 bg-red-500 text-black rounded-md text-sm hover:bg-red-600 transition duration-200">
                    Keluar
                  </button>
                </div>
              ))}
            </div>
          </div>
          </div>

      </div>
    </div>
  );
};

export default Profile;
