# AdSense共通head追加と配信確認（2026-11-02）

「日本史も同様に」という明示依頼に従い、指定スクリプト追加、コミット・push、CI全ジョブ、Netlify自動配信、本番headを確認する。今回の依頼範囲では既存の配信禁止ルールよりユーザーの最新指示を優先する。Fly手動配信・DB変更・Google側設定は行わない。

着手時のGit変更はなし。共通headに指定src（client=ca-pub-2745326644447602）・async・crossorigin=anonymousを追加し、key=google-adsenseで読み込み後のDOM照合を安定させる。検証と配信は進行中。

## 送信と本番配信

機能コミット2736051ae57d2d0c2a6701c8c673035f5d19ca10をmainへpush。pre-pushの原資料全履歴検査成功、Git同期0:0。設定は共通app.head.scriptの6行のみ追加。既存のfavicon/テーマ/画面文言/API/DBは保持。

Netlify管理画面で自動公開ON、Published main @2736051、デプロイ6ae8628a16c4faae7bd22b3b（30秒）を確認。設定切替や手動デプロイは実行していない。

実Chromeで演習practice/1/1/のradioフォーム表示後にdocument.headを読み取り、指定src/async/crossorigin=anonymous/data-hid=google-adsenseのscriptが1件。プライバシーポリシーへのアプリ内リンク遷移後も1件を維持。回答送信・採点・アカウントの書換えは行っていない。広告表示・Google審査は対象外。

実Nuxt設定読込と導入済Unhead生成、資料保護、テンプレート、差分検査成功。独立コードレビューもPASS。CI41427204815はharness/verify/netlify-staticの全3ジョブsuccess、gh run watch --exit-statusは0。独立最終レビューjapanese_adsense_reviewもPASS。差分・CI全3ジョブ・保存HTML7件を別担当が確認し、Netlify管理画面と実ブラウザのDOMは親担当の実確認を根拠にした。

## 本番HTML検査

`/`、`/login/`、`/privacy-policy/`、`/terms/`、`/practice/1/1/`、`/admin/questions/`、`/reset-password/`の全7URLがHTTP200。各HTMLのhead内に指定src/async/crossorigin=anonymous/data-hid=google-adsenseのscriptが1件。別担当も保存HTML7件を独立したHTMLParserで再検査しPASS。

- CI: https://github.com/misato729/japanese-history-practice/actions/runs/41427204815
- Netlify: https://app.netlify.com/projects/japanese-history-practice/deploys/6ae8628a16c4faae7bd22b3b
- 本番: https://japanese-history-practice.netlify.app/

変更ファイルはfrontend/nuxt.config.ts、docs/adsense-release-20261102.md、docs/workflow/state.json、docs/workflow/contexts/operations.mdと、合格評価/完了の引き継ぎr146/r147。完了記録の追送は文書のみのためskip netlify/skip ciを指定し、検証済み機能SHA2736051と本番配信を維持する。
