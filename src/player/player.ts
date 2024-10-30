import * as Tone from "tone";
import { Chord } from "../data_model/chord";

const BPM = 160;

export class ChordPlayer {
  private readonly synth: Tone.Sampler;
  constructor() {
    // TODO: Decide if user should be able to change the tempo.
    Tone.Transport.bpm.value = BPM;
    this.synth = new Tone.Sampler({
      C2: "samples/C2.mp3",
      "F#2": "samples/Fsharp2.mp3",
      C3: "samples/C3.mp3",
      "F#3": "samples/Fsharp3.mp3",
      C4: "samples/C4.mp3",
      "F#4": "samples/Fsharp4.mp3",
      C5: "samples/C5.mp3",
    }).toDestination();
    const limiter = new Tone.Limiter();
    this.synth.connect(limiter);
    // this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
    // this.synth.set({
    //   oscillator: { type: "sine", volume: -12 },
    // });

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
        .getAllNotes()
        .map((note) => note.getMidiNotation());

      this.synth.triggerAttackRelease(
        midiNotationNotes,
        // Play each note for 1 measure.
        midiNotationNotes.map(() => "1m"),
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
