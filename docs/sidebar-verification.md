# 模擬試験サイドバーの横開閉

2026-10-31のユーザー依頼「サイドバーをヨコに開閉式にしたい」に基づくローカル変更です。

## 変更ファイル

| パス | 内容 |
| --- | --- |
| `frontend/app/layouts/default.vue` | PCの開閉状態と共通幅を保持。通常260px、折畳み64pxに本文列も連動 |
| `frontend/app/components/ExamSidebar.vue` | PCの左右開閉ボタン、SPの左スライドパネル・背景・閉じるボタン、閉状態のinert、フォーカス循環/復帰、画面幅変更とスクロールの復元 |
| `frontend/tests/examSidebarLayout.test.ts` | 旧ドロップダウンの構造固定を横開閉の仕様へ更新。共有カタログ・利用資格・0件・大問ナビゲーションの既存契約を維持 |
| `docs/workflow/state.json` | 今回の依頼・受入条件・担当・上限3回を登録。既存作業の記録は保持 |
| `docs/sidebar-verification.md` | 今回の変更と検証範囲 |
| `docs/workflow/contexts/development.md` | 横開閉の検証記録への入口 |
| `docs/workflow/handoffs/2026-10-30T19-52-36-784Z-r43.json` | 自動検査成功・実画面確認未達の第1回評価 |
| `docs/workflow/handoffs/2026-10-30T19-53-22-010Z-r44.json` | 未確認範囲と再開手順のcheckpoint |
| `docs/workflow/handoffs/2026-10-30T20-26-25-220Z-r45.json` | PC/SP実操作・独立レビューを含む第2回合格評価 |
| `docs/workflow/handoffs/2026-10-30T20-27-19-031Z-r46.json` | gate通過後のdone checkpoint |
| `docs/screenshots/sidebar-pc-expanded.png` | PC 1440×900、通常260pxの表示 |
| `docs/screenshots/sidebar-pc-collapsed.png` | PC 1440×900、64px折畳みと本文幅の連動 |
| `docs/screenshots/sidebar-pc-groups.png` | PC 1440×900、大問一覧の表示 |
| `docs/screenshots/sidebar-sp-closed.png` | SP 393×852、パネルを閉じた表示 |
| `docs/screenshots/sidebar-sp-open.png` | SP 393×852、左パネルを開いた表示 |
| `docs/screenshots/sidebar-sp-320.png` | SP 320×640、大問一覧と折返しの表示 |

## 検証

- 既存のサイドバー関連テスト：最終版で7件成功、失敗・スキップ0。ソースの契約検査であり実操作の代わりにはしていません。可視化タイミング修正時に完全一致の旧期待1件が失敗し、期待を更新して再成功しています。
- `git diff --check`：成功。
- Nuxt型検査（専用Docker内の `npm run typecheck`）：成功。その後の変更はCSSの可視化タイミングと既存テスト期待だけで、TypeScriptの追加変更はありません。
- review_paletteによるソース独立レビュー：修正必須の問題なし。既存のカタログ・利用資格・模擬試験/大問リンクを保持し、PCの幅連動、SPの開閉、非表示時の操作抑止、Escape・背景・画面移動時の閉鎖、フォーカスとスクロール復元を確認。

## 実画面での確認

2026-10-31、ブラウザを有効化した後の再接続に成功し、内蔵ブラウザで実操作を完了しました。途中の画面移動で一時応答待ちがありましたが、同じ確認タブの応答が戻ってから残りを確認しています。

| 条件 | 確認結果 |
| --- | --- |
| PC 1440×900 | 260px→64px→260pxに横開閉し、本文左端も260px→64pxへ連動。反復クリック・Enterで開閉可能。閉状態は一覧が非表示かつinert |
| PCのスクロール後 | 本文scrollY=537でもサイドバー上端76pxを保持し、ボタンで開閉可能。開閉で本文のスクロール位置は保持 |
| SP 393×852 | 左から幅320pxのパネルを表示。閉状態は本文が画面幅を使用し、一覧がinert。×・Escape・背景の見える余白のクリックで閉じ、元ボタンへフォーカスが復帰 |
| SP 320×640 | パネル272px、大問一覧は1列で折返し。パネル内とページの横はみ出しなし |
| キーボード | 開直後は閉じるボタンにフォーカス。Shift+Tabで最後の大問ボタン、Tabで閉じるボタンへ循環 |
| スクロール | SP開中はbodyのoverflow=hiddenで背景をスクロールできず、閉じると元のoverflowに復元してスクロール可能。ページ下部から実際にクリックしても位置を保持 |
| 760/761pxの境界 | PCを64pxに閉じたまま760pxへ変更してもSPは独立に開ける。開いた状態から761pxへ戻すと背景が消え、overflowを復元し、PCは64pxを保持。安定後の横はみ出しなし |
| 大問移動 | SPの大問リンクで`/practice/1/9`へ移動し、パネル閉鎖・inert・スクロール解除を確認。再び開くと選んだ大問のaria-current=location |
| 既存の右メニュー | 左パネルを閉じて右メニューを開閉でき、閉じた後に左パネルも再び開閉可能 |

