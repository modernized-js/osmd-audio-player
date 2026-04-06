import { describe, test, expect, vi } from "vitest";
import PlaybackEngine from ".";
import { mock, instance, when } from "ts-mockito";
import { OpenSheetMusicDisplay, Cursor, MusicSheet, Fraction } from "opensheetmusicdisplay";
import { PlaybackEvent, PlaybackState } from "./PlaybackEngine";
import { IAudioContext } from "standardized-audio-context";

vi.mock("./PlaybackScheduler");

describe("PlaybackEngine", () => {
  describe("Events", () => {
    test("Playback state event on loadScore()", async () => {
      const acMock = createMockedAudioContext();
      const osmdMock = createOsmdMock();
      const stateCb = vi.fn();

      const pbEngine = new PlaybackEngine(acMock);

      pbEngine.on(PlaybackEvent.STATE_CHANGE, stateCb);
      await pbEngine.loadScore(osmdMock);

      expect(stateCb).toHaveBeenCalledTimes(1);
      expect(stateCb).toHaveBeenCalledWith(PlaybackState.STOPPED);
    });

    test("Playback state event on play()", async () => {
      const acMock = createMockedAudioContext();
      const osmdMock = createOsmdMock();
      const stateCb = vi.fn();

      const pbEngine = new PlaybackEngine(acMock);

      await pbEngine.loadScore(osmdMock);
      pbEngine.on(PlaybackEvent.STATE_CHANGE, stateCb);
      await pbEngine.play();

      expect(stateCb).toHaveBeenCalledTimes(1);
      expect(stateCb).toHaveBeenCalledWith(PlaybackState.PLAYING);
    });

    test("Playback state event on stop()", async () => {
      const acMock = createMockedAudioContext();
      const osmdMock = createOsmdMock();
      const stateCb = vi.fn();

      const pbEngine = new PlaybackEngine(acMock);

      await pbEngine.loadScore(osmdMock);
      await pbEngine.play();
      pbEngine.on(PlaybackEvent.STATE_CHANGE, stateCb);
      await pbEngine.stop();

      expect(stateCb).toHaveBeenCalledTimes(1);
      expect(stateCb).toHaveBeenCalledWith(PlaybackState.STOPPED);
    });

    test("Playback state event on pause()", async () => {
      const acMock = createMockedAudioContext();
      const osmdMock = createOsmdMock();
      const stateCb = vi.fn();

      const pbEngine = new PlaybackEngine(acMock);

      await pbEngine.loadScore(osmdMock);
      await pbEngine.play();
      pbEngine.on(PlaybackEvent.STATE_CHANGE, stateCb);
      await pbEngine.pause();

      expect(stateCb).toHaveBeenCalledTimes(1);
      expect(stateCb).toHaveBeenCalledWith(PlaybackState.PAUSED);
    });
  });
});

function createMockedAudioContext(): IAudioContext {
  return {
    currentTime: 0,
    suspend: vi.fn(async () => {}),
    resume: vi.fn(async () => {}),
  } as unknown as IAudioContext;
}

function createOsmdMock(): OpenSheetMusicDisplay {
  const mockedOsmd = mock(OpenSheetMusicDisplay);
  const mockedSheet = mock(MusicSheet);
  const mockedFraction = mock(Fraction);
  const mockedCursor = mock(Cursor);
  const playbackSettings = { rhythm: instance(mockedFraction) };

  //@ts-ignore
  when(mockedCursor.Iterator).thenReturn({ EndReached: true });
  when(mockedOsmd.cursor).thenReturn(instance(mockedCursor));
  when(mockedSheet.Instruments).thenReturn([]);
  //@ts-ignore
  when(mockedSheet.SheetPlaybackSetting).thenReturn(playbackSettings);
  when(mockedOsmd.Sheet).thenReturn(instance(mockedSheet));
  return instance(mockedOsmd);
}
