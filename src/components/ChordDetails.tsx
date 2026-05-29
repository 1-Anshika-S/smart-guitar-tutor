import type { Chord } from "../types/chord";

type ChordDetailsProps = {
  chord: Chord;
};

function ChordDetails({ chord }: ChordDetailsProps) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Selected Chord</p>
          <h2>{chord.name}</h2>
        </div>

        <span className="difficulty-badge">{chord.difficulty}</span>
      </div>

      <div className="details-grid">
        <div>
          <p className="detail-label">Chord Symbol</p>
          <p className="detail-value">{chord.shortName}</p>
        </div>

        <div>
          <p className="detail-label">Finger Positions</p>
          <p className="detail-value">{chord.positions.length}</p>
        </div>

        <div>
          <p className="detail-label">Open Strings</p>
          <p className="detail-value">
            {chord.openStrings.length > 0 ? chord.openStrings.join(", ") : "None"}
          </p>
        </div>

        <div>
          <p className="detail-label">Muted Strings</p>
          <p className="detail-value">
            {chord.mutedStrings.length > 0
              ? chord.mutedStrings.join(", ")
              : "None"}
          </p>
        </div>
      </div>

      <div className="finger-list">
        <p className="detail-label">Finger Placement</p>

        {chord.positions.map((position) => (
          <div
            className="finger-row"
            key={`${chord.id}-${position.string}-${position.fret}-${position.finger}`}
          >
            <span>String {position.string}</span>
            <span>Fret {position.fret}</span>
            <span>Finger {position.finger}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ChordDetails;