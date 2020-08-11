import React, {useState} from 'react'
import { Button } from '@material-ui/core';
import { db, storage } from '../firebase'
import firebase from 'firebase';
import '../ImageUpload.css';

function ImageUpload({username}) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null); // Choose file, path/string from local cpu
  const [progress, setProgress] = useState(0);

  // Window pops out to select file
  const handleChange = (event) => {
    // Set to first file selected
   if (event.target.files[0]) {
     setImage(event.target.files[0]);
   }
  };

  const handleUpload = () => {
    // Access storage in fb
    // Get reference to this image, create new folder and storage everything inside
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      // on state changed give a snapshot
      // uploading is async so doesnt happen immediately, keep track of progress
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function
        storage // go to storage
          .ref("images") // ref images folder
          .child(image.name) // get image name child
          .getDownloadURL() // once uploaded , grab download url/link to use image
          .then(url => {
            // post image in db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username
            });
            // After done uploading, set to default
            setProgress(0);
            setCaption('');
            setImage(null);
          })
      }
    )
  }

  return (
    <div className="image-upload">
      <progress className="image-progress" value={progress} max="100" />
      <input 
        placeholder="Enter a caption" 
        type="text"
        onChange={event => setCaption(event.target.value)}
        value={caption}
      />  
      <input type="file" onChange={handleChange}/> 
      <Button onClick={handleUpload}>
        Upload
      </Button>
    </div>
  )
}

export default ImageUpload
