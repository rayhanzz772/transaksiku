import React from 'react';
import {Label} from '../atoms/ProfileAtoms';
import {InputField} from '../atoms/ProfileAtoms';
import {Button} from '../atoms/ProfileAtoms';

const ProfileForm = ({
  isDarkMode,
  userProfile,
  isEditingProfile,
  editProfile,
  setEditProfile,
  handleEditProfileClick,
  handleSaveProfile,
  handleCancelEditProfile,
}) => {
  return (
    <div className={`mb-10 p-6 ${isDarkMode ? "bg-gray-700 text-gray-100" : "bg-gray-50 text-gray-900"} rounded-lg shadow-inner`}>
      <h2 className={`text-2xl font-semibold mb-5 ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>
        Manajemen Profil
      </h2>
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
              <p className="text-lg text-gray-400 dark:text-white font-medium"><strong>Nama:</strong> {userProfile.name}</p>
              <p className="text-lg text-gray-400 dark:text-white font-medium"><strong>Email:</strong> {userProfile.email}</p>
              <Button
                onClick={handleEditProfileClick}
                className="mt-4 bg-blue-600 text-black hover:bg-blue-700"
              >
                Edit Profil
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <Label htmlFor="name" text="Nama" />
                <InputField
                  id="name"
                  type="text"
                  value={editProfile.name}
                  onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                  isDarkMode={isDarkMode}
                />
              </div>
              <div>
                <Label htmlFor="email" text="Email" />
                <InputField
                  id="email"
                  type="email"
                  value={editProfile.email}
                  onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                  isDarkMode={isDarkMode}
                />
              </div>
              <div className="flex space-x-3 mt-4">
                <Button type="submit" className="bg-green-600 text-black hover:bg-green-700">Simpan</Button>
                <Button type="button" onClick={handleCancelEditProfile} className="bg-blue-600 text-gray-800 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500">
                  Batal
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;