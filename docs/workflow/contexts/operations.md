# 資料・データ・配信

`AGENTS.md`、`docs/local-only-materials.md`、`docs/migration.md` と実際の依頼を確認します。

Compose・DB・ポート・Cookieは専用です。他サービスの秘密値へ接続しません。原資料・全文OCR・バックアップはGit・Dockerへ送信しません。

教材・論述採点規則の登録状況はDBとstate、ローカル検証記録で確認します。資料待ちでも独立した依頼済み実装を続けられます。SQLは新規追加し、独立test DBで検証します。起動で問題を自動投入しません。

全模試の論述登録は `local-only/essay-expansion-20261031/` の検証記録を参照します。既存5セットの10論述は新しい規則版とengineのdigestへWriterで更新し、新課程模試6・7は同じ登録トランザクションで追加します。再実行時は一致確認のみとし、起動時にこの登録処理を実行しません。採点規則自体は `frontend/local-only/essay-rule-profiles.json` に保持します。

コミット・push・公開・販売開始にはその作業への明示指示が必要です。今回のコピーはリモート・配信を引き継ぎません。

2026-11-01の明示依頼により、日本史Netlifyへ最新ワークツリーの画面生成物を直接配信し一般公開しました。Git連携・自動配信は接続していません。設定監査と残課題は `docs/cloud-deployment-verification.md` を参照：Fly共有IPv4を追加承認後に割当、Neonの日本史DBは16系・007まで・教材0件、Flyの認証用秘密鍵は未設定。教材登録・採点規則転送・最新API再配信は実施していません。

同日の後続依頼で、管理教材一覧のSQL削減だけを既存本番ソースへ加えてFly APIを再配信しました。Netlifyの静的ファイルは変更せず、API転送後のhealth/教材一覧200・管理APIの未認証401を確認。本番は従来の5枠設定・教材未登録・007のままで、ローカル7教材設定・008・採点規則は含めていません。詳細は `docs/admin-exam-query-verification.md`。

分類・出典・解説の限定コミットとNetlifyへの画面反映は `deliver_learning_updates`。今回の依頼・送信範囲・保持した他作業・検査・配信結果は `docs/learning-updates-delivery.md` を参照する。

本番DBへの210問登録と公開演習の有効化は `publish_210_questions`。実教材と現行14採点規則を明示依頼されたアプリデータとしてのみ扱う。対象・保持・安全な構造控え・API更新・登録・公開確認は `docs/production-publication.md` を参照する。

同タスクで日本史Fly v10・008・7教材設定と現行14規則を反映し、Neonへ210問を登録・公開した。全件export SHA一致、再実行変更0、公開210GETの内容一致と回答前非公開、全14論述の8点、PC/SPの3回答形式、6/24表の横スクロールと再読込を確認済み。両VMで公開210問と利用者等7テーブル保持を最終確認した。Netlifyは既存配信を維持し、新しいGit送信・自動配信開始は行っていない。原典PDF・全文OCR・利用者データの転送なし。

スマホ縦開きサイドバーの本番反映は `deploy_mobile_sidebar`。後続の明示依頼で、前回公開文言・規約・API転送を保持した静的111ファイルを日本史Netlifyへ配信し、deploy `6ae726f33106d3d071996821` の公開を確認。公開PC/SP操作8項目、新JS/CSSのbyte一致と7セット210問を確認した。Fly/DBやGit連携・自動ビルドは変更していない。詳細は `docs/mobile-sidebar-production.md`。

サイドバーと本番反映記録に加え、既存の未コミット分も実装と整合を合わせて送信する依頼は `push_mobile_sidebar`。追加承認に基づき、完成済みの7教材設定・案内/規約・管理SQL・作問運用・配信記録/進捗もレビューして選ぶ。試験概要の古い分類準備中表示を修正する。原典・実教材・規則・秘密・生成物は除外し、既存の本番配信を維持する。送信範囲・検査・同期/CI結果は `docs/sidebar-git-delivery.md` を参照する。

