export type RawNoteId = number;
export type Inversion = number;
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export enum NoteId {
  C = 0,
  C_SHARP = 1,
  D = 2,
  D_SHARP = 3,
  E = 4,
  F = 5,
  F_SHARP = 6,
  G = 7,
  G_SHARP = 8,
  A = 9,
  A_SHARP = 10,
  B = 11,
}
export const ChordId = NoteId;

export const NOTE_ID_TO_STRING = new Map([
  [NoteId.A, "A"],
  [NoteId.A_SHARP, "A#"],
  [NoteId.B, "B"],
  [NoteId.C, "C"],
  [NoteId.C_SHARP, "C#"],
  [NoteId.D, "D"],
  [NoteId.D_SHARP, "D#"],
  [NoteId.E, "E"],
  [NoteId.F, "F"],
  [NoteId.F_SHARP, "F#"],
  [NoteId.G, "G"],
  [NoteId.G_SHARP, "G#"],
]);

export interface NoteKey {
  noteId: NoteId;
  octave: Octave;
}

export enum ChordType {
  MAJ,
  MIN,
  VII,
  MAJ_VII,
  MIN_VII,
  MAJ_IX,
  MIN_IX,
  MIN_XI,
  DIMINISHED,
  AUGMENTED,
  SUS_II,
  SUS_IV,
  VI,
}

// TODO: Could add other modifiers like density of notes, dropped bass,
// randomness, etc.
export interface ChordOptions {
  inversion?: Inversion;
}
