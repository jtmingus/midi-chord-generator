import { Chord } from "./chord";
import {
  NOTE_ID_TO_LABEL,
  CHORD_TYPE_TO_LABEL,
  NoteId,
  ChordType,
} from "./types";

const NOTE_LABEL_TO_NOTE_ID = new Map<string, NoteId>(
  Array.from(NOTE_ID_TO_LABEL, (pair) => [pair[1], pair[0]])
);

const CHORD_LABEL_TO_CHORD_TYPE = new Map<string, ChordType>(
  Array.from(CHORD_TYPE_TO_LABEL, (pair) => [pair[1], pair[0]])
);

/**
 * Builds a list of four Chords from the server json response.
 */
export function buildChordsFromJsonResponse(json: object): Chord[] {
  if (!Array.isArray(json)) throw new Error("Can't process response.");
  if (json.length !== 4) throw new Error("Can't process response.");
  const chordList: Chord[] = [];

  for (const chordJson of json) {
    const rootLabel = chordJson["root"];
    const typeLabel = chordJson["type"];

    if (
      !NOTE_LABEL_TO_NOTE_ID.has(rootLabel) ||
      !CHORD_LABEL_TO_CHORD_TYPE.has(typeLabel)
    ) {
      throw new Error("Can't process response.");
    }

    chordList.push(
      new Chord({
        chordBase: NOTE_LABEL_TO_NOTE_ID.get(rootLabel)!,
        chordType: CHORD_LABEL_TO_CHORD_TYPE.get(typeLabel)!,
      })
    );
  }

  return chordList;
}
