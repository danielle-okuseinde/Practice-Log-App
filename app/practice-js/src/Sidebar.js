import "./App.css";
function Sidebar({
  sessions,
  addSession,
  deleteSession,
  activeSession,
  setActiveSession,
  updateDb,
}) {
  const sortedSession = sessions.sort(
    (a, b) => b.lastModified - a.lastModified
  );
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Practice Sessions</h1>
        <button onClick={addSession}>Add</button>
      </div>
      <div className="practice-session-list">
        {sortedSession.map((session, pos) => (
          <div
            className={`session-sidebar ${
              session.id === activeSession ? "active" : ""
            }`}
            onClick={() => {
              setActiveSession(session.id);
              console.log(session);
            }}
            key={pos}
            onBlur={() => updateDb(session)}
          >
            <div className="sidebar-session-title">
              <h3>{session.title}</h3>
            </div>
            <p>{session.body}</p>
            <button onClick={() => deleteSession(session)}>Delete</button>
            <small className="note-meta">
              Last modified{" "}
              {new Date(session.lastModified).toLocaleDateString("en", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              ,{" "}
            </small>
            <small className="sidebar-session-time">
              <span className="digits">
                {("0" + Math.floor((session.time / 60000) % 60)).slice(-2)}:
              </span>
              <span className="digits">
                {("0" + Math.floor((session.time / 1000) % 60)).slice(-2)}.
              </span>
              <span className="digits mili-sec">
                {("0" + ((session.time / 10) % 100)).slice(-2)}
              </span>
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
