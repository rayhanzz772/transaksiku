// components/organisms/SecuritySection.jsx
import React from 'react';
import { InputField, Label, Button, ToggleSwitch } from '../atoms/ProfileAtoms';

const SecuritySection = ({
  currentPassword,
  newPassword,
  confirmNewPassword,
  passwordChangeMessage,
  isTwoFactorEnabled,
  setCurrentPassword,
  setNewPassword,
  setConfirmNewPassword,
  setIsTwoFactorEnabled,
  handleChangePassword,
  activeSessions,
  isDarkMode
}) => (
  <div className={`mb-10 p-6 ${isDarkMode ? "bg-gray-700 text-gray-100" : "bg-gray-50 text-gray-900"} rounded-lg shadow-inner`}>
    <h2 className={`text-2xl font-semibold mb-5 ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>Pengaturan Keamanan</h2>

    {/* Change Password */}
    <div className="mb-8 border-b border-gray-200 dark:border-gray-600 pb-6">
      <h3 className="text-xl text-grey-400 dark:text-white font-semibold mb-4">Ubah Kata Sandi</h3>
      <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="currentPassword">Kata Sandi Saat Ini</Label>
          <InputField
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            isDarkMode={isDarkMode}
          />
        </div>
        <div>
          <Label htmlFor="newPassword">Kata Sandi Baru</Label>
          <InputField
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            isDarkMode={isDarkMode}
          />
        </div>
        <div>
          <Label htmlFor="confirmNewPassword">Konfirmasi Kata Sandi Baru</Label>
          <InputField
            id="confirmNewPassword"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            isDarkMode={isDarkMode}
          />
        </div>
        {passwordChangeMessage && (
          <p className={`text-sm ${passwordChangeMessage.includes('berhasil') ? 'text-green-600' : 'text-red-600'}`}>
            {passwordChangeMessage}
          </p>
        )}
        <Button type="submit" className="bg-blue-600 text-black hover:bg-blue-700">Ubah Kata Sandi</Button>
      </form>
    </div>

    {/* 2FA */}
    <div className="mb-8 border-b border-gray-200 dark:border-gray-600 pb-6">
      <h3 className="text-xl text-grey-400 dark:text-white font-semibold mb-4">Autentikasi Dua Faktor (2FA)</h3>
      <div className="flex items-center justify-between">
        <span className="text-lg text-grey-400 dark:text-white font-medium">Aktifkan 2FA</span>
        <ToggleSwitch
          id="twoFactorToggle"
          checked={isTwoFactorEnabled}
          onChange={() => setIsTwoFactorEnabled(!isTwoFactorEnabled)}
        />
      </div>
      <p className="text-sm text-gray-400 dark:text-white mt-2">
        Tambahkan lapisan keamanan ekstra ke akun Anda. (Simulasi UI saja)
      </p>
    </div>

    {/* Active Sessions */}
    <div>
      <h3 className="text-xl text-grey-400 dark:text-white font-semibold mb-4">Sesi Aktif</h3>
      <div className="space-y-4">
        {activeSessions.map(session => (
          <div key={session.id} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <p className="font-medium text-gray-600 dark:text-white">{session.device}</p>
              <p className="text-sm text-gray-600 dark:text-white">{session.location} - {session.ipAddress}</p>
              <p className="text-xs text-gray-500 dark:text-white">Terakhir aktif: {session.lastActive}</p>
            </div>
            <Button className="mt-3 sm:mt-0 bg-red-500 text-black text-sm hover:bg-red-600">Keluar</Button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SecuritySection;