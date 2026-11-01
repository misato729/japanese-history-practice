# トップページ改善と文字サイズ修正の本番配信

2026-11-02のユーザー依頼「デプロイまでしてください」に基づく。対象は日本史Netlifyの既存プロジェクト（84ebbdc9-aa4f-427b-a353-1beaeb6cd847）、公開URL https://japanese-history-practice.netlify.app/ 。配信前のPublishedは6ae743e8f1ef15458da8b941。トップページ改善・和風装飾・読み込み表示とrem指定の修正を静的画面として反映する。Fly/DB・Git連携・自動配信設定・公開範囲は変更しない。コミット/pushは依頼範囲に含めず実施しない。

## 配信元と検証の継承

HEAD 953727d と frontend/app/pages/index.vue の文字サイズ1指定の修正を含む現在の追跡対象から、frontend/config/content/scriptsの173ファイルだけをallowlistで独立コピー。原典・実教材・採点規則・秘密値・他の未追跡作業は含めない。生成環境は日本史専用の既存Node.js 24イメージと依存volumeを使用し、DB・env_file・秘密設定を与えない。生成物と検査metadataは local-only/homepage-production-20261102/ のみへ保存する。

同日直前の修正検証（docs/homepage-refresh-20261102.md）で実施したフロント176件・型検査・ビルド・ハーネス168件・PC/SP操作・独立レビューの結果を継承する。生成元のアプリ実装・設定・依存volumeはその検証後に変更していない。今回さらに静的生成・公開物全件監査・公開HTTPとPC/SPの実操作を実施する。DB/API検査はActions run 41353959266での成功結果を参照し、今回はCSSと画面配信のみのため再実行しない。

## 配信前の検出と修正

最初の生成はネットワーク無効の独立環境で終了コード0となったが、独立担当 homepage_deploy_review が旧公開物との比較で files/list-filter アイコンのCSS欠落を検出した。この候補は送信していない。生成環境のみ通常のbridgeへ変更して公開アイコンの取得を可能にし、再生成して再監査する。アプリソース・秘密/DB設定は追加していない。

Python urllibによる公開確認は接続エラーだったためcurlへ切り替えた。curlで配信前のホーム・試験概要・ログイン・演習6/24・health・教材一覧のHTTP 200、7セット210問、検索除外とAPI JSON/no-store、現行試験概要の案内保持を確認した。ホームは旧見出しのままである。記録はpublic-before.json。

## 変更ファイルと現状

今回の文書、docs/workflow/contexts/operations.md、docs/workflow/state.json、新しいhandoffが進捗記録の対象。文字サイズの実装修正と検証文書は直前タスクで作成済み。開始前からの未コミット・未追跡ファイルは保持する。

## 配信完了と公開確認

再生成は終了コード0・アイコン警告0。独立担当homepage_deploy_reviewが173ソース・111公開ファイル・19HTML/8JSON payloadとZIP全件を検査し合格。他18ページ本文・既存6アイコン・転送/検索除外を保持。秘密2値・14採点規則ID・教材800長文probeの混入0。原典や教材・秘密設定は送信しない。

ZIPは111ファイル・390,695 bytes、SHA-256 8859d24b8afd67d170703a927632f079e6a78962e391761f321da7c0addec77c。監査済みZIPをNetlifyのfilechooserで1回だけ送信し、deploy 6ae7b7319664bd42cb6a72ff のCurrently published / Productionを確認。Netlify表示は32 new files uploaded。根拠はdeployment-result.jsonとindependent-package-audit.json。

公開HTTP検査は2026-11-01T22:04:07.550Z（日本時間2026-11-02）に開始し成功。トップHTMLの全byte一致と公開JS/CSS/JSON/SVGの90ファイル全byte一致、6URLの200、API JSON/no-store、7セット210問、ログイン/演習のnoindex/nofollowを確認。public-after.json参照。

Chromeの公開PC1440×1000とSP390×844で見出し・和風装飾/スマホ非表示・アイコン・本文/リンク・模試カードに重なり/横はみ出しがないことを目視。PCでは下部へ実スクロールし利用案内とAPI正常表示、SPでは試験概要への移動とホーム復帰を実操作した。画像はpublic-pc.jpg、public-sp.jpg、public-pc-scrolled.jpg、操作記録はui-after.json。実機スマホではなく表示幅変更。viewport指定は解除。

Chromeの新規タブ作成や一部CDP操作がタイムアウトしたため、実際に存在する公開タブと取得できるAX/画像/スクロール/履歴操作へ切り替えた。公開DOMによる文字サイズ再測定とPCの試験概要リンククリックは完了していない。rem指定は今回の生成物監査と直前のローカル実測で確認済みであり、公開HTTPのbyte一致も確認した。公開SPのリンク操作は成功。

本番へ変更したのはNetlify静的画面のみ。Fly/DB更新・自動配信設定変更・コミット/pushは行っていない。既存の未コミット/未追跡作業は保持した。

最終独立レビューはhomepage_deploy_reviewが15条件を確認し合格、指摘0・ブロッカーなし。final-review.jsonに保存。上記の未実施の補助操作は制約として保持し、公開完了とは区別した。

## 後続のコミット・push依頼

2026-11-02の「コミット・pushしてください」により、文字サイズ1指定の修正と今回の検証・本番反映・進捗記録を送信する。以前の未送信overview配信記録と関連タスク・旧handoffは今回に含めず作業ツリーへ保持する。生成物・原典・実教材・規則・秘密値は送信しない。新たな配信は行わず、[skip netlify]を付けて現在の手動配信を維持する。

送信前にNetlify Developer settingsでCurrent repository: Not linkedを再確認。設定は変更せず、コミットへ[skip netlify]を付ける。

今回の11ファイルをc557888（Fix homepage typography and record production verification [skip netlify]）としてmainへpushし、origin/mainとの同期0/0を確認。送信前の独立レビューは15条件合格・指摘0。ステージした内容そのものの独立コピーでも進捗・根拠検査に成功。GitHub Actions 41356094900（https://github.com/misato729/japanese-history-practice/actions/runs/41356094900）はharness/verifyとも成功し、元の失敗箇所を含むフロント・型検査・ビルドとDB/API検査が完了した。実装・設定・依存関係に追加変更はない。この成功結果と完了進捗だけを後続の記録コミットとして送信する。
