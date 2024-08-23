import {
  NoteId,
  RawNoteId,
  Octave,
  noteIdToRawNoteId,
  getNoteIdFromRawNoteId,
  NOTE_ID_TO_MIDI_STRING,
} from "./types";

// Start with ID 0 = A0, 1 = A#0, etc.
const MIN_NOTE_ID = 0;
const MAX_NOTE_ID = /** (semitones per octave * octaves) */ 12 * 7;
function validateRawNoteId(rawNoteId: RawNoteId) {
  if (rawNoteId < MIN_NOTE_ID || rawNoteId > MAX_NOTE_ID) {
    throw new Error("This note is invalid");
  }
}

/** Class to contain an instance of a note. */
export class Note {
  /**
   * Constructed using rawNoteId, with 0 being A0 and each semitone increasing
   * by one.
   */
  constructor(private rawNoteId: RawNoteId) {
    validateRawNoteId(rawNoteId);
  }

  getRawNoteId() {
    return this.rawNoteId;
  }

  getOctave(): Octave {
    return Math.floor(this.rawNoteId / 12) as Octave;
  }

  getNoteId(): NoteId {
    return getNoteIdFromRawNoteId(this.rawNoteId % 12);
  }

  transposeBySemitones(semitones: number) {
    const newRawNoteId = this.rawNoteId + semitones;
    validateRawNoteId(newRawNoteId);

    this.rawNoteId = newRawNoteId;
  }

  /** Get the string midi notation for the current note; i.e., C4, G#3. */
  getMidiNotation() {
    const noteId = this.getNoteId();
    const noteStr = NOTE_ID_TO_MIDI_STRING.get(noteId);
    return `${noteStr}${this.getOctave()}`;
  }

  static buildFromNoteIdAndOctave(noteId: NoteId, octave: Octave): Note {
    if (octave < 0 || octave >= 8) {
      throw Error("Invalid octave");
    }
    const rawNoteId = noteIdToRawNoteId(noteId);
    if (rawNoteId < 0 || rawNoteId > 11) {
      throw Error("Invalid note id");
    }

    return new Note((octave * 12 + rawNoteId) as number);
  }
}
