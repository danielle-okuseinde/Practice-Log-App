import './App.css';
function ControlButtons({active, isPaused, handleStart, handleReset, handlePauseResume, onSave}) {
    const startButton = (
      <div className='btn-grp'>
         <div className="btn btn-one btn-start" onClick={handleStart}>Start</div>
      </div>
    );
    const activeButtons = (
        <div className="btn-grp">
      <div className="btn btn-two" onClick={handleReset}>
        Reset
      </div>
      <div className="btn btn-one" onClick={handlePauseResume}>
        {isPaused ? "Resume" : "Pause"}
      </div>
      <div className="btn btn-two" onClick={onSave}>
        Save
      </div>
    </div>
    );



    if(active) return activeButtons
    else return startButton
}

export default ControlButtons