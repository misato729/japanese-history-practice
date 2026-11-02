# 日本史のパスワード変更・GAS再設定（2026-11-02）

ユーザーの実装依頼に基づき、世界史の検証済み機能f89327aを参考に日本史の既存構成へ移植する。Git送信/配信/GAS実設定/実メール/通常・本番DB操作は未依頼で、この作業の実施範囲に含めない。

## 実装範囲

アカウント設定で現在/新規/確認入力を検査し、変更後は新しいセッションへ更新する。他の旧セッションと旧形式のtokenは認証版の増加で無効化。旧形式tokenは変更前の版0として互換を維持する。

メール再設定は未登録に送らず同じ受付応答、GASへ署名付き送信、30分/1回限りのhash保存、再申請・通常変更で旧リンク失効、ロック後の実時刻・認証版確認を行う。GASは日本史用の独立プロジェクト/共有鍵/originを設定し、既定のサイト名を日本史ラボへ変更する。世界史の設定・秘密・利用者は持ち込まない。

009はusers.auth_version追加、010はtoken表の追加。既存001〜008は保持し、日本史の008_category_catalog.sqlを世界史の別008で置き換えない。一般API・UI・認証Cookie設定と日本史の色を保持する。Netlifyの同一origin APIプロキシを維持し、静的_headersにも再設定ページの保護を追加した。

GASの設定手順は[gas-password-reset-setup.md](gas-password-reset-setup.md)を参照。

## 検証の経過

最初の小さい検査ではfragment/GAS/通信9件が成功したが、既存のローカル依存にVueがなく、認証セッションの検査を起動できなかった（unit-initial.log）。初回の不合格として記録し、ロックファイルを変えずnpm ciで依存を整えて再確認する。実装・通常DB・本番が失敗したものではない。

API/全体検査/型/build/静的生成/PCSP操作/独立レビューは継続中。結果・確認日・変更ファイルを後で追記する。

初回の全体サーバー検査は96/98成功、2件失敗。1件は既存テストが適用されるSQLを008までに固定していたこと、もう1件は既定のローカル専用論述カタログが検査へ読み込まれたこと。前者は新しい009/010を期待値へ含め、既存usersの版0と空token表も確認する。後者は空の自作カタログを明示して隔離する。ログに出たカタログの断片は自作ログから除去し、件数・テスト名・安全な原因だけを保持した。カタログ原本の変更や外部送信はしていない。

## 最終検証

2026-11-02、日本史専用の独立PostgreSQL16クラスタと `japanese_history_password_features_test`、空の検証用カタログ、模擬GASで実施。

- サーバー全100件成功、失敗/skip0。APIの変更/再設定/旧token失効/新規ログイン、未認証/誤入力、30分期限/ロック待機中失効、一度限り/競合、再申請/通常変更による旧リンク失効、配送遅延/拒否/送信枠、他利用者/履歴/お気に入り保持を確認。
- 移行検査で、既存001〜008の内容を変えずに009/010を適用し、既存5表の全列値保持、既存userの認証版0、空token表、再適用0件を確認。
- フロント全187件成功、失敗/skip0。新セッション更新/ログアウト後の遅延応答抑止、fragment、GAS実ソースの署名/ロック/重複/時刻境界/日次枠/日本史の送信名、通信先/リダイレクト/ACKを検査。
- 型検査・ビルド成功。ローカルNode22.15.1の既存バージョン警告は記録し、静的出力は対応するNode24.15.0で別途確認。
- 秘密・教材・旧出力を含まない409ファイルのクリーンコピーで、netlify.tomlを正本に `NETLIFY=true` の実生成成功。index/200/JS/CSS、forgot/resetのHTML、同一originの日本史APIプロキシ、追加_headersと_redirectsのバイト一致を確認。設定・Cookie・日本史色を保持。
- 実Vue部品+日本史CSS+合成API/認証でPC1440×1000、SP390×844/320×740を操作。変更の確認不一致/現パスワード誤り/72byte制限/成功と入力消去、login→forgot、未設定503/受付、resetのhash除去/期限切れ/同一タブ新リンク/確認不一致/72byte制限/成功/再読込無効/再申請、横はみ出しなしを確認。共通ヘッダー/フッターは省いた部品プレビューで、実保存と失効の証拠は隔離API検査と区別する。
- Chrome接続が途中で失われたためその操作を成功扱いにせず、文書化された復旧手順で新しいタブからスマホ操作をやり直した。6画像を保存した。スクリーンショットの直接保存権限がないため許可済み一時領域経由で日本史repoへ移し、元の自作一時画像だけを除去した。
- templateと差分検査、全履歴の資料保護検査は成功。npm依存/ロックファイルの変更なし。通常/本番DB、実GAS/メール、Git送信/配信は未実施。

