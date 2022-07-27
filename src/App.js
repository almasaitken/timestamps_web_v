import { useEffect, useState } from "react";
import "./App.css";
import { getTime } from "./getTime";
import { Timestamp, EditableTimestamp } from "./components/timestamp";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineClear } from "react-icons/ai";
import { CgCopy } from "react-icons/cg";
import { Transition } from "react-transition-group";
import { Collapse } from "@mui/material";

function App() {
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [timestamps, setTimestamps] = useState([
    {
      key: uuidv4(),
      time: {
        hours: "00",
        minutes: "00",
        seconds: "00",
      },
      description: "Start",
    },
  ]);
  const [found, setFound] = useState(false);
  const [description, setDescription] = useState("default");
  const [editedTimestampKey, setEditedTimestampKey] = useState("");
  const [tooltipCopy, setTooltipCopy] = useState("Click to copy");

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleLinkSubmit = async () => {
    try {
      let result = await getTime(link.split("v=")[1]);
      alert(
        "You connected to " +
          result.title +
          " on the " +
          result.channel +
          " channel."
      );
      setMessage(result);
      setFound(true);
    } catch (error) {
      alert("No such live video or it doesn't exist");
      setMessage("");
      setFound(false);
    }
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
    }
    let key_to_add = uuidv4();
    setTimestamps([
      ...timestamps,
      {
        key: key_to_add,
        time: {
          hours: result.time.hours,
          minutes: result.time.minutes,
          seconds: result.time.seconds,
        },
      },
    ]);
    setEditedTimestampKey(key_to_add);
    setDescription("");
  };

  const handleDeleteTimestamp = ({ key }) => {
    let deletedIndex = timestamps.findIndex(
      (timestamp) => timestamp.key === key
    );
    setTimestamps([
      ...timestamps.slice(0, deletedIndex),
      ...timestamps.slice(deletedIndex + 1),
    ]);
  };

  const handleSaveTimestamp = (timestamp) => {
    let editedIndex = timestamps.findIndex(
      (tmstmp) => tmstmp.key === timestamp.key
    );
    setTimestamps([
      ...timestamps.slice(0, editedIndex),
      { key: timestamp.key, description: description, time: timestamp.time },
      ...timestamps.slice(editedIndex + 1),
    ]);
    setEditedTimestampKey("");
  };

  const handleEditTimestamp = (timestamp) => {
    setEditedTimestampKey(timestamp.key);
    setDescription(timestamp.description);
  };

  const handleOnKeyPress = (event, timestamp) => {
    if (event.key === "Enter") {
      handleSaveTimestamp(timestamp);
    }
  };

  const handleClearTimestamps = () => {
    setTimestamps([]);
  };

  const dataToString = () => {
    let str = "";
    timestamps.forEach((timestamp) => {
      str +=
        timestamp.time.hours +
        ":" +
        timestamp.time.minutes +
        ":" +
        timestamp.time.seconds +
        " - " +
        timestamp.description +
        "\n";
    });
    return str;
  };

  useEffect(() => {
    setTooltipCopy("Click to copy");
  }, [timestamps]);

  const handleResetLink = () => {
    setFound(false);
    setTimestamps([
      {
        key: uuidv4(),
        time: {
          hours: "00",
          minutes: "00",
          seconds: "00",
        },
        description: "Start",
      },
    ]);
    setLink("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> Timestamps for Youtube Live </h1>
      </header>
      <div className="body">
        {!found ? (
          <div className="usalass">
            <h2 id="paste-message">
              {" "}
              Paste the youtube live video link you want to connect to{" "}
            </h2>
            <div className="video-search">
              <input
                className="input-field"
                value={link}
                onChange={handleLinkChange}
                placeholder="video link"
              />
            </div>
            <button className="button-click" onClick={handleLinkSubmit}>
              Connect to the youtube live video
            </button>
            <div className={found ? "modal active" : "modal"}> 
              <div> there is something going on </div>
            </div>
          </div>
        ) : (
          <div className="main-edit">
            <div className="left-side">
              <div>
                <button onClick={handleResetLink} className="another-video-btn">
                  {" "}
                  Another video{" "}
                </button>
              </div>
              <div className="subheader">
                {" "}
                LiveVideo Title:
                <div className="message">{message.title}</div>
              </div>
              <div className="subheader">
                Hosting channel:
                <div className="message">{message.channel}</div>
              </div>
              <div className="video-responsive">
                <iframe
                  width="350"
                  height="220"
                  src={`https://www.youtube.com/embed/${
                    link.split("v=")[1]
                  }?autoplay=1&mute=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            </div>
            <div className="right-side">
              <div className="btns-row">
                {found ? (
                  <div className="add-wrapper">
                    <button id="add" onClick={handleAddTimestamp}>
                      <FontAwesomeIcon
                        icon={faClock}
                        className="fa-2x"
                        color="white"
                      />
                      <span style={{ marginLeft: "6px" }}>Add timestamp</span>
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  {timestamps.length === 0 ? (
                    <></>
                  ) : (
                    <div className="copy-delete">
                      <div className="tooltip">
                        <CopyToClipboard text={dataToString()}>
                          <button
                            className="copy-delete-btns"
                            onClick={() => setTooltipCopy("Copied")}
                          >
                            <CgCopy style={{ color: "white" }} size={27} />
                            <div style={{ marginLeft: "7px" }}>
                              {" "}
                              {tooltipCopy}{" "}
                            </div>
                          </button>
                        </CopyToClipboard>
                      </div>
                      <div className="tooltip">
                        <button
                          className="copy-delete-btns"
                          onClick={handleClearTimestamps}
                        >
                          <AiOutlineClear
                            style={{ color: "white" }}
                            size={27}
                          />
                          <div> Clear </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="timestamps">
                {timestamps.map((timestamp) => {
                  return editedTimestampKey === timestamp.key ? (
                    <EditableTimestamp
                      handleSaveTimestamp={() => {
                        handleSaveTimestamp(timestamp);
                      }}
                      key={timestamp.key}
                      time={timestamp.time}
                      description={timestamp.description}
                      handleChangeDescription={handleChangeDescription}
                      handleDeleteTimestamp={() => {
                        handleDeleteTimestamp(timestamp);
                      }}
                      handleOnKeyPress={(event) => {
                        handleOnKeyPress(event, timestamp);
                      }}
                    />
                  ) : (
                    <></>
                  );
                })}
                {timestamps.map((timestamp) => {
                  return editedTimestampKey === timestamp.key ? (
                    <></>
                  ) : (
                    <Timestamp
                      key={timestamp.key}
                      time={timestamp.time}
                      description={timestamp.description}
                      handleDeleteTimestamp={() => {
                        handleDeleteTimestamp(timestamp);
                      }}
                      handleEditTimestamp={() => handleEditTimestamp(timestamp)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