同依頼の実装・記録55ファイルは `bdbe9c7` でmainへpushし同期0/0、CI `41305587449` のharness/verify成功を確認。原典と実教材を含まない独立コピーで画面176・server90・保護/進捗168と型検査も成功。試験概要の新しい1文はGitへ反映済み、本番の追加配信は行っていない。生成symlinkだけを未追跡のまま保持した。

後続の試験概要案内文の本番反映依頼は `deploy_overview_guidance`。HEAD `03f7902` から静的111ファイルと配信用ZIPを生成し、前回公開との19HTML比較・対象1文だけの変更・保護検査と独立レビューを完了した。Chromeのタブ接続とファイル選択操作が応答せず、アップロード開始と本番更新は未確認。画面操作の復旧回答待ちで、候補と検証結果は保持している。詳細は `docs/overview-production.md`。新しいGit送信やFly/DB更新は行っていない。

同依頼は操作可能の回答後、認証済みIABのfilechooserから日本史Netlifyへ配信した。deploy `6ae743e8f1ef15458da8b941` のCurrently publishedと新案内の表示、旧文消失を公開HTTP・PC1440/SP390の実スクロールで確認した。7セット210問・API転送・検索除外とスマホ縦開き一覧を保持。新JS/CSSは監査済み候補とbyte一致。詳細とローカル証跡は `docs/overview-production.md`。追加コミット/pushは行っていない。

2026-11-02の本番反映依頼 deploy_homepage_20261102：トップページ改善とrem修正を独立ソースから静的生成し、日本史Netlifyへ配信。deploy 6ae7b7319664bd42cb6a72ff のPublished、トップHTMLと90静的資産のbyte一致、7セット210問、PC1440/SP390実画面を確認。Fly/DB・Git連携/自動配信設定・コミット/pushなし。生成時のアイコン欠落は公開前に環境調整と再監査で解消。詳細と未完了の補助操作は docs/homepage-production-20261102.md。

2026-11-02 CD比較監査 audit_netlify_cd_secret_detection：現在はGitHub連携/main自動公開が有効、Base/Build/Publishは正本と一致、UI追加環境変数なし。失敗はNetlifyのシークレット検査api_***で、実行ログは位置情報なし。手動配信/CIには同じSmart detectionが含まれず、api_候補は追跡ソース内の識別子9箇所、検証済み公開物では0件。マスク値の同定・誤検知や実キー流出の断定・設定変更・再配信なし。詳細は docs/netlify-cd-security-comparison.md。

2026-11-02 CD再失敗監査 audit_cd_repeated_secret_failures：前回の検索で索引名内のapi_一致を漏らし、正しくは3ファイル10箇所/4識別子。別途Nuxtのapi.ts由来47文字生成名を中間mapに確認した。独立コピーのhttp-client.ts改名案で176テスト・型・generate成功、依存volume内の実Nuxtcacheも長いapi_候補0。除外変数のProduction/Builds適用をUI確認したが値全文とNetlify検出対象は未特定。実装/適用済みSQL/設定/本番/送信は変更せず、記録は docs/netlify-cd-secret-followup.md。

同タスクの後続で検証済み改名を8618e16として反映。NetlifyのExposed secrets表示は消失したがdeploying段階でexit2。生成distリンクをローカル保持で追跡解除しignoreを揃え4ba10c4もpushしたが、配信段階の失敗は残る。両コミットのGitHub CIは全成功。詳細ログが画面/公開WebSocket/APIから得られず、同条件の再実行を止め、CD作業は未完了・Netlify詳細診断待ちとする。SQL/DB/検査設定は不変。詳細と問い合わせ用IDは docs/netlify-cd-secret-followup.md。

4ba10c4のNetlify6ae7c63feaba11e4b04d2a38もdeploying段階error、Copy logは空で追加原因なし。8618e16/4ba10c4のGitHub CIは全成功だがCD全体は未完了。総評価2回failedを保持し、同条件再実行は停止。Netlify側の詳細診断結果待ちとしてwaiting_for_materialへ移す。秘密値取得/検査無効化/SQL改変/サポート送信は行わない。

