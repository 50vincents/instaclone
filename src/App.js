import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { db } from './firebase'

function App() {
  const [posts, setPosts] = useState([]);

  // Run piece of code based on specific condition
  useEffect(() => {
    // every time a new post is added, this code is fired -> picture of collection
    db.collection('posts').onSnapshot(snapshot => {
      // set our posts to documents/post in snapshot
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      }))); 
    })
  }, [posts]) // conditions here, blank means run once when page/app component loads and never again
  // runs everytime posts change

  return (
    <div className="app">
      <div className="app-header">
        <img 
          className="app-header-image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      <h1>BUILDING NA INSTAGRAM CLONE</h1>

      {
        posts.map(({id, post}) => {
          // id only re-renders new posts
          return (
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          )
        })
      }
    

    </div>
  );
}

export default App;
