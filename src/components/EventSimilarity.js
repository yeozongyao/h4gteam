import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import natural from 'natural';

const EventSimilarity = ({ currentUser }) => {
  const [events, setEvents] = useState([]);
  const [similarityResults, setSimilarityResults] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollection = db.collection('EventsTest');
      const snapshot = await eventCollection.get();
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        description: doc.data().description
      }));
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const tokenizer = new natural.WordTokenizer();
      const processedEvents = events.map(event => ({
        id: event.id,
        tokens: tokenizer.tokenize(event.description.toLowerCase())
      }));

      const tfidf = new natural.TfIdf();
      processedEvents.forEach(event => tfidf.addDocument(event.tokens));

      const results = [];
      for (let i = 0; i < events.length; i++) {
        for (let j = i + 1; j < events.length; j++) {
          const similarity = cosineSimilarity(tfidf, processedEvents[i].tokens, processedEvents[j].tokens);
          results.push({
            event1: events[i],
            event2: events[j],
            similarity: similarity
          });
        }
      }
      setSimilarityResults(results);
    }
  }, [events]);

  const cosineSimilarity = (tfidf, tokens1, tokens2) => {
    const vec1 = tfidf.getDocumentFrequencyVector(tokens1);
    const vec2 = tfidf.getDocumentFrequencyVector(tokens2);
    return natural.TfIdf.tfIdfSimilarity(vec1, vec2);
  };

  return (
    <div>
      <h2>Event Similarity Results</h2>
      <ul>
        {similarityResults.map((result, index) => (
          <li key={index}>
            <p>Similarity between Event {result.event1.id} and Event {result.event2.id}: {result.similarity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventSimilarity;