import React from 'react';
import { useAuth } from '../AuthProvider';

const UserDetails = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>User Details</h1>
      <p><strong>First Name:</strong> {currentUser.firstName}</p>
      <p><strong>Last Name:</strong> {currentUser.lastName}</p>
      {/* Add more details as needed */}
      <button
        onClick={() => window.history.back()}
        style={{
          backgroundColor: 'grey',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
          border: 'none',
        }}
      >
        Back
      </button>
    </div>
  );
};

export default UserDetails;
