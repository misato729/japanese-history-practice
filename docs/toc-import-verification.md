# 目次の分類データ化とローカルDB登録

2026-11-01の依頼。PDF6〜8ページ（紙面2〜4ページ）の原画像を読み、章を大分類、番号節を小分類として登録した。

## 変更ファイル

- `config/exam.json`：18章・51節へ更新。既存の他の設定を維持し、未分類1章1節も保持。
- `local-only/toc-import/categories.json`：原典情報、部、章節、節の開始ページ、補助目次12件を保存。補助項目の丸数字も別フィールドへ保存。QR資料一覧は分類外として原画像に保持。
- `local-only/toc-import/page-006.png`〜`page-008.png`：照合用原画像。外部送信対象外。
- `frontend/server/database/migrations/008_category_catalog.sql`：分類用の親子テーブルを追加。問題・回答形式・履歴を変更しない。
- `frontend/server/operations/categories.ts`：設定を検証し、トランザクションと競合防止ロックで分類をupsert。対象外行は削除しない。
- `frontend/scripts/sync-categories.ts`：明示実行専用。自動起動・自動seedに組み込まない。件数だけを出力し、本番では実行を拒否。
- `frontend/server-tests/category-catalog.test.ts`：独立した_test DBで反復登録、対象外行保持、不正設定拒否、rollback、学習データ保持を確認。
- `local-only/toc-import/register.py`、`db-before.json`、`db-after.json`：今回の登録と前後照合。問題本文や秘密値を保存せず件数とdigestのみを記録。
- `docs/workflow/state.json` と今回の引き継ぎ：依頼・受入条件・評価結果を記録。

## 確認結果

- 原画像・補助目次・同期処理の独立照合：remote_safety_review、2026-11-01T01:43:34Z。18章・51節の表記、順序、所属、ID、開始ページに不一致0件。未分類を含めると19章・52節。
- 設定検査：成功。
- 独立した_test DBの同期検査：1件成功。
- 既存の設定検査：7件成功。
- Docker内の `npm run typecheck`：成功。
- 通常の専用ローカルDBで008を適用し、明示同期を2回実施。大分類19件、小分類52件で全行が設定と一致し、重複なし。
- 既存問題210件・分類リンク210件・回答履歴0件・お気に入り0件の前後の件数と全行digestが一致。既存問題の再分類は実施しない。
- 版・発行年の追加同定は今回未実施。分類は指定PDFの目次との照合に限定。

## 運用

DBへ再同期する場合は、対象をこの専用ローカル環境と確認した上で、`docker compose exec -T frontend npm run db:migrate`、続けて `docker compose exec -T frontend node --experimental-strip-types scripts/sync-categories.ts` を明示実行する。設定の正本はconfig、DBはその同期先。原資料と抽出JSONはlocal-onlyから送信しない。

今回の変更は未コミット・未push・未公開。開始時点の別作業の未コミット変更を保持した。教材や採点規則の更新、UI操作の再検証は対象外。
