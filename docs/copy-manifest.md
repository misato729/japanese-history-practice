# 初期コピーの全ファイル

作成先：`/Users/yoshiki/Desktop/japanese-history-practice`。2026-10-28開始、2026-10-29確認。

コピー元のコード基準：`531a43a236a8533ebedf35e0a8d474ae8b6442ba`。元サービスは変更せず、コピー先だけを調整しました。

作成ファイルは合計191件（変更してコピー31件、そのままコピー141件、新規19件）。`.git/` は新規のローカル管理情報です。実行時生成の `.nuxt/`・`.output/` とDockerの依存関係・DBボリュームは、このファイル一覧に含みません。

## 差し替え・新規作成

| ファイル | 内容 |
| --- | --- |
| [.dockerignore](../.dockerignore) | 科目固有名を一般化し資料保護を維持。 |
| [.env](../.env) | 専用の開発用秘密値を新規生成。Git・Dockerから除外。値は記録しない。 |
| [.env.example](../.env.example) | 独立したCompose名・DB名・3300/3301/55434の初期値。 |
| [.github/workflows/ci.yml](../.github/workflows/ci.yml) | 専用テストDB名へ変更。デプロイ処理なし。 |
| [.gitignore](../.gitignore) | 科目固有名を一般化し資料保護を維持。 |
| [AGENTS.md](../AGENTS.md) | 日本史向けの実装・資料保護・作問・進捗ルール。過去承認を除去。 |
| [README.md](../README.md) | 新規セットアップと実問題未登録の案内。 |
| [config/exam.json](../config/exam.json) | 日本史ラボの仮表示・仮分類・収録数表現を初期化。 |
| [content/README.md](../content/README.md) | 合成データの用途とダミーURL、自動投入しない運用。 |
| [content/questions.json](../content/questions.json) | 世界史問題を外し、検査専用の合成5問へ置換。 |
| [docker-compose.yml](../docker-compose.yml) | 独立したCompose名・DB・ポートと専用ボリューム。 |
| [docs/architecture.md](../docs/architecture.md) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/copy-manifest.md](../docs/copy-manifest.md) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/customization.md](../docs/customization.md) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/local-only-materials.md](../docs/local-only-materials.md) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/migration.md](../docs/migration.md) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/screenshots/bootstrap-desktop.png](../docs/screenshots/bootstrap-desktop.png) | コピー先のPC・スマートフォン表示の確認画像。 |
| [docs/screenshots/bootstrap-mobile.png](../docs/screenshots/bootstrap-mobile.png) | コピー先のPC・スマートフォン表示の確認画像。 |
| [docs/testing.md](../docs/testing.md) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/verification.md](../docs/verification.md) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/workflow/README.md](../docs/workflow/README.md) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/workflow/bootstrap-handoff.md](../docs/workflow/bootstrap-handoff.md) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/workflow/contexts/development.md](../docs/workflow/contexts/development.md) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/workflow/contexts/operations.md](../docs/workflow/contexts/operations.md) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/workflow/contexts/product.md](../docs/workflow/contexts/product.md) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/workflow/policy.json](../docs/workflow/policy.json) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/workflow/state.json](../docs/workflow/state.json) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [docs/workflow/task.example.json](../docs/workflow/task.example.json) | コピー先専用の構成・設定・検証・引き継ぎ文書。 |
| [frontend/Dockerfile](../frontend/Dockerfile) | 起動時の問題seedを除去。SQL更新と起動を維持。 |
| [frontend/app/pages/exam-overview.vue](../frontend/app/pages/exam-overview.vue) | 正式分類の未設定を表示。 |
| [frontend/app/pages/index.vue](../frontend/app/pages/index.vue) | 世界史の書籍に依存する案内を一般化。 |
| [frontend/public/images/logo.svg](../frontend/public/images/logo.svg) | 地球儀を除いた本の汎用ロゴ。 |
| [frontend/scripts/test-server.mjs](../frontend/scripts/test-server.mjs) | 接続・復元・検査の既定DB識別子を分離。 |
| [frontend/server-tests/essay-learning.test.ts](../frontend/server-tests/essay-learning.test.ts) | 合成データ・独立設定へ検査を調整。 |
| [frontend/server-tests/operations.test.ts](../frontend/server-tests/operations.test.ts) | 合成データ・独立設定へ検査を調整。 |
| [frontend/server/core/db.ts](../frontend/server/core/db.ts) | 接続・復元・検査の既定DB識別子を分離。 |
| [frontend/server/core/http.ts](../frontend/server/core/http.ts) | 接続許可の既定値を3300へ。 |
| [frontend/server/data/essay-rule-profiles.ts](../frontend/server/data/essay-rule-profiles.ts) | 科目固有の採点規則を空にしエンジン連携を維持。 |
| [frontend/server/database/migrations/003_subject_taxonomy_placeholder.sql](../frontend/server/database/migrations/003_subject_taxonomy_placeholder.sql) | 元のデータ変換に代わる新規DB専用の予約枠。 |
| [frontend/server/operations/restore-drill.ts](../frontend/server/operations/restore-drill.ts) | 接続・復元・検査の既定DB識別子を分離。 |
| [frontend/server/services/payment-settings.ts](../frontend/server/services/payment-settings.ts) | 決済戻り先の既定値を3300へ。 |
| [frontend/tests/dependencyCompatibility.test.ts](../frontend/tests/dependencyCompatibility.test.ts) | 合成データ・独立設定へ検査を調整。 |
| [frontend/tests/essayPresentation.test.ts](../frontend/tests/essayPresentation.test.ts) | 合成データ・独立設定へ検査を調整。 |
| [frontend/tests/essayProfiles.test.ts](../frontend/tests/essayProfiles.test.ts) | 合成データ・独立設定へ検査を調整。 |
| [frontend/tests/essayScoring.test.ts](../frontend/tests/essayScoring.test.ts) | 合成データ・独立設定へ検査を調整。 |
| [frontend/tests/fixtures/essayRuleCases.ts](../frontend/tests/fixtures/essayRuleCases.ts) | 合成データ・独立設定へ検査を調整。 |
| [scripts/check-private-sources.test.mjs](../scripts/check-private-sources.test.mjs) | ハーネス検査の識別名・資料保護を一般化。 |
| [scripts/context.test.mjs](../scripts/context.test.mjs) | ハーネス検査の識別名・資料保護を一般化。 |
| [scripts/workspace-policy.mjs](../scripts/workspace-policy.mjs) | 科目固有名を一般化し資料保護を維持。 |
| [scripts/workspace-policy.test.mjs](../scripts/workspace-policy.test.mjs) | ハーネス検査の識別名・資料保護を一般化。 |

