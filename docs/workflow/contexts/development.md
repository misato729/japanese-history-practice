# 実装・検証

`AGENTS.md`、`docs/architecture.md`、`docs/testing.md`、今回の依頼に関係する進捗・根拠を読みます。

Nuxt / Nitro / pg / 番号付きSQL / PostgreSQLを優先し、既存差分を保護します。受入条件・担当・総評価回数を先に決めます。

重い検査は順番に行い、画面はPC・スマートフォン、書込は反復・対象外保持も確認します。独立レビューとgate通過後に完了とします。

コピーの確認範囲は `docs/verification.md`、全ファイルは `docs/copy-manifest.md`。派生元の作業履歴・承認は引き継ぎません。

模擬試験サイドバーの横開閉は `horizontal_exam_sidebar` で管理し、PC/SPの実操作・独立レビュー・変更ファイルは `docs/sidebar-verification.md` を参照します。

追加の背景色調整は `darken_sidebar_background` で管理し、同じ検証記録の追加依頼欄を参照します。

全模試の論述許容表現拡充・採点登録は `expand_essay_acceptance_all_mocks` で管理します。実装・DB保持・PC/SP確認の範囲は `docs/essay-grading-verification.md`、実教材の許容文言表と反例は `local-only/essay-expansion-20261031/` を参照します。

世界史版との文言統一と規約・ポリシーの反映は `align_world_release_copy`、確認範囲・変更ファイルは `docs/world-release-copy.md` を参照します。最新版の参照先はユーザー指定の世界史ローカル画面です。

スマホの模擬試験一覧を縦開きへ変更する依頼は `mobile_sidebar_vertical`。公開世界史版のヘッダー直下・2列・内部縦スクロールへ合わせた。コードと既存7検査・型検査、Mac解除後の390/320/760/761/1440幅の開閉・大問移動・内部スクロール・フォーカスとPC幅同期を確認した。結果と範囲は `docs/mobile-sidebar-vertical.md`、ローカル専用の検査・レビュー・画像は `local-only/mobile-sidebar-vertical/` を参照する。本番反映やGit送信は今回の対象外。

管理教材一覧のSQL99件の修正は `fix_admin_exam_query_count`。一覧本体を4回の一括読込へ変更し、既存の全返却値を保持しました。認証込み99→5はローカル7教材と合成検査、本番は教材未登録で一覧本体2件をREAD ONLY計測。分離候補をFlyへ再配信し、Netlify経由の稼働を確認。検査と配信範囲は `docs/admin-exam-query-verification.md` を参照します。

根拠資料の撮影位置を確認用語へ修正する作業は `correct_source_terms`、日本史用語集・詳説日本史の範囲に全問全肢を照合する作業は `audit_allowed_source_scope`。最終325資料、3問の内容修正、旧除外判断の撤回、DB保持・PC/SPの範囲は `docs/source-reference-terms.md` を参照する。

模試6問24の資料1の表復元は `restore_material_table_6_24`。元原稿・DBの全セル保持、単一資料更新、PC/SP操作と変更ファイルは `docs/material-table-display.md` を参照する。

解答解説の作問用内部評価・資料種別タグの非表示は `hide_authoring_notes`。通常解説・引用注記の保持、全210問照合・DB非変更・PC/SP操作と変更ファイルは `docs/learner-explanation-display.md` を参照する。

振り返りとトークン節約方針の共通化は `integrate_work_policy`。日本史版・ユーザー指定の汎用テンプレートのAGENTS.mdへ代表例での基準合わせ、適合条件付き検証継承、必要範囲の読取、担当重複と失敗反復の削減を統合した。両版の既存ルール・既存差分とテンプレートの空stateを保持し、文書検査・独立レビューに合格。詳細は `docs/work-policy-update.md`。コミット・push・配信は行っていない。

後続の明示依頼により、両版の方針変更をコミット・pushする。日本史版の送信用進捗はHEAD由来の今回分だけに限定し、前回の試験概要配信記録とテンプレート記事はローカルに保持する。送信範囲と検証継承の条件は同記録を参照する。

## 2026-11-02 トップページ統一

世界史版と同じ見出し/リンク/デザイン/読込中スピナーを日本史へ反映。固有文言と演習処理を保持。型検査・PC/SP実操作・独立レビュー成功。DB書込・Git送信・配信なし。[検証記録](../../homepage-refresh-20261102.md)。

