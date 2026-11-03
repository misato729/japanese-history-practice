# 更新履歴の本番反映（2026-11-04）

ユーザーの明示依頼により両ラボをcommit/pushし、API・画面・本番DBまで反映した。日本史は追加指示のマイページ・学習マップ・設定フラグメント・静的大問名も同時公開。世界史の別件Stripe記録は除外して元の作業場所へ保持する。

## 配信と検証

- 実装SHA: `2c0569376a0cc591b142daab4beeb835f65ef73b`。後続の記録のみのコミットは`[skip netlify] [skip ci]`で送信し、この配信SHAを維持する。
- [GitHub Actions](https://github.com/misato729/japanese-history-practice/actions/runs/41721908499) のharness/verify/netlify-static全成功。
- Fly.io: `japanese-history-practice`、image `updates-2c0569376a`、既存2VMへrolling配信成功。VM ID、env、注入ファイル、guest資源、nrt配置の保持を安全な比較結果で確認。秘密値は記録しない。
- release commandの共通`db:migrate`が追加`011_service_updates.sql`を適用。適用済みSQL・問題seed・既存問題/利用者/回答履歴は変更しない。本番GET `/api/v1/updates`が指定3件と11/03→11/02→11/01の順序に一致し、テーブルと初期データの反映を確認。
- 匿名GET `/api/v1/admin/updates`は401。管理CRUDの書込は本番では試験せず、事前の隔離実DBと合成管理者UIで追加・編集・再読込・削除・競合・反復を検証済み。
- Netlify deploy `6aea530a0b1908eab1f0ea0c` はready、publishedのcommit_refが上記SHAに一致。[公開サイト](https://japanese-history-practice.netlify.app/)で確認。
- 本番PC1280/SP390で「問題演習を始める→利用にあたって→更新履歴」の見出し順、日付と指定文言3件、幅一致を確認。PC/SP画像と設定保持証跡を独立担当achievement_reviewが確認しPASS。
- 配信用一時ソース、環境設定/注入ファイルの一時控えは削除済み。原本資料をビルド対象へ送信していない。

## 変更ファイル

[更新履歴の全変更一覧](updates-history-20261104.md#今回の変更ファイル既存作業は除外)に実装・テスト・進捗ファイルを列挙。本記録`docs/updates-release-20261104.md`と、公開結果を追記した同検証記録・`docs/workflow/contexts/development.md`・`docs/workflow/state.json`・今回生成したhandoffも変更した。

[同時公開したマイページ/静的大問名の全変更一覧](mypage-sidebar-20261104.md#今回の変更ファイル)。本番ログイン済みマイページでタイトルと「登録情報→学習マップ→アカウント設定」の順序をPC/SPで確認。設定リンクは`/account#account-settings`、直接遷移時SPで設定上端130px（固定ヘッダー下）を確認。本人の登録値・回答内容は記録しない。復習操作・管理書込の確認は隔離環境の結果と区別する。

初回CI41721432161は既存`frontend/server-tests/operations.test.ts`のマイグレーション適用リストに011がなく失敗。厳密リストへ011だけを追加した最小テスト修正を2c05693で送信し、独立レビューPASS・最終CI全成功。追加変更ファイルは同テストと本記録。

## 今回公開した全変更ファイル

- [AGENTS.md](../AGENTS.md)：マイページ・学習マップの実装方針。
- [docs/mypage-sidebar-20261104.md](../docs/mypage-sidebar-20261104.md)：仕様・検証・全変更と公開結果。
- [docs/updates-history-20261104.md](../docs/updates-history-20261104.md)：仕様・検証・全変更と公開結果。
- [docs/updates-release-20261104.md](../docs/updates-release-20261104.md)：仕様・検証・全変更と公開結果。
- [docs/workflow/contexts/development.md](../docs/workflow/contexts/development.md)：日本史の公開結果。
- [docs/workflow/handoffs/2026-11-03T20-12-27-466Z-r195.json](../docs/workflow/handoffs/2026-11-03T20-12-27-466Z-r195.json)：作業・公開結果の引き継ぎ記録。
- [docs/workflow/handoffs/2026-11-03T20-14-06-123Z-r196.json](../docs/workflow/handoffs/2026-11-03T20-14-06-123Z-r196.json)：作業・公開結果の引き継ぎ記録。
- [docs/workflow/handoffs/2026-11-03T20-14-06-650Z-r197.json](../docs/workflow/handoffs/2026-11-03T20-14-06-650Z-r197.json)：作業・公開結果の引き継ぎ記録。
- [docs/workflow/handoffs/2026-11-03T21-18-23-328Z-r198.json](../docs/workflow/handoffs/2026-11-03T21-18-23-328Z-r198.json)：作業・公開結果の引き継ぎ記録。
- [docs/workflow/handoffs/2026-11-03T21-18-23-702Z-r199.json](../docs/workflow/handoffs/2026-11-03T21-18-23-702Z-r199.json)：作業・公開結果の引き継ぎ記録。
- [docs/workflow/handoffs/2026-11-03T21-37-56-682Z-r200.json](../docs/workflow/handoffs/2026-11-03T21-37-56-682Z-r200.json)：作業・公開結果の引き継ぎ記録。
- [docs/workflow/state.json](../docs/workflow/state.json)：完了状態と検証根拠。
- [frontend/app/components/AchievementReport.vue](../frontend/app/components/AchievementReport.vue)：問題別の学習マップと復習操作。
- [frontend/app/components/SiteHeader.vue](../frontend/app/components/SiteHeader.vue)：マイページ表記と設定フラグメント。
- [frontend/app/components/UpdatesHistory.vue](../frontend/app/components/UpdatesHistory.vue)：日付降順の公開一覧。
- [frontend/app/composables/useAchievementReport.ts](../frontend/app/composables/useAchievementReport.ts)：本人の学習状況の取得。
- [frontend/app/layouts/admin.vue](../frontend/app/layouts/admin.vue)：管理メニューへ更新履歴を追加。
- [frontend/app/pages/account.vue](../frontend/app/pages/account.vue)：登録情報・学習マップ・設定の順序。
- [frontend/app/pages/admin/updates.vue](../frontend/app/pages/admin/updates.vue)：管理者の追加・編集・削除画面。
- [frontend/app/pages/index.vue](../frontend/app/pages/index.vue)：利用案内直下に更新履歴を追加。
- [frontend/app/pages/practice/[examNumber]/[questionNumber].vue](../frontend/app/pages/practice/[examNumber]/[questionNumber].vue)：復習対象だけを順に巡回。
- [frontend/app/utils/examCatalog.ts](../frontend/app/utils/examCatalog.ts)：静的メニューと復習位置の選択。
- [frontend/app/utils/reviewPositions.ts](../frontend/app/utils/reviewPositions.ts)：選択した復習対象の位置を保持。
- [frontend/app/utils/staticExamGroups.ts](../frontend/app/utils/staticExamGroups.ts)：静的な大問名と開始番号。
- [frontend/server-tests/achievement.test.ts](../frontend/server-tests/achievement.test.ts)：学習マップ・静的メニュー・復習巡回の回帰検証。
- [frontend/server-tests/operations.test.ts](../frontend/server-tests/operations.test.ts)：適用SQLの期待値へ011を追加。
- [frontend/server-tests/updates.test.ts](../frontend/server-tests/updates.test.ts)：権限・入力・CRUD・競合・再適用の検証。
- [frontend/server/api/v1/[...path].ts](../frontend/server/api/v1/[...path].ts)：更新履歴と必要なマイページAPIの振り分け。
- [frontend/server/database/migrations/011_service_updates.sql](../frontend/server/database/migrations/011_service_updates.sql)：更新履歴テーブルと指定の初期3件。
- [frontend/server/services/achievement.ts](../frontend/server/services/achievement.ts)：学習状態の集計・型・状態の共通定義。
- [frontend/server/services/updates.ts](../frontend/server/services/updates.ts)：管理権限・入力・競合検査とCRUD。
- [frontend/shared/achievement.ts](../frontend/shared/achievement.ts)：学習状態の集計・型・状態の共通定義。
- [frontend/shared/types/achievement.ts](../frontend/shared/types/achievement.ts)：学習状態の集計・型・状態の共通定義。
- [frontend/shared/types/updates.ts](../frontend/shared/types/updates.ts)：更新履歴の型定義。
- [frontend/tests/achievement.test.ts](../frontend/tests/achievement.test.ts)：学習マップ・静的メニュー・復習巡回の回帰検証。
- [frontend/tests/catalogExamNavigation.test.ts](../frontend/tests/catalogExamNavigation.test.ts)：学習マップ・静的メニュー・復習巡回の回帰検証。
- [frontend/tests/reviewPositions.test.ts](../frontend/tests/reviewPositions.test.ts)：学習マップ・静的メニュー・復習巡回の回帰検証。
- [frontend/tests/sidebarCatalogAccess.test.ts](../frontend/tests/sidebarCatalogAccess.test.ts)：学習マップ・静的メニュー・復習巡回の回帰検証。
- [frontend/tests/siteHeaderMenu.test.ts](../frontend/tests/siteHeaderMenu.test.ts)：学習マップ・静的メニュー・復習巡回の回帰検証。
