import React from "react";

const DrumPad = ({ onClick, pad, padRef, ...rest }) => {
  return (
    <button
      className="drum-pad"
      id="drum-pad"
      onClick={onClick}
    >
      {pad.keyTrigger}
      <audio
        src={pad.url}
        preload="auto"
        className="clip"
        id={pad.keyTrigger}
        ref={padRef}
      ></audio>
    </button>
  );
};

export default DrumPad;
