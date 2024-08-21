import MidiWriter from "midi-writer-js";
import { Chord } from "../data_model/chord";

export class MidiChordWriter {
  constructor() {}

  /** Returns the data URI for the MIDI. */
  writeChords(chords: Chord[]): string {
    // Start with a new track
    const track = new MidiWriter.Track();

    // Define an instrument (optional):
    // track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));

    const offset: number[] = [];
    for (const chord of chords) {
      const notes = chord.getAllNotes({});
      track.addEvent(
        new MidiWriter.NoteEvent({
          pitch: notes.map((note) => note.getMidiNotation()),
          duration: 1,
          offset: offset,
        })
      );

      offset.push(1);
    }

    // Generate a data URI
    const write = new MidiWriter.Writer(track);
    console.log(write.dataUri());
    return write.dataUri();
  }
}
