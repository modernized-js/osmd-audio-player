# @modernized-js/osmd-audio-player

> **Fork of [osmd-audio-player](https://github.com/jimutt/osmd-audio-player)** by Jimmy Utterström.
> Modernized build system, updated dependencies, and stricter TypeScript typing.

Unofficial audio playback engine for [OpenSheetMusicDisplay](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay).

## Changes from upstream

- Migrated from npm/Babel/Jest to yarn/Vitest
- Upgraded TypeScript 3.7 to 5.x
- Upgraded opensheetmusicdisplay 0.8 to 1.9
- Added ESLint + Prettier
- Removed all `any` types
- GitHub Actions CI (ubuntu/windows/macos)

## Install

```
yarn add @modernized-js/osmd-audio-player
```

## Usage

```typescript
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import AudioPlayer from "@modernized-js/osmd-audio-player";

const osmd = new OpenSheetMusicDisplay(document.getElementById("score"));
const audioPlayer = new AudioPlayer();

await osmd.load(scoreXml);
await osmd.render();
await audioPlayer.loadScore(osmd);

audioPlayer.play();
```

## Features

- Framework agnostic (Vanilla JS / React / Vue)
- Multi-instrument support (91 MIDI instruments via Musyngkite soundfont)
- Individual volume controls per instrument
- Automatic tempo detection from score / BPM control
- Staccato articulation / tie handling
- Seek (jump to step)
- Event-driven architecture (STATE_CHANGE / ITERATION)

## API

```typescript
const audioPlayer = new AudioPlayer();

await audioPlayer.loadScore(osmd);   // Load score from OSMD instance
await audioPlayer.play();            // Start playback
audioPlayer.pause();                 // Pause playback
await audioPlayer.stop();            // Stop and reset to beginning
audioPlayer.jumpToStep(step);        // Seek to specific step
audioPlayer.setBpm(120);             // Set tempo

audioPlayer.on("state-change", (state) => { /* INIT | PLAYING | STOPPED | PAUSED */ });
audioPlayer.on("iteration", (notes) => { /* Called for each note group */ });
```

## Development

```bash
yarn install
yarn dev          # TypeScript watch mode
yarn test         # Run tests (Vitest)
yarn build        # Compile to dist/
yarn build-umd    # UMD bundle
yarn lint         # ESLint
yarn format       # Prettier
```

## License

MIT - Original work by [Jimmy Utterström](https://github.com/jimutt/osmd-audio-player)
