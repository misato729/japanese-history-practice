# トップページの世界史版への統一（2026-11-02）

依頼：世界史ラボの今回のトップページ改善と同じ対応。

## 変更範囲

`frontend/app/pages/index.vue` のテンプレートとscoped CSSを変更。h1は「日本史ラボとは」、既存キャッチコピーと説明を維持。「→試験概要を見る」を既存 /exam-overview へのテキストリンクに変更。紹介エリア・装飾・タブ・演習カード・利用案内を世界史版と同じデザインへ統一した。

「模擬試験を読み込んでいます」とスピナーはexam-mode-panel内、模試選択タブの下に配置。role=status、装飾aria-hidden、動きを減らす設定に対応。エラー・空状態も同パネルへ移動。条件指定側の既存の件数確認と再読込は維持。

script全体はHEADと完全一致。日本史固有の条件指定補足も保持。既存のoperationsカード・進捗・未追跡ファイルを維持し、通常DBの書込、Git送信、本番配信は行っていない。

## 検証

- check-template成功、git diff --check成功。
- script不変、読み込み表示のパネル内配置を機械比較で確認。
- 独立担当homepage_reviewの静的レビュー合格。文言、リンク、世界史とのデザイン一致、スピナー、既存処理・日本史固有文言保持を確認。
- 既存日本史開発コンテナでnpm run typecheck成功。
- Chromeの日本史ローカル実APIでPC1440・SP390/320を確認。documentの幅とscrollWidth一致、本文・タブ・フォーム・利用案内の重なり/横はみ出しなし。
- 初回起動が約数分かかったが完了。実際の読込中にタブ下メッセージとスピナーを目視。取得後7模試表示、条件指定210問→美術史11問、タブ切替、試験概要リンクの遷移とホーム復帰を実操作確認。回答送信なし。
- プレビューはGit除外のlocal-only/homepage-preview/loading.pngとdesktop.png。ブラウザ幅を復元し既存開発環境を維持。

## 追加依頼：日本史の配色に統一

紹介背景・タブ・見出しの印・キャッチコピー・リンク・地球装飾の青系固定色を、日本史既存テーマの赤/ピンク系変数へ変更。レイアウトと動作は維持。PC1440/SP390の実画面を確認、独立レビューと差分検査成功。画像はlocal-only/homepage-preview/red.png。CSSの色のみの変更で型検査は再実行していない。Git送信・配信なし。

## 追加依頼：地球を和風の装飾へ変更

地球アイコン・軌道・点と関連CSSを削除し、日輪と青海波を組み合わせた独自のinline SVGへ置換。日本史の赤/ピンク系テーマ変数を使用し、aria-hidden・focusable=false・200px枠・960px以下非表示を維持。文言・script・演習処理は非変更。

2026-11-02、ChromeでローカルPC1440のSVG描画を目視、SP390で装飾非表示・横はみ出しなしを確認。git diff --check成功、独立担当homepage_reviewのSVG/CSS/既存処理レビュー合格。テンプレートと装飾CSSだけのため重い型検査を再実行せず、Nuxt開発画面の実描画で確認した。画像はlocal-only/homepage-preview/japanese-motif.png。DB・Git送信・配信なし。

## 送信準備

2026-11-02のユーザー明示依頼で今回のトップページ変更と関連記録だけをmainへコミット・pushする。以前の未送信記述は各検証時点の状態。NetlifyのDeveloper settingsでCurrent repository: Not linkedを確認し、連携/自動配信の設定変更はしない。予防としてコミットに[skip netlify]を付ける。

別作業のoperationsカード、overview-production.md、旧引き継ぎ、distは送信しない。進捗JSONはHEADを土台に今回の2タスクだけをステージし、既存作業のタスク・世代/最新引き継ぎの差分は作業ツリーへ保持する。今回の4引き継ぎは当時のローカル状態の記録として含める。資料保護検査・差分検査成功、最終独立レビュー合格。DB/Fly・手動配信なし。

## 追加依頼：CIの文字サイズ検査失敗を修正

2026-11-02のユーザー依頼「既存の方針に合わせて修正して、テストが通るか確認してください」に対応。Actions run 41353959266 の verify / Check frontend and production build は、typography.test.ts のvw禁止検査で1件失敗（175/176成功）した。

- frontend/app/pages/index.vue:570 の h1 を clamp(2rem, 3vw, 3rem) から 3rem へ変更。既存の640px以下2rem・htmlの90%基準を保持。HEADとの機械比較で変更はこの1指定だけ、script・文言は不変。テストの制約は緩めていない。
- 今回実施：日本史専用の既存開発コンテナで security:check、npm test（176/176）、typecheck、build がすべて終了コード0。check-template、git diff --check、資料保護の全履歴検査も成功。詳細ログは local-only/homepage-preview/typography-checks.log。
- Chromeでローカルトップページの1440/761/390/320px幅を目視・DOM測定。見出しはPC43.2px（3rem）、SP28.8px（2rem）、ルート14.4px。各幅のdocument scrollWidthとviewport幅一致。見出し・説明・リンクに重なり/横はみ出しなし。PCとSPで試験概要リンク→移動→ホーム復帰を実操作。viewport変更は解除。
- 独立担当 typography_review が、vw禁止・ルート基準追従・640px以下2rem維持・変更範囲を静的に確認し、指摘なし。
- DB/APIは変更していないため、同Actions実行で成功したDB/API検査を既存結果として参照。今回のDB/API再実行とは扱わない。
- 実装変更は index.vue、検証記録は本ファイル、進捗は docs/workflow/contexts/development.md・state.json・新しいhandoff。既存のoperations/overview関連の未コミット変更は保持。コミット・push・GitHub上の再実行・本番配信は未実施。

同日、進捗・資料保護ハーネス168件も全成功（local-only/homepage-preview/typography-harness.log）。
