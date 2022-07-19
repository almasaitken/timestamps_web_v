import { useState } from 'react';
import './App.css';
import { getTime } from './getTime';
import { Timestamp, EditableTimestamp} from './components/timestamp';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {

  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [timestamps, setTimestamps] = useState([{key: uuidv4(), time: {
    hours: '00', 
    minutes: '00', seconds: '00'
  }, description: 'Start'}]);
  const [found, setFound] = useState(false);
  const [description, setDescription] = useState('default');
  const [editedTimestampKey, setEditedTimestampKey] = useState('');

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

  const handleAddTimestamp = async () => {
    let result;
    try {
      result = await getTime(link.split("v=")[1]);
      setMessage(result);
    } catch (error) {
      alert(error);
    };
    let key_to_add = uuidv4();
    setTimestamps([...timestamps, {key: key_to_add, time: {
      hours: result.time.hours, 
      minutes: result.time.minutes, seconds: result.time.seconds
    }}]);
    setEditedTimestampKey(key_to_add);
    setDescription('');
  };

  const handleDeleteTimestamp = ({key}) => {
    let deletedIndex = timestamps.findIndex((timestamp) => timestamp.key === key);
    setTimestamps([...timestamps.slice(0, deletedIndex), ...timestamps.slice(deletedIndex+1)]);
  };

  const handleSaveTimestamp = (timestamp) => {
    let editedIndex = timestamps.findIndex((tmstmp) => tmstmp.key === timestamp.key);
    setTimestamps([...timestamps.slice(0, editedIndex), {key: timestamp.key, description: description, time: timestamp.time}, 
      ...timestamps.slice(editedIndex+1)]);
    setEditedTimestampKey('');
  };

  const handleEditTimestamp = (timestamp) => {
    setEditedTimestampKey(timestamp.key);
  };

  const handleOnKeyPress = (event, timestamp) => {
    if (event.key === 'Enter') {
      handleSaveTimestamp(timestamp);
    }
  };

  const handleClearTimestamps = () => {
    setTimestamps([]);
  };

  const dataToString = () => {
    let str = '';
    timestamps.forEach((timestamp) => {
      str += timestamp.time.hours + ':' + timestamp.time.minutes + ':' + timestamp.time.seconds + ' - ' + timestamp.description + '\n';
    });
    return str;
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
            { !found ? 
          <div className='usalass'> 
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
          <div className='timestamps'>
            {timestamps.map((timestamp) => {
              return (editedTimestampKey === timestamp.key ? 
                (<EditableTimestamp 
                handleSaveTimestamp={() => {handleSaveTimestamp(timestamp)}} key={timestamp.key} time={timestamp.time} 
                description={timestamp.description} handleChangeDescription={handleChangeDescription} handleDeleteTimestamp={() => {handleDeleteTimestamp(timestamp)}} 
                handleOnKeyPress={(event) => {handleOnKeyPress(event, timestamp)}}
                />) 
                : 
                (<Timestamp key={timestamp.key} time={timestamp.time} description={timestamp.description} handleDeleteTimestamp={() => {handleDeleteTimestamp(timestamp)}} 
                  handleEditTimestamp={() => handleEditTimestamp(timestamp)} /> ))
            })}
          </div>
          { found ? <div>
            <button id='add' onClick={handleAddTimestamp}> 
              <FontAwesomeIcon icon={faClock} className='fa-3x'/>
            </button>
          </div> : <></> }
          <div> 
           { timestamps.length === 0 ? <></> : 
            <div>
              <button onClick={handleClearTimestamps}> Clear </button> 
              <CopyToClipboard text={dataToString()}>
              <button>Copy to clipboard</button>
              </CopyToClipboard>
            </div> }
          </div>
          </div>
          </div>
        </div> 
    </div>
  );
}

export default App;