2026-11-02追加依頼：日本史色へ統一後、地球装飾を日輪と青海波のSVGへ置換。PC1440/SP390描画・差分検査・独立レビュー成功。既存文言/処理保持、Git送信・配信なし。詳細は同トップページ検証記録。

2026-11-02 CI文字サイズ修正：fix_homepage_typography_ci。紹介h1のvw指定を3remへ変更しSP2remを保持。フロント176件・型検査・ビルド・PC/SP操作・独立レビュー成功。詳細はトップページ検証記録のCI修正欄。Git送信・配信なし。

2026-11-02 Netlify静的生成の回帰防止：日本史版と汎用テンプレートへnetlify-static CIを追加。設定正本を読みNETLIFY=true/CI=trueで実生成し、古い出力を拒否して公開先を検査する。両版7回帰テストと実CIの追加ジョブ成功、汎用記事/空state保持。既存お気に入りの失敗は記録し、追加確認の回答どおりアプリ修正は行わない。詳細はdocs/netlify-ci-verification.md。

2026-11-02 汎用テンプレートのお気に入り再ログイン表示：fix_template_favorites_session_refresh。sessionVersion更新時の一覧再取得を追加し、旧応答の抑止を保持した。修正前の失敗再現と修正後14件/全体120件/型検査、CI41369381323全成功とPC/SP10件を確認。ローカルChromiumの操作待ちは成功扱いせず、UIはLinux CIで検証。既存記事/空stateを保持し、公開なし。詳細はdocs/template-favorites-session-fix.md。

## 2026-11-02 パスワード変更・GAS再設定

世界史の検証済み実装を日本史の認証へ移植。アカウント設定で変更/新セッション更新、旧ログイン失効、旧形式token版0互換と、30分/1回限り/hash保存のメール再設定。日本史008を保持して009/010を追加し、独立GAS/共有鍵/origin、同一origin proxy/色/Cookieを保持。初回の依存不足・SQL期待/カタログ隔離の2不合格は履歴に保持し、隔離DBの全100/フロント187、型/build、Node24静的生成とPC1440/SP390/320実部品+合成API、独立最終レビュー成功。通常/本番DB・実GAS/メール・commit/push/deployは未実施。[変更ファイルと検証](../../password-features-20261102.md)、[日本史用GAS設定手順](../../gas-password-reset-setup.md)。

## 2026-11-03 全静的ページの問題API取得停止

`static_pages_catalog_20261103`。共有サイドバーをトップの最新資格確認後/演習だけで取得する条件へ変更。それ以外は全資格で静的一覧、既知の有資格者は開始リンク、無料/不明は6以降lock。新規14を含む関連46件・型検査・独立レビューPASS、実Nuxt/合成APIのPC1440/SP390で静的巡回のカタログ0件・トップへ資格後取得/規約へ再停止を確認。本文/DB/決済/本番設定と既存dirtyを保持。commit/push/deploy未実施。[全変更ファイルと検証範囲](../../static-pages-catalog-20261103.md)。

## 2026-11-03 静的ページ修正の本番反映

`static_pages_release_20261103`。今回の実装/記録だけを両mainへ送信し、各CI全成功・Netlify同SHA自動Published・公開JSの取得条件/静的10ルート200・本番PC1440/SP390実操作と独立最終PASSを確認。元dirtyの全照合値を保持。DB/Stripe/Fly変更なし、本番通信API0件の直接計数とは区別する。機能SHAは世界史7cde4ff/日本史91a8fa2。配信記録だけskip netlify/skip ciで追送し、機能配信を維持する。[CI/配信/全ファイル](../../static-pages-release-20261103.md)。

## 2026-11-03 Stripeウォレット・PayPay対応

`stripe_wallets_20261103`。World/日本史/情報教認/templateへ許可card/link/paypay、Apple/Googleはカード系Walletの表示条件維持。旧openは3方式の完全集合だけ再利用し、それ以外は同ID/expired/同mode確認後に置換。4版で決済140件/法務12件/型4つ/PC1280-SP390計8画像/独立最終PASS。特商法の支払方法を実装へ合わせ、既存dirtyと販売状態を保持。専用test DB/サーバー後片付け済み、実Stripe/通常DB/commit/push/deploy未実施。[全変更ファイル・確認範囲](../../stripe-wallets.md)。

## 2026-11-03 Wallet/PayPayの送信・本番反映

