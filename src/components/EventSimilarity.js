import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../firebase';
import { useAuth } from "../firebase";
import EventCard from './event-card';

// Function to tokenize text
function tokenize(text) {
  try {
    return text.toLowerCase().match(/\b\w+\b/g); // Basic word tokenization
  } catch (e) {
    return "";
  }
}

// Function to calculate TF (Term Frequency) for a document
function calculateTF(tokens) {
  try {
    const tf = {};
    tokens.forEach(token => {
      tf[token] = tf[token] ? tf[token] + 1 : 1;
    });
    const totalTokens = Object.keys(tf).length;
    Object.keys(tf).forEach(token => {
      tf[token] /= totalTokens;
    });
    return tf;
  } catch {
    return 0;
  }
}

// Function to calculate IDF (Inverse Document Frequency) for a set of documents
function calculateIDF(documents) {
  const idf = {};
  const totalDocuments = documents.length;

  // Initialize document frequency for each token
  const documentFrequency = {};

  // Count the number of documents each token appears in
  documents.forEach(document => {
    const uniqueTokens = new Set(document.tokens);
    uniqueTokens.forEach(token => {
      documentFrequency[token] = (documentFrequency[token] || 0) + 1;
    });
  });

  // Calculate IDF for each token
  Object.keys(documentFrequency).forEach(token => {
    const documentFrequencyValue = documentFrequency[token];
    idf[token] = Math.log(totalDocuments / (documentFrequencyValue || 1)) + 1;
  });

  return idf;
}

// Function to calculate TF-IDF vector for a document
function calculateTFIDF(tf, idf) {
  const tfidf = {};
  Object.keys(tf).forEach(token => {
    const tfidfValue = tf[token] * idf[token];
    // Check if the TF-IDF value is not NaN before including it
    if (!isNaN(tfidfValue)) {
      tfidf[token] = tfidfValue;
    }
  });
  return tfidf;
}

function calculateCosineSimilarity(vector1, vector2) {
  console.log("Vector 1:", vector1);
  console.log("Vector 2:", vector2);

  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;
  let sharedTokens = false;

  // Calculate dot product and magnitudes
  for (const token in vector1) {
    if (vector2.hasOwnProperty(token)) {
      dotProduct += vector1[token] * vector2[token];
      sharedTokens = true;
    }
    magnitude1 += vector1[token] ** 2;
  }
  for (const token in vector2) {
    magnitude2 += vector2[token] ** 2;
  }

  console.log("Dot Product:", dotProduct);
  console.log("Magnitude 1:", magnitude1);
  console.log("Magnitude 2:", magnitude2);

  // Calculate magnitudes
  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  console.log("Square Root of Magnitude 1:", magnitude1);
  console.log("Square Root of Magnitude 2:", magnitude2);

  // Prevent division by zero and handle empty vectors
  if (!sharedTokens || magnitude1 === 0 || magnitude2 === 0) {
    return sharedTokens ? 0 : 1; // If both vectors are empty, consider them fully similar
  }

  // Calculate cosine similarity
  const similarity = dotProduct / (magnitude1 * magnitude2);

  console.log("Similarity:", similarity);

  return similarity;
}

