import { ChordType, ChordQuality } from "./types";

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

// DISABLE FOR NOW. MAY WANT MORE COMPLICATED CHORDS.
export const CHORD_QUALITY_TO_RELATIVE_SEMITONE_LIST: Map<
  ChordQuality,
  Array<number>
> = new Map([
  [ChordQuality.Major, [0, 4, 7]], // Major chord
  [ChordQuality.Minor, [0, 3, 7]], // Minor chord
  [ChordQuality.Augmented, [0, 4, 8]], // Augmented chord
  [ChordQuality.Diminished, [0, 3, 6]], // Diminished chord
  [ChordQuality.Dominant7th, [0, 4, 7, 10]], // Dominant seventh chord
  [ChordQuality.Major7th, [0, 4, 7, 11]], // Major seventh chord
  [ChordQuality.Minor7th, [0, 3, 7, 10]], // Minor seventh chord
  [ChordQuality.HalfDiminished7th, [0, 3, 6, 10]], // Half-diminished seventh chord
  [ChordQuality.FullyDiminished7th, [0, 3, 6, 9]], // Fully diminished seventh chord
  [ChordQuality.SuspendedFourth, [0, 5, 7]], // Suspended fourth chord
  [ChordQuality.SuspendedSecond, [0, 2, 7]], // Suspended second chord
  [ChordQuality.AddNinth, [0, 4, 7, 14]], // Add9th chord (refer to base triad intervals)
  [ChordQuality.AddEleventh, [0, 4, 7, 17]], // Add11th chord (refer to base triad intervals)
  [ChordQuality.AddThirteenth, [0, 4, 7, 21]], // Add13th chord (refer to base triad intervals)
  [ChordQuality.Ninth, [0, 4, 7, 10, 14]], // Ninth chord (dominant seventh with added ninth)
  [ChordQuality.Eleventh, [0, 4, 7, 10, 14, 18]], // Eleventh chord (dominant seventh with added eleventh)
  [ChordQuality.Thirteenth, [0, 4, 7, 10, 14, 18, 21]], // Thirteenth chord (dominant seventh with added thirteenth)
  [ChordQuality.MajorSixth, [0, 4, 7, 9]], // Major sixth chord
  [ChordQuality.MinorSixth, [0, 3, 7, 9]], // Minor sixth chord
  // Chords with altered 5ths use the same intervals as their base triads with the adjusted fifth
  [ChordQuality.Dominant7thFlat5, [0, 4, 6, 10]], // Dominant seventh chord with flatted fifth
  [ChordQuality.Minor7thFlat5, [0, 3, 6, 10]], // Minor seventh chord with flatted fifth
  [ChordQuality.Dominant7thSharp5, [0, 4, 8, 10]], // Dominant seventh chord with sharp fifth
  [ChordQuality.Minor7thSharp5, [0, 3, 8, 10]], // Minor seventh chord with sharp fifth
  // TODO: Decide if we want more.
  // [ChordQuality.HalfDiminished7thSharp5, [0, 3, 7, 10]], // Half-diminished seventh chord with sharp fifth
  // [ChordQuality.FullyDiminished7thSharp5, [0, 3, 6, 9]], // Fully diminished seventh chord with sharp fifth (same as without sharp fifth)
  // // Add9th, Add11th, and Add13th chords with sharp 5ths use the same intervals as their base triads with the adjusted fifth
  // [ChordQuality.AddNinthSharp5, [0, 4, 8]], // Add9th chord with sharp fifth (refer to base triad intervals)
  // [ChordQuality.AddEleventhSharp5, [0, 4, 8]], // Add11th chord with sharp fifth (refer to base triad intervals)
  // [ChordQuality.AddThirteenthSharp5, [0, 4, 8]], // Add13th chord with sharp fifth (refer to base triad intervals)
  // [ChordQuality.NinthSharp5, [0, 4, 8, 10]], // Ninth chord with sharp fifth
  // [ChordQuality.EleventhSharp5, [0, 4, 8, 10]], // Eleventh chord with sharp fifth
  // [ChordQuality.ThirteenthSharp5, [0, 4, 8, 10]], // Thirteenth chord with sharp fifth
  // [ChordQuality.MajorSixthSharp5, [0, 4, 8, 11]], // Major sixth chord with sharp fifth
  // [ChordQuality.MinorSixthSharp5, [0, 3, 8, 11]], // Minor sixth chord with sharp fifth
]);
