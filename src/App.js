import React, { useState, useEffect } from 'react';
import './App.css';
import FourComponentCard from './components/maincard';

function App() {
  const [imageData, setImageData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextTimer, setNextTimer] = useState(0);
  const [updateIndex, setUpdateIndex] = useState(null); 
  const [checkEmergency,setEmergency]=useState(null);
  const [emergencyIndex, setEmergencyIndex] = useState(null);
  const [emergencyActive, setEmergencyActive] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/image')
      .then(response => response.json())
      .then(data => {
        setImageData(data);
      })
      .catch(error => console.error('Error fetching image data:', error));
  }, []);


  useEffect(() => {
    let timer = null;
    const fetchData = async () => {
      if (!imageData.length || !imageData[activeIndex]) return;

      try {
        const response = await fetch('http://127.0.0.1:5000/upload', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({image: imageData[activeIndex].image})
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const randomTimer = 5 + (data.number_of_predictions * 2);
        setNextTimer(randomTimer);
        timer = setTimeout(() => {
          const nextIndex = (activeIndex + 1) % 4;
          setActiveIndex(nextIndex);
          setUpdateIndex(activeIndex);
        }, randomTimer * 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    return () => timer && clearTimeout(timer);
  }, [activeIndex]);


  

  useEffect(() => {
    if (updateIndex === null) return;
    const updateImage = async () => {
      try {
        const response = await fetch('http://localhost:3001/newimage');
        if (!response.ok) throw new Error('Failed to fetch new image');
        const newImage = await response.json();
        const updatedImageData = [...imageData];
        updatedImageData[updateIndex] = { ...updatedImageData[updateIndex], image: newImage.image };
        setImageData(updatedImageData);
        setEmergency(updateIndex);
      } catch (error) {
        console.error('Error updating image:', error);
      }
    };
    updateImage();
  }, [updateIndex]);


  useEffect(() => {
    if (checkEmergency === null) return;
    const updateImage = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/emergency', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({image: imageData[updateIndex].image})
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log(data.emergency);
        if(data.emergency){
          setActiveIndex(updateIndex);
        }
      } catch (error) {
        console.error('Error updating image:', error);
      }
    };
    updateImage();
  }, [checkEmergency]);



  return (
    <div className="App">
      <header className="App-header">
        <div className="horizontal-container">
          {imageData.map((item, index) => (
            <FourComponentCard
              key={index}
              imageUrl={item.image}
              isActive={index === activeIndex}
              onTimerFinished={() => {
                const nextIndex = (activeIndex + 1) % 4;
                setActiveIndex(nextIndex);
                setUpdateIndex(activeIndex);  // Set the previous card index for updating
              }}
              nextTimer={nextTimer}
            />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

