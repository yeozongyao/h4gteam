// RouteGuard.js

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebase'; // Make sure to import auth from your firebase configuration

const RouteGuard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        fetchUserDocument(user.email);
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  const fetchUserDocument = async (email) => {
    const userQuery = await db.collection('users').where('email', '==', email).limit(1).get();
    if (!userQuery.empty) {
      const userDoc = userQuery.docs[0];
      setUserData(userDoc.data());
    } else {
      console.error('User document not found.');
    }
  };

  if (user === null) {
    return <div>Loading...</div>;
  }

  if (!user) {
    history.replace('/login');
    return null;
  }

  if (userData && userData.isAdmin) {
    return children;
  } else {
    history.replace('/unauthorized');
    return null;
  }
};

export default RouteGuard;