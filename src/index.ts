import { Chord } from "./data_model/chord";
import { MidiChordWriter } from "./midi/midi_writer";
import { ChordPlayer } from "./player/player";
import { NoteId, ChordType } from "./data_model/types";

const chords = [
  new Chord(NoteId.C, ChordType.MAJ_VII),
  new Chord(NoteId.D, ChordType.MIN_IX),
  new Chord(NoteId.F, ChordType.VI),
  new Chord(NoteId.E, ChordType.MIN_VII),
];

const playButton = document.querySelector("#play-button");
playButton?.addEventListener("click", () => {
  const player = new ChordPlayer();
  player.playChords(chords);
});
