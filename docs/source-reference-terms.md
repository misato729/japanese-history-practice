# 根拠資料の用語表示と作問範囲の再確認

2026-11-01。ユーザーの指定により、問題・選択肢・解説に使う歴史用語と歴史的事実を「日本史用語集」または「詳説日本史」の掲載内容へ限定する。最短解法に不要な修飾事実も対象とする。撮影PDFのページ番号は書籍共通のページと扱わず、学習画面では確認した用語・見出しを示す。

## 結果

- 210問・560選択肢・28大問の確認結果を統合し、既知の未解決事項0件。現在DBの設問・全選択肢・解説・回答形式・回答条件・共通本文と資料60件は、凍結された投入原稿へ独立レビュー済みの3問の修正だけを適用したものと一致する。
- 中世37問は今回、全肢と必要細部を原画像で再照合。他分野は全肢確認を明記した既存の独立原画像レビューと現行原稿の同一性を検査し、疑義のある細部は追加再読した。全原画像を今回新規に再読したことや、全掲載語の新しい完全索引を意味しない。
- 根拠資料は用語集210項目・教科書115項目の計325項目。全項目に確認語があり、275項目は直接の確認事項、50項目は共通本文の背景であることを明示。追加用語一覧45項目は事実の根拠から外し、ローカルの作問範囲記録へ保持した。
- 書籍の撮影位置を根拠資料欄に表示しない。解説内の994参照も、書籍名を残して撮影位置を表示から除去する。歴史事項の数字を一般的に置換せず、保存済み解説原本を表示処理で書き換えない。

## 点検で修正した内容

| 小問ID | 対応 |
| --- | --- |
| 104 | 許容原典とは異なる建築様式の表記を、選択肢1箇所・解説1箇所で原典に合わせた。同義と未確認のまま扱わない。 |
| 38 | 許容原典で裏付けられない説明の一部を除き、原画像にある制度内容へ絞った。未確認を全書非掲載とは断定しない。 |
| 75 | 解説の著者の取り違えを訂正。誤肢の人物名も確認済みの表記へ揃え、別の未確認の修飾を除去。元の書名・作者の取り違えという誤りと正答位置を保持した。 |
| 41・133 | 必要事項が載る正しい用語集の原画像へ個別参照を訂正。学生向け内容は変更しない。104の個別参照記録も訂正した。 |

3問の修正は実装担当以外が原画像と最終原稿を再読し、全肢の正誤・正答位置が維持されることを確認した。既存作問原稿も修正し、本文の新しい一括複製は作っていない。

## 教科書参照の除外判断の訂正

初回統合時に54〜60の教科書参照7項目を不適切と判断し、318項目として反映した。しかし頁上部の主題に注意が偏っており、頁下部には58の論述に必要な因果関係、別頁の史料欄には60の共通史料そのものが掲載されていた。除外判断と、その判断を画像再読前に採用したレビュー範囲を撤回した。

担当を分けて頁全体・史料欄・現共通本文を再読し、58・60の直接根拠と、他5問の共通本文背景を区別して7項目を復元した。既存の2原稿でも12参照ずつを復元し、学生向け本文・採点要素は変更していない。初回318案とレビューはhash付きでローカルに残し、325案の補足独立レビューを取得した。

この誤判定を防ぐため、頁全体の下部・脚注・史料・図表まで確認し、背景参照と個別の直接参照の削除範囲を分ける手順をAGENTSへ統合した。

## DB・表示の検証

- 共通Writerとトランザクションで更新。保存済み履歴0件を更新前・トランザクション内で確認し、削除された履歴はない。問題ID・選択肢ID・正誤位置・回答形式・分類と225分類リンク・お気に入り・教材・大問・利用者・本文参照を保持した。
- 3問の内容修正は各反復0件、他の内容を行digestで保持。出典更新は初回169問、参照復元7問を変更し、各反復0件。出典更新の前後は本文・解説・選択肢内容・正誤などが一致し、最終DBの全325項目がレビュー済み案と一致した。内容版はWriterの規則に従って変更のある保存ごとに進めた。
- 表示の単体検査8件成功。独立した末尾_testのDBで、合成2問の更新・反復・対象外履歴・お気に入り・選択肢ID・ロールバックを確認。
- PC1280×900、SP393×852の各幅で、クエリなしの演習を開き、選択肢選択→回答する→根拠資料を実操作。確認用語が表示され、撮影位置表示・横はみ出しなし。画像は根拠資料欄だけをローカルに保存。幅の一時変更は解除した。
- 匿名の画面操作後も保存済みDB snapshotが一致。原資料・問題本文・正答・個人情報の新しい一括複製やログ出力を検証方式に用いない。

