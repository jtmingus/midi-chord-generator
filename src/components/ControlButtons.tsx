import { useState } from "react";
import { Chord } from "../data_model/chord";
import { MidiChordWriter } from "../midi/midi_writer";
import { ChordPlayer } from "../player/player";

const player = new ChordPlayer();

export default function ControlButtons({
  chords,
  randomize,
  toggleShowSmartControls,
}: {
  chords: Chord[];
  randomize: Function;
  toggleShowSmartControls: Function;
}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showSmart, setShowSmart] = useState(false);

  function play() {
    setIsPlaying(true);
    player.playChords(chords, () => {
      setIsPlaying(false);
    });
  }

  function download() {
    MidiChordWriter.writeChords(chords);
  }

  return (
    <div className="grid" style={{ marginBottom: "1rem" }}>
      <button onClick={play} disabled={isPlaying}>
        <i className="fa-solid fa-play" style={{ marginRight: "0.5rem" }}></i>
        Play
      </button>
      <button onClick={download}>
        <i
          className="fa-solid fa-download"
          style={{ marginRight: "0.5rem" }}
        ></i>
        Download Midi
      </button>
      <button
        onClick={() => {
          randomize();
        }}
      >
        <i
          className="fa-solid fa-shuffle"
          style={{ marginRight: "0.5rem" }}
        ></i>
        Randomize all
      </button>
      <button
        onClick={() => {
          toggleShowSmartControls();
          setShowSmart(!showSmart);
        }}
      >
        <i
          className="fa-solid fa-wand-magic-sparkles"
          style={{ marginRight: "0.5rem" }}
        ></i>
        Smart controls
        <i
          className={
            "fa-solid " + (showSmart ? "fa-caret-up" : "fa-caret-down")
          }
          style={{ marginLeft: "0.5rem" }}
        ></i>
      </button>
    </div>
  );
}
