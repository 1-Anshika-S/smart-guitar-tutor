import type { FretboardAlignment } from "../types/alignment";

type AlignmentControlsProps = {
  alignment: FretboardAlignment;
  onAlignmentChange: (alignment: FretboardAlignment) => void;
  onReset: () => void;
};

function AlignmentControls({
  alignment,
  onAlignmentChange,
  onReset,
}: AlignmentControlsProps) {
  function updateAlignment(
    key: keyof FretboardAlignment,
    value: number
  ) {
    onAlignmentChange({
      ...alignment,
      [key]: value,
    });
  }

  return (
    <section className="alignment-panel">
      <div className="alignment-header">
        <div>
          <p className="section-kicker">Manual Alignment</p>
          <h3>Match the Virtual Fretboard</h3>
        </div>

        <button type="button" onClick={onReset}>
          Reset
        </button>
      </div>

      <label className="alignment-control">
        <span>
          Horizontal position: {alignment.xPercent}%
        </span>

        <input
          type="range"
          min="0"
          max="60"
          value={alignment.xPercent}
          onChange={(event) =>
            updateAlignment(
              "xPercent",
              Number(event.target.value)
            )
          }
        />
      </label>

      <label className="alignment-control">
        <span>
          Vertical position: {alignment.yPercent}%
        </span>

        <input
          type="range"
          min="0"
          max="75"
          value={alignment.yPercent}
          onChange={(event) =>
            updateAlignment(
              "yPercent",
              Number(event.target.value)
            )
          }
        />
      </label>

      <label className="alignment-control">
        <span>
          Fretboard width: {alignment.widthPercent}%
        </span>

        <input
          type="range"
          min="25"
          max="95"
          value={alignment.widthPercent}
          onChange={(event) =>
            updateAlignment(
              "widthPercent",
              Number(event.target.value)
            )
          }
        />
      </label>

      <label className="alignment-control">
        <span>
          Fretboard height: {alignment.heightPercent}%
        </span>

        <input
          type="range"
          min="15"
          max="75"
          value={alignment.heightPercent}
          onChange={(event) =>
            updateAlignment(
              "heightPercent",
              Number(event.target.value)
            )
          }
        />
      </label>
    </section>
  );
}

export default AlignmentControls;