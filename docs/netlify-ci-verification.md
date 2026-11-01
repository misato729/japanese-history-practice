# Netlify静的生成のCI回帰検査

2026-11-02の「CIでもNetlifyと同じ条件で静的生成し、公開先にファイルが生成されることを確認」「汎用テンプレートにも」の依頼に基づく。日本史版と /Users/yoshiki/Desktop/exam-practice-template のCIが対象。実装・単体検査・実生成・独立レビューで確認する。作業履歴は本書と日本史版のstateだけに保存し、汎用版の世代0/空タスクと既存の記事差分を保持する。

独立したUbuntu 24.04ジョブを既存検査後に追加し、netlify.tomlからNode版・base・build command・publish・環境値を読む。NETLIFY=true/CI=true/CONTEXT=productionを指定し、npm ciと実生成を行う。presetをCIへ別定義せず設定欠落を検出する。既存公開物がある場合は上書き/削除せず失敗させ、index.html/200.html/JS/CSS、定義済みのheaders/redirectsの保持を検査する。

汎用版にはNetlify設定がなかったため、特定サービスのURLや秘密値を含まない静的生成設定を追加する。API/DB方式や問題データは移植しない。汎用版の既存verify/browser完了後、日本史版のverify完了後に新ジョブを実行する。CIから公開操作は行わない。

検証中。単体検査7件は正本設定の適用、preset欠落によるdist出力、古い公開物とリンク切れ、生成失敗、空HTML/不足CSS、既存routingファイル欠落を対象とする。検査記録はlocal-only/netlify-ci/へ置く。

両版で単体7件と差分検査・全履歴の資料保護検査が成功。独立担当ci_netlify_reviewがCIの依存関係、設定読込、設定上書き、公開先の範囲検査、既存資料保持を確認。dangling symlinkの事前拒否も追加した。検査コードとNetlify設定は両版で一致し、templateの既存記事/世代0 stateは初期digestと一致。日本史版の前回実生成111ファイルも新しい出力検査に成功した。

日本史版の変更ファイルは.github/workflows/ci.yml、scripts/check-netlify-build.py、scripts/test_netlify_build.py、docs/testing.md、本書、docs/workflow/state.jsonと新しいhandoff。汎用版はCI・同じ2スクリプト・docs/testing.md・新規netlify.tomlのみ。両方ともskip netlifyを付けてCI検証用にpushし、本番公開/DB/認証設定は変更しない。
