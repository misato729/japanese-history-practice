<script setup lang="ts">
useSeoMeta({ title: `試験概要｜${SITE.name}`, description: `${SITE.exam_name}の概要をご案内します。` })
</script>

<template>
  <div class="page-wrap overview-page">
    <header class="page-intro"><h1>{{ SITE.exam_name }}</h1><p>{{ SITE.description }}</p></header>
    <section v-for="section in SITE.overview" :key="section.title" class="content-panel">
      <h2>{{ section.title }}</h2><p>{{ section.body }}</p>
    </section>
    <section class="content-panel">
      <h2>本サイトの演習</h2>
      <p>1大問7問または8問の大問演習と、4大問・合計30問の模試形式に対応しています。公開中の教材は、トップページの模擬試験一覧から選べます。</p>
      <p>回答形式は、{{ CHOICE_LABELS.length }}つの選択肢から正答を1つ選ぶ選択式、指定に沿って語句を入力する語句記述、80字以内で説明する論述です。大問の共通本文を確認しながら、1問ずつ回答と解説を確認できます。</p>
      <p>論述は解答要素ごとの一致数・保留数と参考点を表示します。公式の採点基準ではありません。章・節や文化史の区分を指定して演習できます。</p>
      <NuxtLink class="primary-link" to="/#practice-launcher">問題演習を始める</NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.overview-page { padding-bottom: 36px; }
.content-panel p { white-space: pre-line; overflow-wrap: anywhere; }
</style>
