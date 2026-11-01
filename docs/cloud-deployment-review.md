# Netlify配信準備の独立レビュー

確認日：2026-11-01 UTC。担当：review_cloud_deploy（配信準備の実装担当rootとは別担当）。本番操作・DB操作・外部送信・重い検査は行っていない。

## 対象と判定

`netlify.toml`、`frontend/public/_redirects`、`frontend/public/_headers`、`frontend/.output/netlify-20261101.zip`、`docs/cloud-deployment-verification.md` と、整合確認に必要なAPI接続・認証・Nuxt設定を確認した。

画面生成物の直接配信準備は合格。設定差分に配信を妨げる問題は見つからなかった。公開URLでのAPI転送、動的URLの直接アクセス、PC/SP操作は主担当の公開後確認が必要。教材0件・秘密鍵未設定・旧API releaseという残課題は解消しておらず、サービス全機能の稼働承認とは区別する。

## 独立して確認した内容

- ZIPは111ファイル、SHA-256は `6add466197cdf0cee3bedde5b62b43745fb3201e16227492caafb2530bfa7dc1`。全エントリーが `.output/public` の同名ファイルと一致する。
- ZIPに保護対象名、秘密ファイル、PDF/ZIP、SQL/TypeScript/Vue/Markdown、ソースマップ、サーバーファイルはない。8件のNuxt payloadの学習dataは空で、原教材・答案・個人情報のAPI結果を含んでいない。
- `index.html` の公開API baseは空文字で、localhost:3300 / 127.0.0.1:3300等のローカルサービスURLは含まない。
- `/api/*` の強制proxyがSPA fallbackより先にあり、日本史専用Fly.ioの同じ `/api/` パスに接続する。静的ファイルを優先する末尾fallbackは存在する `/200.html` を参照している。
- authのクライアントは同一originのsecure・same-site cookieを保持し、APIへBearer headerを送る既存方式。Netlify側へのDB・署名秘密鍵の配置は不要。実際の認証成功は未確認で、Fly.ioの秘密鍵未設定が残る。
- `_headers` は既存Nuxt routeRulesにある演習・履歴・お気に入り・会員・管理・ログイン等のnoindex指定を静的配信へ引き継いでいる。ZIP内のheaders / redirectsはソースと一致。
- `node scripts/check-private-sources.mjs` と `git diff --check` を独立に実行し成功した。単体174件・型検査・静的生成の成功は主担当の実行結果を根拠とし、再実行していない。

## 残課題・報告範囲

Neonの構造・件数、Fly.io管理画面の設定、HTTP応答は主担当の確認記録が根拠であり、本担当は外部サービスを再確認していない。`DATABASE_URL` の値・SSLパラメータ・権限・本番DB同一性を確認済みとはしていない点は適切。教材や採点規則の本番登録・008適用・最新API再配信は未実施として扱う。

生成時に作られた `frontend/dist` は `/workspace/frontend/.output/public` を指すコンテナ内絶対パスのsymlinkで、初期Git状態にはなかった。ZIPには含まれない。主担当へ生成副作用として通知し、初期状態との差を踏まえて扱う。

主担当からの追加報告：公開APIはhealth HTTP 200、exams HTTP 200/data 0件、正しいNetlify originのOPTIONSは204かつACAO一致、不許可originは403で、いずれもno-store。Neon日本史DBは16テーブル・PostgreSQL 16.15・教材/問題/公開0件・最新SQL007。これらの報告は画面配信だけを行い、教材転送・本番DB更新・Fly.ioコード更新を行わないという今回の範囲と整合する。公開Netlify URLからの転送は依然として配信後確認が必要。

## 配信後の記録レビュー

同日、主担当が追記した配信結果とoperationsカードを再読し、画面記録3画像を本担当も開いて確認した。公開後の記録を含めて合格。追加のコード修正を要する指摘はない。

- 配信記録：Netlify project `84ebbdc9-aa4f-427b-a353-1beaeb6cd847`、deploy `6ae6dac60dc1c1bc660b463b` Published、公開URL `https://japanese-history-practice.netlify.app/`。Git連携なしの手動配信という記録は今回の準備方法と一致する。
- 主担当の認証なしHTTP検査はトップ・ログイン・動的演習URLのHTML 200、ログインと演習のnoindex、proxy経由health/examsのJSON 200・no-store、exams 0件、CSSの生成物とのbyte一致を確認している。本担当は外部リクエストを再実行せず、その検査結果と記録の整合をレビューした。
- 主担当は1440px/390pxで空教材・条件指定・メニュー・ログイン遷移・動的URL直アクセスと横overflowなしを操作確認し、viewportを戻している。本担当は `docs/screenshots/cloud-deployment/desktop.jpg`、`mobile.jpg`、`deployed-home.jpg` を独立に視認した。画像に画面の重なり・切れ・問題本文・秘密値・個人情報は見つからない。前2画像は一般公開前のNetlifyツールバーを含む記録であり、公開後のhome画像と区別している。
- operationsカードと最終記録は、教材0件、認証用秘密鍵未設定、API release/008未更新を明示し、演習解答やログイン成功を確認済みと誤認させない。未コミット・未push、資料・採点規則・教材DB未送信の境界も一致する。
- 生成副作用の `frontend/dist` は主担当が今回作成分と確認して削除したと記録されている。レビュー担当が既存ファイルを削除したものではない。

当初の「公開後確認が必要」という判定は、上記の主担当実測と記録レビューによって画面配信の範囲では充足された。秘密鍵の本人設定、本番教材登録、最新API/008の反映は引き続き別の未実施作業である。

この文書は当時の配信・確認時点の記録です。その後の教材210問・採点規則・認証鍵・移行の本番反映は `docs/production-publication.md`、最新のNetlifyサイドバー反映は `docs/mobile-sidebar-production.md` を参照してください。
