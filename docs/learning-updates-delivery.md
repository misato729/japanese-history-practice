# 分類・根拠資料・解説のGit送信とNetlify反映

2026-11-01の「コミット・pushしてください」と、追加の「netlifyはもうデプロイOKです」に基づく作業。

## 対象と保持範囲

このチャットで完了した章節分類、根拠資料の確認語表示、許容資料範囲の点検、資料表の復元、作問用内部評価の非表示を対象とする。実問題・出典対応・表の保存内容はローカルDBに保持し、GitやNetlifyの静的ファイルへ含めない。原本・全文OCR・ローカル採点規則・秘密値も送信しない。

共有ファイルは今回の差分のみをindexへ投影し、手元の全文を保持する。分類設定は `categories` のみ、AGENTSは今回の6項目、developmentカードは今回の3段落、stateは当該7タスクと今回の配信タスクを対象とする。別チャットの公開文言・規約・論述登録・管理API等の差分はコミットしない。

Netlifyは既存の日本史専用プロジェクトへ画面生成物だけを直接配信する。前回公開が未コミット変更を含む画面全体から行われているため、現在のワークツリーから生成し、公開済みの文言・規約・画面設定を保持する。Gitの限定コミットとは生成元の範囲が異なる。Git連携・自動配信設定、Fly API、本番DBの変更は行わない。

## ファイル

- `config/exam.json`：今回の分類設定のみ。
- `frontend/scripts/sync-categories.ts`、`frontend/server/operations/categories.ts`、`frontend/server/database/migrations/008_category_catalog.sql`、`frontend/server-tests/category-catalog.test.ts`：分類の明示同期・検査。
- `frontend/app/utils/learningPresentation.ts`、`frontend/app/pages/practice/[examNumber]/[questionNumber].vue`、`frontend/tests/groupedLearningPresentation.test.ts`：確認語と解答解説の表示・合成検査。
- `AGENTS.md`：今回の原典・撮影位置・表構造・内部評価に関する6項目。
- `docs/toc-import-verification.md`、`docs/question-taxonomy-verification.md`、`docs/source-reference-format.md`、`docs/source-reference-terms.md`、`docs/material-table-display.md`、`docs/learner-explanation-display.md`：各作業の確認記録。
- `netlify.toml`、`frontend/public/_redirects`、`frontend/public/_headers`：承認された画面配信の設定、API転送、動的URLの直接アクセス、検索除外。
- `docs/learning-updates-delivery.md`、`docs/workflow/contexts/development.md`、`docs/workflow/contexts/operations.md`、`docs/workflow/state.json`、対象の不変handoff：送信・公開の記録と対象タスク。

削除なし。ローカル専用の変換器修正・監査結果・画像・教材データは引き続きローカルに保持する。上記以外の既存差分と未追跡ファイルを保持する。

## 確認状況

送信先は既存 `misato729/japanese-history-practice` の `main`。GitHub接続でpublic・push権限ありを現在確認し、変更なし。取得時点のHEADとorigin/mainは一致。既存pre-pushの全履歴資料保護検査を維持する。

検査・Git同期・CI・Netlify配信結果は完了後に追記する。詳細な安全検査と生成物のhashは `local-only/learning-updates-delivery/` に保持し、問題本文や秘密値をこの記録へ転載しない。
