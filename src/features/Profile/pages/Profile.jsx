import React from 'react';
import useProfileLogic from '../hooks/useProfileLogic';
import { useUserPreferences } from "../../../context/UserPreferencesContext";

import {Label} from '../components/atoms/ProfileAtoms';
import {InputField} from '../components/atoms/ProfileAtoms';
import {Button} from '../components/atoms/ProfileAtoms';
import {ToggleSwitch} from '../components/atoms/ProfileAtoms';

import ProfileForm from '../components/molecules/ProfileForm';
import SecuritySection from '../components/organisms/SecuritySection';

const Profile = () => {
  const { isDarkMode } = useUserPreferences();

  const {
    isLoading,
    isError,
    userProfile,
    activeSessions,
    editProfile,
    isEditingProfile,
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
    <div className={`w-full ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"} font-inter transition-colors duration-300 p-4`}>
      <div className={`container mx-auto p-6 ${isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} rounded-xl shadow-lg`}>
        <h1 className="text-3xl font-bold text-grey-400 dark:text-white mb-8 text-center">Pengaturan & Profil</h1>

        {/* Profile Info & Form */}
        <ProfileForm
          userProfile={userProfile}
          isDarkMode={isDarkMode}
          isEditingProfile={isEditingProfile}
          editProfile={editProfile}
          setEditProfile={setEditProfile}
          handleEditProfileClick={handleEditProfileClick}
          handleSaveProfile={handleSaveProfile}
          handleCancelEditProfile={handleCancelEditProfile}
        />

        {/* Security Settings */}
        <SecuritySection
          isDarkMode={isDarkMode}
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmNewPassword={confirmNewPassword}
          passwordChangeMessage={passwordChangeMessage}
          isTwoFactorEnabled={isTwoFactorEnabled}
          activeSessions={activeSessions}
          setCurrentPassword={setCurrentPassword}
          setNewPassword={setNewPassword}
          setConfirmNewPassword={setConfirmNewPassword}
          setIsTwoFactorEnabled={setIsTwoFactorEnabled}
          handleChangePassword={handleChangePassword}
        />
      </div>
    </div>
  );
};

export default Profile;
