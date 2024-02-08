import React from 'react'
import { Link } from 'react-router-dom'

import Banner from './banner'
import styles from './random.css'

const Home = (props) => {
  return (
    <div className={styles.container}>
      <Banner />
      <section className={styles.hero}>
        <div className={styles.main}>
          <div className={styles['hero-section']}>
            <div className={styles.header}>
              <h1 className={styles.heading}>You can make a difference</h1>
              <p className={styles.caption}>
                VOLUNASIA is that moment when you forget you&apos;re
                volunteering to help change lives, because it&apos;s changing
                yours. Come find your volunasia with us!
              </p>
            </div>
            <div className={styles.buttons}>
              <button className={`${styles.button} ${styles.button}`}>
                <span>View Our Events</span>
              </button>
              <button className={`${styles.button1} ${styles.button}`}>
                <span>Sign up as a volunteer now!</span>
              </button>
            </div>
          </div>
          <div className={styles.content}>
            <img
              src="https://images.unsplash.com/photo-1604881991720-f91add269bed?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fGtpbmR8ZW58MHx8fHwxNzA3NDA5MTM1fDA&amp;ixlib=rb-4.0.3&amp;h=700"
              alt="image"
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles['details-container']}>
          <div className={styles.details}>
            <div className={styles.category}>
              <img
                alt="image"
                src="/details-1.svg"
                className={styles.image1}
              />
              <p className={styles.text02}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
                <span dangerouslySetInnerHTML={{ __html: ' ' }} />
              </p>
            </div>
            <div className={styles.category1}>
              <img
                alt="image"
                src="/details-2.svg"
                className={styles.image2}
              />
              <p className={styles.text03}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
                <span dangerouslySetInnerHTML={{ __html: ' ' }} />
              </p>
            </div>
            <div className={styles.category2}>
              <img
                alt="image"
                src="/details-3.svg"
                className={styles.image3}
              />
              <p className={styles.text04}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
                <span dangerouslySetInnerHTML={{ __html: ' ' }} />
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
