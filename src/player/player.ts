import * as Tone from "tone";
import { Chord } from "../data_model/chord";

export class ChordPlayer {
  private readonly synth: Tone.PolySynth;
  constructor() {
    // TODO: Decide if user should be able to change the tempo.
    Tone.Transport.bpm.value = 160;
    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
    // If debugging is needed, uncomment the line below.
    // this.synth.debug = true;
  }

  playChords(chords: Chord[]) {
    // Clear any current playing notes.
    this.synth.releaseAll();

    let delayMeasures = 0;
    for (const chord of chords) {
      const midiNotationNotes = chord
        .getAllNotes({})
        .map((note) => note.getMidiNotation());

      this.synth.triggerAttackRelease(
        midiNotationNotes,
        // Play each of the four chords for 1 measure.
        ["1m", "1m", "1m", "1m"],
        `+${delayMeasures}m`
      );

      delayMeasures += 1;
    }
  }
}