## 今回の変更ファイル

| 実際のパス | 内容 |
| --- | --- |
| `AGENTS.md` | 許容2冊・修飾事実を含む原典確認・頁全体の照合・撮影位置と書籍のページの区別・確認語を示すルール |
| `frontend/app/utils/learningPresentation.ts` | 根拠資料と解説で書籍名・確認語を示し、撮影位置を表示しない |
| `frontend/app/pages/practice/[examNumber]/[questionNumber].vue` | 解説の表示処理を接続 |
| `frontend/tests/groupedLearningPresentation.test.ts` | 撮影位置非表示と資料名・史実・元データ保持の検査 |
| `local-only/predicted-exams-20261030-v3/blocks/medieval.json`、`local-only/predicted-exams-20261030-v3/blocks/modern.json`、`local-only/predicted-exams-20261030-v3/output/complete-data.json` | 既存原稿の3問の表記・説明、個別参照の位置、教科書参照の復元 |
| `docs/source-reference-format.md` | 旧fallbackの撤回と今回の記録への案内 |
| `docs/source-reference-terms.md`、`docs/workflow/state.json`、`docs/workflow/contexts/development.md`、今回の引き継ぎ | 依頼・結果・完了記録 |

ローカル作業ファイルの全パス・hash・区分は `local-only/source-reference-terms/file-manifest.json` に列挙。今回だけ生成したコンパイルキャッシュは除去し、既存資料は削除していない。

出典用語対応・監査・DB保持の照合値・適用用処理・PC/SP画像は `local-only/source-reference-terms/` と `local-only/source-scope-audit/` に保存。主要な根拠は次の実ファイルを参照する。

- `local-only/source-reference-terms/proposed-sources.json`、`proposal-checks.json`、`review.json`：最終325項目と独立レビュー。
- `local-only/source-reference-terms/terms-1-5.json`、`terms-6-7.json`、`additional-confirmed-terms.json`：書籍別の確認語と証拠。
- `local-only/source-reference-terms/review-textbook-53-root.json`、`review-6-7-root.json`：作成担当と分けた証拠対応の確認。全原画像の新規再読と混同しない。
- `local-only/source-reference-terms/apply.mjs`、`register.py`、`snapshot.mjs`、`result.json`：明示更新・反復・再読込と保持。初回318段階は `proposal-initial-318.json`、`review-initial-318.json`、`result-initial-318.json` へ履歴として保存。
- `local-only/source-reference-terms/test-source-update.mjs`、`all-display-check.json`、`final-check.json`、`ui-check.json`、`visual-review.json`、`sources-pc.jpg`、`sources-sp.jpg`：合成DB・全件表示・実操作の根拠。
- `local-only/source-scope-audit/aggregate-review.json`、`audit-1-75.json`、`audit-76-150.json`、`audit-6-7.json`：210問・560肢の統合と分担監査。
- `local-only/source-scope-audit/audit-1-75-supplemental.json`：最短解法に不要な修飾を含む全50四択・200肢の再読。
- `local-only/source-scope-audit/check-current.py`、`current-equality.json`、`check-reference-structure.py`、`reference-structure.json`：現DBとの全件対応と原稿の許容資料参照構造。
- `local-only/source-scope-audit/content-correction-plan.json`、`content-correction-review.json`、`additional-correction-plans.json`、`additional-correction-review.json`、`additional-correction-supplement-review.json`：3問の変更と独立原画像レビュー。
- `local-only/source-scope-audit/apply-content-correction.mjs`、`content-correction-result.json`、`additional-correction-result.json`：内容更新・反復・対象外保持。
- `local-only/source-scope-audit/essay58-evidence.json`、`essay58-independent.json`、`modern-s02-background-independent.json`、`restored-modern-references.json`：旧除外判断の訂正と全頁再読・参照復元。

作業前からの未コミット変更（カテゴリ・サイドバー・案内/規約・それらの記録等）は保持した。同名ファイルにある先行変更も取消していない。今回の変更は未コミット・未push。この作業では配信操作を行っておらず、並行作業による公開先への反映は確認対象外。原資料と対応データを外部送信せず、ローカル専用の保護を維持している。
