# Netlify CDと検証済み環境のシークレット検査比較

確認日：2026-11-02。ユーザーの「NetlifyのCD環境と、検証済み環境との設定差を確認してください」に基づく読取専用監査。対象は日本史Netlify、失敗deploy 6ae7bb1be317b02738787651（main / 5510045）。設定変更・再デプロイ・除外登録・Git送信は行わない。

## 確認できた相違と一致

- 現在はGitHubのmisato729/japanese-history-practiceに連携済み、mainの自動公開が有効。直前の手動配信時に確認したNot linkedから変化しているが、本監査では変更しない。
- Netlify UIのBase directoryはfrontend、Build commandはnpm run generate、Publish directoryはfrontend/.output/public（リポジトリ基準）。netlify.tomlのbase=frontend、publish=.output/public（base基準）と一致する。UIは正規化されたパスであり、frontendの二重指定とは判断しない。
- Node.jsはnetlify.tomlで24を指定。検証済み生成環境・GitHub ActionsもNode.js 24。失敗CDのログには実行中のNode/npmバージョンが出ていないため、CDが実際に使用したパッチ版は未確認。
- Netlifyのビルドイメージ設定はUbuntu Noble 24.04。検証済み手動生成は日本史専用のNode24 Alpineイメージと既存依存volume。GitHub ActionsはUbuntuランナー上の同系統Docker検査。CDの実際の依存インストール状況はログ欠落のため未確認。
- Netlify UIのEnvironment variablesはNo environment variables set for this project。UI追加のキー・秘密値・検査除外設定なし。netlify.tomlにNODE_VERSION=24、NUXT_PUBLIC_API_BASE空文字列があることとは矛盾しない。
- 失敗CDはDeploys一覧にExposed secrets detected。ポップアップの検出候補はapi_***とだけ表示され、Review exposed secretsは同じ詳細ログへ戻る。詳細ログは終了コード2の1行だけで、検出ファイル・行・完全な文字列は表示されない。Netlify AI診断も詳細ログ不足と回答したため原因根拠には採用しない。
- 前回の手動配信は、ローカルで監査した静的111ファイルのZIPをNetlify Dropで送信したもの。GitHub Actionsは独自の資料保護・進捗・DB/API・フロント/型/ビルド検査であり、NetlifyのSmart detectionを実行していない。両者の成功はCDのシークレット検査合格を意味しない。

## 検出候補のローカル照合

追跡ファイルを値非表示で走査した範囲では、api_で始まる文字列は9箇所・3ソースファイル。すべてAPIのログ分類・レート制限のDBテーブル/索引の内部識別子であり、ランダムなAPIキー形式の値ではなかった。対象はfrontend/server/api/v1/[...path].ts、frontend/server/core/rate-limit.ts、frontend/server/database/migrations/001_preserve_rails_schema.sql。該当の公開用111ファイルではapi_接頭辞の一致0。既存のStripeテスト用ダミー文字列は別接頭辞で、今回のapi_***と同一とする証拠はない。

これはNetlifyのマスクされた候補の同定ではない。依存パッケージやCD内部の作業ファイルも同じ範囲で照合済みとは扱わず、誤検知・秘密値流出のいずれも断定しない。実キーの認証試行や値の外部送信は行っていない。

## 結論と未確認

確認できた直接の停止理由はNetlifyのシークレット検査であり、Base/Build/Publishの不一致を示す証拠はない。通常の静的生成の成功と、CD固有のシークレット検査を混同してはならない。内部識別子の誤検知は候補だが、マスク解除された値や検出場所が得られるまでは特定不能。現在の公開済み静的画面は前回成功した手動配信のまま。再生成/設定変更/除外/再配信は本監査の対象外。

Netlify公式仕様：https://docs.netlify.com/manage/security/secret-scanning/ 。Smart detectionはリポジトリと生成物を自動走査し、環境変数の登録なしでも検出する。誤検知を扱う機能はあるが、本監査では無効化・除外登録は実施しない。

変更ファイル：本書、docs/workflow/state.json、今回の新しいhandoffのみ。以前からの未コミット作業を保持する。

進捗カード docs/workflow/contexts/operations.md にも比較結果の入口を追記した。

独立担当homepage_deploy_reviewが設定/コード照合と結論の制約を確認し、14条件すべて合格・指摘0。api_候補9箇所/3ソース・公開111ファイル0件を独立再走査で確認。検査結果はlocal-only/homepage-production-20261102/cd-security-audit-review.json。進捗の構造/根拠パスと差分空白検査も成功。記録は未コミット・未push。
