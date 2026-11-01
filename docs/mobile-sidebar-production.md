# スマートフォンの縦開きサイドバーを本番反映

2026-11-01のユーザー依頼「本番反映してください」に基づく。実装・ローカルPC/SP確認済みの `mobile_sidebar_vertical` を日本史Netlifyへ反映する。コミット・push、Fly/DBの更新、自動ビルド接続・再開は対象外。

既存プロジェクト `84ebbdc9-aa4f-427b-a353-1beaeb6cd847`、公開URL https://japanese-history-practice.netlify.app/、公開済みdeploy `6ae6ef46e9bf8b2e48109bf5` を配信画面で確認した。Git連携なしの手動配信を維持し、既存の自動公開設定は変更しない。

前回公開ZIPと既存publicの111ファイルは全件同一。現在の追跡対象ソースだけをallowlistでローカル専用の独立作業コピーへ移し、前回から存在する公開済み文言・規約等を保持して画面を生成する。原典・実教材・採点規則・秘密ファイル・新しい未追跡の他作業は生成元へ含めない。完成したpublicだけを独立検査・ZIP化して配信する。

## 生成物と送信前の確認

追跡対象の現物172ファイルを独立コピーし、ローカルの専用Composeで静的生成が終了コード0で成功した。実操作確認済みのサイドバーSHA `0a820c4b46df7f64c426fe0781fe642c0ca6f0efa0c74bb9bb7ac53713a41ba5` と一致。新しいアプリ実装は追加していない。

独立レビューで111ファイル・1,299,998 bytes、HTML19ページのmain本文が旧公開ZIPと全件一致、HTML19/JSON8のpayloadに教材なし、API転送・検索除外が前回とbyte一致であることを確認した。symlink・禁止型・原典系のパスはなく、既知のローカル秘密2値、現行14採点規則ID、教材800件の長文probeの混入は0。縦開き・2列・非モーダルの生成CSSも確認した。

監査の初期probeは内部の一般的な要素IDと無関係なkeyframeまで対象に含めていたため、実際の14profile IDとサイドバーのselectorへ修正した。初回結果は `artifact-audit-probe-correction.json` に保持し、生成物を変更せず再監査で合格した。

公開ZIPは111ファイル・388,978 bytes、SHA-256 `76f8bb8b1016084e460a212b5b463ebbbb151699f249cf74dbeb53c9dbde5560`。ZIP内の全ファイルがレビュー済みpublicとbyte一致する。追跡対象・全履歴の資料保護検査と差分空白検査も成功。

## 本番反映と確認

既存プロジェクトのファイルアップロードからZIPだけを配信し、Netlify画面でdeploy `6ae726f33106d3d071996821` の **Currently published Production** と新規アップロード32ファイルを確認した。前回deployは保持されている。Git連携・自動ビルド設定、Fly、DBを変更していない。

- 公開トップ・ログイン・`/practice/6/24` はHTML200。ログインと演習のnoindex/nofollowを保持。
- health・教材一覧はJSON200/no-store。7セット・210問が引き続き利用可能。
- 新サイドバーのJS/CSSを公開URLから取得し、検査済み生成物とbyte一致を確認した。
- 390×844の本番画面でヘッダー直下・2列・高さ209pxの縦開きを確認。本文を動かさず一覧内をスクロールして模試7まで到達し、模試6の大問4件が全幅で表示される。
- 大問リンクを実クリックして `/practice/6/24` へ移動すると一覧が閉じる。既存の資料1も3列×3行の表として表示されている。
- 320×740で大問の全幅表示と横はみ出しなし、Escapeで閉じて起動ボタンへフォーカス復帰を確認。
- 1440×1000でPCの展開260px・閉鎖64pxと本文左端の同期を実操作し、横はみ出しなしを確認。

公開画面での8項目はすべて成功。画像は `public-sp.jpg`、`public-sp-320.jpg`、`public-pc.jpg`。一時的な画面サイズ指定を解除した。利用者が開いていた別の演習タブの状態は保持し、専用確認タブで操作した。独立した最終画像レビューは `final-review.json` を参照する。

## ファイルと保持範囲

- `docs/mobile-sidebar-production.md`：本配信の対象・生成・独立検査・公開結果。
- `docs/mobile-sidebar-vertical.md`：後続の明示依頼による本番反映を追記。
- `docs/workflow/state.json`、`docs/workflow/contexts/operations.md`、今回の `docs/workflow/handoffs/`：配信タスクの依頼・検査・完了記録。
- `local-only/mobile-sidebar-production/`：独立ソースコピー、旧公開ZIP、新生成物/ZIP、manifest、検査・配信結果、公開操作画像。ローカル専用。

今回の本番反映ではアプリソースをさらに編集せず、確認済みの画面ファイルだけを配信した。新規コミット・pushは行っておらず、記録は未コミット。既存の他作業の未コミット変更・未追跡ファイルは保持。削除なし。
