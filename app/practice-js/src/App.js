import "./App.css";
import { useEffect, useState } from "react";
import Session from "./Session.js";
import Sidebar from "./Sidebar.js";
import uuid from "react-uuid";

function App() {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(false);
  let temp_records = null;
  // fetching all of the records from the database
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:3001/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setSessions(records);
    }

    getRecords();

    return;
  }, [sessions.length]);

  const add = async () => {
    const newSession = {
      id: uuid(),
      title: "Untitled Practice",
      body: "",
      time: null,
      lastModified: Date.now(),
      recording: [],
    };
    await newDb(newSession);
    setSessions([newSession, ...sessions]);
  };

  const del = async (sessionToDel) => {
    await deleteDb(sessionToDel);
    setSessions(sessions.filter((session) => session.id !== sessionToDel.id));
    console.log(sessions);
  };

  function getActiveSession() {
    return sessions.find((session) => session.id === activeSession);
  }

  const updateSession = (updatedSession) => {
    // fetch(`localhost:3001/id=${id}`)
    const updatedSessions = sessions.map((session) => {
      if (session.id === activeSession) {
        return updatedSession;
      }
      return session;
    });
    setSessions(updatedSessions);
  };

  const updateDb = async (session) => {
    let result = await fetch(`http://localhost:3001/update`, {
      method: "PATCH",
      body: JSON.stringify(session),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result !== undefined) {
      console.log("Data saved succesfully");
    }
  };

  const newDb = async (session) => {
    let result = await fetch("http://localhost:3001/add", {
      method: "POST",
      body: JSON.stringify(session),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result !== undefined) {
      console.log("Data saved succesfully");
    }
  };

  const deleteDb = async (session) => {
    let result = await fetch(`http://localhost:3001/delete`, {
      method: "DELETE",
      body: JSON.stringify(session),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    console.log(typeof session._id);

    if (result !== undefined) {
      console.log("Data saved succesfully");
    }
  };

  return (
    <div className="App">
      <Sidebar
        sessions={sessions}
        addSession={add}
        deleteSession={del}
        activeSession={activeSession}
        setActiveSession={setActiveSession}
        updateDb={updateDb}
      />
      <Session
        activeSession={getActiveSession()}
        updateSession={updateSession}
        updateDb={updateDb}
      />
    </div>
  );
}

export default App;
