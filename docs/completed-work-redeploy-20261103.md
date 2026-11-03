# 完了済み変更の再デプロイ（2026-11-03）

ユーザーの「再デプロイもしてください」により、既存の世界史・日本史のNetlify/Flyを再配信する。テンプレートは公開先なし、情報教認に今回の差分なし。対象mainは`50321b2e39de3e565ea67d23b6482f3594686320`。直前に成功した[CI](https://github.com/misato729/japanese-history-practice/actions/runs/41576037508)の実装SHAからの差分は文書のみ。

Git追跡済みのfrontend/config/content/scripts等だけをクリーンに書き出し、資料保護検査を通す。Flyの既存env・注入ファイル・VM資源・販売設定を保持し、秘密値・原本・私用資料をbuild contextへ入れない。通常のmigration整合確認は既存release commandを維持し、新migration/seed/問題入替/利用者操作/実決済/メール操作は行わない。既存の別サービスや配信設定を変更しない。

NetlifyのPublished/SHA、Flyのimage/実ソース照合と公開health・販売設定、PC/SP画面を配信後に確認する。詳細な実行設定と秘密を含み得るログはローカル専用へ分離し、値は出力しない。

## 検査・再試行の記録

初回Fly deployはrelease commandの論述カタログ検査で中断し、既存2VMは保持。既存API注入値を内容非表示で復元し、全20profileが現ソースで有効と確認。ファイル本体を変更せず、一時configだけlocal_pathで同じbytesを渡す方法に修正。同imageで再試行し既存設定/注入checksumと台帳前後を比較する。

## 再配信・本番確認の結果

[Netlifyの公開記録](https://app.netlify.com/projects/japanese-history-practice/deploys/6ae9646015d0cd9ab68b2c26)はPublished、対象SHAは`50321b2e39de3e565ea67d23b6482f3594686320`。既存Git連携や自動公開設定を変更せず、最新mainを手動配信した。Flyのimageは`registry.fly.io/japanese-history-practice:completed-50321b2`。既存2VMのID・NRT配置・env・guest資源を保持し、双方で配信済みソースがHEAD blobのSHA-256と一致。公開healthは正常、販売設定は配信前と一致する。

日本史は同じimage・同じ採点ファイルのbytesをlocal_pathで渡した再試行が成功。両VMのWriter・Checkout・採点エンジン・カタログローダー・注入された実ファイルのhashをHEAD/配信前bytesと照合。両VMで20profileの妥当性と読込を確認し、移行台帳10件のversion/checksum全体fingerprintは前後一致。採点ルール本体、既存env/資源/配置は変更していない。初回raw_valueによる読込失敗の原因を断定しない。[Fly公式のファイル設定](https://docs.fly.io/reference/configuration/#the-files-section)に従い、sourceをlocal_path一つに切り替えた。

匿名ホームのPC1280×900/SP390×844で模試6の開閉、会員案内への親子リンク、横方向のはみ出しなし、undefinedリンクなしを実操作し、4枚を目視確認した。実ログイン・解答送信・購入・メール送信の追加操作は行っていない。独立担当`premium_review`も最新SHAの公開、両2VMの反映と設定保持、再試行経緯・検証上の限界、4状態のDOM/画像を照合して最終PASS。

本番用のアプリソースは変更していない。更新したファイルは本記録・進捗・文脈カード・今回の不変引き継ぎだけ。配信元の固定SHAを維持するため、最後の記録コミットは`[skip netlify] [skip ci]`付きで送信する。原本・教材・秘密値はGit/Dockerへ追加せず、配信に使った一時configと採点ファイルの私用複製・生の設定控えは検証後に削除し、値を含まない結果と保護ログだけをローカル専用へ残す。

## 今回変更したファイル

- [docs/completed-work-redeploy-20261103.md](../docs/completed-work-redeploy-20261103.md) — 配信・本番検証記録。
- [docs/workflow/state.json](../docs/workflow/state.json) — 進捗・文脈又は評価/引き継ぎ記録。
- [docs/workflow/contexts/operations.md](../docs/workflow/contexts/operations.md) — 進捗・文脈又は評価/引き継ぎ記録。
- [docs/workflow/handoffs/2026-11-03T04-33-43-092Z-r191.json](../docs/workflow/handoffs/2026-11-03T04-33-43-092Z-r191.json) — 進捗・文脈又は評価/引き継ぎ記録。
- [docs/workflow/handoffs/2026-11-03T04-49-46-084Z-r192.json](../docs/workflow/handoffs/2026-11-03T04-49-46-084Z-r192.json) — 進捗・文脈又は評価/引き継ぎ記録。
- [docs/workflow/handoffs/2026-11-03T04-56-03-832Z-r193.json](../docs/workflow/handoffs/2026-11-03T04-56-03-832Z-r193.json) — 進捗・文脈又は評価/引き継ぎ記録。
- [docs/workflow/handoffs/2026-11-03T04-56-04-894Z-r194.json](../docs/workflow/handoffs/2026-11-03T04-56-04-894Z-r194.json) — 進捗・文脈又は評価/引き継ぎ記録。
