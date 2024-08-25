import { useState } from "react";
import { Chord } from "../data_model/chord";
import { MidiChordWriter } from "../midi/midi_writer";
import { ChordPlayer } from "../player/player";

const player = new ChordPlayer();

export default function ControlButtons({
  chords,
  randomize,
}: {
  chords: Chord[];
  randomize: Function;
}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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
    </div>
  );
}
