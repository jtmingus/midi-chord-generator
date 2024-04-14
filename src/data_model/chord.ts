import { ChordId, ChordType, ChordOptions, Octave } from "./types";
import { CHORD_TYPE_TO_RELATIVE_SEMITONE_LIST } from "./chord_semitones";
import { Note } from "./note";

export class Chord {
  private notes: Note[];

  private static DEFAULT_OCTAVE = 3 as Octave;

  constructor(private chord: ChordId, private chordType: ChordType) {
    this.notes = this.buildNotes();
  }

  private buildNotes(): Note[] {
    const relativeSemitones =
      CHORD_TYPE_TO_RELATIVE_SEMITONE_LIST.get(this.chordType) || [];
    const rootNote = Note.buildFromNoteIdAndOctave(
      this.chord,
      Chord.DEFAULT_OCTAVE
    );
    const rootRawId = rootNote.getRawNoteId();

    const notes: Note[] = [];
    for (const relativeSemitone of relativeSemitones) {
      notes.push(new Note(rootRawId + relativeSemitone));
    }

    return notes;
  }

  /**
   * Gets all notes based on the provided options.
   */
  getAllNotes({ inversion = 0 }: ChordOptions): Array<Note> {
    // Adjust for inversion.
    inversion = inversion % this.notes.length;
    const notesPostInversion: Note[] = [];
    for (let i = this.notes.length - 1; i >= 0; i--) {
      if (i > inversion) {
        notesPostInversion.unshift(this.notes[i]);
      } else {
        // Raise the note an octave
        const noteToAdd = this.notes[i];
        noteToAdd.transposeBySemitones(12);
        notesPostInversion.push(noteToAdd);
      }
    }

    return notesPostInversion;
  }
}
