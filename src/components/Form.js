import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import db from '../firebase'


function MyForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventsRef = collection(db, "EventsTest");
    console.log(eventsRef);

    try {
      await eventsRef.add({
        name,
        description,
      });
      alert('Event added successfully!');
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="eventName">
        <Form.Label>Event Name:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter event name"
        />
      </Form.Group>

      <Form.Group controlId="eventDescription">
        <Form.Label>Event Description:</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter event description"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Event
      </Button>
    </Form>
  );
}

export default MyForm;