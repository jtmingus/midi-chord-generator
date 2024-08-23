import { Dispatch, useState } from "react";
import { Chord } from "../data_model/chord";
import {
  NoteId,
  NOTE_ID_TO_LABEL,
  ChordType,
  CHORD_TYPE_TO_LABEL,
} from "../data_model/types";

const styles = {
  container: {
    padding: "20px 20px 0 20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  select: {},
};

interface ChordPickerProps {
  chord: Chord;
  setChord: Dispatch<Chord>;
}
export default function ChordPicker({ chord, setChord }: ChordPickerProps) {
  const chordOptions = Object.values(NoteId).map((noteId) => (
    <option key={noteId} value={noteId}>
      {NOTE_ID_TO_LABEL.get(noteId as NoteId)}
    </option>
  ));
  const chordTypeOptions = Object.values(ChordType).map((chordType) => (
    <option key={chordType} value={chordType}>
      {CHORD_TYPE_TO_LABEL.get(chordType as ChordType)}
    </option>
  ));
  return (
    <div style={styles.container}>
      <label style={styles.select}>
        Chord
        <select
          name="chordBase"
          value={chord.getChordBase()}
          onChange={(e) => {
            setChord(new Chord(e.target.value as NoteId, chord.getChordType()));
          }}
        >
          {chordOptions}
        </select>
      </label>
      <label style={styles.select}>
        Type
        <select
          name="chordType"
          value={chord.getChordType()}
          onChange={(e) => {
            setChord(
              new Chord(chord.getChordBase(), e.target.value as ChordType)
            );
          }}
        >
          {chordTypeOptions}
        </select>
      </label>
    </div>
  );
}
