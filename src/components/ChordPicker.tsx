import { Dispatch, useState } from "react";
import { Chord } from "../data_model/chord";
import {
  NoteId,
  NOTE_ID_TO_LABEL,
  ChordType,
  CHORD_TYPE_TO_LABEL,
  ChordOptions,
  Inversion,
  INVERSION_TO_LABEL,
} from "../data_model/types";

const styles = {
  container: {
    padding: "20px",
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
  function updateChord(options: Partial<ChordOptions>) {
    chord.updateChordOptions(options);
    setChord(chord);
  }
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
  const inversionOptions = Object.values(Inversion).map((inversion) => (
    <option key={inversion} value={inversion}>
      {INVERSION_TO_LABEL.get(inversion as Inversion)}
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
            updateChord({ chordBase: e.target.value as NoteId });
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
            updateChord({
              chordType: e.target.value as ChordType,
            });
          }}
        >
          {chordTypeOptions}
        </select>
      </label>
      <label style={styles.select}>
        <input
          type="checkbox"
          onChange={(e) => {
            updateChord({ openVoicing: e.target.checked });
          }}
        ></input>
        Open voicing
      </label>
      <label style={styles.select}>
        Inversion
        <select
          name="inversion"
          value={chord.getInversion()}
          onChange={(e) => {
            updateChord({
              inversion: e.target.value as Inversion,
            });
          }}
        >
          {inversionOptions}
        </select>
      </label>
    </div>
  );
}
