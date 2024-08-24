import * as Tone from "tone";
import { Chord } from "../data_model/chord";

const BPM = 160;

export class ChordPlayer {
  private readonly synth: Tone.PolySynth;
  constructor() {
    // TODO: Decide if user should be able to change the tempo.
    Tone.Transport.bpm.value = BPM;
    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const limiter = new Tone.Limiter();
    this.synth.connect(limiter);
    this.synth.set({
      oscillator: { type: "sine", volume: -10 },
    });

    // If debugging is needed, uncomment the line below.
    // this.synth.debug = true;
  }

  playChords(chords: Chord[], onFinishCallback: Function = () => {}) {
    setTimeout(() => {
      onFinishCallback();
    }, this.getExpectedPlayTime());

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

  /**
   * Get the estimated play time in milliseconds based on bpm.
   *
   * We need to estimate the time because the signal from
   * Tonejs isn't working as expected.
   */
  private getExpectedPlayTime() {
    const beatsPerSecond = Tone.Transport.bpm.value / 60;
    const beats = 16;
    const milliseconds = (1000 * beats) / beatsPerSecond;

    // Add one second of buffer.
    return milliseconds + 1000;
  }
}
