# 日本史のマイページ・静的大問名（2026-11-04）

ユーザー依頼により世界史と同じ学習マップ、登録情報→学習マップ→アカウント設定、設定フラグメントを移植。固定大問名は日本史の公開カタログ全10模試40大問で照合。取得済み行はAPI優先、ロック中の全子リンクはpremium。追加の問題API取得なし。

日本史には演習回APIがないため、その依存を持ち込まず既存演習へ有限500組の模試.問題番号を渡す。公開カタログに実在する利用可能な位置との完全一致で絞り、別模試の同番号を混入させない。不正・過長指定は空。DB変更なし。世界史の用語/問題/分類/秘密値は移さず日本史配色を維持する。

初回移植は未定義usePracticeAttemptで型失敗。依存の一括追加を避け、上記の既存巡回適応へ修正。関連38件と隔離PostgreSQL16の新API3件（skipなし）成功。型とUIは最終確認中。独立レビュー中。元日本史作業場所は未変更、/tmp分離worktree内で実装。送信・本番反映は未依頼。

最終互換性確認：日本史の既存巡回へexamsとreviewの完全位置列を併送。合成Nuxtで模試1問3（1/2）から回答後に模試2問4（2/2）へ進み、1.4/2.3の混入がないことを確認。PC1280の見出し順、SP390の設定フラグメント上端130/固定ヘッダー下端112・幅390、固定模試6全4大問名と全premiumリンクを実操作で確認。画像は合成データ。ロゴは一時環境のpublic未参照により欠落、製品の参照/配色変更なし。

全フロントテストはポート制限下のHTTPS検査1件失敗後、ローカル通信許可で全件再成功。型検査成功、新APIの隔離DB3件skipなし成功。追加テストは複数模試の同番号交差混入・不正/過長review・公開外指定の拒否を確認。元フォルダへの反映は変更前状態との一致とgit apply --checkで確認する。

独立最終レビューで、公開カタログ中のlocked行はreview対象からも除外する必要を指摘され、選択helperで復習時だけ除外するよう修正。公開/ロック混在の回帰テストも追加し2件成功。問題APIの権限確認は従来通り保持。

最終型検査成功、独立最終レビューachievement_review PASS。元作業場所へは検査済みパッチで適用し、commit/push/本番反映は行わない。

## 今回の変更ファイル

- `AGENTS.md`
- `docs/mypage-sidebar-20261104.md`
- `docs/workflow/contexts/development.md`
- `docs/workflow/handoffs/2026-11-03T20-12-27-466Z-r195.json`
- `docs/workflow/handoffs/2026-11-03T20-14-06-123Z-r196.json`
- `docs/workflow/handoffs/2026-11-03T20-14-06-650Z-r197.json`
- `docs/workflow/state.json`
- `frontend/app/components/AchievementReport.vue`
- `frontend/app/components/SiteHeader.vue`
- `frontend/app/composables/useAchievementReport.ts`
- `frontend/app/pages/account.vue`
- `frontend/app/pages/practice/[examNumber]/[questionNumber].vue`
- `frontend/app/utils/examCatalog.ts`
- `frontend/app/utils/reviewPositions.ts`
- `frontend/app/utils/staticExamGroups.ts`
- `frontend/server-tests/achievement.test.ts`
- `frontend/server/api/v1/[...path].ts`
- `frontend/server/services/achievement.ts`
- `frontend/shared/achievement.ts`
- `frontend/shared/types/achievement.ts`
- `frontend/tests/achievement.test.ts`
- `frontend/tests/catalogExamNavigation.test.ts`
- `frontend/tests/reviewPositions.test.ts`
- `frontend/tests/sidebarCatalogAccess.test.ts`
- `frontend/tests/siteHeaderMenu.test.ts`