独立担当 `email_reset_review` がソース・差分・全検査ログ・6画像・静的出力と409ファイルの入力範囲を独自照合しPASS。日本史の既存008/プロキシ/Cookie/色の保持、GASの分離、初回2つの失敗と検証範囲の区別も確認し、blocking指摘なし。自作のプレビューと専用DBは停止済み。

## 変更ファイル

開始時はGit差分なし。以下は今回の実変更で、ファイル削除はない。世界史repoは参照のみで未変更。生成された依存や静的出力はローカル検証物で、配信対象へ追加しない。

### 変更

- [.env.example](../.env.example)：GAS設定名と既定の無効状態だけを追加。
- [README.md](../README.md)：変更/再設定の利用案内と日本史用の設定手順。
- [architecture.md](architecture.md)：認証版と変更/再設定APIの仕様。
- [state.json](workflow/state.json)：新しい依頼・受入条件・失敗原因・評価履歴。
- [contexts/development.md](workflow/contexts/development.md)：実装完了と検証/未公開の範囲。
- [useAuth.ts](../frontend/app/composables/useAuth.ts)：認証付き変更PATCH、新セッション保存、古い応答抑止。
- [account.vue](../frontend/app/pages/account.vue)：現在/新規/確認、入力検査、成功/失敗とフォーム消去。
- [login.vue](../frontend/app/pages/login.vue)：忘れた場合のリンク。
- [nuxt.config.ts](../frontend/nuxt.config.ts)：再設定のSSR無効化とページ保護。既存のlocal-only監視除外は保持。
- [_headers](../frontend/public/_headers)：forgot/resetの両末尾slash、noindex/no-referrer/reset no-store。既存proxy/_redirectsは未変更。
- [api.test.ts](../frontend/server-tests/api.test.ts)：版付き/旧tokenの期待と変更APIの保持/競合/失効/制限の検査。
- [operations.test.ts](../frontend/server-tests/operations.test.ts)：新SQL期待と既存user版0/空token表の検査。
- [api/v1/[...path].ts](../frontend/server/api/v1/%5B...path%5D.ts)：日本史の既存handlerへ再設定を接続。
- [core/auth.ts](../frontend/server/core/auth.ts)：認証版の発行/検査と版0の旧token互換。
- [rate-limit.ts](../frontend/server/core/rate-limit.ts)：変更、申請、保存、全体配送枠。
- [accounts.ts](../frontend/server/services/accounts.ts)：変更API、ロック後の旧版拒否と現在パスワード照合。
- [auth.test.ts](../frontend/tests/auth.test.ts)：変更セッションとログアウト競合の検査。

### 新規

- [forgot-password.vue](../frontend/app/pages/forgot-password.vue)：登録メールの申請画面。
- [reset-password.vue](../frontend/app/pages/reset-password.vue)：リンク読込・除去、新規/確認、完了案内。
- [passwordReset.ts](../frontend/app/utils/passwordReset.ts)：fragmentの形式/多重値検査。
- [009_password_auth_version.sql](../frontend/server/database/migrations/009_password_auth_version.sql)：既存利用者を保持して認証版0を追加。
- [010_password_reset_tokens.sql](../frontend/server/database/migrations/010_password_reset_tokens.sql)：user FK付きtoken hash/期限/認証版。
- [password-validation.ts](../frontend/server/services/password-validation.ts)：8文字/72byteの共通検証。
- [password-reset.ts](../frontend/server/services/password-reset.ts)：匿名申請と一度限りの保存、GAS配送/失敗時に該当tokenだけを無効化。
- [password-reset-mail.ts](../frontend/server/services/password-reset-mail.ts)：GAS設定/署名/HTTP/ACK検証。
- [password-reset.test.ts](../frontend/server-tests/password-reset.test.ts)：日本史専用DBと模擬GASのAPI9件。
- [passwordReset.test.ts](../frontend/tests/passwordReset.test.ts)：fragment検査。
- [passwordResetGas.test.ts](../frontend/tests/passwordResetGas.test.ts)：GAS実コード5件、日本史の送信名を含む。
- [passwordResetMail.test.ts](../frontend/tests/passwordResetMail.test.ts)：設定・安全な通信3件。
- [Code.gs](../frontend/automation/password-reset/Code.gs)：日本史用の送信専用GAS。
- [appsscript.json](../frontend/automation/password-reset/appsscript.json)：最小送信scope/V8/例外ログ無効。
- [gas-password-reset-setup.md](gas-password-reset-setup.md)：世界史と分離したGAS/鍵/origin・有効化・確認手順。
- [password-features-20261102.md](password-features-20261102.md)：この検証・変更記録。
- [r139](workflow/handoffs/2026-11-02T07-22-03-809Z-r139.json)：初回依存不足の不合格評価。
- [r140](workflow/handoffs/2026-11-02T07-27-11-887Z-r140.json)：SQL期待/カタログ隔離の不合格評価。
- [r141](workflow/handoffs/2026-11-02T07-48-28-172Z-r141.json)：3回目の合格評価。
- [r142](workflow/handoffs/2026-11-02T07-48-39-098Z-r142.json)：ローカル実装完了の引き継ぎ。

