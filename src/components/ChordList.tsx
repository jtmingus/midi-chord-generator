import { Dispatch } from "react";
import { Chord } from "../data_model/chord";
import ChordPicker from "./ChordPicker";

const NUM_CHORDS = 4;

interface ChordListProps {
  chords: Chord[];
  setChords: Dispatch<Chord[]>;
}
export default function ChordList({ chords, setChords }: ChordListProps) {
  console.log("initialize chord list", chords);
  const updateChord = (index: number, chord: Chord) => {
    setChords(
      chords.map((existingChord, i) => (i == index ? chord : existingChord))
    );
  };

  const chordPickers = [];
  for (let i = 0; i < chords.length; i++) {
    chordPickers.push(
      <ChordPicker
        key={chords[i].getChordBase() + chords[i].getChordType()}
        chord={chords[i]}
        setChord={(chord) => updateChord(i, chord)}
      />
    );
  }
  return <div className="grid">{chordPickers}</div>;
}
