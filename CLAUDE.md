# osmd-audio-player

OpenSheetMusicDisplay (OSMD) 用の非公式オーディオ再生エンジン。MusicXML楽譜の視覚表示とWeb Audio APIによる音声再生を同期する。

- **作者:** Jimmy Utterström
- **ライセンス:** MIT
- **バージョン:** 0.7.0（開発終了・メンテナンスモード）
- **リポジトリ:** https://github.com/jimutt/osmd-audio-player

## 主な機能

- フレームワーク非依存（Vanilla JS / React / Vue で利用可能）
- マルチ楽器対応（91種類のMIDI楽器、Musyngkiteサウンドフォント）
- 楽器ごとの音量制御
- MusicXMLからのテンポ自動検出・BPM変更
- スタッカートアーティキュレーション / タイ（リガチャー）処理
- 再生位置ジャンプ（seek）
- イベント駆動アーキテクチャ（STATE_CHANGE / ITERATION）

## アーキテクチャ

```
MusicXML → OSMD → PlaybackEngine → PlaybackScheduler → SoundfontPlayer → Web Audio API
```

### コアモジュール

| ファイル | 役割 |
|---------|------|
| `src/PlaybackEngine.ts` | メインオーケストレーター。楽譜読込・状態管理・カーソル同期・イベント発行 |
| `src/PlaybackScheduler.ts` | 音声タイミング制御。1024tick/全音符の精度、500msルックアヘッドスケジューリング |
| `src/players/SoundfontPlayer.ts` | soundfont-playerによる楽器音合成 |
| `src/players/InstrumentPlayer.ts` | 楽器プレイヤーのインターフェース定義 |
| `src/internals/StepQueue.ts` | ノートスケジューリングキュー |
| `src/internals/EventEmitter.ts` | 汎用イベントシステム |
| `src/internals/noteHelpers.ts` | ノートメタデータ抽出ユーティリティ |
| `src/midi/midiInstruments.ts` | 128種MIDI楽器マッピング |
| `src/players/musyngkiteInstruments.ts` | サポート楽器フィルタリスト |

### 再生状態遷移

```
INIT → STOPPED → PLAYING ⇄ PAUSED
                    ↓
                 STOPPED
```

## 技術スタック

### ランタイム依存

- `opensheetmusicdisplay` ^0.8.4 — MusicXMLパーサ・楽譜レンダラ
- `soundfont-player` ^0.12.0 — サウンドフォント再生
- `standardized-audio-context` ^24.1.25 — Web Audio API抽象化

### 開発依存

- TypeScript ^3.7.5
- Jest ^26.0.1 + ts-mockito（テスト）
- Babel（トランスパイル）
- Rollup（UMDバンドル）

## ビルド・開発コマンド

```bash
yarn dev          # TypeScript watchモード
yarn test         # Jestテスト実行
yarn build        # dist/ へコンパイル（CommonJS）
yarn build-umd    # umd/OsmdAudioPlayer.min.js 生成
yarn build-all    # 全ビルド（lib + UMD + demos）
```

## 出力

- **CommonJS:** `dist/index.js` + `dist/index.d.ts`
- **UMD:** `umd/OsmdAudioPlayer.min.js`（グローバル変数 `OsmdAudioPlayer`）

## デモアプリ

| ディレクトリ | フレームワーク | 内容 |
|------------|-------------|------|
| `demos/basic/` | Vanilla JS | 最小構成の参照実装 |
| `demos/vue-player-demo/` | Vue 2 + Vuetify | フル機能UI（テンポ・音量・楽器選択） |
| `demos/react-demo/` | React | React統合例 |
| `demos/umd-web/` | Plain HTML | Node.js不要のUMDビルド例 |

## テスト

- Jest + babel-jest + ts-mockito
- テストファイル: `src/internals/EventEmitter.test.ts`, `src/internals/PlaybackEngine.test.ts`
- カバー範囲: 状態遷移イベント、EventEmitter基本動作

## CI

- GitHub Actions（テスト → ビルド、ubuntu/windows/macos）
- Netlifyデプロイ（デモサイト）
