import ChordList from "../components/ChordList";
import ControlButtons from "../components/ControlButtons";
import { Chord } from "../data_model/chord";
import { generateRandomChord } from "../data_model/chord_randomizer";
import { ChordType, NoteId } from "../data_model/types";
import { useState } from "react";

const DEFAULT_CHORDS = [
  new Chord({ chordBase: NoteId.C, chordType: ChordType.MAJ_VII }),
  new Chord({ chordBase: NoteId.D, chordType: ChordType.MIN_IX }),
  new Chord({ chordBase: NoteId.F, chordType: ChordType.VI }),
  new Chord({ chordBase: NoteId.E, chordType: ChordType.MIN_VII }),
];

export default function App() {
  const [chords, setChords] = useState<Chord[]>(DEFAULT_CHORDS);

  function randomize() {
    const newChords = [];
    for (let i = 0; i < 4; i++) {
      newChords.push(generateRandomChord());
    }
    setChords(newChords);
  }

  return (
    <div>
      <ChordList chords={chords} setChords={setChords} />
      <ControlButtons chords={chords} randomize={randomize} />
    </div>
  );
}
