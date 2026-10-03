# Workflows в Claude Code, скиллы Мэтта Покока, проверка инструментов

Дата сбора: 3 октября 2026. Звёзды — GitHub API на эту дату.

## A. Dynamic workflows в Claude Code

Главный источник: https://code.claude.com/docs/en/workflows

### 1. Что это и когда вышло

- Workflow — скрипт на JavaScript, который запускает много субагентов сразу. Скрипт пишет Claude, исполняет отдельный runtime в фоне. Сессия при этом остаётся свободной.
- Цитата из документации: «A workflow moves the plan into code». План держит скрипт, а не модель. Промежуточные результаты лежат в переменных скрипта, в контекст Claude попадает только итог.
- Вышло в v2.1.154: «Introducing dynamic workflows: ask Claude to create a workflow and it orchestrates work across tens to hundreds of agents in the background». Источник: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
- Дата публикации 2.1.154 в npm — 28 мая 2026 (https://registry.npmjs.org/@anthropic-ai/claude-code).
- Дайджест «Week 22 · May 25–29, 2026», статус «research preview»: https://code.claude.com/docs/en/whats-new/2026-w22
- Доступно на всех платных планах, через API, Bedrock, Google Cloud Agent Platform и Microsoft Foundry. На Pro включается в `/config`.
- Текущая версия Claude Code на 3 октября — 2.1.288.

Как запустить:

- Слово `ultracode` в запросе: `ultracode: audit every API endpoint under src/routes/ for missing auth checks`.
- Попросить своими словами: «use a workflow», «run a workflow».
- До v2.1.160 ключевым словом было `workflow`. В 2.1.160 его переименовали в `ultracode` (1 июня 2026, CHANGELOG).
- `/effort ultracode` — режим, в котором Claude сам решает, когда нужен workflow. Запуск с ним сразу: `claude --effort ultracode` (с v2.1.203).
- Встроенный workflow: `/deep-research <вопрос>`. Ищет по нескольким направлениям, сверяет источники, голосует по каждому утверждению, отсекает то, что не прошло проверку.
- `/workflows` — список запусков, прогресс по фазам, токены каждого агента. Клавиши: `s` сохранить, `p` продолжить, `x` остановить.

Где лежат сохранённые workflow:

- `.claude/workflows/` в проекте — общие для всех, кто клонирует репозиторий.
- `~/.claude/workflows/` — личные, доступны во всех проектах.
- Сохранённый workflow вызывается как `/<name>`. При совпадении имён побеждает проектный.
- В плагине — папка `workflows/` в корне плагина, вызов `/<plugin>:<name>`.

### 2. API скрипта

Источники: раздел «What the saved script looks like» в документации и встроенный скилл `workflow-authoring` (с v2.1.248).

- `export const meta = { name, description, phases? }` — первой строкой, только литералы.
- `agent(prompt, {schema, label, phase, model, effort, isolation: 'worktree'})` — один субагент. Со `schema` возвращает проверенный JSON.
- `pipeline(items, stage1, stage2, ...)` — каждый элемент проходит стадии независимо, без барьера.
- `parallel(thunks)` — запустить всё сразу и дождаться всех (барьер).
- `phase(title)`, `log(msg)`, глобальные `args` и `budget`, `workflow(name)` для вложенного запуска.
- `Date.now()`, `Math.random()` и `new Date()` без аргументов бросают ошибку: иначе не работало бы продолжение после паузы.
- Нет файловой системы, shell и `import()`. Всю работу делают агенты, скрипт только координирует.

Пример для слайда (дословно из документации, 13 строк):

```javascript
export const meta = {
  name: 'audit-routes',
  description: 'Audit every route handler for missing auth checks',
}

const found = await agent('List every .ts file under src/routes/.', {
  schema: { type: 'object', required: ['files'], properties: { files: { type: 'array', items: { type: 'string' } } } },
})

const audits = await pipeline(found.files, file =>
  agent(`Audit ${file} for missing authentication checks.`, { label: file }),
)

return audits.filter(Boolean)
```

Короткий вариант паттерна «состязательная проверка» из скилла `workflow-authoring` (фрагмент, не самостоятельный скрипт):

```javascript
const votes = await parallel(Array.from({length: 3}, () => () =>
  agent(`Try to refute: ${claim}. Default to refuted=true if uncertain.`, {schema: VERDICT})))
const survives = votes.filter(Boolean).filter(v => !v.refuted).length >= 2
```

### 3. Сценарии, стоимость, ограничения

Примеры запросов из документации:

- Аудит многих файлов: один агент на файл, затем «adversarially verify each finding before reporting it».
- Чинить, пока проверка не пройдёт: `npx tsc --noEmit`, повторять, пока не пройдёт или два раунда подряд не дадут прогресса.
- Миграция многих файлов, каждый в своей изолированной копии (worktree).
- Ревью каждого изменённого файла и одна сводка.
- Исследование по многим источникам.
- Искать проблемы, пока список не перестанет расти: два пустых раунда подряд — стоп.

Паттерны качества из скилла `workflow-authoring`: состязательная проверка (N скептиков пытаются опровергнуть), проверка с разных углов, панель судей, цикл «до пустого раунда», критик полноты.

Стоимость и размер:

- Один запуск тратит заметно больше токенов, чем та же задача в диалоге. Расход идёт в лимиты плана.
- Совет документации: сначала прогнать на малом куске (одна папка вместо репозитория).
- Предупреждение `Large workflow`: больше 25 агентов или прогноз больше 1,5 млн токенов. Только предупреждает, не останавливает.
- Ориентир размера (`/config`, `workflowSizeGuideline`): small < 5 агентов, medium < 10, large < 50, unrestricted. По умолчанию medium, на Pro — small. Это совет модели, не жёсткий лимит.
- Кэш промптов общий у одинаковых агентов в одном запуске. Остальных агентов держат до 5 секунд, пока первый не создаст кэш.

Ограничения runtime:

- До 16 агентов одновременно (меньше при малом числе CPU). Меняется через `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS`, 1–256.
- До 4096 элементов в одном `parallel()`/`pipeline()`.
- 1000 агентов на запуск — защита от бесконечного цикла.
- Нельзя спросить пользователя посреди запуска. Для согласования между этапами — отдельный workflow на каждый этап.
- Продолжение после паузы — только в той же сессии (или после `claude --resume`). Готовые агенты берутся из кэша, первый изменённый и все после него запускаются заново.

### 4. Связь с loop engineering

- Официальные источники Anthropic workflows и loop engineering напрямую не связывают. Я не нашёл ни одного такого утверждения.
- **Наш вывод.** Workflow — внешний цикл внутри Claude Code. Цикл, ветвления и критерий остановки записаны в коде, а не в голове модели. Примеры «keep fixing until the type check passes» и «stop once two rounds in a row find nothing new» из документации и есть внешний цикл с проверкой и условием выхода.
- Близкое к этому определение есть у IBM: loop engineering — «designing agentic workflows, or loops, that iteratively guide AI agents» (https://www.ibm.com/think/topics/loop-engineering, 17 июля 2026). Про Claude Code workflows там речи нет.

## B. Скиллы Мэтта Покока

Репозиторий: https://github.com/mattpocock/skills

- Звёзды: 274 876 (3 октября 2026).
- Установка в Claude Code: `claude plugins install mattpocock-skills` или `/plugin install mattpocock-skills` (есть в официальном маркетплейсе).
- Для других агентов и для правки файлов у себя: `npx skills@latest add mattpocock/skills`. Затем `/setup-matt-pocock-skills`.
- Позиция против фреймворков, цитата из README:

> «Developing real applications is hard. Approaches like GSD, BMAD, and Spec-Kit try to help by owning the process. But while doing so, they take away your control and make bugs in the process hard to resolve.»
>
> «These skills are designed to be small, easy to adapt, and composable. They work with any model.»

Установки — со страницы https://skills.sh/mattpocock/skills на 3 октября. Период подсчёта на странице не указан, считаю это общим числом. **Не проверено.**

| Скилл | Описание из SKILL.md | Установки | Чем хорош |
| :- | :- | :- | :- |
| grill-me | «A relentless interview to sharpen a plan or design.» | 1,3 млн | Самый популярный. Агент расспрашивает до кода, пока не закрыта каждая ветка решения. Лечит главную проблему по README — рассогласование. |
| tdd | «Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.» | 1,0 млн | Красный → зелёный цикл и правила хорошего теста. По README, обратная связь от тестов — главное средство против «код не работает». |
| diagnosing-bugs | «Diagnosis loop for hard bugs and performance regressions.» | 705 тыс. | Фазы с проверкой на каждой: сначала петля, которая краснеет на этом баге, затем minimise → hypothesise → instrument → fix → regression-test. |
| code-review | «Review the changes since a fixed point … along two axes: Standards … and Spec … Runs both reviews in parallel sub-agents and reports them side by side.» | 657 тыс. | Две независимые оси в разных субагентах, чтобы одна не засоряла другую. |

Ещё два коротко:

- to-tickets (589 тыс.): «Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edges».
- handoff (908 тыс.): «Compact the current conversation into a handoff document for another agent to pick up.»

## C. Проверка утверждений

| Репозиторий | Звёзды 3.10.2026 | Ключевой факт | Источник |
| :- | :- | :- | :- |
| mksglu/context-mode | 25 106 | «315 KB becomes 5.4 KB. 98% reduction.» — песочница не пускает сырой вывод в контекст | https://github.com/mksglu/context-mode |
| rtk-ai/rtk | 82 266 | «cuts up to 90% of the bash output your agent reads». Сам README оговаривает: это не 90% счёта, токены считаются как bytes / 4 | https://github.com/rtk-ai/rtk |
| JuliusBrussee/caveman | 109 218 | JetBrains: «8.5% fewer output tokens», около 10% стоимости, качество без заметных изменений (p = 0.82) | https://blog.jetbrains.com/ai/2026/07/speak-to-ai-agents-like-cavemen-tosave-tokens/ |
| DietrichGebert/ponytail | 152 090 | Скилл «самого ленивого сеньора»: лестница YAGNI → stdlib → нативное → одна строка. Бенчмарк ниже | https://github.com/DietrichGebert/ponytail |
| obra/superpowers | 294 578 | «a complete software development methodology for your coding agents, built on top of a set of composable skills». Установка: `/plugin install superpowers@claude-plugins-official` | https://github.com/obra/superpowers |

Уточнения:

- **caveman, расхождение.** README caveman пишет «86 real coding tasks». Статья JetBrains пишет «82 paired tasks». −8.5% выходных токенов подтверждено в самой статье. Там же сказано, что это «at absolute best»: основную часть сессии составляют код и вызовы инструментов, а их скилл не сжимает.
- **ponytail, бенчмарк** (README, файл `benchmarks/results/2026-06-18-agentic.md`). Claude Code без интерфейса правит репозиторий full-stack-fastapi-template. 12 задач, n=4, модель Haiku 4.5. Результат против варианта без скилла: строк кода −54%, токенов −22%, стоимости −20%, времени −27%, проверки безопасности пройдены на 100%. Caveman в той же таблице: строки −20%, токены +7%.
- **ponytail, оговорки автора.** Максимум 94% (задача date picker). На уже минимальном коде эффект близок к нулю. Ранние «80–94%» автор сам называет потолком на одну задачу, а не средним. На GPT-5.5 токены могут расти.
- Репозиторий ponytail создан 12 июня 2026.
