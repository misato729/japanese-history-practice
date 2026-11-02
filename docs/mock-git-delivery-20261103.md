# 入れ替え・模試8〜10関連の限定Git送信

2026-11-03「入れ替えもコミット・pushしてください」に基づき、模試4↔6・5↔7の共通Writerと検証/公開記録、模試8〜10の作問・DB登録/公開記録、教材枠10と300問の案内、関連する作問規則と進捗を対象とする。

別作業のプレミアム/料金/静的トップ/法務/決済とその進捗は含めない。共有ファイルは該当部分だけをHEADへ重ねた独立worktreeから送信する。問題本文・採点JSON・原典・秘密・ローカル画像は送信しない。すでに公開済みの配信は維持し、コミットに `[skip netlify]` を付ける。

対象の変更ファイルは `AGENTS.md`、`config/exam.json`、`frontend/server/services/learning-placement.ts`、`frontend/server/services/learning-writer.ts`、`docs/mock-number-swap-20261102.md`、`docs/mock-8-10-authoring-20261102.md`、`docs/mock-8-10-publication-20261102.md`、本記録、`docs/workflow/contexts/operations.md`、`docs/workflow/contexts/product.md`、`docs/workflow/state.json`、世代152〜159と今回のhandoff。

送信前のテンプレート設定、差分、資料保護、進捗構造は成功。既存の原典/画面/DB検証は元の確認記録を継承し、今回再実施した検査とは分ける。独立reviewと合成DB検査・送信/CIの最終結果は後続記録へ追記する。

入れ替えの既存35問合成テストを `frontend/server-tests/learning-placement.test.ts` へ移し、CIで履歴/お気に入り保持・反復0・途中失敗の取消を実行可能にした。ローカルサービスが停止しているため今回のDB再検査は開始できず、再起動せずCIで確認する。

2026-11-03の独立限定レビューは合格（publication_review）。現行Writerの再読と表題置換6例、料金/有料機能の除外、原典/問題データ未収録、CI用35問合成テストを確認した。
