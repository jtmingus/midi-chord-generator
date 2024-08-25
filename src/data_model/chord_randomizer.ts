import { Chord } from "./chord";
import { ChordType, Inversion, NoteId } from "./types";

function randInt(max: number) {
  return Math.floor(Math.random() * max);
}

/** TODO: Make random selections weighted. */
export function generateRandomChord(): Chord {
  const possibleChords = Object.values(NoteId);
  const possibleTypes = Object.values(ChordType);
  const possibleInversions = Object.values(Inversion);

  return new Chord({
    chordBase: possibleChords[randInt(possibleChords.length)],
    chordType: possibleTypes[randInt(possibleChords.length)],
    inversion: possibleInversions[randInt(possibleInversions.length)],
    openVoicing: !!randInt(2),
  });
}
