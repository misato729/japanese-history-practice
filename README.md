# 日本史ラボ（仮称）

日本史の演習サービスを作るための初期コピーです。Nuxt 4 / Vue / TypeScript、Nitro / H3、PostgreSQL 16で動き、画面とAPIを同じNode.jsプロセスから配信します。

教材・大問・共通本文・小問の管理、選択・語句記述・論述の参考採点、章節と文化史4区分の演習、会員登録・履歴・お気に入り、任意の一回払い決済、開発用ハーネスを引き継いでいます。

**日本史の実問題・参照資料・正式な分類・論述採点規則は未登録です。** 仮分類は2章・各1節です。合成テスト用5問は自動登録せず、初回は公開問題なしの画面になります。課金・販売は無効です。

## 起動

DockerとDocker Composeを用意し、このフォルダで実行します。新規コピー時には専用の開発用 `.env` を生成しています。既存の `.env` を上書きしないでください。

```sh
docker compose up -d --build
```

`.env` がない別のコピーでは `.env.example` を複製し、DBパスワードと64文字以上の認証用秘密値を独自の値へ変更してから起動します。秘密値は送信しません。

| 接続先 | 初期値 |
| --- | --- |
| 学習画面 | http://localhost:3300 |
| 管理ログイン | http://localhost:3300/admin/login |
| 教材・大問管理 | http://localhost:3300/admin/exams |
| 小問管理 | http://localhost:3300/admin/questions |
| API稼働確認 | http://localhost:3300/api/v1/health |
| 互換APIポート | http://localhost:3301/api/v1/health |
| 開発用PostgreSQL | 127.0.0.1:55434 |

Compose名は `japanese-history-practice`、DBは `japanese_history_development`、DBユーザーは `japanese_history`。Cookie識別子・ボリュームも独立しています。停止は `docker compose down` で、DBを保持します。

## 管理者と教材の登録

既定の管理者はありません。作成時だけ次を実行します。パスワードは8文字以上・72バイト以内で、既存アカウントを上書き・昇格しません。

```sh
export ADMIN_EMAIL='admin@example.test'
export ADMIN_NAME='管理者'
printf '管理者パスワード: '
stty -echo
read -r ADMIN_PASSWORD
stty echo
printf '\n'
export ADMIN_PASSWORD
docker compose exec -e ADMIN_EMAIL -e ADMIN_NAME -e ADMIN_PASSWORD frontend npm run admin:create
unset ADMIN_PASSWORD
```

1. `config/exam.json` で対象試験・分類・案内文を設定する。
2. 管理画面で下書きの教材・大問・本文・小問を登録する。
3. 解答・全選択肢・解説・出典・表示を検証して公開する。論述は検証済みの採点規則も必要。

選択式は正答1件。文化史は美術史・音楽史・文学史・その他の4区分です。4大問30問の内部形式名 `rekiken_mock` は互換性のため維持し、日本史の特定試験への対応完成を意味しません。

実問題の正本はDBです。`content/questions.json` の編集ではDBは更新されません。起動・本番での自動seedはありません。

## 開発・運用

- [設定・教材更新](docs/customization.md)
- [画面・API・DBの構成](docs/architecture.md)
- [検証手順](docs/testing.md)
- [DB更新・バックアップ](docs/migration.md)
- [ローカル専用資料](docs/local-only-materials.md)
- [進捗と引き継ぎ](docs/workflow/README.md)
- [初期コピーの検証記録](docs/verification.md)
- [全ファイルと差し替え一覧](docs/copy-manifest.md)
- [リモート作成・送信の確認](docs/remote-repository.md)

2026-10-29の明示依頼に基づき、[非公開リポジトリ](https://github.com/misato729/japanese-history-practice)を作成し、mainへコミット・pushしました。デプロイや自動配信は開始していません。元サービスの資料・利用者・履歴・認証情報・決済設定・作業履歴は含みません。
