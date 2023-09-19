import React from 'react';
import './App.css';
import {useState} from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import uuid from "react-uuid";
import Session from './Session';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isRecording: false,
      blob: null,
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
        const audio_file = new File(buffer, 'me-at-thevoice.mp3', {
          type: blob.type,
          lastModified: Date.now()
        })
        this.setState({...this.state, blob: blob, isRecording: false});
        console.log(this.state)
      }).catch((e) => console.log(e));
  };

  save = () => {
    this.props.onEditField('recording', this.state.file)
    this.props.updateDb(this.props.session)
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
            <audio src={this.state.blobURL} controls={true}/>
            <div className='btn-grp'>
              <button className="record" onClick={this.start} disabled={this.state.isRecording}>Recording</button>
              <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
            </div>
        </div>
      );
    } else {
      return (
        <div className="audio-recorder">
            <audio className='audio' src={this.state.blobURL} controls={true}/>
            <div className='btn-grp'>
              <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
              <button onClick={this.save} disabled={this.state.isRecording}>Save</button>
            </div>
        </div>
      );
    }
  }
}

export default App;