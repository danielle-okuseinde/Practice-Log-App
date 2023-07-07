import React from 'react';
import './App.css';
import MicRecorder from 'mic-recorder-to-mp3';
import uuid from "react-uuid";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isBlocked: false,
    };
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));
  };

  save = (recording) => {
    this.props.onEditField('recording', [recording, Date.now])
  }

  componentDidMount() {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }

  render(){
    if(this.state.isRecording) {
      return (
        <div className="audio-recorder">
          <header className="App-header">
            <button className="record" onClick={this.start} disabled={this.state.isRecording}>Recording</button>
            <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
            <audio src={this.state.blobURL} controls="controls" />
          </header>
        </div>
      );
    } else {
      return (
        <div className="audio-recorder">
          <header className="App-header">
            <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
            <button onClick={this.save} disabled={this.state.isRecording}>Save</button>
            <audio src={this.state.blobURL} controls="controls" />
          </header>
        </div>
      );
    }
  }
}

export default App;