import { Dispatch, useState } from "react";
import { Chord } from "../data_model/chord";
import { buildChordsFromJsonResponse } from "../data_model/smart_chord_processor";

const styles = {
  label: {
    display: "block",
  },
  textarea: {
    display: "block",
  },
};

export default function SmartChordBuilder({
  setChords,
}: {
  setChords: Dispatch<Chord[]>;
}) {
  const [textareaValue, setTextareaValue] = useState("");
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = () => {
    if (!textareaValue.trim().length) return;

    setIsLoading(true);

    fetch("https://get-chord-progression-ht3fgadr7a-uc.a.run.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vibe: textareaValue,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not okay.");
        }
        return response.json();
      })
      .then((data) => {
        setChords(buildChordsFromJsonResponse(data));
        setError(false);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="grid">
      <div>
        <label htmlFor="vibe-editor" style={styles.label}>
          Describe the vibe of the chord progression you want:
        </label>
        <textarea
          id="vibe-editor"
          name="vibe"
          placeholder="The chord progression should be mysterious and suspenseful."
          cols={50}
          rows={3}
          style={styles.textarea}
          value={textareaValue}
          onChange={handleTextChange}
        ></textarea>
        <div>
          <button
            aria-busy={isLoading}
            disabled={!textareaValue.trim().length}
            onClick={fetchData}
            style={{
              width: "240px",
              marginBottom: "24px",
              display: "inline-block",
            }}
          >
            Generate
          </button>
          {error && (
            <span style={{ marginLeft: "24px" }}>
              Something went wrong. Please try again.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
