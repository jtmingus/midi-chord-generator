import { ChordType } from "./types";

export const CHORD_TYPE_TO_RELATIVE_SEMITONE_LIST: Map<
  ChordType,
  Array<number>
> = new Map([
  [ChordType.MAJ, [0, 4, 7]], // Major chord: root, major third, perfect fifth
  [ChordType.MIN, [0, 3, 7]], // Minor chord: root, minor third, perfect fifth
  [ChordType.VII, [0, 3, 7, 10]], // Dominant seventh chord: root, major third, perfect fifth, minor seventh
  [ChordType.MAJ_VII, [0, 4, 7, 11]], // Major seventh chord: root, major third, perfect fifth, major seventh
  [ChordType.MIN_VII, [0, 3, 7, 10]], // Minor seventh chord: root, minor third, perfect fifth, minor seventh
  [ChordType.MAJ_IX, [0, 4, 7, 11, 14]], // Major ninth chord: root, major third, perfect fifth, major seventh, major ninth
  [ChordType.MIN_IX, [0, 3, 7, 10, 14]], // Minor ninth chord: root, minor third, perfect fifth, minor seventh, minor ninth
  [ChordType.MIN_XI, [0, 3, 7, 10, 14, 17]], // Minor eleventh chord: root, minor third, perfect fifth, minor seventh, perfect eleventh
  [ChordType.DIMINISHED, [0, 3, 6, 9]], // Diminished chord: root, minor third, flattened fifth, double-flattened seventh
  [ChordType.AUGMENTED, [0, 4, 8]], // Augmented chord: root, major third, augmented fifth
  [ChordType.SUS_II, [0, 2, 7]], // Suspended second chord: root, major second, perfect fifth
  [ChordType.SUS_IV, [0, 5, 7]], // Suspended fourth chord: root, major fourth, perfect fifth
  [ChordType.VI, [0, 4, 7, 9]], // Sixth chord: root, major third, major fifth, major sixth
]);
