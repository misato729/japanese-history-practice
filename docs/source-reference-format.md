# 根拠資料の書式整理

この記録は初回整理時の結果。撮影PDFのページを一般向けに表示したfallbackは、同日のユーザー指摘により撤回し、[用語表示と作問範囲の再確認](source-reference-terms.md)で修正している。

2026-11-01。ユーザー指定の世界史版を参考に、日本史版210問の出典を資料単位の書式へ整理した。

## 参照形式と対象

指定された世界史版の演習ページをクエリなしでChromeに開き、選択肢を選んで画面の「回答する」をクリックした。解答後の根拠資料欄だけを確認し、世界史のソース・出典データは編集していない。最初の読取専用HTML/APIでは解答後欄を取得できなかったが、追加の明示指示による画面操作で解消した。

書名・出版社・確認済み書誌情報に続けて「確認事項」を示す形式を参照。既存の確認済み作問メタデータから証明できる用語・主題を使用し、未確認の版・刊年・出版社を推定追加しない。具体語を証明できない資料は確認事項を作らず「確認箇所」として元の所在を残す。世界史資料の版・発行年は日本史へ流用していない。

## 結果

- 210問の1947出典行を370書籍項目へ整理。確認事項123項目、確認箇所のみ247項目。
- 全1947参照箇所の情報をlocatorに保持。用語集editionから操作指示だけを外し、まえがき年月と版・刷未確認の事実を保持。刊年の新規追加0件。
- 個別設問と既存投入原稿の対応210/210一致。本文・解説・正答の新規一括複製は行わず、確認用メタデータのみを保存。
- 出典案の独立レビューpassed（taxonomy_independent、2026-11-01T03:25:30.579Z）。SHA256は `4a707cfffcc26c48a5d4adbd5cd82a29bef2d991a82394e46b71bff9f9233fe5`。
- 公開用の既存出典バリデータで210問・370項目がそのまま受理されることを確認。
- 共通Writerで全210問を同一トランザクションで更新。変更教材の公開整合性を最後にまとめて検査し、確定前に全保持条件を照合。
- 出典は共通Writer上の内容更新に当たるため、210問の内容版を各1進めた。保存済み回答履歴0件を更新前・トランザクション内で確認し、削除された履歴はない。
- 分類・本文・正答・選択肢ID・公開状態・お気に入り・教材・大問・利用者・225分類リンクなどの全行digestと本文参照関係を保持。反復実行は変更0件。DB再読込は全370出典項目と完全一致。
- 表示の単体検査7件成功。URL安全性・通常出典・Web資料・元locator不変も確認。
- PC1280×900とSP393×852で、選択肢選択→回答→出典欄の実操作を確認。出典は資料ごとに表示され、文字はみ出し・重なりなし。回答前APIに出典・解説・正答情報がないことも確認。
- 表示画像の独立レビューpassed。匿名の画面検査後もDB snapshotが登録直後と一致。

## 変更ファイル

| ファイル | 内容 |
| --- | --- |
| `frontend/app/utils/learningPresentation.ts` | 確認事項がある書籍は確認事項を優先し、locatorは保存したまま表示から省略。具体語のない書籍は確認箇所を明示。WebとURL安全性は保持 |
| `frontend/tests/groupedLearningPresentation.test.ts` | 確認事項優先・fallback・rawデータ不変・Web維持の検査 |
| `local-only/source-reference-format/proposed-sources.json` | レビュー済みの出典メタデータ。本文・正答フラグなし |
| `local-only/source-reference-format/source-theme-provenance.json`、`question-correspondence.json`、`proposal-checks.json`、`review-proposed-sources.json` | 確認テーマ・設問対応・所在保持・独立レビューの根拠 |
| `local-only/source-reference-format/apply.mjs`、`register.py` | 明示更新・全保持・内容版・反復・再読込の検査。通常起動に組み込まない |
| `local-only/source-reference-format/snapshot.mjs`、`db-before.json`、`db-after.json`、`result.json` | 本文や個人情報を保存せず、版・digest・安全な件数で保持を確認 |
| `local-only/source-reference-format/inspect-world.cjs`、`check-japanese-ui.cjs`、`ui-check.json`、`post-ui-check.json` | 明示許可されたWorld操作と日本史PC/SPの操作検査 |
| `local-only/source-reference-format/world-sources.png`、`japanese-sources-1280.png`、`japanese-sources-393.png` | 根拠資料欄だけの確認画像。問題本文・解答欄は撮影対象外 |
| `docs/source-reference-format.md`、`docs/workflow/state.json`、今回の引き継ぎ | 結果と完了記録 |

元の未コミット変更を保持し、今回の変更は未コミット・未push・未公開。原資料・作問データ・出典対応はlocal-onlyに保持し、外部ストレージやCI成果物へ送信していない。
