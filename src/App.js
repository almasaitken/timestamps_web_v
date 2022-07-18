import { useState } from 'react';
import './App.css';
import { getTime } from './getTime';
import { Timestamp, EditableTimestamp} from './components/timestamp';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [timestamps, setTimestamps] = useState([]);
  const [found, setFound] = useState(false);
  const [description, setDescription] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedTimestampKey, setEditedTimestampKey] = useState(null);

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  }

  const handleLinkSubmit = async () => {
    try {
      let result = await getTime(link.split("v=")[1]);
      alert("you connected to " + result.title + " on the " + result.channel + ' channel.');
      setMessage(result);
      setFound(true);
    } catch (error) {
      alert("no such live video or it doesn't exist");
      setMessage('');
      setFound(false);
    };
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleEditDescription = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleAddTimestamp = async (timestamp) => {
    try {
      let result = await getTime(link.split("v=")[1]);
      setMessage(result);
    } catch (error) {
      alert(error);
    };
    setTimestamps([...timestamps, {key: uuidv4(), time: {
      hours: message.time.hours, 
      minutes: message.time.minutes, seconds: message.time.seconds
    }, description: description}]);
    setEditedTimestampKey(timestamp.key);
    setDescription('');
  };

  const handleDeleteTimestamp = ({key}) => {
    let deletedIndex = timestamps.findIndex((timestamp) => timestamp.key === key);
    setTimestamps([...timestamps.slice(0, deletedIndex), ...timestamps.slice(deletedIndex+1)]);
  };

  const handleEditTimestamp = (timestamp) => {
    setEditedTimestampKey(timestamp.key);
    setEditedDescription(description);
  };

  const handleSaveTimestamp = (timestamp) => {
    let editedIndex = timestamps.findIndex((tmstmp) => tmstmp.key === timestamp.key);
    setTimestamps([...timestamps.slice(0, editedIndex), {key: timestamp.key, description: editedDescription, time: timestamp.time}, 
      ...timestamps.slice(editedIndex+1)]);
    setEditedTimestampKey(null);
    setEditedDescription(null);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTimestamp();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> The main page for connecting to the live youtube video </h1>
        <div> https://www.youtube.com/watch?v=2Yg-cH2hpiM</div>
      </header>
        <div className='body'>
          <div className='left-side'>
            <div className='left-wrapper'> 
            { !found ?           <div className='usalass'> 
          <div className='content'> 
            <h2> paste the youtube live video link you want to connect to </h2>
          </div>
          <div className='video-search'>
            <input className='input-field' value={link} onChange={handleLinkChange} placeholder='input the video id'/>
            <button className='button-click' onClick={handleLinkSubmit}> Connect to the youtube live video </button>  
          </div>
          </div>
          : <></> }
          <div className='message'> The title of the live video: {message.title} </div>
          <div className='message'> The channel hosting this live video: {message.channel} </div>
        </div>
        </div>
        <div className='right-side'> 
        <div className='right-wrapper'>
          { found ? <div>
            <input onChange={handleChangeDescription} value={description} onKeyPress={handleKeyPress}/>
            <button onClick={() => handleAddTimestamp(message)}> add timestamp </button>
          </div> : <></> }
          <div className='timestamps'>
            {timestamps.map((timestamp) => {
              return (editedTimestampKey === timestamp.key ? 
                (<EditableTimestamp editedDescription={editedDescription}  handleEditDescription={handleEditDescription} 
                handleSaveTimestamp={() => {handleSaveTimestamp(timestamp)}} key={timestamp.key} time={timestamp.time} 
                description={timestamp.description} handleDeleteTimestamp={() => {handleDeleteTimestamp(timestamp)}} 
                handleEditTimestamp={() => {handleEditTimestamp(timestamp)}}/>) 
                : 
                (<Timestamp key={timestamp.key} time={timestamp.time} description={timestamp.description} handleDeleteTimestamp={() => {handleDeleteTimestamp(timestamp)}} 
                  handleEditTimestamp={() => {handleEditTimestamp(timestamp)}}/> ))
            })}
          </div>
          </div>
          </div>
        </div> 
    </div>
  );
}

export default App;