import MidiWriter from "midi-writer-js";
import { Chord } from "../data_model/chord";

export class MidiChordWriter {
  private static downloadLinkEl?: HTMLAnchorElement;

  constructor() {}

  /** Downloads chords as MIDI. */
  static writeChords(chords: Chord[]) {
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
    this.download(write.dataUri());
  }

  private static download(uri: string) {
    this.downloadLinkEl = this.downloadLinkEl ?? document.createElement("a");
    this.downloadLinkEl.href = uri;
    // TODO: Update file name to include chords.
    this.downloadLinkEl.download = "Midi";
    this.downloadLinkEl.click();
  }
}