2026-11-02の明示依頼でCD完成作業を再開。Netlify識別下ではNuxt/Nitroがnetlify-staticを自動選択してdistへ生成するが、公開先は.output/publicだった。NITRO_PRESET=staticをNetlify環境だけに明示する修正を検証中。前回failed2件と上限3を保持する。詳細はdocs/netlify-cd-secret-followup.md。

同修正は9f7711dとしてmainへpushし、Netlify6ae7cc9c23f7ddbc4ad14e5fが自動でPublished（2026-11-01T23:35:24.568Z）。GitHubCI41362797715は全成功。本番HTTP6経路・7セット210問・noindex/API転送・ブラウザ遷移と独立88資産の参照確認を通過。NITRO_PRESET=staticで.output/publicへ固定し、CD完成。失敗2件を保持し総評価3回目passedとする。SQL/DB/検査設定不変。

2026-11-02 日本史パスワード機能の本番反映 deploy_password_features_20261102：ユーザーがcommit/push・Fly/Netlify・SQL009010を承認。既存210問/登録1件と14採点規則の保持を事前照合し、直接DB接続で共通移行後に既存2VMと画面へ配信する。進行と結果は docs/password-release-20261102.md。実メールと本人入力は本番反映後に本人へ確認を依頼する。

同タスクはアプリ2d8e73eをmainへpush、Fly v12/既存nrt2VM、SQL009010、Netlify6ae84698406d7d09c4bb2813へ反映済み。既存16表/210問/登録1件と14規則の保持、公開5経路35資産、PC/SP、CI41411702785全3job、独立レビューPASSを確認。ユーザー本人もメール到着・再設定・ログイン成功を確認した。詳細はdocs/password-release-20261102.md。

## 2026-11-02 AdSense共通headの配信

最新の明示依頼で指定scriptを共通headへ追加し、key=google-adsenseで重複防止。機能2736051をmainへpushし、CI41427204815のharness/verify/netlify-static全3ジョブsuccess、Netlify6ae8628a16c4faae7bd22b3bのPublished同SHAと自動公開ONを確認。本番7URLは全HTTP200・head内指定タグ1件。実Chromeの演習描画後/内部遷移後も1件、独立最終PASS。Fly/DB/Google側設定・回答送信は変更なし。文書完了記録だけskip netlify/skip ciで追送。[変更ファイルと検証範囲](../../adsense-release-20261102.md)。

## 2026-11-02 広告用プライバシーポリシー（ローカル）

追加依頼で広告未使用の記述をAdSense利用/Cookie/外部送信情報と目的/広告設定とWebChoices/Google公式情報リンクへ更新。14条・制定日保持、改定日11月2日追加。両版の既存法務テスト計5件、実Vue/CSSコンパイル、部品previewのPC1440/SP390・折返し/キーボード確認、独立レビューPASS。共通レイアウト/DB/API/広告通信を含まない確認で、初回previewのSITE不足は修正後成功として区別。commit/push/本番反映なし。[詳細と公式資料](../../adsense-release-20261102.md)。

## 2026-11-02 広告用ポリシーを本番反映

追加承認で本文/記録6件を3b99587としてmain送信。原資料保護hookとCI41433887667（harness/verify/netlify-static）全成功、Netlify同SHA自動Publishedを確認。本番HTTP200・14条/4リンク/改定日/広告説明/旧未使用記載の除去、実Chrome PC1440/SP390の折返し・横はみ出しなし・Tab移動・head script1件を確認。世界史のCSR外枠で初回本文parserが止まった件は描画後DOM確認と分けて記録。独立最終PASS。完了文書だけskip netlify/skip ciで追送し、本文配信SHAを維持。Fly/DB変更なし。[配信結果](../../adsense-release-20261102.md)。

2026-11-02の明示依頼で、本番とローカルの模試4↔6、5↔7を入れ替えました。問題IDと採点・履歴・お気に入りを維持し、現在番号と原作成時の識別子を区別します。詳細は `docs/mock-number-swap-20261102.md`。デプロイやGit送信は行っていません。


