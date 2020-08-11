import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { db, auth } from './firebase'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
 /* constructor(props) {
    super(props);
    this.state = {
      open: false,
      posts: []
    };
  } */ // Same as hook but for classes
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


  // Front end listener
  useEffect(() => {
    // Backend listener
    // listener in use Effect
    const unsubscribe = auth.onAuthStateChanged((authUser) => { // listen anytime auth change happens - login/logout
      if (authUser) {
        // user is logged in
        setUser(authUser); // logged in and refreshed, check and see still logged in bc uses cookie tracking, persistent but not state persistent
      } else {
        // user logged out
        setUser(null);
      }
    }) 

    return () => {
      // Perform clean up action
      // Detach listener so no duplicates
      unsubscribe();
    }
  }, [user, username]);

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

  // Create new user
  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password) // passed from state variables
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password) // passed from state variables
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)} // Clicks outside modal
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signup">
            <center>
              <img 
                className="app-header-image"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
          
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)} // Clicks outside modal
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signup">
            <center>
              <img 
                className="app-header-image"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className="app-header">
        <img 
          className="app-header-image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app-loginContainer">
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        </div>

      )}

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
