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
import { generateRandomChord } from "../data_model/chord_randomizer";

const styles = {
  container: {
    padding: "20px 20px 0 20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  select: {},
  buttonContainer: {
    textAlign: "right" as "right",
  },
  button: {
    width: "3rem",
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 0,
    "--pico-border-width": 0,
  },
};

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

interface ChordPickerProps {
  chord: Chord;
  setChord: Dispatch<Chord>;
  locked: boolean;
  setLocked: Dispatch<boolean>;
}
export default function ChordPicker({
  chord,
  setChord,
  locked,
  setLocked,
}: ChordPickerProps) {
  function updateChord(options: Partial<ChordOptions>) {
    chord.updateChordOptions(options);
    setChord(chord);
  }

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <button
          type="button"
          style={styles.button}
          aria-label="Toggle lock"
          data-tooltip="Toggle lock"
          className="outline"
          onClick={() => setLocked(!locked)}
        >
          {locked ? (
            <i className="fa-solid fa-lock"></i>
          ) : (
            <i className="fa-solid fa-unlock"></i>
          )}
        </button>
        <button
          type="button"
          style={styles.button}
          aria-label="Randomize"
          data-tooltip="Randomize"
          className="outline"
          disabled={locked}
          onClick={() => setChord(generateRandomChord())}
        >
          <i className="fa-solid fa-shuffle"></i>
        </button>
      </div>
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
          checked={chord.isOpenVoicing()}
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
