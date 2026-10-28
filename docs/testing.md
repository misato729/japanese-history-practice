# 検証手順

Node.jsは `frontend/package.json` の対応版を使用し、DockerはNode.js 24です。負荷を抑えて順に実行します。

```sh
node scripts/check-template.mjs
node --test --test-concurrency=1 scripts/context.test.mjs scripts/workflow-policy.test.mjs scripts/workspace-policy.test.mjs scripts/check-private-sources.test.mjs
node scripts/context.mjs check
```

API検査は独立した `japanese_history_test` を使います。DBの作成は初回のみです。

```sh
docker compose up -d db --wait
docker compose exec -T db sh -c 'createdb -U "$POSTGRES_USER" japanese_history_test'
docker compose run --rm -e APP_ENV=test -e DB_NAME=japanese_history_test frontend sh -c 'npm run db:migrate && npm run test:server'
docker compose run --rm frontend sh -c 'npm run security:check && npm test && npm run typecheck && npm run build'
```

合成データで保存・反復・公開条件・回答前非公開・履歴・お気に入り・アーカイブ・採点を検査します。論述の実教材の精度は原典と答案で別に確認します。画面はPC・スマートフォンの実操作を確認し、結果を [verification.md](verification.md) に残します。