`stripe_wallets_release_20261103`。4 Git/既存3サービスの配信が承認され、templateは追加回答で送信のみ。既存dirty・採点注入・販売状態を保持し、CIとNetlify/Fly/本番ソース・表示を確認する。[配信記録](../../stripe-wallets-release.md)。

### Wallet/PayPayの反映完了

4実装SHAのCI成功、既存3サービスのNetlify/Fly反映・本番PC/SPを確認。世界史/日本史の販売有効、情報教認の販売無効を保持。テンプレートは送信のみ。実決済/審査の完了は未確認。[結果と変更一覧](../../stripe-wallets-release.md)。文書記録はCI/配信をskipして送信する。

## 2026-11-03 静的サイドバーのアコーディオン

`static_sidebar_accordion_20261103`。未取得行も開始/会員案内で開閉し、無料API後は有料枠だけ静的補完する。実大問・番号を推測せず、親/子のロック・資格降格・API追加0を維持。4版の関連104件と型4、合成PC/SP16画像・独立最終レビューPASS。[変更一覧と検証範囲](../../static-sidebar.md)。未コミット・未配信。

### 静的サイドバーの送信・配信

`static_sidebar_release_20261103`。4Gitと既存3Netlifyの反映が明示承認された。template送信のみ、元dirty・採点/販売/認証設定を保持し、CI/同SHA公開・実画面を確認する。[配信記録](../../static-sidebar-release.md)。

### 静的サイドバーの配信確認完了

`static_sidebar_release_20261103`。4mainの限定push・全CI、既存3Netlify同実装SHA公開を確認。各本番の静的/取得後×PC/SPを操作し12画像と親子premiumリンクを確認、独立最終レビューPASS。templateはpushのみ。実装時点の未送信状態は解消。呼出回数/ログイン無料/降格は合成・回帰の確認で、本番計測とは区別。[全変更ファイルと配信の証拠](../../static-sidebar-release.md)。最後の記録コミットは`[skip netlify] [skip ci]`で送信し、別作業は保持する。

## 2026-11-03 完了済み作業の送信

`completed_work_release_20261103`。完了済みの未コミット作業の送信が明示依頼された。[対象と確認](../../completed-work-release-20261103.md)。main送信とCIのみ、DBの再操作・Fly配信・実メール・記事投稿なし。

送信完了：実装コミット`733aef9`、必須CI全成功、既存の未コミット変更を解消。原本/私用資料はGit対象外のまま。今回の依頼はcommit/pushのみで、[全変更と確認結果](../../completed-work-release-20261103.md)を参照。

## 2026-11-04 マイページと静的大問名

`mypage_sidebar_parity_20261104`。日本史の学習マップ、設定フラグメント、全40大問の固定名称を実装。日本史既存巡回に完全位置列を渡し、locked除外・複数模試の継続を確認。型、全フロント245件、追加位置選択2件、隔離API3件、合成PC/SP、独立レビュー成功。[全変更と検証範囲](../../mypage-sidebar-20261104.md)。未コミット・未公開。

## 2026-11-04 更新履歴

`updates_history_20261104`。トップ利用案内の下に日付降順の更新履歴と管理者CRUD。初期3件は追加011マイグレーション。両隔離DB/型・合成PCSPと独立レビュー成功。[変更一覧と適用状況](../../updates-history-20261104.md)。世界史通常local適用済、日本史通常local未起動。送信・本番反映は未依頼。


更新履歴の公開完了（2026-11-04）：明示依頼の送信/CI/Fly/Netlify/本番DB011と初期3件、PC/SPと独立最終レビューを確認。日本史のマイページ/学習マップ/設定フラグメント/静的大問名も同時公開。[結果・配信SHA・変更一覧](../../updates-release-20261104.md)。


## 2026-11-04 間違えた問題の復習

`incorrect_review_20261104`。情報教認の仕様を参照しトップ/履歴の入口、本人の最新不正解・公開/資格の絞込み、疎な組のランダム復習、次周回での更新を実装。既存の演習方式と学習マップ復習を保持。[全変更と検証範囲](../../incorrect-review-20261104.md)。送信・本番変更は未依頼。


復習機能の送信・本番反映完了（2026-11-04）：CI全成功、独立最終レビューPASS。Fly/Netlify同SHAと設定保持、実ログインPC/SPと0件通知を確認。本番対象0件で回答の試験書込なし。[配信SHA・全変更・確認範囲](../../incorrect-review-release-20261104.md)。
