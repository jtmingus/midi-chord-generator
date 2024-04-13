import { NoteId, RawNoteId, Octave } from "./types";

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
    return (this.rawNoteId % 12) as NoteId;
  }

  increaseBySemitones(semitones: number) {
    const newRawNoteId = this.rawNoteId + semitones;
    validateRawNoteId(newRawNoteId);

    this.rawNoteId = newRawNoteId;
  }

  static buildFromNoteIdAndOctave(noteId: NoteId, octave: Octave): Note {
    if (octave < 0 || octave >= 8) {
      throw Error("Invalid octave");
    }
    if (noteId < 0 || noteId > 11) {
      throw Error("Invalid note id");
    }

    return new Note((octave * 12 + noteId) as number);
  }
}
