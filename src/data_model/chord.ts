import { NoteId, ChordType, ChordOptions, Octave, Inversion } from "./types";
import { CHORD_TYPE_TO_RELATIVE_SEMITONE_LIST } from "./chord_semitones";
import { Note } from "./note";

export class Chord {
  private notes: Note[];

  private static DEFAULT_OCTAVE = 4 as Octave;

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

  isOpenVoicing(): boolean {
    return !!this.chordOptions.openVoicing;
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

    console.log("modified");
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
    let notesPostInversion: Note[] = [];
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

    if (notesPostInversion[0].getRawNoteId() / 12 >= 5) {
      notesPostInversion = notes.map((note) => {
        note.transposeBySemitones(-12);
        return note;
      });
    }

    return notesPostInversion;
  }

  /** TODO: Decide how to handle open voicings. */
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
    } else {
      // Double root an octave below.
      const newRoot = new Note(notes[0].getRawNoteId() - 12);
      notes.unshift(newRoot);
      for (let i = 2; i < notes.length; i++) {
        const currRawId = notes[i].getRawNoteId();
        if (currRawId - rootRawId >= 12) {
          // -12 or 0.
          const toTranspose = (Math.floor(Math.random() * 2) - 1) * 12;
          notes[i].transposeBySemitones(toTranspose);
        } else if (currRawId - rootRawId >= 9 || currRawId - rootRawId == 7) {
          // Don't transpose notes that are between 9 and 12 semitones above the root and don't transpose the 5th.
          continue;
        } else {
          // +/- 12 semitones.
          let toTranspose = (Math.floor(Math.random() * 3) - 1) * 12;
          notes[i].transposeBySemitones(toTranspose);
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
