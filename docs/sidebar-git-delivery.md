# サイドバー・本番反映と既存変更の整合を確認してGit送信

2026-11-01 ユーザー「OKです。今回のサイドバー変更と本番反映の記録をコミット・pushしてください。」と追加指示「既存の未コミット分も適宜実装と整合性を合わせてコミットしてください」に基づく。送信先は既存 `misato729/japanese-history-practice` の `main`。GitHub接続で現在のpublic・push権限を確認し、fetch後のHEADとorigin/mainは一致した。公開範囲は変更しない。

## 送信範囲

既存の完成済み変更も含め、実装と記録を独立レビューして選択する。

- `frontend/app/components/ExamSidebar.vue`、`frontend/tests/examSidebarLayout.test.ts`：SP縦開き・2列・内部スクロール・非モーダルへの変更。開始前からのPCボタン文言も公開済み実装と整合するため含める。
- `config/exam.json`：7教材・210問の構成と公開コピー。
- `frontend/app/pages/exam-overview.vue`、`favorites.vue`、`history.vue`、`login.vue`、`signup.vue`、`terms.vue`、`privacy-policy.vue` と `frontend/tests/legalPages.test.ts`：既存の案内・名称・規約/ポリシーと検査。試験概要に残っていた章節分類の準備中表示を、実装済みの章節・文化史の条件指定を説明する文へ修正する。
- `frontend/server/services/learning-structure.ts`、`frontend/server-tests/admin-exam-list.test.ts`、`docs/architecture.md`、`docs/admin-exam-query-review.md`、`docs/admin-exam-query-verification.md`：管理教材一覧のSQL削減と検証・構成記録。
- `AGENTS.md`：完成済み論述採点/本番登録で確認した一般的な再発防止手順3項目。
- `docs/world-release-copy.md`、`docs/cloud-deployment-review.md`、`docs/cloud-deployment-verification.md`、`docs/essay-grading-verification.md`、`docs/production-publication.md`、`docs/mobile-sidebar-vertical.md`、`docs/mobile-sidebar-production.md`、`docs/sidebar-git-delivery.md`：各実装・配信・本送信の確認記録。
- `docs/screenshots/cloud-deployment/desktop.jpg`、`mobile.jpg`、`deployed-home.jpg`：原典・教材本文・正答・秘密値・個人情報を含まない歴史UI証拠。公開前のツールバーや教材0件時点を写しており、現在の本番状態の証明とは扱わない。
- `docs/workflow/state.json`、3文脈カード、対象の `docs/workflow/handoffs/`：完成済み各タスクと今回のGit送信の整合する進捗記録。

当初の今回分だけをindexへ投影する計画は、追加承認を受けて実行前に変更した。PC既存文言を含め、レビュー済みの通常ファイルを現物のまま選択する。原典・実教材・採点規則・秘密情報・ローカル専用の検査JSONや画像は送信しない。`frontend/dist` は生成された絶対パスのsymlinkなのでコミット対象から外して保持する。全体の完成状態・依頼根拠・受入日時・根拠の存在を照合する。

本番は確認済みNetlify deploy `6ae726f33106d3d071996821` のまま。今回修正する試験概要の1文はローカルとGitへの反映であり、本番へ追加配信は行わない。コミットに `[skip netlify]` を付け、既存pre-pushの全履歴資料保護検査を維持する。フックを回避しない。

検証・送信結果は完了時に追記する。安全な比較結果は `local-only/sidebar-git-delivery/` に保持する。
