# 日本史パスワード機能の本番反映（2026-11-02）

ユーザーの「本番反映まで進める」により、検証済み機能のコミット・push、Fly.io/Netlify配信、共通db:migrateによる009/010を行う。日本史専用GAS/秘密設定はユーザーが完了済み。世界史の設定は利用しない。

実装と検証・全変更ファイルは[password-features-20261102.md](password-features-20261102.md)、GAS設定は[gas-password-reset-setup.md](gas-password-reset-setup.md)。隔離DBのserver100/front187・型/build・Node24静的生成と独立レビューを再利用し、本番固有の確認を追加する。

既存2VMを更新し、新しいIP/VMは追加しない。SQL001〜008、教材、利用者、履歴、お気に入り、決済、現行14採点規則を保持する。規則は既存と同じ実行用ファイルとして配置しGit/イメージへ含めない。CLIの内部ログへ規則や秘密値を残さない。実メールの受信と本人の新パスワード入力はユーザー確認へ引き継ぐ。

## 確認状況

反映前：Git HEAD c2dc1f7、origin/main一致、資料保護と差分検査成功。Fly v11は以前のv10と同じimage、東京2VM。設定3項目の登録を名前だけ確認。値と共有鍵の一致・実配送は未確認。

今回追加/変更する運用記録は本書、workflow/state.json、contexts/operations.mdと新規handoff。削除ファイルなし。既存機能差分は実装タスクの37ファイルで、開始時に他の未コミット変更なし。

2026-11-02 08:08 UTC、秘密値を表示せず設定形式valid・GAS GET公開状態を確認。移行001〜008、210問、users1、全既存17表（可変rate bucketを除く）のcount/digestを本番内で集約して保存。usersは追加予定auth_versionを除く全列を照合する。両VMの実行用14規則と既存ローカル配置元のSHA-256が一致（a82437a69cbf8b53ef6cd702a9467e8c3b155bb60237714593fad9f2841b43b5）。実メールは送っていない。

既存FlyCLI依存cacheがnpm ciで消えていたため、利用可能な既存CLIへ運用ラッパーの参照を変更。最初の読取のみ起動はFileNotFoundで終了し、本番変更なし。machine statusの非対応jsonオプションも読取のみで停止し、statusの対応JSONへ変更した。配信失敗とは区別する。設定照会に伴うCLI内部ログの規則複製2件を伏せた。

既存DATABASE_URLはpooler。配信用の独立コピーではrelease commandだけを、プロセス内でhostのpooler接尾辞を外した直接接続から既存npm run db:migrateを実行する形へ置換する。接続値は出力/保存せず、本体のfly.tomlや他設定・認証は保持する。
