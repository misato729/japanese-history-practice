# 管理教材一覧のSQL発行数修正

確認日：2026-11-01。依頼：管理画面の教材一覧でSQLが99件実行される問題を修正し、再デプロイする。

## 変更

`frontend/server/services/learning-structure.ts` の `listExamSets` を、教材・大問・共通本文・小問の4回の一括読込へ変更した。大問と小問の詳細、選択肢、関連分類、参照、履歴件数、ロック版、公開状態、未登録教材枠、各階層の順序を含む既存の返却形式は維持する。単体の教材・大問読込を含む認証・権限・保存処理は変更しない。小問詳細のSQL断片と大問の整形だけを共通化した。

この件数はDBへの呼出し回数であり、SQL内部の相関副問合せをなくす変更ではない。教材がある場合は一覧本体4件＋認証1件の5件。大問が0件なら一覧本体2件。DB構造の変更は不要。

## 検査

- 変更前のローカル7教材・28大問で一覧本体98件を計測。認証の1件を加えると99件。
- 変更後、同じDBをREAD ONLYトランザクションで照合：一覧本体4件、認証込み5件。旧単体読込を全教材に適用した結果と新一覧の全返却値が完全一致。本文・正答・個人情報は出力していない。
- 新規 `frontend/server-tests/admin-exam-list.test.ts`：末尾 `_test` のDB内の一時schemaと合成データで、7教材・28大問・210問、1教材、未登録枠、空DB、公開状態混在、挿入順と表示順の相違、履歴件数、返却内容の同値、SQL上限、対象外保持を検査。終了時rollback。
- 現ワークツリーでの対象2件は成功。全体検査では今回と無関係な既存差分による失敗2件（ローカル採点カタログを含む環境への依存、追加済み008に対する旧migration検査の固定期待値）を検出した。これらを今回の修正へ混ぜて変更しない。
- 配信候補はGit HEADの安全なソースに、今回の実装と新規検査だけを加えて作成。原資料・ローカル教材・採点規則・秘密ファイル・node_modulesは送信対象外。候補のサーバー検査89件成功、失敗・スキップ0。型検査とnode-server本番buildも成功。
- 本番配信前にFly.ioの既存 `learning-structure.ts`・package・exam設定のSHA-256を内容非表示で照合し、Git HEADの3ファイルと一致した。無関係な未コミットのAPI・分類変更や008を本番へ混在させない。
- 独立レビューで分離候補の全ソースを照合。HEADとの差分は今回の実装1件と新規検査1件のみ。候補とワークツリーのこの2ファイルはbyte一致、実.env・保護資料・008・symlinkの混入なし。
- 本番用Dockerイメージをローカルで構築し成功（261 MB）。対象ソースのSHA-256は `ba962f9b3a49ee15c457c2a35c8c1bbd95469a25921b9c20404264654d3ba1e3`。image tagは `registry.fly.io/japanese-history-practice:admin-list-sql-20261101`。配信は既存2マシンへのrolling更新、公開IPや新しいマシンを追加しない。

独立レビュー：`docs/admin-exam-query-review.md`。画面ソースは変えていないためNetlify静的ファイルの再生成は不要で、同じNetlify URLから転送されるFly.io APIを更新する。

## 配信・残る確認

Fly.ioの既存2マシンへrolling更新を完了。配信imageは `registry.fly.io/japanese-history-practice:admin-list-sql-20261101`、digest `sha256:bee7b25655edb10a7f2cdb3385e7ece6903eee5954f6d3f730a833192276ed97`。ローカル送信が14層中12層で数分進まなかったため、置換開始前に中断し、同じイメージを再送して完了した。release command成功後、既存2台の設定更新とDNS確認を通過。CLIにはIPがない旨の表示が出たが、実際の外部接続は下記のとおり200で、IPの割当・解放は行っていない。

本番VM内で内容非表示の照合とREAD ONLY確認を実施：対象ソースSHA-256一致、実行bundle内の一括読込SQLを確認、一覧本体2SQL・既存設定の5教材枠・大問0・問題0・migration007。今回の候補は従来の本番と同じHEAD設定を保持しており、ローカルの7教材設定や008へ変更する配信ではない。

外部から認証なしで確認：Fly直接health200、Netlify経由health200・教材一覧200/0件、管理教材一覧401/unauthorized。APIはすべてno-store。Netlifyの静的生成物には変更がなく、既存の一般公開URLから新APIへ転送されることを確認した。

本番への教材投入・採点規則転送・認証設定の変更は行っていない。本番に7教材を登録して認証済みHTTPリクエスト全体を99→5と計測したわけではなく、7教材での5件は合成検査と正常ローカルDBで確認した結果。前回の認証鍵未設定の指摘自体を解消したと表示しない。

## 変更ファイル

- `frontend/server/services/learning-structure.ts`：4回の一括読込。
- `frontend/server-tests/admin-exam-list.test.ts`：件数と返却形式の回帰検査。
- `docs/admin-exam-query-verification.md` / `docs/admin-exam-query-review.md`：検査と独立レビュー。
- `docs/workflow/state.json` / `docs/workflow/contexts/development.md` / `docs/workflow/contexts/operations.md` / 新規handoff：依頼・受入条件・進捗・完了範囲。

今回の引き継ぎ実体は `docs/workflow/handoffs/2026-11-01T07-02-42-652Z-r73.json`（合格評価）と `docs/workflow/handoffs/2026-11-01T07-02-43-126Z-r74.json`（完了記録）。

既存の未コミット・未追跡作業は保持し、今回コミット・pushは行わない。

この文書は当時の配信・確認時点の記録です。その後の教材210問・採点規則・認証鍵・移行の本番反映は `docs/production-publication.md`、最新のNetlifyサイドバー反映は `docs/mobile-sidebar-production.md` を参照してください。
