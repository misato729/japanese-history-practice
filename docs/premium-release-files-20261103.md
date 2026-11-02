# プレミアム実装・配信の変更ファイル（2026-11-03）

今回の承認された機能コミットと配信記録のファイルを列挙する。並行する作問・教材本体・既存の未コミット差分は含めない。実際の配信と未確認範囲は[本番反映記録](premium-release-20261103.md)を参照。

- [AGENTS.md](../AGENTS.md)：仕様・検証・配信結果又は進捗の記録。
- [STRIPE_INTEGRATION_TODO.md](../STRIPE_INTEGRATION_TODO.md)：仕様・検証・配信結果又は進捗の記録。
- [config/exam.json](../config/exam.json)：料金/無料範囲と公開済み模試容量の設定。
- [docs/premium-membership-20261102.md](premium-membership-20261102.md)：仕様・検証・配信結果又は進捗の記録。
- [docs/premium-release-20261103.md](premium-release-20261103.md)：仕様・検証・配信結果又は進捗の記録。
- [docs/premium-release-files-20261103.md](premium-release-files-20261103.md)：仕様・検証・配信結果又は進捗の記録。
- [docs/workflow/contexts/operations.md](workflow/contexts/operations.md)：仕様・検証・配信結果又は進捗の記録。
- [docs/workflow/handoffs/2026-11-02T15-23-14-946Z-r160.json](workflow/handoffs/2026-11-02T15-23-14-946Z-r160.json)：評価・引き継ぎの不変記録。
- [docs/workflow/handoffs/2026-11-02T15-23-15-537Z-r161.json](workflow/handoffs/2026-11-02T15-23-15-537Z-r161.json)：評価・引き継ぎの不変記録。
- [docs/workflow/handoffs/2026-11-02T15-23-16-105Z-r162.json](workflow/handoffs/2026-11-02T15-23-16-105Z-r162.json)：評価・引き継ぎの不変記録。
- [docs/workflow/handoffs/2026-11-02T15-23-16-653Z-r163.json](workflow/handoffs/2026-11-02T15-23-16-653Z-r163.json)：評価・引き継ぎの不変記録。
- [docs/workflow/handoffs/2026-11-02T15-23-17-167Z-r164.json](workflow/handoffs/2026-11-02T15-23-17-167Z-r164.json)：評価・引き継ぎの不変記録。
- [docs/workflow/handoffs/2026-11-02T21-33-59-703Z-r167.json](workflow/handoffs/2026-11-02T21-33-59-703Z-r167.json)：評価・引き継ぎの不変記録。
- [docs/workflow/handoffs/2026-11-02T21-34-00-536Z-r168.json](workflow/handoffs/2026-11-02T21-34-00-536Z-r168.json)：評価・引き継ぎの不変記録。
- [docs/workflow/handoffs/2026-11-02T21-41-44-862Z-r169.json](workflow/handoffs/2026-11-02T21-41-44-862Z-r169.json)：評価・引き継ぎの不変記録。
- [docs/workflow/state.json](workflow/state.json)：仕様・検証・配信結果又は進捗の記録。
- [frontend/app/components/ExamSidebar.vue](../frontend/app/components/ExamSidebar.vue)：匿名/無料の静的表示と資格確認後の取得・演習開始。
- [frontend/app/composables/useQualifiedExamAccess.ts](../frontend/app/composables/useQualifiedExamAccess.ts)：匿名/無料の静的表示と資格確認後の取得・演習開始。
- [frontend/app/pages/commercial-disclosure.vue](../frontend/app/pages/commercial-disclosure.vue)：会員/購入/法務画面と資格別案内。
- [frontend/app/pages/index.vue](../frontend/app/pages/index.vue)：匿名/無料の静的表示と資格確認後の取得・演習開始。
- [frontend/app/pages/practice/start.vue](../frontend/app/pages/practice/start.vue)：匿名/無料の静的表示と資格確認後の取得・演習開始。
- [frontend/app/pages/premium/complete.vue](../frontend/app/pages/premium/complete.vue)：会員/購入/法務画面と資格別案内。
- [frontend/app/pages/premium/index.vue](../frontend/app/pages/premium/index.vue)：匿名/無料の静的表示と資格確認後の取得・演習開始。
- [frontend/app/pages/privacy-policy.vue](../frontend/app/pages/privacy-policy.vue)：会員/購入/法務画面と資格別案内。
- [frontend/app/pages/terms.vue](../frontend/app/pages/terms.vue)：会員/購入/法務画面と資格別案内。
- [frontend/server-tests/api.test.ts](../frontend/server-tests/api.test.ts)：プレミアム資格・無料範囲・通信順の回帰検査。
- [frontend/server-tests/learning.test.ts](../frontend/server-tests/learning.test.ts)：プレミアム資格・無料範囲・通信順の回帰検査。
- [frontend/server-tests/password-reset.test.ts](../frontend/server-tests/password-reset.test.ts)：プレミアム資格・無料範囲・通信順の回帰検査。
- [frontend/server-tests/payments.test.ts](../frontend/server-tests/payments.test.ts)：決済・冪等性・他サービス通知・専用法務リンクの回帰。
- [frontend/server/services/payment-checkout.ts](../frontend/server/services/payment-checkout.ts)：買い切りCheckout・購入者照合・各ラボ名/専用法務リンク。
- [frontend/server/services/payment-webhooks.ts](../frontend/server/services/payment-webhooks.ts)：署名通知・返金/紛争処理と共有アカウントの対象外通知判別。
- [frontend/shared/examConfig.ts](../frontend/shared/examConfig.ts)：決済・会員資格・公開APIの対応。
- [frontend/tests/examConfig.test.ts](../frontend/tests/examConfig.test.ts)：プレミアム資格・無料範囲・通信順の回帰検査。
- [frontend/tests/examSidebarLayout.test.ts](../frontend/tests/examSidebarLayout.test.ts)：プレミアム資格・無料範囲・通信順の回帰検査。
- [frontend/tests/legalPages.test.ts](../frontend/tests/legalPages.test.ts)：プレミアム資格・無料範囲・通信順の回帰検査。
- [frontend/tests/practiceStart.test.ts](../frontend/tests/practiceStart.test.ts)：プレミアム資格・無料範囲・通信順の回帰検査。
- [frontend/tests/premiumCompletionAccess.test.ts](../frontend/tests/premiumCompletionAccess.test.ts)：プレミアム資格・無料範囲・通信順の回帰検査。
- [frontend/tests/qualifiedExamAccess.test.ts](../frontend/tests/qualifiedExamAccess.test.ts)：プレミアム資格・無料範囲・通信順の回帰検査。

ローカル専用（Git/Dockerには含めない）：

- `local-only/premium-release-20261103/preserved-production-profiles.json`：既存本番と内容不変の採点ファイル控え。
- `local-only/premium-release-20261103/fly-release-private.toml`：同ファイルを保持する非公開配信設定。
