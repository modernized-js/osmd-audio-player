import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import AudioPlayer from "@modernized-js/osmd-audio-player";
import { PlaybackEvent } from "@modernized-js/osmd-audio-player/dist/PlaybackEngine.js";
import axios from "axios";

(async () => {
  const osmd = new OpenSheetMusicDisplay(document.getElementById("score"));
  const audioPlayer = new AudioPlayer();

  const scoreXml = await axios.get(
    "https://opensheetmusicdisplay.github.io/demo/MuzioClementi_SonatinaOpus36No3_Part1.xml"
  );

  await osmd.load(scoreXml.data);
  await osmd.render();
  await audioPlayer.loadScore(osmd);
  audioPlayer.on(PlaybackEvent.ITERATION, notes => {
    console.log(notes);
  });

  hideLoadingMessage();
  registerButtonEvents(audioPlayer);
})();

function hideLoadingMessage() {
  document.getElementById("loading").style.display = "none";
}

function registerButtonEvents(audioPlayer) {
  document.getElementById("btn-play").addEventListener("click", () => {
    if (audioPlayer.state === "STOPPED" || audioPlayer.state === "PAUSED") {
      audioPlayer.play();
    }
  });
  document.getElementById("btn-pause").addEventListener("click", () => {
    if (audioPlayer.state === "PLAYING") {
      audioPlayer.pause();
    }
  });
  document.getElementById("btn-stop").addEventListener("click", () => {
    if (audioPlayer.state === "PLAYING" || audioPlayer.state === "PAUSED") {
      audioPlayer.stop();
    }
  });
}
