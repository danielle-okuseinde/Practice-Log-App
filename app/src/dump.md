import MicRecorder from 'mic-recorder-to-mp3'
import {useEffect, useState} from "react";

const mp3 = new MicRecorder({bitRate : 128});
function AudioRecorder({onEditField, title}){
    const [recordingProps, setRecordingProps] = useState({isRecording: false,
        blobURL: '',
        isBlocked: true})

    const updateRecordingProps = (key, value) => {
        setRecordingProps({...recordingProps,
            [key]: value
        })
    }
   

    navigator.getUserMedia({audio: true}, 
        () =>{
            console.log('Permission Granted');
            recordingProps['isBlocked'] = false;
        }, 
        () => {
            console.log('Permission Denied');
            recordingProps['isBlocked'] = true;
        })

    const start = () => {
        if(recordingProps.isBlocked){
            console.log('PERMISSION DENIED')
        } else {
            mp3
            .start()
            .then(() =>  {
                updateRecordingProps("isRecording", true);
            }).catch((e) => console.error(e));
        }

    const stop = () => {
    mp3
    .stop()
        .getMp3()
        .then(([buffer, blob]) => {
            const blobURL = URL.createObjectURL(blob)
            const file = new File(buffer, `${title}.mp3`, {
                type: blob.type,
                lastModified: Date.now()
            })
            const player = new Audio(URL.createObjectURL(file));
            player.play();
            onEditField('recording', player)
        }).catch((e) => console.log(e));
    };

    const startButton = (
        <div className="btn btn-one btn-start" onClick={start} disabled={recordingProps.isRecording}>Start</div>
    );
    const stopButton = (
        <div className="btn btn-two btn-start" onClick={stop} disabled={!recordingProps.isRecording}>Stop</div>
    );


    return (
        <div className="audio-recorder">
            <div className="btn-grp">
            {startButton}
            {stopButton}
            </div>
           <audio src = {recordingProps.blobURL} controls="controls"/>
        </div>
    );
}  
} 

export default AudioRecorder