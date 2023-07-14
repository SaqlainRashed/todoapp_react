import React, { useContext } from 'react';
import { Context } from '../main';
import Loader from '../components/Loader';
import '../styles/profile.scss';

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);

  console.log(user);

  return (
    loading ? (
      <Loader />
    ) : (
      <div className="profile-container">
        <h1 className="profile-heading">Name: {user?.name}</h1>
        <p className="profile-details">Email: {user?.email}</p>
      </div>
    )
  );
}

export default Profile;
