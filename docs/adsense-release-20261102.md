# AdSense共通head追加と配信確認（2026-11-02）

「日本史も同様に」という明示依頼に従い、指定スクリプト追加、コミット・push、CI全ジョブ、Netlify自動配信、本番headを確認する。今回の依頼範囲では既存の配信禁止ルールよりユーザーの最新指示を優先する。Fly手動配信・DB変更・Google側設定は行わない。

着手時のGit変更はなし。共通headに指定src（client=ca-pub-2745326644447602）・async・crossorigin=anonymousを追加し、key=google-adsenseで読み込み後のDOM照合を安定させる。検証と配信は進行中。
