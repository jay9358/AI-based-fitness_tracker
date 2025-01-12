import React from 'react';

const ProfileForm = ({ profile, setProfile }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            className="input-field"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Age</label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({...profile, age: e.target.value})}
              className="input-field"
              min="0"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              value={profile.weight}
              onChange={(e) => setProfile({...profile, weight: e.target.value})}
              className="input-field"
              min="0"
            />
          </div>
        </div>
        <button type="submit" className="btn-primary w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;