import { Chord } from "./chord";
import { ChordType, Inversion, NoteId } from "./types";

function randInt(max: number) {
  return Math.floor(Math.random() * max);
}

/** TODO: Make random selections weighted. */
export function generateRandomChord(): Chord {
  const possibleChords = Object.values(NoteId);

  return new Chord({
    chordBase: possibleChords[randInt(possibleChords.length)],
    chordType: generateRandomChordType(),
    inversion: generateRandomInversion(),
    openVoicing: !!randInt(2),
  });
}

/** Get a random inversion with preference given to no inversion (i.e. ROOT). */
function generateRandomInversion() {
  const possibleInversions = Object.values(Inversion);
  const randomInt = randInt(possibleInversions.length * 2);
  if (randomInt >= possibleInversions.length) {
    return Inversion.ROOT;
  }

  return possibleInversions[randomInt];
}

/** Get a random chord type with preference for more normal types. */
function generateRandomChordType(): ChordType {
  const randomInt = randInt(100);
  if (randomInt < 18) return ChordType.MAJ;
  if (randomInt < 36) return ChordType.MIN;
  if (randomInt < 44) return ChordType.VII;
  if (randomInt < 56) return ChordType.MAJ_VII;
  if (randomInt < 68) return ChordType.MIN_VII;
  if (randomInt < 74) return ChordType.MAJ_IX;
  if (randomInt < 80) return ChordType.MIN_IX;
  if (randomInt < 86) return ChordType.MIN_XI;
  if (randomInt < 88) return ChordType.DIMINISHED;
  if (randomInt < 90) return ChordType.AUGMENTED;
  if (randomInt < 92) return ChordType.SUS_II;
  if (randomInt < 95) return ChordType.SUS_IV;
  if (randomInt < 98) return ChordType.MAJ_VI;
  if (randomInt < 100) return ChordType.MIN_VI;

  return ChordType.MAJ;
}
