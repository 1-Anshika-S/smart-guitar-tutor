import type { Chord, StringNumber } from "../types/chord";

type FretboardPreviewProps = {
  chord: Chord;
};

const strings: StringNumber[] = [6, 5, 4, 3, 2, 1];
const frets = [1, 2, 3, 4, 5];

function FretboardPreview({ chord }: FretboardPreviewProps) {
  function getPositionForStringAndFret(stringNumber: StringNumber, fret: number) {
    return chord.positions.find(
      (position) => position.string === stringNumber && position.fret === fret
    );
  }

  function getStringStatus(stringNumber: StringNumber) {
    if (chord.mutedStrings.includes(stringNumber)) {
      return "X";
    }

    if (chord.openStrings.includes(stringNumber)) {
      return "O";
    }

    return "";
  }

  return (
    <section className="panel fretboard-panel">
      <div className="panel-header">
        <div>
          <p className="section-kicker">Preview</p>
          <h2>{chord.name} Shape</h2>
        </div>
      </div>

      <div className="fretboard-preview">
        {strings.map((stringNumber) => (
          <div className="string-row" key={stringNumber}>
            <span className="string-status">
              {getStringStatus(stringNumber)}
            </span>

            <span className="string-label">String {stringNumber}</span>

            {frets.map((fret) => {
              const fingerPosition = getPositionForStringAndFret(
                stringNumber,
                fret
              );

              return (
                <div className="fret-cell" key={`${stringNumber}-${fret}`}>
                  {fingerPosition ? (
                    <span className="finger-dot">{fingerPosition.finger}</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="fret-label-row">
        <span />
        <span />
        {frets.map((fret) => (
          <span key={fret}>Fret {fret}</span>
        ))}
      </div>
    </section>
  );
}

export default FretboardPreview;