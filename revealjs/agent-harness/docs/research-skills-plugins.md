# Скиллы, плагины и готовые сборки: срез на 1 октября 2026

Звёзды и даты последнего push взяты из GitHub API (`api.github.com/repos/…`) 1 октября 2026.
Описания и команды установки взяты из README репозиториев на ту же дату.

## 1. Agent Skills: стандарт

- Скилл — папка с файлом `SKILL.md`: YAML-шапка и инструкции в Markdown. Рядом можно положить `scripts/`, `references/`, `assets/`. Источник: https://agentskills.io/specification
- Обязательные поля шапки: `name` (до 64 символов, строчные буквы, цифры, дефис) и `description` (до 1024 символов: что делает и когда звать). Необязательные: `license`, `compatibility`, `metadata`, `allowed-tools` (экспериментальное). Источник тот же.
- Постепенная загрузка (progressive disclosure), по спецификации:
  1. При старте агент читает только `name` и `description` всех скиллов, около 100 токенов на скилл.
  2. Тело `SKILL.md` загружается при вызове скилла. Рекомендуемый объём — меньше 5000 токенов и меньше 500 строк.
  3. Файлы из `scripts/`, `references/` и `assets/` подгружаются только по необходимости.
- Спецификация вынесена в отдельный репозиторий `agentskills/agentskills`: 25 822 ★, последний push 2026-08-09. https://github.com/agentskills/agentskills
- В `anthropics/skills` есть папка `spec/` со ссылкой на agentskills.io. https://github.com/anthropics/skills
- Поддержка в разных агентах:
  - CLI `npx skills` от Vercel заявляет поддержку OpenCode, Claude Code, Codex, Cursor и ещё 75 агентов. https://github.com/vercel-labs/skills
  - В README superpowers есть разделы установки для Claude Code, Codex CLI и App, Cursor, Gemini CLI, OpenCode, Copilot CLI, Antigravity, Devin CLI, Qwen Code, Kimi Code, Pi и других. https://github.com/obra/superpowers

## 2. Где искать скиллы

| Источник | Что это | ★ / активность | Ссылка |
|---|---|---|---|
| `npx skills` (vercel-labs/skills) | CLI: `npx skills add owner/repo`, `npx skills update`, `npx skills use … \| claude` | 32 858 ★, push 2026-09-30 | https://github.com/vercel-labs/skills |
| skills.sh | Каталог и рейтинг установок через `npx skills` | — | https://skills.sh |
| anthropics/skills | Официальные скиллы Anthropic и шаблон | 179 192 ★, push 2026-09-29 | https://github.com/anthropics/skills |
| claude-plugins-official | Официальный маркетплейс плагинов, 315 записей | 37 248 ★, push 2026-09-30 | https://github.com/anthropics/claude-plugins-official |
| claude.com/marketplace | Веб-витрина официального маркетплейса | — | https://claude.com/marketplace |
| ComposioHQ/awesome-claude-skills | Awesome-список скиллов | 76 128 ★, push 2026-09-18 | https://github.com/ComposioHQ/awesome-claude-skills |
| VoltAgent/awesome-agent-skills | Больше 1000 скиллов от команд разработчиков и сообщества | 35 074 ★, push 2026-09-29 | https://github.com/VoltAgent/awesome-agent-skills |
| travisvn/awesome-claude-skills | Awesome-список | 15 237 ★, push 2026-04-28, **обновляется редко** | https://github.com/travisvn/awesome-claude-skills |

