# 試験概要の分類案内を本番反映

2026-11-01 ユーザー「試験概要の案内文の修正も本番に反映してください。」に基づく。対象はコミット済みの「章・節や文化史の区分を指定して演習できます。」という1文。既存日本史Netlifyへ静的画面のみ配信し、Fly/DB・Git連携・自動ビルド設定は変更しない。新規コミット/pushは今回行わない。

既存プロジェクト `84ebbdc9-aa4f-427b-a353-1beaeb6cd847`、公開URL https://japanese-history-practice.netlify.app/、前回公開deploy `6ae726f33106d3d071996821` を対象とする。現HEAD `03f7902` の追跡対象だけを独立コピーし、原典・実教材・採点規則・秘密値を含めず静的生成する。前回の公開生成元との差は案内文を含む1ページと、公開生成物に入らない合成server検査ファイル1件のみ。

前回公開ZIPを比較基準として保持し、19HTMLのうち試験概要の対象1文だけの差と、他の本文・規約・API転送・検索除外の保持を独立検査する。生成物・安全なmetadata・操作画像は `local-only/overview-production/` に保持する。配信と検証の結果は完了時に追記する。

## 配信前の検証と画面の応答待ち

2026-11-01T13:06:44.000Z 時点で静的生成は終了コード0、公開候補は111ファイル・1,300,052 bytes。配信用ZIPは389,003 bytes、SHA-256 `2c43801434b2d267e7b36f3f448381120c76e422d2d5521b4f992f1e2f645ab4`。ZIPの全ファイルと検査済み公開候補のbyte一致を確認した。独立担当 `review_overview_deployment` は、19HTML中の試験概要1文だけの変更、他本文・hosting directivesの保持、原典・実教材・採点規則・秘密値の混入がないことを確認した。根拠は同ローカルディレクトリの `package-check.json`、`source-review.json`、`artifact-review.json`。

配信前の公開HTTP検査は成功し、旧案内が残り新案内がないこと、7セット210問とAPI転送・検索除外を確認した（`public-before.json`）。Netlify配信画面も従来deployのPublished状態だった。その後、Chromeのタブへの接続とファイル選択操作が応答待ちになり、アップロード開始・新規deploy・公開更新はいずれも確認できていない。認証済みの通常CLI経路も見つからなかった。ユーザーへChromeの操作可否と、ファイル選択画面が開いている場合のキャンセルを依頼した。本番反映と公開PC/SP確認は未完了として保持する。

## 配信完了

ユーザーの「操作できます」を受けて再開した。Chromeのファイル選択の読み取りは応答しなかったが、認証済みのアプリ内ブラウザで同じ日本史Netlifyの配信画面と従来Publishedを確認できた。検査済みZIPをfilechooserで1回送信し、2026-11-01T13:52:20.382Z にdeploy `6ae743e8f1ef15458da8b941` の「Currently published Production」「published, Deployed with Netlify Drop」を確認した。Netlifyが表示した新規アップロード数は32ファイルで、ZIP全体は111ファイル。再送は行っていない。安全な配信metadataは `deployment-result.json` に保存した。

公開URL https://japanese-history-practice.netlify.app/exam-overview/ で、新案内「章・節や文化史の区分を指定して演習できます。」の表示と旧案内の消失を確認した。2026-11-01T13:52:23.755Z の公開HTTP検査では、試験概要・トップ・ログイン・演習6/24・health・教材一覧がすべて200。7セット210問、ログイン/演習の検索除外、APIのJSON/no-storeを保持し、新しい案内JSとサイドバーCSSは検査済み生成物とbyte一致した。根拠は `public-after.json`。

公開画面をPC 1440×1000とスマートフォン390×844で実スクロールし、新案内を確認した。両幅で横はみ出しなし、API接続は正常。スマートフォンの模擬試験一覧を開閉し、ボタン直下110pxから縦に開く2列表示と非モーダルを保持した。画面操作の記録は `ui-after.json`、画像は `public-pc.jpg` / `public-sp.jpg` / `public-sp-sidebar.jpg`。一時的な表示幅指定はリセットした。

今回の変更はこの記録、`docs/workflow/contexts/operations.md`、`docs/workflow/state.json` と新規の引き継ぎ記録。配信候補・画像・検査metadataは `local-only/overview-production/` 内だけに保持した。案内文のソースは既存HEADのコミット済み内容を使用し、追加のソース修正・コミット・pushは行っていない。作業開始前から未追跡だった `frontend/dist` は保持した。Fly/DB・Git連携・自動配信設定・公開範囲の変更なし。

2026-11-01T13:59:50.654Z の最終独立レビュー（`final-review.json`、担当 `review_overview_deployment`）は合格、未解決指摘0件。公開操作・HTTP実行自体はroot担当で、別担当は監査済みZIPとの一致・公開結果の記録・3画像と文書の整合を確認した。PC/SPはブラウザの表示幅を切り替えた実操作で、実機スマートフォンの検査ではない。生成成功・Git保護検査・差分空白検査も成功し、進捗の合格評価・完了記録へ反映する。
