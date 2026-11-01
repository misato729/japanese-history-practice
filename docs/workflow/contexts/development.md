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