Топ рейтинга skills.sh на 1 октября 2026, вкладка All Time (https://skills.sh):

1. `find-skills` (vercel-labs/skills) — 3,6 млн установок.
2. `grill-me` (mattpocock/skills) — 1,3 млн.
3. `agent-browser` (vercel-labs) — 991 тыс.
4. `frontend-design` (anthropics/skills) — 940 тыс.
5. `setup-matt-pocock-skills` — 918 тыс.

Ещё в топе: скиллы Feishu/Lark, microsoft/azure-skills, heygen hyperframes, `caveman` (550 тыс.).
Скиллы mattpocock занимают в первой сотне больше 15 мест.

## 3. Коллекции скиллов: топ по звёздам

| Репозиторий | ★ | Последний push | Суть |
|---|---|---|---|
| obra/superpowers | 293 470 | 2026-09-27 | Методология разработки на связке скиллов |
| mattpocock/skills | 273 008 | 2026-09-29 | Небольшие скиллы инженера, которые можно комбинировать |
| multica-ai/andrej-karpathy-skills | 216 054 | 2026-04-20 (**не обновляется**) | Один CLAUDE.md по наблюдениям Карпаты о типичных ошибках LLM в коде |
| anthropics/skills | 179 192 | 2026-09-29 | Официальные скиллы и спецификация |
| DietrichGebert/ponytail | 149 187 | 2026-09-14 | Скилл «ленивый сеньор»: меньше кода, YAGNI |
| JuliusBrussee/caveman | 108 591 | 2026-09-30 | Сжатый «пещерный» стиль ответов; README заявляет −65% токенов |
| addyosmani/agent-skills | 100 158 | 2026-09-26 | 25 инженерных скиллов на цикл define → ship |
| blader/humanizer | 53 125 | 2026-09-28 | Убирает признаки ИИ-текста |
| coreyhaines31/marketingskills | 52 031 | 2026-09-05 | Маркетинг: CRO, SEO, копирайт |
| K-Dense-AI/scientific-agent-skills | 47 219 | 2026-10-01 | Скиллы для научной работы |

Источник: GitHub API, 1 октября 2026.

### obra/superpowers

https://github.com/obra/superpowers

- **Задача.** Вести агента по полному циклу разработки: дизайн → план → TDD → ревью → завершение ветки. Сам README называет себя «complete software development methodology».
- **Скиллы:**
  - `brainstorming` — сократовское уточнение дизайна до начала кода.
  - `writing-plans` / `executing-plans` — подробный план реализации и его выполнение.
  - `test-driven-development` — цикл RED-GREEN-REFACTOR и антипаттерны тестирования.
  - `systematic-debugging` — поиск первопричины в 4 фазы.
  - `subagent-driven-development` — сабагенты с двухэтапным ревью: сначала соответствие спецификации, потом качество кода.
  - Ещё в наборе: `verification-before-completion`, `using-git-worktrees`, `writing-skills`.
- **Установка:** `/plugin install superpowers@claude-plugins-official`. Плагин есть в официальном маркетплейсе.
- **Другие агенты:** в README есть разделы для Codex, Cursor, Gemini CLI, OpenCode и ещё десятка агентов.

### mattpocock/skills

https://github.com/mattpocock/skills

- **Задача.** Типичные провалы агентов: сделал не то, пишет многословно, код не работает, получился «ком грязи». Автор противопоставляет набор GSD, BMAD и Spec-Kit, которые «забирают процесс себе».
- **Скиллы:**
  - `grill-me` / `grilling` — допрос по плану, пока не закрыта каждая ветка решений.
  - `to-spec` / `to-tickets` — превращает разговор в спецификацию, а её — в тикеты с зависимостями.
  - `tdd` — red-green-refactor вертикальными срезами.
  - `diagnosing-bugs` — петля диагностики: воспроизвести → сузить → гипотеза → инструментирование → фикс.
  - `code-review` — ревью по двум осям (стандарты и спецификация) в параллельных сабагентах.
  - Ещё в наборе: `handoff`, `improve-codebase-architecture`, `wayfinder`.
- **Установка:**
  - Плагин из официального маркетплейса: `claude plugins install mattpocock-skills`.
  - Через CLI: `npx skills@latest add mattpocock/skills`.
  - После установки один раз на репозиторий: `/setup-matt-pocock-skills`.

### anthropics/skills

https://github.com/anthropics/skills

- **Задача.** Эталонные скиллы и шаблон. В репозитории лежат скиллы для документов, на которых работает создание файлов в Claude.
- **Самые полезные скиллы** (по описаниям из SKILL.md):
  - `skill-creator` — создание и улучшение скиллов, прогон evals, замер качества.
  - `frontend-design` — интерфейс без шаблонного «ИИ-вида»: эстетика и типографика. На skills.sh — 940 тыс. установок.
  - `docx`, `pptx`, `xlsx`, `pdf` — чтение, создание и правка документов Word, PowerPoint, Excel и PDF.
  - `webapp-testing` — проверка локального веб-приложения через Playwright: скриншоты, логи браузера.
  - `mcp-builder` — руководство по написанию качественных MCP-серверов.
  - Ещё в наборе: `doc-coauthoring`, `web-artifacts-builder`, `claude-api`, `canvas-design`, `theme-factory`, `brand-guidelines`, `internal-comms`, `algorithmic-art`, `slack-gif-creator`.
- **Установка:**
  - `/plugin marketplace add anthropics/skills`
  - затем `/plugin install document-skills@anthropic-agent-skills` или `example-skills@anthropic-agent-skills`.
- Отдельные скиллы `skill-creator` и `frontend-design` есть и как плагины официального маркетплейса.

### blader/humanizer

https://github.com/blader/humanizer

- **Задача.** Переписать ИИ-текст так, чтобы звучал по-человечески, без изменения смысла. Основа — статья Википедии «Signs of AI writing».
- **Внутри один скилл**, который ловит 26 паттернов. Пять главных:
  - «не X, а Y»;
  - фраза-концовка в одну строку;
  - псевдоглубокие сентенции;
  - театральный разгон («Here's the thing»);
  - спор с несуществующим оппонентом.
- **Слепой тест:** судьи выбрали вариант Humanizer в 16 случаях из 16 (issue #229, по данным README).
- **Установка:**
  - Claude Code: `/plugin marketplace add blader/humanizer`, затем `/plugin install humanizer@humanizer`.
  - Любой агент: `npx skills add blader/humanizer --global --agent '*'`.

### addyosmani/agent-skills

https://github.com/addyosmani/agent-skills

- **Задача.** 25 скиллов с quality gates на фазы DEFINE → PLAN → BUILD → VERIFY → REVIEW → SHIP.
- **Названные в README скиллы:** `code-review-and-quality` (ревью по пяти осям перед merge), `interview-me` (сбор требований по одному вопросу за раз).
- **Установка:** `npx skills add addyosmani/agent-skills`.

## 4. Плагины Claude Code

Из чего состоит плагин. Источник: https://code.claude.com/docs/en/plugins-reference

| Компонент | Где лежит по умолчанию |
|---|---|
| Манифест (необязателен) | `.claude-plugin/plugin.json` |
| Скиллы | `skills/<name>/SKILL.md` |
| Команды (для новых плагинов документация советует скиллы) | `commands/` |
| Сабагенты | `agents/` |
| Hooks | `hooks/hooks.json` |
| MCP-серверы | `.mcp.json` (поддерживаются и бандлы `.mcpb`/`.dxt`) |
| LSP-серверы | `.lsp.json` |
| Стили вывода | `output-styles/` |
| Workflows, темы, мониторы | `workflows/`, `themes/`, `monitors/monitors.json` (темы и мониторы — экспериментальные) |
| Исполняемые файлы на PATH инструмента Bash | `bin/` |
| Значения по умолчанию (`agent`, `subagentStatusLine`) | `settings.json` |

- Компоненты плагина получают префикс его имени: `/<plugin>:<skill>`.
- `userConfig` спрашивает настройки при включении плагина; поле с `sensitive` скрывает ввод.
- `CLAUDE.md` в корне плагина **не загружается** — инструкции нужно класть в скилл.

### Маркетплейсы

Источники: https://code.claude.com/docs/en/discover-plugins и https://code.claude.com/docs/en/plugins/anthropic-marketplaces

- Маркетплейс — репозиторий с файлом `.claude-plugin/marketplace.json`.
- Подключение: `/plugin marketplace add owner/repo`. Установка: `/plugin install name@marketplace`. Из shell: `claude plugin install …`.
- Есть три области установки: user, project и local.
- Официальный маркетплейс `claude-plugins-official` подключается сам при первом интерактивном запуске и обновляется автоматически. Для сторонних маркетплейсов автообновление по умолчанию выключено.
- У Anthropic три общих маркетплейса:
  - official — `anthropics/claude-plugins-official`;
  - community — `anthropics/claude-plugins-community`, имя `claude-community`;
  - demo — `anthropics/claude-code`, имя `claude-code-plugins`.
- В карточке плагина из официального маркетплейса показана стоимость в токенах: сколько он добавляет к каждому сообщению и сколько — при вызове.

### Официальный маркетплейс: что внутри

Данные из `marketplace.json` на 1 октября 2026: https://github.com/anthropics/claude-plugins-official/blob/main/.claude-plugin/marketplace.json

- **Всего 315 плагинов:** 53 лежат в самом репозитории, 262 — внешние.
- **По категориям:** development 123, productivity 69, database 39, monitoring 22, security 18.

Заметные плагины Anthropic (лежат в репозитории):

| Плагин | Что делает |
|---|---|
| `code-review` | Ревью PR несколькими агентами с оценкой уверенности |
| `pr-review-toolkit` | Агенты ревью по комментариям, тестам, обработке ошибок и типам |
| `feature-dev` | Процесс разработки фичи с агентами для изучения кода |
| `code-simplifier` | Агент упрощения кода |
| `commit-commands` | Commit, push, создание PR |
| `hookify` | Делает hooks из паттернов разговора, чтобы запретить нежелательное поведение |
| `security-guidance`, `claude-security` | Предупреждения о безопасности при правках и глубокий скан уязвимостей |
| `claude-md-management` | Аудит и улучшение CLAUDE.md |
| `claude-code-setup` | Анализирует проект и предлагает hooks, скиллы и т. п. |
| `skill-creator`, `plugin-dev`, `mcp-server-dev`, `agent-sdk-dev` | Инструменты для авторов скиллов, плагинов, MCP и Agent SDK |
| `frontend-design`, `playground` | Дизайн интерфейсов, интерактивные HTML-«песочницы» |
| `ralph-loop` | Итеративные циклы по технике Ralph |
| `explanatory-output-style`, `learning-output-style` | Обучающие стили вывода |
| `session-report`, `receipts` | HTML-отчёт по сессии: токены, кэш; отчёт о пользе для руководителя |
| `code-modernization` | Модернизация legacy-кода через `/modernize` |
| MCP-обёртки | `github`, `gitlab`, `linear`, `asana`, `playwright`, `context7`, `serena`, `firebase`, `terraform`, `laravel-boost` |
| Каналы | `telegram`, `discord`, `imessage` (мосты сообщений) |

Внешние плагины, которые стоит упомянуть: `superpowers`, `mattpocock-skills`, `figma`, `sentry`, `stripe`, `supabase`, `vercel`, `cloudflare`, `notion`, `slack`, `atlassian`, `semgrep`, `sonarqube`, `coderabbit`, `greptile`, `chrome-devtools-mcp`, `datadog`, `posthog`, `huggingface-skills`.

### Code intelligence (LSP-плагины)

Источник: https://code.claude.com/docs/en/plugins/code-intelligence

- Что дают: живую диагностику после каждой правки (ошибки типов, забытые импорты), переход к определению и поиск ссылок по символу.
- Бинарник языкового сервера нужно поставить на машину отдельно.
- В облачных сессиях LSP не запускается.
- 13 плагинов в официальном маркетплейсе: `typescript-lsp`, `pyright-lsp`, `gopls-lsp`, `rust-analyzer-lsp`, `jdtls-lsp`, `kotlin-lsp`, `clangd-lsp`, `csharp-lsp`, `php-lsp`, `ruby-lsp`, `swift-lsp`, `lua-lsp` и внешний `liquid-lsp`.

## 5. Готовые сборки и фреймворки

Отсортировано по звёздам. Данные GitHub API на 1 октября 2026.

| # | Сборка | ★ | Push | Статус | Суть | Агенты | Установка |
|---|---|---|---|---|---|---|---|
| 1 | [affaan-m/ECC](https://github.com/affaan-m/ECC) (бывший everything-claude-code, старый URL перенаправляет) | 270 215 | 2026-09-30 | живой | «Agent harness OS»: 68 агентов, 293 скилла, 94 команды-обёртки, hooks, память, сканер AgentShield. Цикл plan → test → implement → review → verify → remember → improve | Claude Code и другие | `npx ecc-universal@2.2.2 setup` или плагин `ecc@ecc` |
| 2 | [github/spec-kit](https://github.com/github/spec-kit) | 139 605 | 2026-09-30 | живой | Spec-driven development: шаблоны и процессы; багфикс и оценка — расширениями | Copilot, Claude Code и другие (`--integration`) | `uv tool install specify-cli`, затем `specify init` |
| 3 | [garrytan/gstack](https://github.com/garrytan/gstack) | 134 610 | 2026-10-01 | живой, создан 2026-03 | Сетап Гарри Тана (YC): 23 инструмента-«роли». Примеры: `/office-hours`, `/plan-ceo-review`, `/review`, `/qa`, `/ship`, `/cso` | Claude Code | `git clone … ~/.claude/skills/gstack` |
| 4 | [ruvnet/ruflo](https://github.com/ruvnet/ruflo) (бывший claude-flow, перенаправляет) | 73 585 | 2026-10-01 | живой | «Meta-harness»: рои агентов, память между сессиями, федерация | Claude Code, Codex | `npx ruflo init` или `/plugin marketplace add ruvnet/ruflo` |
| 5 | [code-yeongyu/oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent) (бывший oh-my-opencode, перенаправляет) | 69 688 | 2026-10-01 | живой | OmO: оркестрация нескольких моделей, ключевое слово `ulw`, память. Теперь это отдельный CLI `omo`; для пользователей OpenCode-версии есть гайд по миграции | свой рантайм | `curl -fsSL https://get.omo.dev/install.sh \| bash` |
| 6 | [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | 54 854 | 2026-10-01 | живой | Главный awesome-список по Claude Code | — | — |
| 7 | [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) | 53 677 | 2026-09-29 | живой | Agile-процесс для ИИ: роли-агенты, брифы, архитектура, модули (например, BMad Builder) | любые агенты со скиллами | `npx skills add bmad-code-org/BMAD-METHOD` или `/plugin marketplace add bmad-code-org/bmad-plugins` |
| 8 | [wshobson/agents](https://github.com/wshobson/agents) | 40 120 | 2026-09-29 | живой | Маркетплейс: 94 плагина, 202 агента, 184 скилла, 105 команд из одного Markdown-источника | Claude Code, Codex, Cursor, OpenCode, Copilot, Antigravity, Pi | `/plugin marketplace add wshobson/agents` |
| 9 | [Yeachan-Heo/oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode) | 39 492 | 2026-09-30 | живой | Оркестрация нескольких агентов «teams-first»: 19 агентов, режимы autopilot, ralph, team. Для Codex есть брат-проект oh-my-codex | Claude Code | `/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode`, затем `/plugin install oh-my-claudecode` |
| 10 | [claude-task-master](https://github.com/eyaltoledano/claude-task-master) | 28 119 | 2026-04-28 | **затих: 5 месяцев без push** | Управление задачами из PRD через MCP | Cursor, Claude Code, Windsurf и другие | `claude mcp add taskmaster-ai -- npx -y task-master-ai` |
| 11 | [SuperClaude_Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework) | 23 910 | 2026-09-27 | живой, v4.3.0, v5 в разработке | Конфигурационный фреймворк: 30 команд `/sc:*` (например, `brainstorm`, `implement`, `research`, `test`, `pm`), персоны | Claude Code | `pipx install superclaude` или `/plugin install superclaude` |
| 12 | [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) | 64 418 | 2026-05-31 | **в архиве** | Переехал в [open-gsd/gsd-core](https://github.com/open-gsd/gsd-core) (10 043 ★, push 2026-09-30). Цикл Discuss → Plan → Execute → Verify → Ship; каждый исполнитель стартует с чистым контекстом | Claude Code, OpenCode, Codex, Copilot, Cursor и другие | `npx @opengsd/gsd-core@latest` |

Чего не было в исходном списке, но что в 2026 году популярно. Данные GitHub API на 1 октября 2026:

- [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — 216 054 ★. Один CLAUDE.md по наблюдениям Карпаты. **С 2026-04-20 не обновлялся.**
- [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) — 149 187 ★, скилл против переусложнения.
- [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) — 108 591 ★, экономия токенов за счёт сжатого стиля.
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — 95 028 ★, память между сессиями.
- [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) — 66 864 ★, сборник практик.
- [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) — 32 239 ★, CLI для настройки и мониторинга Claude Code.
- [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) — 27 208 ★, планы в файлах, которые переживают падение сессии.
- [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) — 27 051 ★, сборник из 380 скиллов.
- [mksglu/context-mode](https://github.com/mksglu/context-mode) — 24 492 ★, вывод инструментов уходит в песочницу, а не в контекст.

Чем отличаются подходы:

- **«Процесс целиком»:** BMAD, spec-kit, GSD, SuperClaude, ECC, gstack.
- **«Кирпичики»:** mattpocock, superpowers, addyosmani, anthropics/skills.
- **«Оркестрация нескольких агентов»:** ruflo, oh-my-claudecode, OmO.

mattpocock/skills прямо критикует первую группу в своём README.

## 6. Картинки для слайдов

Все ссылки проверены 1 октября 2026, ответ HTTP 200.

| Проект | Что на картинке | Прямая ссылка |
|---|---|---|
| ECC | Hero «ECC — the agent harness operating system» | https://raw.githubusercontent.com/affaan-m/ECC/main/assets/hero.png |
| BMAD | Схема delivery loop: Clarify → Plan → Build and verify → Learn (SVG) | https://raw.githubusercontent.com/bmad-code-org/BMAD-METHOD/main/docs/images/bmad-delivery-loop.svg |
| BMAD | Баннер | https://raw.githubusercontent.com/bmad-code-org/BMAD-METHOD/main/banner-bmad-method.png |
| mattpocock/skills | Обложка репозитория | https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skill-repo-light_2x.png |
| ruflo | GIF с плагинами (5,5 МБ) | https://raw.githubusercontent.com/ruvnet/ruflo/main/ruflo-plugins.gif |
| oh-my-openagent | Скриншот: DAG процесса в боковой панели | https://raw.githubusercontent.com/code-yeongyu/oh-my-openagent/dev/.github/assets/omo-herdr-dag.png |
| oh-my-claudecode | Персонаж-маскот | https://raw.githubusercontent.com/Yeachan-Heo/oh-my-claudecode/main/assets/omc-character.jpg |
| gstack | Граф GitHub-вкладов Тана за 2026 год (1237 вкладов) | https://raw.githubusercontent.com/garrytan/gstack/main/docs/images/github-2026.png |
| spec-kit | Логотип | https://raw.githubusercontent.com/github/spec-kit/main/media/logo_large.webp |
| awesome-claude-code | Баннер (2 МБ) | https://raw.githubusercontent.com/hesreallyhim/awesome-claude-code/main/assets/awesome-claude-code-banner.png |
| addyosmani/agent-skills | Обложка | https://addyosmani.com/assets/images/addys-agent-skills.jpg |
| GSD Core | Логотип | https://raw.githubusercontent.com/open-gsd/gsd-core/main/assets/gsd-logo-2000.png |
| claude-plugins-official | Пример работы плагина claude-md-management | https://raw.githubusercontent.com/anthropics/claude-plugins-official/main/plugins/claude-md-management/claude-md-improver-example.png |

Не нашёл картинок в README и в дереве репозиториев у superpowers, humanizer, anthropics/skills, SuperClaude и wshobson/agents.