const EventSimilarity = ({ currentUser }) => {
  const [events, setEvents] = useState([]);
  const [MLData, setMLData] = useState('');
  const [similarityResults, setSimilarityResults] = useState([]);
  const [eventsAttended, setEventsAttended] = useState([]);
  const [finalSimilarEvents, setFinalSimilarEvents] = useState([]);

  currentUser = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollectionRef = collection(db, 'EventsTest');
      const snapshot = await getDocs(eventCollectionRef);
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        image: doc.data().image,
        eventPax: doc.data().eventPax
      }));
      setEvents(eventsData);
      console.log("This is eventsData ", eventsData);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const updateML = async (currentUser) => {
      // find current profile using email
      const userCollectionRef = collection(db, "User");
      const userQuery = query(userCollectionRef, where("email", "==", currentUser.email));
      const userSnapshot = await getDocs(userQuery);
      const userData = userSnapshot.docs[0].data();
      setMLData(userData.MLData);

      try {
        const q = query(
          collection(db, "EventsTest"),
          where(documentId(), "in", userData.enrolledEvents),
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });

        const eventNames = querySnapshot.docs.map((doc) => doc.data().name);
        setEventsAttended(eventNames);
      } catch {
        const eventNames = [];
        setEventsAttended(eventNames);
      }
      // Calculate TF-IDF and similarity when MLData updates
      const descriptions = events.map(event => ({
        id: event.id,
        tokens: tokenize(event.description)
      }));
      console.log("input descriptions", descriptions);
      const tfidf = calculateIDF(descriptions);
      const userVector = calculateTFIDF(calculateTF(tokenize(userData.MLData)), tfidf);
      const similarities = descriptions.map(doc => ({
        id: doc.id,
        similarity: calculateCosineSimilarity(userVector, calculateTFIDF(calculateTF(doc.tokens), tfidf)),
      }));
      setSimilarityResults(similarities);
      console.log("see DESCRIPTION", userVector);
    };
    if (currentUser) {
      updateML(currentUser);
    }
  }, [currentUser, events]);

  useEffect(() => {
    // Extract event names from topSimilarEvents
    const eventNames = similarityResults.map(result => result.id);
    // Filter events based on extracted event names
    const filteredEvents = events.filter(event => eventNames.includes(event.id));
    // Set filtered events to finalSimilarEvents
    setFinalSimilarEvents(filteredEvents);
  }, [similarityResults, events]);

  return (
    <div>
      <h2>HERE IS WHAT YOU'LL LIKE</h2>
      {finalSimilarEvents.map((event, index) => (
        <EventCard key={index} eventId={event.id} city={event.name} description={event.description} image={event.image} eventPax={event.eventPax} />
      ))}
    </div>
  );
};

export default EventSimilarity;

/*
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, documentId } from 'firebase/firestore';
import db from '../firebase';
import { useAuth } from "../firebase";
import EventCard from './event-card';

// Function to tokenize text
function tokenize(text) {
  try{
    return text.toLowerCase().match(/\b\w+\b/g); // Basic word tokenization
  } catch (e) {
    return "";
  }
}

// Function to calculate TF (Term Frequency) for a document
function calculateTF(tokens) {
  try {
    const tf = {};
    tokens.forEach(token => {
      tf[token] = tf[token] ? tf[token] + 1 : 1;
    });
    const totalTokens = Object.keys(tf).length;
    Object.keys(tf).forEach(token => {
      tf[token] /= totalTokens;
    });
    return tf;
} catch {
  return 0;
}
}

// Function to calculate IDF (Inverse Document Frequency) for a set of documents
function calculateIDF(documents) {
  const idf = {};
  const totalDocuments = documents.length;

  // Initialize document frequency for each token
  const documentFrequency = {};

  // Count the number of documents each token appears in
  documents.forEach(document => {
    const uniqueTokens = new Set(document.tokens);
    uniqueTokens.forEach(token => {
      documentFrequency[token] = (documentFrequency[token] || 0) + 1;
    });
  });

  // Calculate IDF for each token
  Object.keys(documentFrequency).forEach(token => {
    const documentFrequencyValue = documentFrequency[token];
    idf[token] = Math.log(totalDocuments / (documentFrequencyValue || 1)) + 1;
  });

  return idf;
}

// Function to calculate TF-IDF vector for a document
// Function to calculate TF-IDF vector for a document
function calculateTFIDF(tf, idf) {
  const tfidf = {};
  Object.keys(tf).forEach(token => {
    const tfidfValue = tf[token] * idf[token];
    // Check if the TF-IDF value is not NaN before including it
    if (!isNaN(tfidfValue)) {
      tfidf[token] = tfidfValue;
    }
  }); 
  return tfidf;
}
function calculateCosineSimilarity(vector1, vector2) {
  console.log("Vector 1:", vector1);
  console.log("Vector 2:", vector2);

  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;
  let sharedTokens = false;

  // Calculate dot product and magnitudes
  for (const token in vector1) {
    if (vector2.hasOwnProperty(token)) {
      dotProduct += vector1[token] * vector2[token];
      sharedTokens = true;
    }
    magnitude1 += vector1[token] ** 2;
  }
  for (const token in vector2) {
    magnitude2 += vector2[token] ** 2;
  }
  
  console.log("Dot Product:", dotProduct);
  console.log("Magnitude 1:", magnitude1);
  console.log("Magnitude 2:", magnitude2);

  // Calculate magnitudes
  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  console.log("Square Root of Magnitude 1:", magnitude1);
  console.log("Square Root of Magnitude 2:", magnitude2);

  // Prevent division by zero and handle empty vectors
  if (!sharedTokens || magnitude1 === 0 || magnitude2 === 0) {
    return sharedTokens ? 0 : 1; // If both vectors are empty, consider them fully similar
  }

  // Calculate cosine similarity
  const similarity = dotProduct / (magnitude1 * magnitude2);

  console.log("Similarity:", similarity);

  return similarity;
}

const EventSimilarity = ({ currentUser }) => {
  const [events, setEvents] = useState([]);
  const [MLData, setMLData] = useState('');
  const [similarityResults, setSimilarityResults] = useState([]);
  const [eventsAttended, setEventsAttended] = useState([]);
 
  currentUser = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollectionRef = collection(db, 'EventsTest');
      const snapshot = await getDocs(eventCollectionRef);
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.data().name,
        description: doc.data().description
      }));
      setEvents(eventsData);
      console.log("This is eventsData ", eventsData);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const updateML = async (currentUser) => {
      // find current profile using email
      const userCollectionRef = collection(db, "User");
      const userQuery = query(userCollectionRef, where("email", "==", currentUser.email));
      const userSnapshot = await getDocs(userQuery);
      const userData = userSnapshot.docs[0].data();
      setMLData(userData.MLData);

      try {
        const q = query(
          collection(db, "EventsTest"),
          where(documentId(), "in", userData.enrolledEvents
          ),
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
  
        const eventNames = querySnapshot.docs.map((doc) => doc.data().name);
        setEventsAttended(eventNames);
      } catch {
        const eventNames = [];  
        setEventsAttended(eventNames);
      }
      // Calculate TF-IDF and similarity when MLData updates
      const descriptions = events.map(event => ({
        id: event.id,
        tokens: tokenize(event.description)
      }));
      console.log("input descriptions", descriptions);
      const tfidf = calculateIDF(descriptions);
      const userVector = calculateTFIDF(calculateTF(tokenize(userData.MLData)), tfidf);
      const similarities = descriptions.map(doc => ({
        id: doc.id,
        similarity: calculateCosineSimilarity(userVector, calculateTFIDF(calculateTF(doc.tokens), tfidf)),
      }));
      setSimilarityResults(similarities);
      console.log("see DESCRIPTION",userVector);
    };
    if (currentUser) {
      updateML(currentUser);
    }
  }, [currentUser, events]);
  // Sort similarity results and take top 5
  console.log("results", similarityResults);
  const topSimilarEvents = similarityResults
    .sort((a, b) => b.similarity - a.similarity)
    .filter((a,b) => !eventsAttended.includes(a.id))
    .slice(0, 4);

    const eventsCollectionRef = collection(db, "EventsTest");
    const eventsQuery = query(eventsCollectionRef, where("==", topsimilarEvents.name));
    const eventsSnapshot = await getDocs(eventsQuery);   
   const finalSimilarEvents = // the list of events i query out
   
  useEffect(() => {
    const eventNames = topSimilarEvents.map(result => result.id);
    const filteredEvents = events.filter(event => eventNames.includes(event.id));
    setFinalSimilarEvents(filteredEvents);
  })

  return (
    <div>
      <h2>HERE IS WHAT YOU'LL LIKE</h2>
      {topSimilarEvents.map((event, index) => (
          <li key={index}>
            <p>Event ID: {event.id}, Similarity: {event.similarity}</p>
          </li>
        ))}


      {finalSimilarEvents.map((event) => (
        <EventCard eventId={event.id} city={event.name} description={event.description} image={event.image} eventPax={event.eventPax}/>

        ))}


    </div>
  );
};

export default EventSimilarity;
*/