実操作で、開直後にフォーカスが外側の起動ボタンへ残る不具合を検出しました。visibilityの180ms補間を、開く際は即時可視化・閉じる際のみ180ms遅延へ変更し、修正後の自動フォーカス・循環・復帰を再確認しました。

review_paletteがソースとPC/SP画像を独立レビューし、修正必須のレイアウト問題なしと判定しました。表示確認は公開一覧5回の状態です。空一覧・利用資格エラー・認証別の実画面は変更しておらず、既存の構造検査とソースレビューの範囲に限ります。原資料・問題本文・正答をログや確認画像へ記録していません。viewportの一時指定は最後に解除しました。

環境の補足：専用DBはhealthyでした。frontendのコンテナ監視表示はunhealthyでしたが、画面のAPI接続は正常へ戻り、`/api/v1/health`の再確認はHTTP 200（0.934秒）でした。サービスの再起動や監視設定変更は行っていません。

第1回評価はブラウザ未接続により実画面確認が未達でした。その不合格履歴は保持し、今回の実操作・修正・独立レビューで第2回評価はpassed、gateもpassed（終了コード0）です。上限3回のうち2回で合格しています。前回の設定画像は製品の確認画像とは区別しています。

世代46のcheckpointで`horizontal_exam_sidebar`をdoneにしました。今回の削除ファイルはありません。

## 作業範囲

開始時から論述・分類・資料保護・進捗等の未コミット変更があり、それらは保持しています。今回のアプリ変更は上記レイアウトとサイドバー、既存検査の3ファイルだけです。DB・教材・採点規則・配信設定は変更せず、コミット・push・公開は実施していません。

## 追加依頼：背景色をやや濃くする（2026-10-31）

ユーザーの追加依頼により、サイドバーの背景を`#fff0f2`から`#f8dce1`へ変更しました。`ExamSidebar.vue`に専用変数を設け、PCの背景とSPパネルの背景に適用しています。既存の開閉実装・共通カラー・教材関連の差分を保持しています。

| 今回変更・作成したパス | 内容 |
| --- | --- |
| `frontend/app/components/ExamSidebar.vue` | 専用背景変数とPC/SPの背景2箇所 |
| `docs/sidebar-verification.md` | 追加依頼の変更・検証範囲 |
| `docs/workflow/state.json` | 独立した追加タスク`darken_sidebar_background`と評価記録 |
| `docs/workflow/contexts/development.md` | 追加タスクの根拠への入口 |
| `docs/screenshots/sidebar-bg-pc.png` | PC 1440×900の変更後背景 |
| `docs/screenshots/sidebar-bg-sp.png` | SP 393×852の変更後背景・大問表示 |
| `docs/workflow/handoffs/2026-10-30T20-37-54-064Z-r47.json` | 背景色調整の第1回合格評価 |
| `docs/workflow/handoffs/2026-10-30T20-38-35-845Z-r48.json` | 背景色調整のdone checkpoint |

PC 1440×900とSP 393×852で実操作し、背景の計算値が`rgb(248, 220, 225)`になること、文字と白い項目の視認性、横はみ出しがないことを確認しました。PCの閉→再開、SPの開閉・大問展開・閉じた後のスクロール復元も確認済みです。一時指定の画面幅は解除しました。

`git diff --check`成功。背景色のみの追加変更のため、新しいテストや型検査・ビルドは追加実行していません。review_paletteがソースとPC/SP画像を独立レビューし、「やや濃く」の調整として適切で、文字と白い項目の読みやすさも保たれていると確認しました。修正必須の問題はありません。削除なし。追加依頼以前の未コミット変更は保持し、コミット・push・公開・DB変更は行っていません。

背景色調整の第1回評価とgateはいずれもpassedです。世代48のcheckpointで`darken_sidebar_background`をdoneにしました。

## 追加承認後のGit送信

2026-10-31の明示承認後、横開閉・背景色調整と上記記録をmainへコミット・pushしました。実装コミットは`ae7ee5d8396b3589e3a240da307c8117082e94fe`で、GitHub Actionsの全ジョブが成功しています。送信対象の一覧、別作業の保持、配信停止と最終送信の根拠は`docs/sidebar-delivery.md`を参照します。上の未コミット・未送信の記述は、それぞれの実装確認時点の履歴です。
