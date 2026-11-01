# 実装・検証

`AGENTS.md`、`docs/architecture.md`、`docs/testing.md`、今回の依頼に関係する進捗・根拠を読みます。

Nuxt / Nitro / pg / 番号付きSQL / PostgreSQLを優先し、既存差分を保護します。受入条件・担当・総評価回数を先に決めます。

重い検査は順番に行い、画面はPC・スマートフォン、書込は反復・対象外保持も確認します。独立レビューとgate通過後に完了とします。

コピーの確認範囲は `docs/verification.md`、全ファイルは `docs/copy-manifest.md`。派生元の作業履歴・承認は引き継ぎません。

模擬試験サイドバーの横開閉は `horizontal_exam_sidebar` で管理し、PC/SPの実操作・独立レビュー・変更ファイルは `docs/sidebar-verification.md` を参照します。

追加の背景色調整は `darken_sidebar_background` で管理し、同じ検証記録の追加依頼欄を参照します。

根拠資料の撮影位置を確認用語へ修正する作業は `correct_source_terms`、日本史用語集・詳説日本史の範囲に全問全肢を照合する作業は `audit_allowed_source_scope`。最終325資料、3問の内容修正、旧除外判断の撤回、DB保持・PC/SPの範囲は `docs/source-reference-terms.md` を参照する。

模試6問24の資料1の表復元は `restore_material_table_6_24`。元原稿・DBの全セル保持、単一資料更新、PC/SP操作と変更ファイルは `docs/material-table-display.md` を参照する。

解答解説の作問用内部評価・資料種別タグの非表示は `hide_authoring_notes`。通常解説・引用注記の保持、全210問照合・DB非変更・PC/SP操作と変更ファイルは `docs/learner-explanation-display.md` を参照する。
