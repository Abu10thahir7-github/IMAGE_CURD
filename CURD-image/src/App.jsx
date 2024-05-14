import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
function App() {
  const [file, setFile]   = useState(null);
  const [image, setImage] = useState(null);

  const handleClick = () => {
    const formData = new FormData();
    formData.append('file', file);

axios.post('http://localhost:2000/upload', formData)
  .then((res) => {
    console.log(res.data);
    setImage(res.data.image);
  })
  .catch((err) => console.log(err));

  };

  useEffect(() => {
    axios.get('http://localhost:2000/getimage')
      .then((res) => {
        console.log(res.data);
        setImage(res.data[0].image);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <div>

    <div className="upload">

      <input type='file' onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleClick}>Upload</button>
    </div>

    <div className="img-display">


      {image && <img src={`http://localhost:2000/images/${image}`} alt="Uploaded" />}
    </div>
    </div>
    </>
  );
}

export default App;