## 変更せずコピー

次の共通コード・スキーマ・検査・固定依存はコピー時点で元ファイルとSHA-256が一致しました。

- [.gitattributes](../.gitattributes)
- [.githooks/pre-push](../.githooks/pre-push)
- [config/exam.schema.json](../config/exam.schema.json)
- [frontend/.dockerignore](../frontend/.dockerignore)
- [frontend/.npmrc](../frontend/.npmrc)
- [frontend/app/app.vue](../frontend/app/app.vue)
- [frontend/app/assets/css/main.css](../frontend/app/assets/css/main.css)
- [frontend/app/components/EssayScoringResult.vue](../frontend/app/components/EssayScoringResult.vue)
- [frontend/app/components/ExamSidebar.vue](../frontend/app/components/ExamSidebar.vue)
- [frontend/app/components/FavoriteStarIcon.vue](../frontend/app/components/FavoriteStarIcon.vue)
- [frontend/app/components/QuestionAnswerForm.vue](../frontend/app/components/QuestionAnswerForm.vue)
- [frontend/app/components/QuestionContentBlocks.vue](../frontend/app/components/QuestionContentBlocks.vue)
- [frontend/app/components/QuestionInlineText.vue](../frontend/app/components/QuestionInlineText.vue)
- [frontend/app/components/SharedPassagePanel.vue](../frontend/app/components/SharedPassagePanel.vue)
- [frontend/app/components/SiteFooter.vue](../frontend/app/components/SiteFooter.vue)
- [frontend/app/components/SiteHeader.vue](../frontend/app/components/SiteHeader.vue)
- [frontend/app/components/SiteLogo.vue](../frontend/app/components/SiteLogo.vue)
- [frontend/app/components/admin/AdminContentBlockEditor.vue](../frontend/app/components/admin/AdminContentBlockEditor.vue)
- [frontend/app/components/admin/AdminQuestionForm.vue](../frontend/app/components/admin/AdminQuestionForm.vue)
- [frontend/app/components/admin/AdminQuestionPreview.vue](../frontend/app/components/admin/AdminQuestionPreview.vue)
- [frontend/app/components/admin/AdminSourceEditor.vue](../frontend/app/components/admin/AdminSourceEditor.vue)
- [frontend/app/composables/useApiStatus.ts](../frontend/app/composables/useApiStatus.ts)
- [frontend/app/composables/useAuth.ts](../frontend/app/composables/useAuth.ts)
- [frontend/app/composables/useFavorites.ts](../frontend/app/composables/useFavorites.ts)
- [frontend/app/composables/usePracticeFilterCatalog.ts](../frontend/app/composables/usePracticeFilterCatalog.ts)
- [frontend/app/composables/usePublicExamCatalog.ts](../frontend/app/composables/usePublicExamCatalog.ts)
- [frontend/app/layouts/admin.vue](../frontend/app/layouts/admin.vue)
- [frontend/app/layouts/default.vue](../frontend/app/layouts/default.vue)
- [frontend/app/middleware/admin-guest.ts](../frontend/app/middleware/admin-guest.ts)
- [frontend/app/middleware/admin.ts](../frontend/app/middleware/admin.ts)
- [frontend/app/middleware/auth.ts](../frontend/app/middleware/auth.ts)
- [frontend/app/pages/account.vue](../frontend/app/pages/account.vue)
- [frontend/app/pages/admin/exams/[examNumber].vue](../frontend/app/pages/admin/exams/[examNumber].vue)
- [frontend/app/pages/admin/exams/index.vue](../frontend/app/pages/admin/exams/index.vue)
- [frontend/app/pages/admin/login.vue](../frontend/app/pages/admin/login.vue)
- [frontend/app/pages/admin/questions/[questionId]/edit.vue](../frontend/app/pages/admin/questions/[questionId]/edit.vue)
- [frontend/app/pages/admin/questions/index.vue](../frontend/app/pages/admin/questions/index.vue)
- [frontend/app/pages/admin/questions/new.vue](../frontend/app/pages/admin/questions/new.vue)
- [frontend/app/pages/commercial-disclosure.vue](../frontend/app/pages/commercial-disclosure.vue)
- [frontend/app/pages/favorites.vue](../frontend/app/pages/favorites.vue)
- [frontend/app/pages/history.vue](../frontend/app/pages/history.vue)
- [frontend/app/pages/login.vue](../frontend/app/pages/login.vue)
- [frontend/app/pages/practice/[examNumber]/[questionNumber].vue](../frontend/app/pages/practice/[examNumber]/[questionNumber].vue)
- [frontend/app/pages/practice/index.vue](../frontend/app/pages/practice/index.vue)
- [frontend/app/pages/premium/complete.vue](../frontend/app/pages/premium/complete.vue)
- [frontend/app/pages/premium/index.vue](../frontend/app/pages/premium/index.vue)
- [frontend/app/pages/privacy-policy.vue](../frontend/app/pages/privacy-policy.vue)
- [frontend/app/pages/signup.vue](../frontend/app/pages/signup.vue)
- [frontend/app/pages/terms.vue](../frontend/app/pages/terms.vue)
- [frontend/app/plugins/api.ts](../frontend/app/plugins/api.ts)
- [frontend/app/types/adminQuestion.ts](../frontend/app/types/adminQuestion.ts)
- [frontend/app/utils/adminContentBlocks.ts](../frontend/app/utils/adminContentBlocks.ts)
- [frontend/app/utils/adminQuestionForm.ts](../frontend/app/utils/adminQuestionForm.ts)
- [frontend/app/utils/essayPresentation.ts](../frontend/app/utils/essayPresentation.ts)
- [frontend/app/utils/examCatalog.ts](../frontend/app/utils/examCatalog.ts)
- [frontend/app/utils/examConfig.ts](../frontend/app/utils/examConfig.ts)
- [frontend/app/utils/historyTopics.ts](../frontend/app/utils/historyTopics.ts)
- [frontend/app/utils/learningPresentation.ts](../frontend/app/utils/learningPresentation.ts)
- [frontend/app/utils/masterData.ts](../frontend/app/utils/masterData.ts)
- [frontend/app/utils/practiceFilterCatalog.ts](../frontend/app/utils/practiceFilterCatalog.ts)
- [frontend/app/utils/practicePassageState.ts](../frontend/app/utils/practicePassageState.ts)
- [frontend/app/utils/practiceSequence.ts](../frontend/app/utils/practiceSequence.ts)
- [frontend/app/utils/safeRedirectPath.ts](../frontend/app/utils/safeRedirectPath.ts)
- [frontend/app/utils/sellerInformation.ts](../frontend/app/utils/sellerInformation.ts)
- [frontend/nuxt.config.ts](../frontend/nuxt.config.ts)
- [frontend/package-lock.json](../frontend/package-lock.json)
- [frontend/package.json](../frontend/package.json)
- [frontend/patches/node-forge-1.4.0.patch](../frontend/patches/node-forge-1.4.0.patch)
- [frontend/scripts/container-entrypoint.sh](../frontend/scripts/container-entrypoint.sh)
- [frontend/scripts/ensure-dependencies.mjs](../frontend/scripts/ensure-dependencies.mjs)
- [frontend/scripts/patch-node-forge.mjs](../frontend/scripts/patch-node-forge.mjs)
- [frontend/server/api/v1/[...path].ts](../frontend/server/api/v1/[...path].ts)
- [frontend/server/core/auth.ts](../frontend/server/core/auth.ts)
- [frontend/server/core/config.ts](../frontend/server/core/config.ts)
- [frontend/server/core/errors.ts](../frontend/server/core/errors.ts)
- [frontend/server/core/notifications.ts](../frontend/server/core/notifications.ts)
- [frontend/server/core/rate-limit.ts](../frontend/server/core/rate-limit.ts)
- [frontend/server/database/migrate.ts](../frontend/server/database/migrate.ts)
- [frontend/server/database/migrations/001_preserve_rails_schema.sql](../frontend/server/database/migrations/001_preserve_rails_schema.sql)
- [frontend/server/database/migrations/002_question_history_topics.sql](../frontend/server/database/migrations/002_question_history_topics.sql)
- [frontend/server/database/migrations/004_cultural_history_categories.sql](../frontend/server/database/migrations/004_cultural_history_categories.sql)
- [frontend/server/database/migrations/005_grouped_questions.sql](../frontend/server/database/migrations/005_grouped_questions.sql)
- [frontend/server/database/migrations/006_lock_published_answer_types.sql](../frontend/server/database/migrations/006_lock_published_answer_types.sql)
- [frontend/server/database/migrations/007_essay_rule_scoring.sql](../frontend/server/database/migrations/007_essay_rule_scoring.sql)
- [frontend/server/operations/accounts.ts](../frontend/server/operations/accounts.ts)
- [frontend/server/operations/archive-common.ts](../frontend/server/operations/archive-common.ts)
- [frontend/server/operations/audit.ts](../frontend/server/operations/audit.ts)
- [frontend/server/operations/cli.ts](../frontend/server/operations/cli.ts)
- [frontend/server/operations/content-v2.ts](../frontend/server/operations/content-v2.ts)
- [frontend/server/operations/content.ts](../frontend/server/operations/content.ts)
- [frontend/server/plugins/readiness.ts](../frontend/server/plugins/readiness.ts)
- [frontend/server/services/accounts.ts](../frontend/server/services/accounts.ts)
- [frontend/server/services/essay-profile.ts](../frontend/server/services/essay-profile.ts)
- [frontend/server/services/essay-scoring.ts](../frontend/server/services/essay-scoring.ts)
- [frontend/server/services/learning-structure.ts](../frontend/server/services/learning-structure.ts)
- [frontend/server/services/learning-validation.ts](../frontend/server/services/learning-validation.ts)
- [frontend/server/services/learning-writer.ts](../frontend/server/services/learning-writer.ts)
- [frontend/server/services/learning.ts](../frontend/server/services/learning.ts)
- [frontend/server/services/payment-checkout.ts](../frontend/server/services/payment-checkout.ts)
- [frontend/server/services/payment-client.ts](../frontend/server/services/payment-client.ts)
- [frontend/server/services/payment-webhooks.ts](../frontend/server/services/payment-webhooks.ts)
- [frontend/server/services/payments.ts](../frontend/server/services/payments.ts)
- [frontend/server-tests/api.test.ts](../frontend/server-tests/api.test.ts)
- [frontend/server-tests/archive-optional.test.ts](../frontend/server-tests/archive-optional.test.ts)
- [frontend/server-tests/content-v2.test.ts](../frontend/server-tests/content-v2.test.ts)
- [frontend/server-tests/grouped-learning.test.ts](../frontend/server-tests/grouped-learning.test.ts)
- [frontend/server-tests/learning.test.ts](../frontend/server-tests/learning.test.ts)
- [frontend/server-tests/payments.test.ts](../frontend/server-tests/payments.test.ts)
- [frontend/server-tests/timezone.test.ts](../frontend/server-tests/timezone.test.ts)
- [frontend/shared/examConfig.ts](../frontend/shared/examConfig.ts)
- [frontend/shared/types/auth.ts](../frontend/shared/types/auth.ts)
- [frontend/shared/types/essay.ts](../frontend/shared/types/essay.ts)
- [frontend/shared/types/learning.ts](../frontend/shared/types/learning.ts)
- [frontend/tests/adminContentBlocks.test.ts](../frontend/tests/adminContentBlocks.test.ts)
- [frontend/tests/adminGroupedQuestion.test.ts](../frontend/tests/adminGroupedQuestion.test.ts)
- [frontend/tests/apiStatus.test.ts](../frontend/tests/apiStatus.test.ts)
- [frontend/tests/auth.test.ts](../frontend/tests/auth.test.ts)
- [frontend/tests/authCookie.test.ts](../frontend/tests/authCookie.test.ts)
- [frontend/tests/authGuard.test.ts](../frontend/tests/authGuard.test.ts)
- [frontend/tests/catalogExamNavigation.test.ts](../frontend/tests/catalogExamNavigation.test.ts)
- [frontend/tests/contentNotice.test.ts](../frontend/tests/contentNotice.test.ts)
- [frontend/tests/dependencySecurity.test.ts](../frontend/tests/dependencySecurity.test.ts)
- [frontend/tests/examConfig.test.ts](../frontend/tests/examConfig.test.ts)
- [frontend/tests/examSidebarLayout.test.ts](../frontend/tests/examSidebarLayout.test.ts)
- [frontend/tests/frontendAccess.test.ts](../frontend/tests/frontendAccess.test.ts)
- [frontend/tests/groupedLearningPresentation.test.ts](../frontend/tests/groupedLearningPresentation.test.ts)
- [frontend/tests/historyTopics.test.ts](../frontend/tests/historyTopics.test.ts)
- [frontend/tests/legalPages.test.ts](../frontend/tests/legalPages.test.ts)
- [frontend/tests/passageUnderline.test.ts](../frontend/tests/passageUnderline.test.ts)
- [frontend/tests/practiceFilterCatalog.test.ts](../frontend/tests/practiceFilterCatalog.test.ts)
- [frontend/tests/practicePassageState.test.ts](../frontend/tests/practicePassageState.test.ts)
- [frontend/tests/safeRedirectPath.test.ts](../frontend/tests/safeRedirectPath.test.ts)
- [frontend/tests/sellerInformation.test.ts](../frontend/tests/sellerInformation.test.ts)
- [frontend/tests/siteHeaderMenu.test.ts](../frontend/tests/siteHeaderMenu.test.ts)
- [frontend/tests/typography.test.ts](../frontend/tests/typography.test.ts)
- [frontend/tsconfig.json](../frontend/tsconfig.json)
- [scripts/check-private-sources.mjs](../scripts/check-private-sources.mjs)
- [scripts/check-template.mjs](../scripts/check-template.mjs)
- [scripts/context.mjs](../scripts/context.mjs)
- [scripts/workflow-policy.mjs](../scripts/workflow-policy.mjs)
- [scripts/workflow-policy.test.mjs](../scripts/workflow-policy.test.mjs)

## コピーしなかったもの

- 元のGit履歴・リモート・実際の環境変数・認証情報・DB・利用者・履歴・決済設定。
- 過去問・用語集・原画像・全文OCR・ローカル専用資料。
- 元の分類表・日付付き検証記録・画面画像・タスク・引き継ぎ履歴。
- 未追跡の旧コピー10件と依存関係・ビルド生成物。
- 世界史5問を埋め込んだ旧003データ移行。新規DB向け予約枠に置換し、元の適用済みファイルは変更していません。

## 運用状態

新規Git、コミットなし、リモートなし。コミット・push・公開は実施していません。元サービスのDB・稼働状態・配信設定は変更していません。