2026-11-02の追加承認で模試8〜10をローカル・本番へ90問追加し公開。合計10教材300問、稼働中の論述規則20件。両VMで20pin一致、旧210問と18表の保持、独立_test反復0、公開90問と全6論述8点、PC/SP実操作を確認。本番の再実行は一時ファイル消失で未確認として区別。Netlify6ae8927981dde2375a32cfea公開。現在の本番用20規則はfrontend/local-only/mocks-08-10-publication/catalog-production.json。旧14規則の保存物は履歴であり再投入しない。詳細はdocs/mock-8-10-publication-20261102.md。Git送信なし。


## 2026-11-03 プレミアムと静的トップ（ローカル検証時点）

- 情報教認main623e63の500円買い切り/無料1〜5・有料6+/お気に入り・購入完了/返金/紛争/法務を両版へ反映。Stripe Studio基本指定は既存と一致、購入者照合/規約同意/card指定はユーザー承認で保持。実販売は無効。
- 無料/匿名ホームは静的模試+6以降lock。最新/me確認後の有資格者だけ実カタログ取得。無料の演習開始後に実件数/先頭/0件を照合。
- 全体front世界史624/日本史215、その後seed反例追加を含む資格/開始18、最終決済各22、両型/build、実API/合成DBのPC/SP/通信順と独立レビューPASS。世界史の既存dirty並替テストは旧paymentsでも同じ失敗を再現し別件保持。
- [全変更ファイル・検証範囲](../../premium-membership-20261102.md)、[各サービスのStripe実接続の残作業](../../../STRIPE_INTEGRATION_TODO.md)。通常/本番・実課金・販売開始・commit/push/配信なし。


## 2026-11-03 本番反映の追加依頼

両ラボのGit送信・CI・配信と販売接続が承認された。[公開手順と確認結果](../../premium-release-20261103.md)を参照。Stripe接続と運営者情報は情報教認と同じアカウント/情報を使用する。実カードの最終操作は本人へ引継ぐ。

## 2026-11-03 プレミアム配信の途中確認

日本史main 0b66e8fはpush済み、CI41478632902全成功。両ラボの専用本番APIキー/PriceはFlyへstageし、7イベントの専用通知先を作成。署名キーの取得/登録に自動承認審査が別途の明示承認を要求し、確認回答待ち。販売無効を維持し、両ラボFly/Netlify未公開・実課金未実施。情報教認の通知分離APIだけ5b0b2baを本番反映、既存件数/移行台帳を保持。続きは[配信記録](../../premium-release-20261103.md)とSTRIPE_INTEGRATION_TODO.md。


## 2026-11-03 プレミアム公開・販売設定

世界史dfd7738/日本史e1f454eのCI成功、Netlify同SHA Published、Fly各2台へ配信/採点保持。専用接続・署名を設定して実終了通知3件ずつ成功、両ラボ販売有効/監査警告なし。300問/利用者2/会員0/決済0を保持。実課金/購入後資格付与と実Sandbox支払/返金/紛争は未確認。情報教認の追加接続は承認済みで再本人確認待ち。[配信記録](../../premium-release-20261103.md)。

情報教認の追加接続も承認/本人確認後に完了。専用4権限キー・既存署名・専用Priceを設定し、正規の終了通知3件を再送してすべて200/回復済み。情報教認の販売false・1000問/利用者1/会員0/決済0保持。両Historyの販売trueは維持。

## 2026-11-03 完了済み変更の再配信

`completed_work_redeploy_20261103`。既存2サイトの再デプロイが明示依頼された。[配信範囲と結果](../../completed-work-redeploy-20261103.md)。テンプレートは公開しない。既存設定と注入ファイルを保持して同SHAの公開とPC/SPを確認する。

再配信完了：Netlify最新mainとFly各2VMの反映、health/販売保持とPC/SPを確認。JPは初回release中断を同内容の注入方法修正で解消。独立レビューPASS。[配信元SHA・確認範囲・全変更ファイル](../../completed-work-redeploy-20261103.md)。Worldの事前移行台帳は未取得として区別する。
