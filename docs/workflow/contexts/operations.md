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
