export type RawNoteId = number;
export type Inversion = number;
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export enum NoteId {
  A = 0,
  A_SHARP = 1,
  B = 2,
  C = 3,
  C_SHARP = 4,
  D = 5,
  D_SHARP = 6,
  E = 7,
  F = 8,
  F_SHARP = 9,
  G = 10,
  G_SHARP = 11,
}
export type ChordId = NoteId;

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
  inversion: Inversion;
}
