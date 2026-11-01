# 既存問題の章節分類

2026-11-01の依頼。既存210問へ、指定教科書目次の章・節を主分類として設定し、複数分野を問う場合は関連分類も設定する。文化史区分は独立して保持する。

## 方法と保持範囲

既存の登録原稿とDBの設問・解説210件を読み取り専用で照合し、不一致0件。問題本文・解説の新規一括書き出しは自動審査で拒否されたため行わず、既存原稿を参照した。教科書のページだけで大問を一括分類せず、個別の主知識・出典・通史性を確認する。誤肢に登場するだけの分野は関連分類としない。

更新は共通Writerの `saveQuestion` と全体トランザクションを使用する。登録前の全対象IDと内容digestを照合し、分類以外の内容digest・content_versionが変わればrollbackする。直接SQLで問題や回答履歴を更新しない。主分類・関連分類以外は保持し、反復操作の不変性も確認する。

## ファイル

- `local-only/question-taxonomy/mapping.json`：各問題IDの章節・関連分類・判断分野・参照位置。本文や正答は記載しない。
- `local-only/question-taxonomy/source-map.json`：DBの出典位置と変更前分類。本文を含まない。
- `local-only/question-taxonomy/export.mjs`：上記の出典メタデータ取得。
- `local-only/question-taxonomy/check-archive.py`・`archive-equality.json`：既存原稿とDBの読取照合、210件不一致0。
- `local-only/question-taxonomy/apply.mjs`：共通Writerを使う明示登録。ID・分類正本・digestを検査し、件数だけを出力。本番では拒否。
- `local-only/question-taxonomy/snapshot.mjs`・`capture.py`・`db-before.json`：分類以外の問題属性、選択肢・履歴・お気に入り・教材・大問・利用者のdigestと参照関係を取得。本文・個人情報・秘密値を出力しない。
- `local-only/question-taxonomy/test-preservation.mjs`：独立_test DBの合成データで主分類変更、内容版、履歴・お気に入り・選択肢ID、二重保存、分類絞り込みを検査しrollback。
- `local-only/question-taxonomy/register.py`：レビュー済みの対応表で2回の登録・保持・再読込を検査。
- `local-only/question-taxonomy/review-resolution.json`・`review-final.json`：個別指摘への対応と最終独立確認。
- `docs/question-taxonomy-verification.md`：本記録。
- `docs/workflow/state.json` と今回の引き継ぎ：受入条件と評価記録。

## 実施済みの検査

- _test DBの既存grouped-learning：4件成功、スキップ0。
- 合成問題の主分類更新・履歴等のID保持・反復・絞り込み：成功。最初の検査では旧回答API形式を使用して409になり、現行の回答形式・版・送信キーを指定して再検査した。アプリ実装は変更していない。
- 最終独立レビュー：taxonomy_independent、2026-11-01T02:30:09.961Z、passed。ID重複・欠落・未分類・無効分類0件。具体的指摘の修正、誤肢・背景だけの関連分類の除外を確認。
- 最終分類表は210問、関連11問15リンク。SHA256：`18f6dfe1e67781080ed4d8af3da821690a314414b961d2c888059b46d7ea4ec9`。
- 通常DB：210問全件に主分類を登録し、関連を含む225リンクが対応表と完全一致。未分類0件。
- 初回の呼出は240秒の待機期限を超過したが、DB側では全体commitが完了していた。DBの未分類0・稼働transactionなしを確認し、重複した稼働処理がない状態で再接続した。2回の再実行はともに変更0件。
- 再読込後も、分類外の全問題属性（内容版・公開状態・文化史区分など）、選択肢、履歴、お気に入り、教材、大問、利用者の全行digestとpassage参照が初期状態と一致。本文・正答の変更なし。

原資料と分類対応表はlocal-onlyに保持する。今回の変更はローカル作業で、コミット・push・公開は行わない。開始時点の他作業の差分を保持する。

追加確認：一致済み分類を省略するガードも独立レビュー済み。最終スクリプトの2回実行で変更0件、全保持検査成功。起動中APIの章節AND条件で5件・4件・0件の3条件が対応表と一致し、0件時の条件外出題もないことを確認した。根拠は `local-only/question-taxonomy/live-filter-check.json`。
