import React, { useState } from 'react';
import Post from './components/Post';
import './App.css';

function App() {
  const [posts, setPosts] = useState([
    {
      username: "John",
      caption: "Is a nice day?",
      imageUrl: "https://www.freecodecamp.org/static/wide-image-3cb329e8b3cae865be76746fbd069cd2.png"
    },
    {
      username: "John",
      caption: "Is a nice day?",
      imageUrl: "https://www.freecodecamp.org/static/wide-image-3cb329e8b3cae865be76746fbd069cd2.png"
    }

  ])
  return (
    <div className="App">
      <div className="app__header">
        <img 
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
          alt="" />
      </div>
      <h1>Hello Clever Programers</h1>
      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
    </div>
  );
}

export default App;
