import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc} from 'firebase/firestore';
import { Form, Button } from 'react-bootstrap';
import db from '../firebase'
import './FeedbackForm.css'
import {query, where, getDocs, arrayUnion } from 'firebase/firestore';

function FeedbackForm({ eventName }) {
    const [feedback, setFeedback] = useState('');
    const [learningExp, setLearningExp] = useState('');
    const [futureRecom, setFutureRecom] = useState('');
  
    const handleUpdateEvent = async (namer) => {
      try {
        const eventCollectionRef = collection(db, "EventsTest");
        const userQuery = query(eventCollectionRef, where("name", "==", namer));
        const userSnapshot = await getDocs(userQuery);
        
        userSnapshot.forEach(async (doc) => {
          const userDocRef = doc.ref;
          const userData = doc.data();
          const { feedback: currentFeedback, learningExp: currentLearningExp, futureRecom: currentFutureRecom } = userData;
  
          const updatedFeedback = feedback !== '' ? arrayUnion(feedback) : currentFeedback;
          const updatedLearningExp = learningExp !== '' ? arrayUnion(learningExp) : currentLearningExp;
          const updatedFutureRecom = futureRecom !== '' ? arrayUnion(futureRecom) : currentFutureRecom;
  
          await updateDoc(userDocRef, {
            feedback: updatedFeedback,
            learningExp: updatedLearningExp,
            futureRecom: updatedFutureRecom
          });
        });
      } catch (error) {
        console.error("Error updating user profile", error);
        throw error;
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      handleUpdateEvent(eventName);
      alert('Updated Succesfully');
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <br/>
        <br/>
        <br/>
        <Form.Group controlId="feedback">
          <Form.Label>Feedback:</Form.Label>
          <Form.Control
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter Feedback here"
            required
          />
        </Form.Group>
  
        <Form.Group controlId="learningExp">
          <Form.Label>Learning Points:</Form.Label>
          <Form.Control
            type="text"
            value={learningExp}
            onChange={(e) => setLearningExp(e.target.value)}
            placeholder="Enter Learning Experience"
            required
          />
        </Form.Group>
  
        <Form.Group controlId="futureRecom">
          <Form.Label>Recommendations:</Form.Label>
          <Form.Control
            type="text"
            value={futureRecom}
            onChange={(e) => setFutureRecom(e.target.value)}
            placeholder="Enter Future Recommendations"
            required
          />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
  
  export default FeedbackForm;