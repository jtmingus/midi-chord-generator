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
    <div className="grid" style={{ marginTop: "1rem" }}>
      <button onClick={play} disabled={isPlaying}>
        Play
      </button>
      <button onClick={download}>Download Midi</button>
      <button
        onClick={() => {
          randomize();
        }}
      >
        Randomize all
      </button>
    </div>
  );
}
