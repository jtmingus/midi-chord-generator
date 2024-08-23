import { Chord } from "../data_model/chord";
import { MidiChordWriter } from "../midi/midi_writer";
import { ChordPlayer } from "../player/player";

export default function ControlButtons({ chords }: { chords: Chord[] }) {
  const player = new ChordPlayer();
  function play() {
    player.playChords(chords);
  }

  function download() {
    MidiChordWriter.writeChords(chords);
  }

  return (
    <div className="grid">
      <button onClick={play}>Play</button>
      <button onClick={download}>Download Midi</button>
    </div>
  );
}
