import Timer from "./Timer.js";
import useState from "react";
import AudioRecorder from "./AudioRecorder.js";
import Stopwatch from "./Stopwatch.js";
import ReactMarkdown from "react-markdown";
import "./App.css";
function Session({ activeSession, updateSession, updateDb }) {
  // const [time, setTime] = useState(0)
  const onEditField = (key, value) => {
    if (key === "title" && value === "") {
      value = "Untitled Practice";
    }
    let newSession = {
      ...activeSession,
      [key]: value,
      lastModified: Date.now(),
    };
    updateSession(newSession);
    if(key === "time"){
      updateDb(newSession)
    }
  };
  if (!activeSession)
    return (
      <div className="session">
        <p className="not-active">No Active Session</p>
      </div>
    );
  return (
    <div className="session">
      <div className="session-edit">
        <div className="app-main-note-edit">
          <input
            type="text"
            value={activeSession.title}
            onChange={(e) => onEditField("title", e.target.value)}
            onBlur={() => updateDb(activeSession)}
            autoFocus
          />
          <textarea
            id="body"
            placeholder="Write your note here."
            value={activeSession.body}
            onChange={(e) => onEditField("body", e.target.value)}
            onBlur={() => updateDb(activeSession)}
          />
          <i>This app uses markdown.<a className="link" rel="noreferrer" target="_blank" href="https://www.markdownguide.org/basic-syntax/">Access a markdown guide here.</a></i>
        </div>
          <div className="tools">
          <Stopwatch onEditField={onEditField} updateDb={updateDb} />
          <AudioRecorder onEditField={onEditField} updateDb={updateDb} session={activeSession}></AudioRecorder>
        </div>
      </div>

      <div className="session-preview">
        <h1 className="title-preview">{activeSession.title}</h1>
        <ReactMarkdown className="body-preview">
          {activeSession.body}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Session;
