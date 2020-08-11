import React, { useState } from 'react';
import './App.css';
import Post from './components/Post';

function App() {
  const [posts, setPosts] = useState([
    {
      username: "baddy",
      caption: "bad",
      imageUrl: "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg"
    }
  ]);

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
        posts.map(post => {
          return (
            <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          )
        })
      }
    

    </div>
  );
}

export default App;
