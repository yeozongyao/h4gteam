import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc} from 'firebase/firestore';
import { Form, Button } from 'react-bootstrap';
import db from '../firebase'
import './FeedbackForm.css'

function MyForm() {
  const [feedback, setFeedback] = useState('');
  const [learningExp, setLearningExp] = useState('');
  const [futureRecom, setFutureRecom] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventsRef = collection(db, "EventsTest");
    console.log(eventsRef);

    try {
      await addDoc( eventsRef, {
        name,
        description,
        eventPax,
        image,
        eventLocation,
        eventStartDateTime,
        eventEndDateTime,
        eventOrg,
        enrolledUsers,
      });
      alert('Event added successfully!');
      setName('');
      setDescription('');
      setEventPax('');
      setImage('');
      setEventLocation('');
      setEventStartDateTime('');
      setEventEndDateTime('');
      setEventOrg('');
      setEnrolledUsers([]);
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
          required
        />
      </Form.Group>

      <Form.Group controlId="eventOrg">
        <Form.Label>Event Organization:</Form.Label>
        <Form.Control
          type="text"
          value={eventOrg}
          onChange={(e) => setEventOrg(e.target.value)}
          placeholder="Enter event Organization"
          required
        />
      </Form.Group>

      <Form.Group controlId="eventDescription">
        <Form.Label>Event Description:</Form.Label>
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter event description"
          required
        />
      </Form.Group>

      <Form.Group controlId="eventLocation">
        <Form.Label>Event Location:</Form.Label>
        <Form.Control
          type="text"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          placeholder="Enter event location"
          required
        />
      </Form.Group>

      <Form.Group controlId="eventStartDateTime">
        <Form.Label>Event Start DateTime:</Form.Label>
        <Form.Control
          type="datetime-local"
          value={eventStartDateTime}
          onChange={(e) => setEventStartDateTime(e.target.value)}
          placeholder="Enter event start datetime"
          required
        />
      </Form.Group>

      <Form.Group controlId="eventEndDateTime">
        <Form.Label>Event End DateTime:</Form.Label>
        <Form.Control
          type="datetime-local"
          value={eventEndDateTime}
          onChange={(e) => setEventEndDateTime(e.target.value)}
          placeholder="Enter event end datetime"
          required
        />
      </Form.Group>

      <Form.Group controlId="eventPax">
        <Form.Label>Event Pax:</Form.Label>
        <Form.Control
          type="number"
          value={eventPax}
          onChange={(e) => setEventPax(e.target.value)}
          placeholder="Enter event pax"
          required
        />
      </Form.Group>

      <Form.Group controlId="image">
        <Form.Label>Event Image link:</Form.Label>
        <Form.Control
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter link to event image"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Event
      </Button>
    </Form>
  );
}

export default MyForm;