# Smart Guitar Tutor

Smart Guitar Tutor is a React and TypeScript web app that helps guitar players learn chord shapes using a live webcam feed and an on-screen fretboard overlay.

## Version 1

Version 1 is a local MVP focused on showing users where to place their fingers for basic guitar chords.

### Current Features

* Select from beginner guitar chords
* View chord details, finger positions, open strings, and muted strings
* Start and stop a live webcam feed
* Mirror the webcam view
* Zoom the webcam feed
* Display a virtual fretboard over the camera feed
* Show numbered finger-placement dots for the selected chord
* Manually move and resize the virtual fretboard to align it with a real guitar
* Navigate chords with Previous, Next, and Random controls

## Tech Stack

* React
* TypeScript
* Vite
* HTML Canvas
* Browser Webcam API
* CSS
* Git and GitHub

## How It Works

1. Select a chord.
2. Start the webcam.
3. Position the guitar neck in view.
4. Adjust the virtual fretboard until it matches the real guitar.
5. Follow the numbered finger dots.

## Run Locally

```bash
git clone YOUR_REPOSITORY_URL
cd smart-guitar-tutor
npm install
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Version 1 Limitations

* The fretboard must be aligned manually.
* The app does not yet detect the guitar neck automatically.
* The app does not track hands or verify finger placement.
* Camera zoom is a visual display zoom, not hardware camera zoom.
* The project is currently intended for local use and is not deployed yet.

## Future Plans

* Automatic fretboard detection
* Hand and finger tracking
* Chord-correctness feedback
* More chords and practice modes
* Mobile improvements
* Public deployment

