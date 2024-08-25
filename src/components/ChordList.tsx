import { Dispatch } from "react";
import { Chord } from "../data_model/chord";
import ChordPicker from "./ChordPicker";

const NUM_CHORDS = 4;

interface ChordListProps {
  chords: Chord[];
  setChords: Dispatch<Chord[]>;
  lockedIds: Set<number>;
  setLockedIds: Dispatch<Set<number>>;
}
export default function ChordList({
  chords,
  setChords,
  lockedIds,
  setLockedIds,
}: ChordListProps) {
  const updateChord = (index: number, chord: Chord) => {
    setChords(
      chords.map((existingChord, i) => (i == index ? chord : existingChord))
    );
  };
  const setLocked = (index: number, locked: boolean) => {
    if (locked) {
      lockedIds.add(index);
    } else {
      lockedIds.delete(index);
    }
    setLockedIds(new Set([...lockedIds]));
  };

  const chordPickers = [];
  for (let i = 0; i < chords.length; i++) {
    chordPickers.push(
      <ChordPicker
        key={i}
        chord={chords[i]}
        setChord={(chord) => updateChord(i, chord)}
        locked={lockedIds.has(i)}
        setLocked={(isLocked) => {
          setLocked(i, isLocked);
        }}
      />
    );
  }
  return <div className="grid">{chordPickers}</div>;
}
