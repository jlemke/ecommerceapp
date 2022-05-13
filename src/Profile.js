import React from 'react';
import './App.css';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export const Profile = () => {
  return (
    <div style={containerStyle}>
      <Authenticator>
        {
          ({ signOut, user }) => (
            <main>
            <h1>user.username</h1>
            <button 
              onClick={signOut}
            >
              Sign out
            </button>
            </main>
          )
        }
      </Authenticator>
    </div>
  );
};

const containerStyle = {
  width: 400,
  margin: '20px auto'
}