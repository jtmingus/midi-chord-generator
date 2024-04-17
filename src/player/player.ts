import * as Tone from "tone";
import { Chord } from "../data_model/chord";

export class ChordPlayer {
  private readonly synth: Tone.PolySynth;
  constructor() {
    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
  }

  playChords(chords: Chord[]) {
    const now = Tone.now();
    let delayMeasures = 0;
    for (const chord of chords) {
      const midiNotationNotes = chord
        .getAllNotes({})
        .map((note) => note.getMidiNotation());

      this.synth.triggerAttackRelease(
        midiNotationNotes,
        // Play each of the four chords for 1 measure.
        ["1m", "1m", "1m", "1m"],
        `${1 + delayMeasures}m`
      );

      delayMeasures += 1;
    }
  }
}
