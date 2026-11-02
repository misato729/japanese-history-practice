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

## 2026-11-02 追加依頼：広告利用に合わせたプライバシーポリシー修正（ローカル）

直前に指定scriptを追加した世界史・日本史の両サイトを対象に、広告未使用の記載を変更。第2条へ広告配信・効果測定・不正行為防止の目的を追加し、第3条へGoogle AdSenseと第三者配信事業者のCookie/過去の閲覧情報、ブラウザから送信されるURL/IP/ブラウザ・端末情報/識別子、その目的を追記した。Google広告設定・参加事業者のWebChoices、Google公式の情報利用説明/プライバシーポリシーへの4リンクを用意。パーソナライズ無効化は全広告/全処理の停止ではないことも説明。14条の番号・制定日を維持し最終改定日2026年11月2日を追加。他条やサービス固有の内容は維持。

確認した一次資料（2026-11-02）：
- https://support.google.com/adsense/answer/1348695?hl=ja （プライバシーポリシーの必須内容）
- https://policies.google.com/technologies/partner-sites?hl=ja （送信情報・目的・設定）
- https://policies.google.com/technologies/ads?hl=ja （Cookie・広告設定）
- https://policies.google.com/privacy?hl=ja
- https://adssettings.google.com/partnerads?hl=ja 、https://www.aboutads.info/choices/ （公式案内から設定先を確認。Google設定はCookie許可を求める応答で、実アカウントの設定変更はしていない）

検証：既存法務ページテストは世界史3件/日本史2件成功。実Vue SFCと実main.cssのTailwindコンパイル成功。一時ローカルの部品プレビューでPC1440x1000/SP390x844を実Chrome確認し、14条・4外部リンク・改定日・横はみ出しなし・リンクの画面内折返し・キーボード移動を確認、各画面を目視。共通レイアウト/DB/API/広告通信は含めない検証。初回のプレビューはNuxt共通SITEの渡し忘れで失敗し、プレビューだけを修正後に成功。viewportを復元し一時サーバーを終了。

今回は本文修正とローカル検証のみ。commit/push/本番反映、Google広告設定/CMP/同意機構の追加は行っていない。変更対象はprivacy-policy.vue、今回の検証追補、文脈カード、stateと合格評価/完了handoff。独立レビュー結果を完了記録に反映する。

独立最終レビューad_privacy_reviewはPASS。本文・Google一次資料・差分を独立確認し、既存テスト/PCSPは親の実確認を根拠とした。

## 追加承認：ポリシーのGit送信と本番反映

2026-11-02、両サイトのコミット・push・本番反映をユーザーが明示承認。本文修正とその検証/文脈/進捗/引き継ぎを対象限定で送信し、CI全ジョブとNetlifyの自動配信、本番本文を確認する。送信前の原資料全履歴・差分・実装完了gateを再確認した。Fly手動配信・DB変更は対象外。配信と最終確認は進行中。

## ポリシー配信の確認結果

本文配信コミット3b995872ac9e68110c25dabd3ff0df66989aca3bをmainへpushし、資料保護hook成功。GitHub CI41433887667はharness/verify/netlify-staticの全ジョブsuccess。Netlify管理画面で自動公開ON、Published main @3b99587、デプロイ6ae86e5595ed73232037998b（28秒）を確認。手動デプロイや配信設定の変更はしていない。

本番privacy-policy/はHTTP200、共通headのAdSense scriptは1件。生HTMLにも本文が含まれていた。別サイト（世界史）のクライアント描画用HTMLで初回の本文検査が止まったため、両サイトの確認範囲を分け、実Chromeで描画後のDOMを検査し、14条・広告目的・AdSense・URL/IP等の外部送信・無効化後の処理の説明・4リンク/属性・制定日/最終改定日・旧未使用記載の除去を確認した。

実本番のPC1440x1000/SP390x844で横はみ出しなし、広告リンクの画面内折返し、Google設定リンクからTabでWebChoicesへの移動、読み込み後head script1件を確認。各表示を目視し、viewportを復元。既存会員や回答への書込、Fly手動配信/DB変更、Google側設定/CMP変更は行っていない。

- CI: https://github.com/misato729/japanese-history-practice/actions/runs/41433887667
- Netlify: https://app.netlify.com/projects/japanese-history-practice/deploys/6ae86e5595ed73232037998b
- 公開ポリシー: https://japanese-history-practice.netlify.app/privacy-policy/

完了記録だけをskip netlify/skip ci指定で追送し、検証済み本文配信SHAを維持する。独立した配信レビューを完了記録へ反映する。

独立最終配信レビューad_privacy_reviewはPASS。対象差分・CIの全job/対象SHA・保存HTMLを独立確認し、Netlifyと描画後DOM/PCSPは親担当の実確認を根拠とした。
