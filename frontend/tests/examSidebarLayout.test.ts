import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = (path: string) => readFileSync(new URL(`../app/${path}`, import.meta.url), 'utf8')
const layout = source('layouts/default.vue')
const header = source('components/SiteHeader.vue')
const sidebar = source('components/ExamSidebar.vue')

test('one shared exam sidebar is rendered inside the sticky site header', () => {
  assert.equal(layout.match(/<ExamSidebar\b/g)?.length, 1)
  assert.match(layout, /<SiteHeader>\s*<ExamSidebar v-model:collapsed="sidebarCollapsed"\s*\/>\s*<\/SiteHeader>/)
  assert.match(layout, /grid-template-columns: var\(--exam-sidebar-width\) minmax\(0, 1fr\)/)
  assert.match(layout, /\.app-shell.sidebar-collapsed\s*\{ --exam-sidebar-width: 64px;/)
  assert.match(header, /<slot\s*\/>\s*<\/header>/)
  assert.match(header, /\.site-header\s*\{[^}]*position:\s*sticky;[^}]*top:\s*0;/)
})

test('horizontal sidebar controls start expanded on desktop and closed on mobile', () => {
  assert.match(layout, /const sidebarCollapsed = ref\(false\)/)
  assert.match(sidebar, /defineModel<boolean>\('collapsed', \{ default: false \}\)/)
  assert.match(sidebar, /:aria-expanded="!collapsed"/)
  assert.match(sidebar, /const mobileOpen = ref\(false\)/)
  assert.match(sidebar, /:aria-expanded="mobileOpen"/)
  assert.match(sidebar, /aria-controls="exam-sidebar-content"/)
  assert.match(sidebar, /id="exam-sidebar-content"/)
  assert.match(sidebar, /:aria-expanded="openExam === exam.exam_number"/)
  assert.match(sidebar, /:inert="isMobile \? !mobileOpen : collapsed"/)
  assert.match(sidebar, /\.mobile-open \.sidebar-content\s*\{ transform: translateX\(0\); visibility: visible; transition-delay: 0s; \}/)
  assert.match(sidebar, /:aria-modal="isMobile && mobileOpen \? true : undefined"/)
})

test('navigation closes the mobile list and shares the published catalog', () => {
  assert.match(sidebar, /watch\(\(\) => route.fullPath, closeMobileList\)/)
  assert.equal(sidebar.match(/@click="closeMobileList"/g)?.length, 2)
  assert.match(sidebar, /@keydown.esc.prevent="closeMobilePanel"/)
  assert.match(sidebar, /mobileToggle.value\?\.focus\(\)/)
  assert.match(sidebar, /@keydown.tab="keepMobileFocus"/)
  assert.match(sidebar, /class="sidebar-backdrop"/)
  assert.match(sidebar, /mobileQuery\?\.removeEventListener\('change', updateViewport\)/)
  assert.match(sidebar, /usePublicExamCatalog\(\)/)
  assert.doesNotMatch(sidebar, /\b(?:useFetch|useApi|\$fetch)\s*\(/)
})

test('sidebar labels mock exams and links published groups without listing child questions', () => {
  assert.match(sidebar, /catalogExamLabel\(exam.exam_number\)/)
  assert.match(sidebar, /catalogGroupLinks\(exam\)/)
  assert.match(sidebar, /v-for="entry in exam.groupLinks"/)
  assert.match(sidebar, /catalogGroupLabel\(entry.group\)/)
  assert.match(sidebar, /isCatalogGroupActive\(exam, group,/)
  assert.match(sidebar, /:to="entry.to"/)
  assert.doesNotMatch(sidebar, /v-for="question in exam.question_numbers"/)
  assert.doesNotMatch(sidebar, /exam.title\s*\|\|/)
  assert.match(sidebar, /v-else-if="!exams.length"/)
  assert.match(sidebar, /catalogExamStartNumber\(exam\) !== undefined/)
  assert.match(sidebar, /exam.access !== 'paid_membership_required'/)
})

test('group titles wrap within the sidebar and keep comfortable link targets', () => {
  assert.match(sidebar, /\.group-list a\s*\{[^}]*min-width:\s*0;[^}]*min-height:\s*44px;[^}]*overflow-wrap:\s*anywhere;/)
  assert.match(sidebar, /\.exam-link\s*\{[^}]*min-width:\s*0;[^}]*overflow-wrap:\s*anywhere;/)
})

test('home anchor leaves room for both mobile header rows', () => {
  assert.match(layout, /--site-navigation-height: calc\(var\(--header-height\) \+ var\(--exam-toggle-height\)\)/)
  assert.match(source('pages/index.vue'), /scroll-margin-top: calc\(var\(--site-navigation-height, var\(--header-height\)\) \+ 20px\)/)
})

test('mobile exams open from the left in a full-height single-column panel', () => {
  const mobileStyles = sidebar.split('@media (max-width: 760px)')[1]
  assert.ok(mobileStyles)
  assert.match(sidebar, /v-else class="exam-groups"/)
  assert.match(mobileStyles, /\.exam-groups\s*\{[^}]*grid-template-columns: minmax\(0, 1fr\)/)
  assert.match(mobileStyles, /\.sidebar-content\s*\{[^}]*position: fixed;[^}]*inset: 0 auto 0 0;/)
  assert.match(mobileStyles, /height: 100dvh/)
  assert.match(mobileStyles, /transform: translateX\(-100%\)/)
  assert.doesNotMatch(mobileStyles, /width: calc\(200%|margin-left: calc\(-100%/)
  assert.match(mobileStyles, /\.group-list\s*\{[^}]*grid-template-columns: minmax\(0, 1fr\)/)
  assert.match(mobileStyles, /overflow-y: auto/)
})
