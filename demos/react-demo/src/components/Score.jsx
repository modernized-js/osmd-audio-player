import { useEffect, useRef, useState } from "react";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import PlaybackEngine from "@modernized-js/osmd-audio-player";

function Score({ file }) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const engine = new PlaybackEngine();
    engineRef.current = engine;

    const init = async () => {
      const osmd = new OpenSheetMusicDisplay(containerRef.current);
      await osmd.load(file);
      if (cancelled) return;
      await osmd.render();
      await engine.loadScore(osmd);
      if (!cancelled) setReady(true);
    };

    init();

    return () => {
      cancelled = true;
      if (engine.state === "PLAYING") engine.stop();
    };
  }, [file]);

  const play = () => engineRef.current?.play();
  const pause = () => engineRef.current?.pause();
  const stop = () => engineRef.current?.stop();

  return (
    <div>
      <div className="controls">
        <button onClick={play} disabled={!ready}>Play</button>
        <button onClick={pause} disabled={!ready}>Pause</button>
        <button onClick={stop} disabled={!ready}>Stop</button>
      </div>
      <div ref={containerRef} />
    </div>
  );
}

export default Score;
