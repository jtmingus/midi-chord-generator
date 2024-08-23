import ChordList from "../components/ChordList";
import ControlButtons from "../components/ControlButtons";
import { Chord } from "../data_model/chord";
import { ChordType, NoteId } from "../data_model/types";
import { useState } from "react";

const DEFAULT_CHORDS = [
  new Chord(NoteId.C, ChordType.MAJ_VII),
  new Chord(NoteId.D, ChordType.MIN_IX),
  new Chord(NoteId.F, ChordType.VI),
  new Chord(NoteId.E, ChordType.MIN_VII),
];

export default function App() {
  const [chords, setChords] = useState<Chord[]>(DEFAULT_CHORDS);

  return (
    <div>
      <ChordList chords={chords} setChords={setChords} />
      <ControlButtons chords={chords} />
    </div>
  );
}
