import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc} from 'firebase/firestore';
import { Form, Button } from 'react-bootstrap';
import db from '../firebase'

function MyForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventPax, setEventPax] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventsRef = collection(db, "EventsTest");
    console.log(eventsRef);

    try {
      await addDoc( eventsRef, {
        name,
        description,
        eventPax,
      });
      alert('Event added successfully!');
      setName('');
      setDescription('');
      setEventPax('');
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

      <Form.Group controlId="eventPax">
        <Form.Label>Event Pax:</Form.Label>
        <Form.Control
          type="number"
          value={eventPax}
          onChange={(e) => setEventPax(e.target.value)}
          placeholder="Enter event pax"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Event
      </Button>
    </Form>
  );
}

export default MyForm;