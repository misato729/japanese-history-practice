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

## API/DB反映結果

コミット2d8e73eec5ee8920609be0e0de56c1f68b7cb384（機能・実装検証・関連運用40ファイル）をmainへpush。送信保護hookと全履歴検査成功。Fly v12（2026-11-02T08:13:35Z）、image registry.fly.io/japanese-history-practice:deployment-01M6DN11KCTK4ASW0M5D9ZW1Q8、既存2台ともnrt・同image・health passing。配信処理exit0、176秒。移行用の一時release machineは終了済みで、永続サービスVM/IP追加なし。

共通db:migrateで009/010だけを適用、001〜008のchecksum保持。両VMの実ソース8ファイルhashがコミットと一致。新しいauth_version列と空のreset token表を確認。既存16業務表（移行履歴/可変rate bucketを除く）はcount/全列digestが事前と同一、usersは新列だけ除外。210問/560選択肢/登録1件、各14規則とhash維持。

Fly直接とNetlify同origin経由のhealth200・未認証password PATCH401・forgot/reset入力検査422・OPTIONS204（PATCH/POST許可）の10確認に成功。APIはno-storeで、本番originのCORS応答を保持。実パスワード変更や実メールは操作していない。

push後のNetlify deploy 6ae84698406d7d09c4bb2813とGitHub CI 41411702785は進行中。画面配信とCI全完了は後続確認で記録する。

## 画面・CIの確認結果

Netlify 6ae84698406d7d09c4bb2813がready/Published（2026-11-02T08:15:51.954Z）、機能commit2d8e73eと一致。既存のGit連携から配信され、設定変更や手動二重配信なし。[本番再設定画面](https://japanese-history-practice.netlify.app/forgot-password)。

公開login/forgot/reset（末尾slash両形を含む5経路）200とHTTP X-Robots-Tag noindexを確認。forgot/resetはno-referrer、resetはno-store。参照静的資産35件はすべて200・非空。DOMの共通robots metaはindex,followだが、検索除外はHTTP noindexが担保する。双方を同じ結果と報告しない。

PC1440×1000/SP390×844の実サイトで、login→forgot、未登録の合成.invalidアドレスの一般受付表示、もう一度依頼、再設定フォーム、合成fragmentのマウント後除去、再読み込みでリンク無効/再申請導線を確認。横はみ出しなし・console error0。最初のreset navigation直後は未描画だったため、見出し表示を待ってから評価・撮影し直した。新しいパスワードは入力せず、本番の変更/リセット保存は代行していない。7画像はlocal-only/password-release-20261102/screenshots/に保存。

[GitHub CI41411702785](https://github.com/misato729/japanese-history-practice/actions/runs/41411702785)：harness/verify/netlify-staticが全success。API/セキュリティ、フロント/型/build、Netlify正本設定による静的生成の各stepが成功。既存のローカル失敗履歴は実装記録に保持する。

実メールの受信、新しいパスワードの入力・保存・再ログインは本人確認を依頼済みで、現時点では未確認。GAS GETの公開状態や一般受付202だけを配送成功としない。パスワード/再設定リンクをチャットへ貼らないよう案内した。

詳細証跡：local-only/password-release-20261102/ のbefore/after、preservation-check.json、fly-status.json、public-api-check.json、static-public-check.json、public-ui-check.json、netlify-published.json、ci-jobs.json、source manifestと安全な配信ログ。値や教材本文は出力しない。

## 最終判定と本人確認

2026-11-02T08:22:58.802Z、独立担当email_reset_reviewが両VM/ソース/16表の保持/移行/14規則/公開5経路35資産/7画像/CI全3job/差分と同期を再照合しPASS、blocking指摘なし。本人確認前の保持照合として有効で、後続の本人パスワード更新による正当な変化を不具合としない。

同日のユーザー回答「メールが届き、再設定・ログインできた」により、日本史の登録メールへの実配送・リンクからの保存・新パスワードでのログイン成功を本人報告として確認した。パスワードや実リンクを取得/記録せず、本人の操作を代行していない。独立レビューの配信・保持PASSと、本人による実動作確認を区別する。先の未確認記述はその確認時点の状態で、現在は本番反映と本人確認が完了。

完了記録だけを後続commit/pushし、[skip netlify]/[skip ci]で同じアプリの二重配信/再検査を省く。検査・本番配信済みのアプリcommitは2d8e73e。コード/SQL/設定の追加変更なし。
