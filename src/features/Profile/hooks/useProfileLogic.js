import { useState, useEffect } from 'react';
import { useProfileData } from '../hooks/useProfileData';

export default function useProfileLogic() {
  const { data, isLoading, isError } = useProfileData();

  const [userProfile, setUserProfile] = useState(null);
  const [activeSessions, setActiveSessions] = useState([]);
  const [editProfile, setEditProfile] = useState({ name: '', email: '' });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  // Ambil data dari API dan sinkronkan
  useEffect(() => {
    if (data) {
      setUserProfile(data.dummyUserProfile);
      setActiveSessions(data.dummyActiveSessions);
    }
  }, [data]);

  // Sinkronkan editProfile saat userProfile berubah
  useEffect(() => {
    if (userProfile) {
      setEditProfile({ name: userProfile.name, email: userProfile.email });
    }
  }, [userProfile]);

  // Terapkan dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleEditProfileClick = () => setIsEditingProfile(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile(prev => ({ ...prev, ...editProfile }));
    setIsEditingProfile(false);
    alert('Profil berhasil diperbarui!');
  };

  const handleCancelEditProfile = () => {
    if (userProfile) {
      setEditProfile({ name: userProfile.name, email: userProfile.email });
    }
    setIsEditingProfile(false);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordChangeMessage('');

    if (newPassword !== confirmNewPassword) {
      setPasswordChangeMessage('Kata sandi baru dan konfirmasi tidak cocok.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordChangeMessage('Kata sandi baru minimal 6 karakter.');
      return;
    }

    console.log('Changing password...');
    setTimeout(() => {
      setPasswordChangeMessage('Kata sandi berhasil diubah!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }, 1000);
  };

  return {
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
  };
}