### ローカル検証物

根拠は `local-only/password-features-20261102/`。実教材カタログや世界史の設定値を含めない。

- [port-manifest.json](../local-only/password-features-20261102/port-manifest.json)：参照元SHAと選択移植ファイル。
- [unit-initial.log](../local-only/password-features-20261102/unit-initial.log)、[server.log](../local-only/password-features-20261102/server.log)：初回検査（server.logは不要な診断本文を除去）。
- [server-final.log](../local-only/password-features-20261102/server-final.log)、[frontend-final.log](../local-only/password-features-20261102/frontend-final.log)、[typecheck.log](../local-only/password-features-20261102/typecheck.log)、[build.log](../local-only/password-features-20261102/build.log)：成功した全体検査。
- [npm-ci.log](../local-only/password-features-20261102/npm-ci.log)、[prepare.log](../local-only/password-features-20261102/prepare.log)、[initdb.log](../local-only/password-features-20261102/initdb.log)：ロックどおりの依存と専用DBの準備。
- [test-pg-path.txt](../local-only/password-features-20261102/test-pg-path.txt)、[empty-essay-catalog.json](../local-only/password-features-20261102/empty-essay-catalog.json)：自作の使い捨てクラスタの場所と空の検証カタログ。
- [static-check-path.txt](../local-only/password-features-20261102/static-check-path.txt)、[static-manifest.json](../local-only/password-features-20261102/static-manifest.json)、[static-build.log](../local-only/password-features-20261102/static-build.log)、[static-verification.json](../local-only/password-features-20261102/static-verification.json)：秘密や教材を除いた409ファイルの入力一覧、生成先とNode24実検証。コピー先の生成物はこのmanifest/検査の範囲に限る。
- [change-desktop.png](../local-only/password-features-20261102/change-desktop.png)、[change-mobile.png](../local-only/password-features-20261102/change-mobile.png)、[request-desktop.png](../local-only/password-features-20261102/request-desktop.png)、[request-mobile.png](../local-only/password-features-20261102/request-mobile.png)、[reset-desktop.png](../local-only/password-features-20261102/reset-desktop.png)、[reset-mobile.png](../local-only/password-features-20261102/reset-mobile.png)、[ui-verification.json](../local-only/password-features-20261102/ui-verification.json)：合成APIでの画像と操作範囲。
- [preview.mjs](../local-only/password-features-20261102/preview.mjs)、[index.html](../local-only/password-features-20261102/index.html)、[main.mjs](../local-only/password-features-20261102/main.mjs)、[account.mjs](../local-only/password-features-20261102/account.mjs)、[login.mjs](../local-only/password-features-20261102/login.mjs)、[forgot.mjs](../local-only/password-features-20261102/forgot.mjs)、[reset.mjs](../local-only/password-features-20261102/reset.mjs)、[scoped.css](../local-only/password-features-20261102/scoped.css)：実Vue部品の検証プレビュー。
- [workflow-initial.log](../local-only/password-features-20261102/workflow-initial.log)、[workflow-second.log](../local-only/password-features-20261102/workflow-second.log)：失敗時の進捗検査。
- [workflow-final.log](../local-only/password-features-20261102/workflow-final.log)：最終の進捗形式/依存/根拠参照検査。

単体プレビューではNuxt自動importの代替に伴うPAYMENTS_ENABLED警告があるが、今回は非課金表示だけを確認した。実ビルドと静的生成ログにはこの警告はない。実際のセッション/DB処理はAPI/認証テストで検証した。

## 後続の本番反映

2026-11-02の追加承認により、コミット2d8e73eをpushし、Fly v12・Netlify6ae84698406d7d09c4bb2813・SQL009/010へ反映済み。CI全3ジョブ成功、既存データと規則保持・公開PC/SP確認・独立レビューPASS、ユーザー本人が実メール受信・再設定・ログイン成功を確認した。実装段階の未公開記述は当時の範囲。[反映記録](password-release-20261102.md)を参照。
