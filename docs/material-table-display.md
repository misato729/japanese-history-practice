# 模試6問24・資料1の表表示

2026-11-01。ユーザーの `/practice/6/24` がプレーン表示になっているという指摘を確認した。

## 原因と修正

資料1は元原稿で3列・見出し1行・データ2行のMarkdown表だが、投入時の変換処理が引用以外を一律のtextブロックとして保存していた。CSSの読み込み不良ではない。設問・選択肢自体の文章表示は元原稿どおり。

変換処理を修正し、authored_tableで有効な見出し・区切り行・均一列数を持つ場合だけ既存のtableブロックへ変換する。説明文、全9セル、文字・順序を保持する。ほかの文章・引用を推測で表へ変換しない。

全32資料の独立比較で、変更対象は1件のみ。他5件のauthored_tableを含め対象外は同一であることを確認。全アーカイブを再投入せず、資料ID49だけを共通WriterのsaveQuestionGroupとトランザクションで更新した。

## 検証結果

- 変換の合成単体検査4件成功。見出し・セル保持、文章/引用の保持、エスケープ、列数不一致の拒否を確認。
- 独立したjapanese_history_testで既存のgrouped-learning検査4件成功、失敗0・skip0。共有資料更新と参照・履歴・ID保持を合成データで確認。
- 実DBの参照先は小問174だけ。対象の保存履歴0件をロック下で確認し、資料ID・参照ID・全選択肢ID・設問/選択肢/正誤/解説/出典/分類・対象外資料・利用者・お気に入り・全保存履歴を保持した。参照する小問174の内容版のみWriterの規則で1進んだ。
- DB再読込は元原稿から変換した全ブロックと完全一致。反復は変更0件で、再実行後のsnapshotも同一。
- 承認済みの表構造変換をメモリ内で考慮し、210問・560選択肢・28大問・共通本文と資料60件を現在DBと再比較。不一致0件。
- PC1280×900とSP393×852で「資料1を確認」操作を実施。資料49へ移動・フォーカスし、3見出し・2データ行を表示。ページ全体の横はみ出しなし。SPは表内を右端まで横スクロールでき、最大位置307に到達した。一時的な幅変更は解除。
- 変換・適用方式・原稿9セルの独立レビュー合格。資料だけを撮影したPC/SP画像の独立目視も合格。問題全文・正答の新しい一括複製を検証方式に用いない。

## 変更ファイル

| 実際のパス | 内容 |
| --- | --- |
| `local-only/mock-db-import-20261030/convert.py` | 表構造を保持する変換を追加。全体の再投入は行わない |
| `local-only/plain-table-fix/test_material_blocks.py` | 合成変換検査4件 |
| `local-only/plain-table-fix/update-passage.mjs`、`register.py` | レビュー済コードhash・元文一致・履歴0・単一資料のガードとWriter更新/保持/反復 |
| `local-only/plain-table-fix/review.json`、`local-only/plain-table-fix/visual-review.json`、`local-only/plain-table-fix/result.json`、`local-only/plain-table-fix/tests.json`、`local-only/plain-table-fix/ui-check.json` | 独立レビュー・原稿対応・DB保持・検査・操作の記録 |
| `local-only/plain-table-fix/table-pc.jpg`、`table-sp-left.jpg`、`table-sp-right.jpg` | 資料1だけのPC/SP確認画像。ローカル専用 |
| `local-only/source-scope-audit/check-current.py`、`current-equality.json` | 意図した表構造の差だけを考慮した既存原稿との全件比較 |
| `AGENTS.md` | 表の全セル・見出しと参照を保持し、文章形式の資料を推測変換しない手順 |
| `docs/material-table-display.md`、`docs/workflow/state.json`、今回の引き継ぎ | 原因・依頼範囲・検証・完了記録 |

作業開始前からのコード・設定・案内文・先行出典作業・並行作業の未コミット差分は保持。既存のフロント部品やCSSは変更していない。今回の修正はローカルDBで確認し、コミット・push・配信・公開DBの変更は行っていない。
