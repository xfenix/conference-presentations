# Пробелы в докладе: что популярно осенью 2026 и чего нет в слайдах

Дата проверки: 3 октября 2026.
Звёзды — GitHub API, загрузки — pypistats.org и api.npmjs.org (последние 30 дней на 1 окт 2026).
В `index.html` не найдено: worktree, sandbox, devcontainer, pyright, pyrefly, ty, ccusage, spec-kit, lefthook, pre-commit, prompt injection, CodeRabbit, Ollama, uv.

## 1. ty — проверка типов от Astral (и pyrefly, basedpyright)

- Что: быстрый type checker и LSP на Rust от авторов ruff и uv. Альтернативы: pyrefly (Meta), basedpyright.
- Зачем докладу: в pylines стоит mypy strict. Агенту нужна быстрая обратная связь после каждой правки, а ty отвечает за доли секунды. Плюс LSP даёт агенту диагностику прямо в цикле.
- Цифры:
  - ty: 19 792 звезды, 39 млн загрузок за месяц — https://github.com/astral-sh/ty, https://pypistats.org/packages/ty
  - basedpyright: 3 621 звезда, 13,5 млн загрузок за месяц — https://github.com/DetachHead/basedpyright
  - pyrefly: 7 044 звезды — https://github.com/facebook/pyrefly (загрузки не получены, pypistats не ответил)
  - для сравнения mypy: 152 млн загрузок за месяц
- Куда: слайд рядом с pylines «ruff + mypy» — «ty как быстрый второй контур / LSP для агента».

## 2. Песочница и права агента

- Что: режимы sandbox в Claude Code (`/sandbox`, на базе sandbox-runtime) и Codex CLI, devcontainers, container-use от Dagger.
- Зачем докладу: история про опасные hooks уже есть, а защиты нет. Песочница — главное условие, чтобы запускать агента без подтверждений и строить длинные циклы.
- Цифры:
  - anthropics/sandbox-runtime: 5 425 звёзд — https://github.com/anthropics/sandbox-runtime
  - dagger/container-use: 4 055 звёзд — https://github.com/dagger/container-use
  - trailofbits/claude-code-devcontainer: 950 звёзд — https://github.com/trailofbits/claude-code-devcontainer
- Куда: сразу после истории про hooks — один слайд «песочница вместо --dangerously-skip-permissions».

## 3. Параллельные агенты и git worktree

- Что: несколько агентов на одном репозитории, каждый в своём worktree. Инструменты: cmux, Superset, claude-squad.
- Зачем докладу: loop engineering без параллельных циклов неполный. Worktree решает конфликты файлов между агентами.
- Цифры:
  - manaflow-ai/cmux: 27 585 звёзд — https://github.com/manaflow-ai/cmux
  - superset-sh/superset: 14 831 звезда — https://github.com/superset-sh/superset
  - smtg-ai/claude-squad: 8 562 звезды — https://github.com/smtg-ai/claude-squad
  - Встроенная поддержка worktree в Claude Code — не проверено.
- Куда: в секцию loop engineering, рядом с Workflows (ultracode).

## 4. Spec-driven development

- Что: сначала спецификация и план, потом код. Инструменты: GitHub spec-kit, OpenSpec, BMAD-METHOD.
- Зачем докладу: прямой ответ на слоп — агент работает по проверяемой спецификации, а не по чату.
- Цифры:
  - github/spec-kit: 139 897 звёзд — https://github.com/github/spec-kit
  - Fission-AI/OpenSpec: 70 947 звёзд — https://github.com/Fission-AI/OpenSpec
  - bmad-code-org/BMAD-METHOD: 53 750 звёзд — https://github.com/bmad-code-org/BMAD-METHOD
- Куда: в историю между context engineering и harness engineering, либо рядом с superpowers (у него есть brainstorming → plan).

## 5. Pre-commit / lefthook как жёсткий барьер

