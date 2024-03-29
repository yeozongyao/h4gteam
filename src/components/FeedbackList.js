import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import './FeedbackList.css'

function FeedbackList({ eventName }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [learningExpList, setLearningExpList] = useState([]);
  const [futureRecomList, setFutureRecomList] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      const db = getFirestore();
      const eventCollectionRef = collection(db, "EventsTest");
      const eventQuery = query(eventCollectionRef, where("name", "==", eventName));
      
      try {
        const eventSnapshot = await getDocs(eventQuery);
        eventSnapshot.forEach(doc => {
          const eventData = doc.data();
          setFeedbackList(eventData.feedback || []);
          setLearningExpList(eventData.learningExp || []);
          setFutureRecomList(eventData.futureRecom || []);
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventName]);

  return (
    <div>
      <h2 className='HeaderOne'>Feedback</h2>
      <br/>
      <ul className='gray'>
        {feedbackList.map((feedback, index) => (
          <li className='gray' key={index}>{feedback}</li>
        ))}
      </ul>
      <br/>
      
      <h2 className='HeaderOne'>Learning Experiences</h2>
      <br/>
      <ul className='gray'>
        {learningExpList.map((learningExp, index) => (
          <li className='gray' key={index}>{learningExp}</li>
        ))}
      </ul>
      <br/>
      
      <h2 className='HeaderOne'>Recommendations</h2>
      <br/>
      <ul className='gray'>
        {futureRecomList.map((futureRecom, index) => (
          <li className='gray' key={index}>{futureRecom}</li>
        ))}
      </ul>
      <br/>
    </div>
  );
}

export default FeedbackList;