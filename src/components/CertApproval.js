// CertApprovalComponent.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const CertApprovalComponent = ({ requestId, userEmail, userName, eventId, eventName, onApprovalSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const approveCertificate = async () => {
    setIsLoading(true);
    setError('');

    try {
      const db = getFirestore();
      const requestRef = doc(db, "CertificateRequests", requestId);
      await updateDoc(requestRef, {
        approved: true
      });
      onApprovalSuccess(requestId);
      alert('Certificate approved successfully.'); // Consider a more sophisticated feedback mechanism
    } catch (err) {
      console.error("Error approving request:", err);
      setError('Error approving request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <p>User: {userEmail}</p>
      <p>User Name: {userName}</p>
      <p>Event ID: {eventId}</p>
      <p>Event Name: {eventName}</p>
      <button className='button-40' onClick={approveCertificate} disabled={isLoading}>
        {isLoading ? 'Approving...' : 'Approve Certificate'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </>
  );
};

CertApprovalComponent.propTypes = {
  requestId: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  onApprovalSuccess: PropTypes.func.isRequired,
};

export default CertApprovalComponent;
