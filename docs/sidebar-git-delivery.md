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

## 検証と送信結果

コミット対象だけを `checkout-index` で独立コピーし、原典・実教材・採点JSONなしの状態で確認した。

- テンプレート/進捗検査が成功。進捗・保護ハーネス168件、画面側176件、独立した末尾 `_test` DBのserver検査90件はすべて合格・スキップ0件。画面の型検査も成功した。
- 試験概要の新しい案内文をローカル1440×1000と390×844で実際に表示・スクロールし、旧表記なし・横はみ出しなしを確認した。別担当が2画像を目視確認した。
- フロント/構成/規約、SQL/配信記録、進捗/規則/ステージ範囲を分担レビューし、未解決指摘0。55ファイルが計画・index・独立コピー・作業ツリーと一致した。秘密signature、教材179長文probe、現行14採点規則IDの混入は0。
- 根拠の候補未配置を検査した際、保護対象の `分析/` を一般ファイルと誤判定した初回監査は履歴に残した。正本の `isLocalOnlyPath/loadWorkspacePolicy` で再評価し、保護対象115参照の未配置を許容、非保護根拠の欠落0を確認した。資料をコピー・追加して解消する操作は行っていない。
- `git diff --cached --check` と追跡対象・全履歴の資料保護が成功。既存pre-pushフックも成功した。

実装・設定・記録55ファイルをコミット `bdbe9c7d0e096f9646010ec4eb23859e44768d7b` として `main` へpushし、HEADとorigin/mainの一致・差分0/0を確認した。GitHub Actions [41305587449](https://github.com/misato729/japanese-history-practice/actions/runs/41305587449) はharness・verifyとも成功。CIは保護/進捗、Docker構築、独立PostgreSQL API、画面・型・本番ビルドまで実行した。

過去の確認記録にある「未コミット・未push」は各作業の終了時点を示す。今回の追加承認によって、レビュー済みの既存変更も上記55ファイルにまとめて送信した。残る `frontend/dist` は元からの生成symlinkだけで、そのリンク先文字列を変更せず保持している。ローカル専用の原典・教材・規則・検査結果も保持し、送信していない。

本番のサイドバーJS/CSSが既存配信と同一であることをpush前に再確認し、今回のGit送信では追加デプロイを行っていない。試験概要の1文の修正はGitへ反映済みで、本番へは未反映。

完了記録は後続のdocsコミットで保存する。安全な比較結果・CI情報は `local-only/sidebar-git-delivery/` に保持する。
