import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { NlpManager } from 'node-nlp';

const EventSimilarity = ({ currentUser }) => {
  const [events, setEvents] = useState([]);
  const [MLData, setMLData] = useState('');
  const [similarityResults, setSimilarityResults] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollection = db.collection('EventsTest');
      const snapshot = await eventCollection.get();
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.data().name,
        description: doc.data().description
      }));
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const updateML = async (currentUser) => {
    // find current profile using email
    const userCollectionRef = collection(db, "User");
    const userQuery = query(userCollectionRef, where("email", "==", currentUser.email));
    const userSnapshot = await getDocs(userQuery);;
    const userData = userSnapshot.docs[0].data();
    setMLData(userData.MLData);
    };
    updateML(currentUser);
  }, []);

  useEffect(async   () => {
    if (MLData && events.length > 0) {
      const manager = new NlpManager({ languages: ['en'] });

      events.forEach(event => manager.addDocument('en', event.description));
      await manager.train();

      const similarityResults = [];
      for (const event of events) {
        const similarity = await manager.process('en', MLData, event.description);
        similarityResults.push({ id: event.id, similarity: similarity.score });
      }

      // Sort by similarity score in descending order
      similarityResults.sort((a, b) => b.similarity - a.similarity);

      // Get the top 5 similar events
      const topSimilarEvents = similarityResults.slice(0, 5);

      setTopSimilarEvents(topSimilarEvents);
    }
  }, [MLData, events]);

  useEffect(() => {
    const calculateSimilarity = () => {
      if (MLData && events.length > 0) {
        const similarityResults = [];
        for (const event of events) {
          const similarity = cosineSimilarity(MLData, event.description);
          similarityResults.push({ id: event.id, similarity });
        }

        // Sort by similarity score in descending order
        similarityResults.sort((a, b) => b.similarity - a.similarity);

        // Get the top 5 similar events
        const topSimilarEvents = similarityResults.slice(0, 5);

        setTopSimilarEvents(topSimilarEvents);
      }
    };

    calculateSimilarity();
  }, [MLData, events]);

  // Function to calculate cosine similarity between two vectors
  const cosineSimilarity = (vec1, vec2) => {
    // Convert strings to lowercase and split into words
    const words1 = vec1.toLowerCase().split(/\s+/);
    const words2 = vec2.toLowerCase().split(/\s+/);

    // Calculate word frequency in both vectors
    const wordFreq1 = {};
    const wordFreq2 = {};
    words1.forEach(word => {
      wordFreq1[word] = (wordFreq1[word] || 0) + 1;
    });
    words2.forEach(word => {
      wordFreq2[word] = (wordFreq2[word] || 0) + 1;
    });

    // Calculate dot product
    let dotProduct = 0;
    for (const word in wordFreq1) {
      if (wordFreq2.hasOwnProperty(word)) {
        dotProduct += wordFreq1[word] * wordFreq2[word];
      }
    }

    // Calculate magnitudes
    const magnitude1 = Math.sqrt(Object.values(wordFreq1).reduce((acc, val) => acc + val ** 2, 0));
    const magnitude2 = Math.sqrt(Object.values(wordFreq2).reduce((acc, val) => acc + val ** 2, 0));

    // Calculate cosine similarity
    if (magnitude1 !== 0 && magnitude2 !== 0) {
      return dotProduct / (magnitude1 * magnitude2);
    } else {
      return 0;
    }
  };
  
  return (
    <div>
      <h2>Top 5 Events Similar to MLData</h2>
      <ul>
        {topSimilarEvents.map((event, index) => (
          <li key={index}>
            <p>Event ID: {event.id}, Similarity: {event.similarity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventSimilarity;