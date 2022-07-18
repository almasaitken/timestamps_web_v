import axios from 'axios';

  const api_key = 'AIzaSyC7a3wvHZFFbyBu7yTWw6N3b8lI8YWfhsA';

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
  
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;
  
    return { hours: padTo2Digits(hours), minutes: padTo2Digits(minutes),seconds: padTo2Digits(seconds)};
  }
      
  export const getTime = async (videoId) => (
    await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=liveStreamingDetails&id=${videoId}&key=${api_key}`)
    .then((response) => {
      let smth = new Date();
      let startTime = new Date(response.data.items[0].liveStreamingDetails.actualStartTime)
      let title = response.data.items[0].snippet.title;
      let channel = response.data.items[0].snippet.channelTitle;
      return {title: title, time: convertMsToTime(smth-startTime), channel: channel};
    })
  );