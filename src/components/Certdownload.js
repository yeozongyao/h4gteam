// CertificateDownloader.js
import React from 'react';

import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import { useAuth } from '../firebase'; // Adjust this import path to where you have defined useAuth
import './Certdownload.css'; 


const CertificateDownloader = ({activityName}) => {
  const currentUser = useAuth();
  const [fullName, setFullName] = useState('');
  

  

  useEffect(() => {
    const fetchFullName = async () => {
        if (currentUser && currentUser.email) {
            const db = getFirestore();
            const userCollectionRef = collection(db, "User");
            const userQuery = query(userCollectionRef, where("email", "==", currentUser.email));
        
            try {
                const userSnapshot = await getDocs(userQuery);
                if (!userSnapshot.empty) {
                    const userData = userSnapshot.docs[0].data();
                    setFullName(`${userData.firstName} ${userData.lastName}`);
                    
                }
            } catch (error) {
                console.error("Error fetching user's full name", error);
                }
            }
    };

    fetchFullName();
  }, [currentUser]); // Rerun when currentUser changes

  const downloadPDF = () => {
    
    if (!fullName) {
        alert('Certificate data is not yet available. Please try again.');
        console.log(fullName + "fuck youlalalal");
        return;
      }
     
  

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set the title of the certificate
    doc.setFontSize(20);
    doc.text('Certificate of Participation', 105, 40, { align: 'center' });

    // Set the certification statement
    doc.setFontSize(12);
    doc.text('This is to certify that', 105, 60, { align: 'center' });

    // Set the participant's name
    doc.setFontSize(16);
    doc.text(fullName, 105, 70, { align: 'center' });

    // Set the description of the activity
    doc.setFontSize(12);
    doc.text('has successfully completed volunteer work in', 105, 80, { align: 'center' });

    // Set the name of the volunteer activity
    doc.setFontSize(16);
    doc.text(activityName, 105, 90, { align: 'center' });

    // Thank you statement
    doc.setFontSize(12);
    doc.text('We thank you for your dedication and effort.', 105, 100, { align: 'center' });

    // Add date and signature placeholders
    doc.text('Date: _______________', 25, 130);
    doc.text('Authorized Signature: _______________', 25, 140);

    // Add a border
    doc.setLineWidth(1);
    doc.rect(10, 10, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 20);

    // Save the PDF
    doc.save('certificate.pdf');
  };

  return (
    <button onClick={downloadPDF}>Download Certificate</button>
  );
};

export default CertificateDownloader;

