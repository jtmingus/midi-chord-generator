import { NoteId, ChordType, ChordOptions, Octave, Inversion } from "./types";
import { CHORD_TYPE_TO_RELATIVE_SEMITONE_LIST } from "./chord_semitones";
import { Note } from "./note";

export class Chord {
  private notes: Note[];

  private static DEFAULT_OCTAVE = 3 as Octave;

  constructor(private chordOptions: ChordOptions) {
    this.notes = this.buildNotes();
  }

  /** Updates the chord options and rebuilds all notes. */
  updateChordOptions(newChordOptions: Partial<ChordOptions>) {
    this.chordOptions = { ...this.chordOptions, ...newChordOptions };
    this.notes = this.buildNotes();
  }

  getChordBase(): NoteId {
    return this.chordOptions.chordBase;
  }

  getChordType(): ChordType {
    return this.chordOptions.chordType;
  }

  getInversion(): Inversion {
    return this.chordOptions.inversion ?? Inversion.ROOT;
  }

  private buildNotes(): Note[] {
    const relativeSemitones =
      CHORD_TYPE_TO_RELATIVE_SEMITONE_LIST.get(this.chordOptions.chordType) ||
      [];
    const rootNote = Note.buildFromNoteIdAndOctave(
      this.chordOptions.chordBase,
      Chord.DEFAULT_OCTAVE
    );
    const rootRawId = rootNote.getRawNoteId();

    let notes: Note[] = [];
    for (const relativeSemitone of relativeSemitones) {
      notes.push(new Note(rootRawId + relativeSemitone));
    }

    notes = this.modifyInversion(notes);
    notes = this.modifyVoicing(notes);

    for (const note of notes) {
      console.log(note.getMidiNotation());
    }

    return notes;
  }

  /**
   * Gets all notes based on the provided options.
   */
  getAllNotes(): Array<Note> {
    return this.notes;
  }

  private getInversionNumber() {
    switch (this.chordOptions.inversion) {
      case Inversion.FIRST:
        return 1;
      case Inversion.SECOND:
        return 2;
      default:
        return 0;
    }
  }

  private modifyInversion(notes: Note[]) {
    // Adjust for inversion.
    const inversion = this.getInversionNumber();
    if (inversion == 0) {
      return notes;
    }
    const notesPostInversion: Note[] = [];
    for (let i = notes.length - 1; i >= 0; i--) {
      if (i > inversion) {
        notesPostInversion.unshift(notes[i]);
      } else {
        // Raise the note an octave
        const noteToAdd = notes[i];
        noteToAdd.transposeBySemitones(12);
        notesPostInversion.push(noteToAdd);
      }
    }

    return notesPostInversion;
  }

  private modifyVoicing(notes: Note[]) {
    if (!notes.length) return notes;
    const rootRawId = notes[0].getRawNoteId();

    // Close voicing
    if (!this.chordOptions.openVoicing) {
      for (let note of notes) {
        while (note.getRawNoteId() - rootRawId >= 12) {
          note.transposeBySemitones(-12);
        }
      }
    }

    // Re-sort the notes.
    notes.sort((a: Note, b: Note) => {
      return a.getRawNoteId() - b.getRawNoteId();
    });

    return notes;
  }
}