- Что: git-хуки гоняют ruff, mypy/ty и тесты перед каждым commit, независимо от агента.
- Зачем докладу: линтеры есть, но нет механизма, который не даст агенту их обойти. Это дешевле и надёжнее правил в AGENTS.md.
- Цифры:
  - pre-commit/pre-commit: 15 609 звёзд — https://github.com/pre-commit/pre-commit
  - evilmartians/lefthook: 8 880 звёзд — https://github.com/evilmartians/lefthook
- Куда: последний слайд блока pylines — «как заставить агента соблюдать правила».

## 6. Ревью кода агентом в CI

- Что: агент проверяет merge request: claude-code-action, codex-action, PR-Agent, CodeRabbit.
- Зачем докладу: второй контур против слопа — ревью другой моделью или другим промптом.
- Цифры:
  - anthropics/claude-code-action: 9 394 звезды — https://github.com/anthropics/claude-code-action
  - The-PR-Agent/pr-agent: 13 246 звёзд — https://github.com/The-PR-Agent/pr-agent
  - openai/codex-action: 1 255 звёзд — https://github.com/openai/codex-action
  - CodeRabbit — цифры не получены, не проверено.
- Куда: после тестов — «ревью делает второй агент».

## 7. Учёт токенов и денег: ccusage

- Что: CLI считает расход токенов и стоимость по логам Claude Code, Codex и других.
- Зачем докладу: в докладе много про экономию (rtk, caveman, дешёвые агенты), но нет способа её измерить. claude-hud показывает контекст, а не деньги за период.
- Цифры: 18 848 звёзд — https://github.com/ccusage/ccusage; 499 тыс. загрузок npm за месяц — https://www.npmjs.com/package/ccusage
- Куда: рядом с `rtk gain` — «как мерить экономию».

## 8. Безопасность MCP и prompt injection

- Что: подложенные инструкции в веб-страницах, тикетах и описаниях MCP-инструментов. Сканеры: snyk/agent-scan (бывший mcp-scan).
- Зачем докладу: в докладе используются Playwright, Chrome DevTools и Context7 — все тянут внешний текст в контекст. Это прямой путь для инъекции.
- Цифры: snyk/agent-scan — 3 109 звёзд, https://github.com/snyk/agent-scan. Числа по атакам не собирал — не проверено.
- Куда: один слайд рядом с песочницей (пункт 2), их удобно объединить.

## 9. Память между сессиями

- Что: плагины, которые сохраняют решения и контекст между сессиями: claude-mem, mem0, basic-memory.
- Зачем докладу: на тему context rot и handoff. Сейчас в докладе есть handoff, но нет постоянной памяти.
- Цифры:
  - thedotmack/claude-mem: 95 214 звёзд — https://github.com/thedotmack/claude-mem
  - mem0ai/mem0: 66 509 звёзд — https://github.com/mem0ai/mem0
- Куда: рядом с context-mode или handoff — одной строкой.

## 10. Другие harness: Codex CLI и OpenCode — шире, чем упоминание

- Что: в докладе они уже есть в списке. Не хватает тезиса, что AGENTS.md и skills переносятся между ними.
- Цифры:
  - anomalyco/opencode: 211 552 звезды, 10 млн загрузок npm за месяц — https://github.com/anomalyco/opencode
  - openai/codex: 127 681 звезда, 89,8 млн загрузок npm за месяц — https://github.com/openai/codex
  - для сравнения @anthropic-ai/claude-code: 55 млн загрузок npm за месяц
  - google-gemini/gemini-cli: 107 220 звёзд, 1,6 млн загрузок npm
- Куда: на слайд AGENTS.md — «один файл работает в Claude Code, Codex, OpenCode».

## Не вошло

- Локальные модели (ollama, 182 080 звёзд) — для Python-разработчиков вне темы харнесса.
- Eval для skills (promptfoo, 25 662 звезды) — полезно, но тянет на отдельный доклад.
- Observability агентов (langfuse, 35 327 звёзд) — про продуктовые агенты, не про разработку.
- uv уже стандарт (90 384 звезды). Хватит одной строки в AGENTS.md: «запускай через `uv run`».
- HN Algolia из этой сети вернул пустой ответ, поэтому обсуждения на HN не проверены.
