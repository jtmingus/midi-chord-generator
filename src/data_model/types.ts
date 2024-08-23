export type Inversion = number;
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

// Reference: https://www.pianote.com/blog/chord-symbols-piano/

export enum NoteId {
  C = "0",
  C_SHARP = "1",
  D = "2",
  D_SHARP = "3",
  E = "4",
  F = "5",
  F_SHARP = "6",
  G = "7",
  G_SHARP = "8",
  A = "9",
  A_SHARP = "10",
  B = "11",
}
/** Number representation of NoteId used for calculations. */
export type RawNoteId = number;

export const noteIdToRawNoteId = (noteId: NoteId): number => parseInt(noteId);
export function getNoteIdFromRawNoteId(rawNoteId: RawNoteId): NoteId {
  return rawNoteId.toString() as NoteId;
}
export const ChordId = NoteId;

/** Map from NoteId to readable label. */
export const NOTE_ID_TO_LABEL = new Map<NoteId, string>([
  [NoteId.A, "A"],
  [NoteId.A_SHARP, "A#/B♭"],
  [NoteId.B, "B"],
  [NoteId.C, "C"],
  [NoteId.C_SHARP, "C#/D♭"],
  [NoteId.D, "D"],
  [NoteId.D_SHARP, "D#/E♭"],
  [NoteId.E, "E"],
  [NoteId.F, "F"],
  [NoteId.F_SHARP, "F#/G♭"],
  [NoteId.G, "G"],
  [NoteId.G_SHARP, "G#/A♭"],
]);
/** Map from NoteId to Midi string representation. */
export const NOTE_ID_TO_MIDI_STRING = new Map<NoteId, string>([
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
  MAJ = "maj",
  MIN = "min",
  VII = "vii",
  MAJ_VII = "maj_vii",
  MIN_VII = "min_vii",
  MAJ_IX = "maj_ix",
  MIN_IX = "min_ix",
  MIN_XI = "min_xi",
  DIMINISHED = "dim",
  AUGMENTED = "aug",
  SUS_II = "sus_ii",
  SUS_IV = "sus_iv",
  VI = "vi",
}

export const CHORD_TYPE_TO_LABEL = new Map([
  [ChordType.MAJ, "maj"],
  [ChordType.MIN, "m"],
  [ChordType.VII, "7"],
  [ChordType.MAJ_VII, "maj7"],
  [ChordType.MIN_VII, "m7"],
  [ChordType.MAJ_IX, "maj9"],
  [ChordType.MIN_IX, "m9"],
  [ChordType.MIN_XI, "m11"],
  [ChordType.DIMINISHED, "dim"],
  [ChordType.AUGMENTED, "aug"],
  [ChordType.SUS_II, "sus2"],
  [ChordType.SUS_IV, "sus4"],
  [ChordType.VI, "6"],
]);

// TODO: Could add other modifiers like density of notes, dropped bass,
// randomness, etc.
export interface ChordOptions {
  inversion?: Inversion;
}
