# Netlify配信とFly.io・Neon設定確認

確認日：2026-11-01（UTC日時はworkflowを参照）。今回のユーザー依頼は最新版のNetlify配信、および前日に手動設定したFly.io・Neonの確認。Secretsは変数名・設定状態のみ、Neonは構造・移行番号・教材件数だけのSELECTを追加承認。Fly.io共有IPv4の割当も明示承認された。

## 配信方式と検査

未コミットの既存変更を含む現在のワークツリーから、日本史ラボ専用ComposeのNode.js 24環境で、単体174件・型検査・Nuxt静的生成を順に実行し成功。Gitのコミット・pushを行わず、生成した画面ファイルのみNetlifyへ直接アップロードする。自動配信の接続・再開は対象外。

`netlify.toml` はfrontendを基点に `npm run generate`、公開ディレクトリ `.output/public`、Node.js 24と同一オリジンのAPI接続を定義。`frontend/public/_redirects` で `/api/*` のみ日本史専用Fly.ioへ転送し、動的画面の直接アクセスを `/200.html` に接続。`frontend/public/_headers` で従来の個別画面のnoindexを静的ホスティングにも適用する。

資料保護の全履歴検査と差分空白検査が成功。生成物には教材・正答のAPIデータ、原資料、ローカル採点規則、秘密ファイル、ソースマップ、SQL・TypeScript・Vue・Markdownを含めない。HTMLのpayloadは空の学習データのみ。公開用生成物だけをZIP化し送信前に内容を確認する。

送信ZIPは111ファイル・389,519 bytes、SHA-256 `6add466197cdf0cee3bedde5b62b43745fb3201e16227492caafb2530bfa7dc1`。既知のローカル秘密値との一致は0ファイル。別担当の独立レビューは [cloud-deployment-review.md](cloud-deployment-review.md) に保存し合格。生成時のコンテナ絶対パスを指す `frontend/dist` symlinkは今回作成されたものと確認して削除した。

## Fly.io

- 対象：`japanese-history-practice`、東京nrt、1CPU/1GBの2マシン。既存release v6。
- 管理画面のfly.tomlはローカルの `frontend/fly.toml` と一致。ポート3000、HTTPS、health `/api/v1/health`、自動起動・自動停止、最小稼働0、構造更新のrelease commandを確認。
- `FRONTEND_URL` / `CORS_ORIGINS` は `https://japanese-history-practice.netlify.app`。`BETTER_AUTH_URL` は設定されているが、このコードの認証は独自Bearer方式であり、同変数は利用していない。
- 公開IPがなかったため、追加承認後に共有IPv4を割り当てた。割当後、公開healthはHTTP 200、公開教材一覧もHTTP 200・0教材・0問。
- 接続元制限：日本史Netlify originのOPTIONSは204・ACAO一致、不許可originは403・ACAOなし。どちらもno-store。
- Secrets一覧の登録は `DATABASE_URL` の1件のみ。秘密値は開いていないため接続URLそのもの・SSLパラメータ・DBユーザー権限の正確性は未確認。APIの教材一覧応答はDB接続成功を裏付けるが、接続先DBの同一性の証明ではない。
- `SECRET_KEY_BASE` が未設定。ログイン・登録・署名付きセッションには64文字以上の独立したランダムな秘密鍵が必要。画面操作による新しい認証情報の入力・保存は本人操作が必要であり、未実施。

## Neon

- 日本史専用プロジェクト、productionブランチ、AWS Singapore。
- `neondb` と `japanese-history-practice` の2DB。前者のpublic schemaにはテーブルなし。後者にアプリ用16テーブルを確認。
- 日本史専用DBのSELECT結果：PostgreSQL 16.15、最新適用SQL `007_essay_rule_scoring.sql`、教材0・問題0・公開問題0。個人情報・問題本文・正答は取得していない。
- ローカルの最新コードにある008の分類カタログは未適用。Fly.ioの既存releaseは今回更新していない。
- 教材やローカル採点規則は本番へ登録・転送していない。教材登録・原典照合・公開状態の決定は今回の設定確認と区別する。

## 配信結果

Netlifyへ確認済みZIPを送信し、deploy `6ae6dac60dc1c1bc660b463b` がPublishedになった。新規project IDは `84ebbdc9-aa4f-427b-a353-1beaeb6cd847`、最初の仮名は `majestic-rugelach-0150e9`。既存Fly設定に一致する `https://japanese-history-practice.netlify.app/` へ変更し、今回の配信依頼に基づき一般公開した。Git連携は作成せず手動の画面配信のみ。

認証情報を付けない外部HTTP確認：トップ・ログイン・`/practice/1/1` は200のHTML、ログインと演習にはnoindex/nofollow。Netlify経由のhealthと教材一覧も200のJSON・no-storeで、公開教材一覧は0件。配信CSSは今回生成したCSSとbyte単位で一致した。

ブラウザで1440pxと390pxを操作し、ホームの空教材表示・API正常表示・条件指定タブ・章節選択と無効状態・モバイルメニュー・ログインへの移動を確認。どちらも横スクロールなし。動的URLへ直接移動してNuxt画面が起動し、存在しない問題の案内を表示した。viewportは既定値へ戻した。画面記録：`docs/screenshots/cloud-deployment/desktop.jpg`、`mobile.jpg`（公開範囲変更前の操作確認）、`deployed-home.jpg`（一般公開後）。

認証用秘密鍵の設定・本番教材登録・新しいAPI/008適用は未実施。演習の解答・ログイン・個人情報の保存を動作確認済みとしない。設定監査は不備の検出を含めて完了し、サービス全機能の稼働確認とは区別する。

## 今回の変更と保存状態

- `netlify.toml`：今後同じ画面生成を再現するためのビルド設定。
- `frontend/public/_redirects` / `_headers`：日本史API転送・動的URL fallbackと検索除外。
- `docs/cloud-deployment-verification.md` / `docs/cloud-deployment-review.md`：配信・設定検査と独立レビューの記録。
- `docs/screenshots/cloud-deployment/`：上記3画像。秘密値・個人情報・問題本文なし。
- `docs/workflow/state.json` / `docs/workflow/contexts/operations.md` / 新規handoff：今回の依頼・検証・完了範囲。

これらは未コミット・未push。既存の未コミット変更と未追跡ファイルは保持した。公開はNetlifyの生成物と承認済みのFly共有IP設定のみで、資料原本・ローカル採点規則・教材DBは外部送信しなかった。

この文書は当時の配信・確認時点の記録です。その後の教材210問・採点規則・認証鍵・移行の本番反映は `docs/production-publication.md`、最新のNetlifyサイドバー反映は `docs/mobile-sidebar-production.md` を参照してください。
