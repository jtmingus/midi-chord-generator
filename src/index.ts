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

let player: ChordPlayer | undefined;

const playButton = document.querySelector("#play-button");
playButton?.addEventListener("click", () => {
  player = player ?? new ChordPlayer();
  player.playChords(chords);
});

let writer: MidiChordWriter | undefined;
const downloadButton = document.querySelector("#download-button");
downloadButton?.addEventListener("click", () => {
  writer = writer ?? new MidiChordWriter();
  const uri = writer.writeChords(chords);
  download(uri);
});

let downloadLinkEl: HTMLAnchorElement | undefined;
function download(uri: string) {
  downloadLinkEl = downloadLinkEl ?? document.createElement("a");
  downloadLinkEl.href = uri;
  // TODO: Update file name to include chords.
  downloadLinkEl.download = "Midi";
  downloadLinkEl.click();
}
