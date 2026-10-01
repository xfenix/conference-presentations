# MCP, hooks, экономия токенов: факты на 1 октября 2026

Звёзды сняты через GitHub API 2026-10-01.
Цифры авторов помечены «заявка автора», замеры сторонних людей — «независимо».

## 1. MCP

### Протокол

| Факт | Источник |
|---|---|
| Anthropic открыла MCP 25 ноября 2024: спецификация, SDK, локальные серверы в Claude Desktop, репозиторий серверов | https://www.anthropic.com/news/model-context-protocol |
| 9 декабря 2025 MCP передан в Agentic AI Foundation (AAIF), фонд под Linux Foundation. Сооснователи: Anthropic, Block, OpenAI. Поддержка: Google, Microsoft, AWS, Cloudflare, Bloomberg | https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation |
| На тот момент: больше 10 000 активных публичных серверов, 97M+ скачиваний SDK в месяц (Python + TypeScript) | там же |
| Ревизии спецификации: 2024-11-05, 2025-03-26, 2025-06-18, 2025-11-25, **2026-07-28** | https://github.com/modelcontextprotocol/modelcontextprotocol/tree/main/docs/specification |
| 2026-07-28: протокол стал stateless. Убраны сессии и `Mcp-Session-Id`, убран handshake `initialize`. Версия и возможности клиента идут в `_meta` каждого запроса. Новый `server/discover`, подписки через `subscriptions/listen`, убран `ping` | https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/changelog.mdx |
| Репозиторий спецификации: 9 352 ★; эталонные серверы `modelcontextprotocol/servers`: 90 815 ★; реестр `modelcontextprotocol/registry`: 7 305 ★ | GitHub API |

### Цена MCP: описания инструментов едят контекст

| Цифра | Источник |
|---|---|
| 5 серверов (GitHub, Slack, Sentry, Grafana, Splunk) = 58 инструментов ≈ **55K токенов** до первого сообщения. Один Jira ≈ 17K. У Anthropic внутри доходило до **134K** | https://www.anthropic.com/engineering/advanced-tool-use (24 ноя 2025) |
| Tool Search Tool: ~77K → ~8.7K токенов, **−85%**. Точность на MCP-оценках: Opus 4 49% → 74%, Opus 4.5 79.5% → 88.1% | там же |
| Programmatic tool calling: 43 588 → 27 297 токенов, −37% на сложных исследовательских задачах | там же |
| Code execution с MCP: агент пишет код и грузит только нужные определения. **150 000 → 2 000 токенов, −98.7%**. Cloudflare называет это «Code Mode» | https://www.anthropic.com/engineering/code-execution-with-mcp (4 ноя 2025) |
| В Claude Code tool search **включён по умолчанию**: в контекст попадают только имена инструментов и инструкции серверов, схемы грузятся по запросу | https://code.claude.com/docs/en/mcp.md («Scale with MCP tool search») |
| Tool search выключается сам, если `ANTHROPIC_BASE_URL` указывает на сторонний хост (прокси не пропускают `tool_reference`). Вернуть: `ENABLE_TOOL_SEARCH=true`. `ENABLE_TOOL_SEARCH=auto` грузит схемы сразу, если влезают в 10% окна | https://code.claude.com/docs/en/mcp.md, https://code.claude.com/docs/en/context-window.md |
| Нужна модель с `tool_reference`: Sonnet 4.5 / Haiku 4.5 / Opus 4.5 и новее | https://code.claude.com/docs/en/mcp.md |
| Предупреждение, если ответ MCP больше 10 000 токенов. Жёсткий лимит 25 000 по умолчанию, меняется через `MAX_MCP_OUTPUT_TOKENS` | https://code.claude.com/docs/en/mcp.md |
| Официальный совет: CLI (`gh`, `aws`, `gcloud`, `sentry-cli`) экономнее MCP, у него нет списка инструментов. Ненужные серверы отключать через `/mcp` | https://code.claude.com/docs/en/costs.md («Reduce MCP server overhead») |

Вывод для слайда: с tool search один лишний сервер почти бесплатен на старте.
Дорогими остаются ответы инструментов. Через корпоративный шлюз tool search может быть выключен, проверь `/context`.

### Топ MCP-серверов общего назначения

| Сервер | Суть | ★ | Установка в Claude Code | Когда брать |
|---|---|---|---|---|
| [upstash/context7](https://github.com/upstash/context7) | Свежая документация библиотек по версии | 62 567 | `claude mcp add --scope user --transport http context7 https://mcp.context7.com/mcp --header "Authorization: Bearer KEY"` | Любая работа с внешними библиотеками, где модель отстаёт от версий |
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) (Google) | Агент управляет Chrome: консоль, сеть, трейсы производительности, Lighthouse | 52 816 | `claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest` | Отладка фронтенда, перф, проверка вёрстки |
| [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) | Граф кода на tree-sitter, 162 языка, структурные запросы | 45 566 | `curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh \| bash` | Большие репозитории, вопросы «кто вызывает», «что сломается» |
| [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | Браузер через accessibility-дерево, без скриншотов | 37 722 | `claude mcp add playwright npx @playwright/mcp@latest` | E2E, заполнение форм, обход сайтов |
| [github/github-mcp-server](https://github.com/github/github-mcp-server) | Официальный GitHub: issues, PR, Actions, code scanning | 33 308 | `claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN=$GITHUB_PAT -- docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server` (удалённый: `https://api.githubcopilot.com/mcp/`) | Если `gh` CLI мало. Для простых действий `gh` дешевле (см. costs.md) |
| [oraios/serena](https://github.com/oraios/serena) | Семантический поиск и правка по символам через LSP | 29 919 | `uv tool install -p 3.13 serena-agent`, затем `claude mcp add --scope user serena -- serena start-mcp-server --context claude-code --project-from-cwd` | Средние и большие проекты на типизированных языках. Автор просит не ставить из маркетплейсов |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | Песочница для вывода инструментов + FTS5-индекс + память сессии | 24 492 | `/plugin marketplace add mksglu/context-mode` → `/plugin install context-mode@context-mode` | Логи, дампы, веб-страницы, длинные сессии |
| [GLips/Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP) (Framelink) | Макет Figma в упрощённом виде для агента | 15 941 | см. README | Вёрстка по макету без Dev Mode |
| Figma (официальный, [гайд](https://github.com/figma/mcp-server-guide), 2 032 ★) | Удалённый сервер Figma | — | `claude mcp add --transport http figma https://mcp.figma.com/mcp` | Есть платный Dev Mode, нужен design-to-code |
| [googleapis/mcp-toolbox](https://github.com/googleapis/mcp-toolbox) | MCP для БД: Postgres, MySQL, BigQuery, Spanner и др. | 16 544 | см. README | Чтение схем и запросы к БД |
| [firecrawl/firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server) | Скрейпинг и обход сайтов в markdown | 7 535 | `claude mcp add firecrawl -e FIRECRAWL_API_KEY=KEY -- npx -y firecrawl-mcp` | Сбор контента с сайтов, JS-рендеринг |
| [sooperset/mcp-atlassian](https://github.com/sooperset/mcp-atlassian) | Jira + Confluence, в том числе Server/DC | 5 957 | см. README | Атлассиан внутри периметра (не облако) |
| [exa-labs/exa-mcp-server](https://github.com/exa-labs/exa-mcp-server) | Веб-поиск Exa | 5 066 | `claude mcp add --transport http exa https://mcp.exa.ai/mcp` | Поиск по вебу и коду |
| [crystaldba/postgres-mcp](https://github.com/crystaldba/postgres-mcp) | Postgres с анализом производительности | 3 356 | см. README | Тюнинг запросов и индексов |
| [grafana/mcp-grafana](https://github.com/grafana/mcp-grafana) | Дашборды, PromQL, Loki | 3 516 | см. README | Расследование инцидентов |
| [tavily-ai/tavily-mcp](https://github.com/tavily-ai/tavily-mcp) | Веб-поиск, extract, crawl | 2 415 | `claude mcp add --transport http tavily https://mcp.tavily.com/mcp` | Альтернатива Exa |
| [atlassian/atlassian-mcp-server](https://github.com/atlassian/atlassian-mcp-server) | Официальный удалённый Rovo MCP: Jira, Confluence, JSM | 1 076 | `claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp` | Atlassian Cloud. Старый `/v1/sse` не работает после 30 июня 2026 |
| [getsentry/sentry-mcp](https://github.com/getsentry/sentry-mcp) | Ошибки и трейсы Sentry | 874 | удалённый `https://mcp.sentry.dev/mcp` или `claude plugin install sentry-mcp@sentry-mcp` | Разбор продовых ошибок |
| Linear (официальный) | Задачи Linear | — | `claude mcp add --transport http linear-server https://mcp.linear.app/mcp` ([док](https://linear.app/docs/mcp)) | Команды на Linear |
| Sequential Thinking, Memory, Fetch, Git, Filesystem | Эталонные серверы в [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | 90 815 (весь репо) | npx-пакеты, см. README каждого | Sequential Thinking полезен слабым моделям. Для Claude с extended thinking выигрыш не нашёл |

Другие заметные в 2026 по звёздам (topic `mcp-server`): `czlonkowski/n8n-mcp` 23 029 ★, `PrefectHQ/fastmcp` 27 945 ★ (фреймворк для своих серверов), `awslabs/mcp` 9 745 ★, `idosal/git-mcp` 8 442 ★, `makenotion/notion-mcp-server` 4 654 ★, `cloudflare/mcp-server-cloudflare` 4 340 ★, `supabase/mcp` 2 925 ★, `perplexityai/modelcontextprotocol` 2 548 ★, `hashicorp/terraform-mcp-server` 1 538 ★, `brave/brave-search-mcp-server` 1 478 ★, `mongodb-js/mongodb-mcp-server` 1 138 ★.
Каталог: `punkpeye/awesome-mcp-servers` 95 721 ★.

## 2. Hooks

### Все события (официальная справка)

Источник: https://code.claude.com/docs/en/hooks.md

| Группа | События |
|---|---|
| Сессия | `SessionStart`, `Setup`, `SessionEnd`, `InstructionsLoaded`, `ConfigChange` |
| Запрос | `UserPromptSubmit`, `UserPromptExpansion` |
| Инструменты | `PreToolUse`, `PermissionRequest`, `PermissionDenied`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch` |
| Ответ | `MessageDisplay`, `Notification`, `Stop`, `StopFailure` |
| Субагенты и задачи | `SubagentStart`, `SubagentStop`, `TaskCreated`, `TaskCompleted`, `TeammateIdle` |
| Окружение | `CwdChanged`, `DirectoryAdded`, `FileChanged`, `WorktreeCreate`, `WorktreeRemove` |
| Контекст и модель | `PreCompact`, `PostCompact`, `PreModelSwitch`, `PostModelSwitch` |
| MCP | `Elicitation`, `ElicitationResult` |

Итого 33 события.
Типы обработчиков: `command`, `http`, `mcp_tool`, `prompt` (одноходовая оценка моделью), `agent` (субагент с Read/Grep/Glob, экспериментальный).
Поле `if` фильтрует по синтаксису разрешений: `"if": "Bash(git *)"`.
Exit code 2 блокирует действие, stderr уходит Claude.
`asyncRewake: true` — хук работает в фоне и будит Claude по exit 2.

### 8 практичных хуков

1. **Автоформат после правки** (`PostToolUse`), из [hooks-guide](https://code.claude.com/docs/en/hooks-guide.md):
```json
{"hooks":{"PostToolUse":[{"matcher":"Edit|Write","hooks":[{"type":"command","command":"jq -r '.tool_input.file_path' | xargs npx prettier --write"}]}]}}
```

2. **Уведомление, когда агент ждёт** (`Notification`), там же. Матчеры: `permission_prompt` (~6 с ожидания), `idle_prompt` (~60 с):
```json
{"hooks":{"Notification":[{"matcher":"","hooks":[{"type":"command","command":"osascript -e 'display notification \"Claude ждёт\" with title \"Claude Code\"'"}]}]}}
```

3. **Защита файлов** (`PreToolUse` + скрипт с `exit 2` для `.env`, `package-lock.json`, `.git/`), там же:
```json
{"hooks":{"PreToolUse":[{"matcher":"Edit|Write","hooks":[{"type":"command","command":"\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"}]}]}}
```

4. **Блок опасных команд** — готовые решения вместо своего regex:
   - [Dicklesworthstone/destructive_command_guard](https://github.com/Dicklesworthstone/destructive_command_guard) (dcg), 6 071 ★. Rust, Aho-Corasick, `brew install dicklesworthstone/tap/dcg` + `dcg install`.
   - [kenryu42/cc-safety-net](https://github.com/kenryu42/cc-safety-net), 1 566 ★. Блокирует разрушительные git- и fs-команды.

5. **rtk: переписывание Bash-команд** (`PreToolUse`). `rtk init -g` ставит хук, `git status` → `rtk git status`. С v0.37.2 хук — нативный бинарь `rtk hook claude`. Хук видит только Bash: `Read`, `Grep`, `Glob` мимо ([README](https://github.com/rtk-ai/rtk)).

6. **Контекст после сжатия** (`SessionStart` с matcher `compact`), из hooks-guide:
```json
{"hooks":{"SessionStart":[{"matcher":"compact","hooks":[{"type":"command","command":"echo 'Напоминание: bun, не npm. Перед commit — bun test.'; git log --oneline -5"}]}]}}
```

7. **Не отпускать без тестов** (`Stop`). Хук возвращает exit 2, пока тесты красные.
   Обязательно проверять `stop_hook_active`: после 8 блокировок подряд без прогресса Claude Code снимает хук ([hooks-guide, «Stop hook hits the block cap»](https://code.claude.com/docs/en/hooks-guide.md)).
```json
{"hooks":{"Stop":[{"hooks":[{"type":"command","command":"jq -e '.stop_hook_active' >/dev/null && exit 0; npm test >/dev/null 2>&1 || { echo 'Тесты красные, чини' >&2; exit 2; }"}]}]}}
```

8. **Фильтр шумного вывода** (`PreToolUse`). Официальный пример: вместо 10 000 строк лога отдать только `ERROR`, «десятки тысяч токенов → сотни» ([costs.md, «Offload processing to hooks and skills»](https://code.claude.com/docs/en/costs.md)).

Ещё: `ConfigChange` для аудита настроек, `CwdChanged`/`FileChanged` для direnv (hooks-guide).

### Проекты про хуки

| Репозиторий | ★ | Что |
|---|---|---|
| [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery) | 3 929 | Учебник по всем событиям, TTS-оповещения. Последний push 2026-03-04, новых событий может не быть |
| [Dicklesworthstone/destructive_command_guard](https://github.com/Dicklesworthstone/destructive_command_guard) | 6 071 | Guard опасных команд |
| [kenryu42/cc-safety-net](https://github.com/kenryu42/cc-safety-net) | 1 566 | Guard опасных команд |
| [diet103/claude-code-infrastructure-showcase](https://github.com/diet103/claude-code-infrastructure-showcase) | 10 033 | Автоактивация скиллов через хуки |
| [ChrisWiles/claude-code-showcase](https://github.com/ChrisWiles/claude-code-showcase) | 6 072 | Пример конфигурации проекта с хуками |
| [parcadei/Continuous-Claude-v3](https://github.com/parcadei/Continuous-Claude-v3) | 3 943 | Состояние между сессиями через хуки и ledger |
| [karanb192/claude-code-hooks](https://github.com/karanb192/claude-code-hooks) | 526 | Маркетплейс хуков: безопасность, стоимость |

## 3. Экономия токенов

### Встроенное (бесплатно, начать отсюда)

| Средство | Факт | Источник |
|---|---|---|
| Средняя цена | ~$13 на разработчика в активный день, $150–250 в месяц, у 90% меньше $30 в день | https://code.claude.com/docs/en/costs.md |
| `/usage` | Стоимость сессии, доля кэша, промахи, разбивка по скиллам, субагентам, MCP-серверам | там же |
| Prompt caching | Срок жизни кэша: час на подписке, 5 минут на usage credits. После паузы первый запрос перечитывает весь контекст | там же |
| `/clear` | Бесплатный чистый старт. `/compact` сам по себе большой запрос | там же |
| `/compact <фокус>` и раздел `# Compact instructions` в CLAUDE.md | Что сохранить при сжатии | там же |
| `/context` | Что занимает окно | https://code.claude.com/docs/en/costs.md |
| После сжатия | System prompt, CLAUDE.md, память, MCP перезагружаются, плюс до 5 последних изменённых файлов | https://code.claude.com/docs/en/context-window.md |
| CLAUDE.md | Держать до 200 строк. Длиннее — больше контекста и хуже соблюдение. Частное — в `.claude/rules/` по путям или в скиллы | https://code.claude.com/docs/en/memory.md |
| MEMORY.md | Грузятся первые 200 строк или 25 KB | там же |
| Субагенты | Шумные операции (тесты, логи, доки) уходят в отдельное окно, назад только итог. Платить всё равно — можно дать субагенту модель дешевле | https://code.claude.com/docs/en/costs.md |
| Tool search | Включён по умолчанию, см. раздел 1 | https://code.claude.com/docs/en/mcp.md |
| Статус-строка | Встроенный `statusLine` видит контекст и поля `prompt_cache` | https://code.claude.com/docs/en/statusline.md |

### Сторонние инструменты

| Инструмент | ★ | Что сжимает | Заявка автора | Независимо |
|---|---|---|---|---|
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | 108 591 | Скилл: стиль ответа. Прокси: то, что агент читает | Скилл: −50% выходных токенов (медиана, 10 вопросов, opus-4-6, против «Answer concisely»). Прокси: −33.2% входных на 54 прогонах, на одном кейсе +9.9% | **JetBrains**, 86 задач SkillsBench, Claude Code 2.1.200, sonnet-5: −8.5% выходных токенов (заявлялось 65%), ~10% дешевле, качество без значимой разницы, p = 0.82 ([блог](https://blog.jetbrains.com/ai/2026/07/speak-to-ai-agents-like-cavemen-tosave-tokens/)). **Adobe Research, CAVEWOMAN**: сжатие вывода −1.4…2.4× цены, до 3×. Сжатие ввода дороже: ~1.15×, до 1.8× ([arXiv 2606.24083](https://arxiv.org/abs/2606.24083)) |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | 149 187 | Скилл: меньше кода (YAGNI) | −54% строк (до −94%), −22% токенов, −20% цены, −27% времени. 12 задач на full-stack-fastapi-template, Haiku 4.5, n=4. Первые цифры (80–94%) автор сам признал завышенными (issue #126) | не нашёл |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 95 028 | Память между сессиями через хуки | «~10x экономия» за счёт фильтрации до загрузки деталей. Установщик предлагает облачный аккаунт, отказ: `--provider` или `CLAUDE_MEM_ONLINE_OPTIN=false` | не нашёл |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | 82 118 | Вывод Bash-команд (git, тесты, сборка) | «до 90% вывода bash». Автор сам пишет: это не −90% счёта, вывод bash лишь часть входа. Токены считаются как bytes/4 | не нашёл |
| [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) | 45 566 | Исследование кода через граф | 5 структурных запросов: ~3 400 токенов против ~412 000 через grep/read, «120x», −99.2% | не нашёл |
| [oraios/serena](https://github.com/oraios/serena) | 29 919 | Чтение и правка по символам вместо целых файлов | Качественная заявка «token-efficient», цифр в README нет | не нашёл |
| [jarrodwatts/claude-hud](https://github.com/jarrodwatts/claude-hud) | 28 245 | Статус-строка: контекст, лимиты, активность инструментов | — | — |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | 24 492 | Вывод инструментов → песочница + FTS5 | 315 KB → 5.4 KB, −98% на выводе инструментов. HN #1, 570+ points | не нашёл. Встроенный `ctx_stats` — самоотчёт |
| [ccusage/ccusage](https://github.com/ccusage/ccusage) | 18 820 | Отчёты по локальным логам: день, неделя, сессия | `npx ccusage@latest` | — |
| [sirmalloc/ccstatusline](https://github.com/sirmalloc/ccstatusline) | 13 135 | Настраиваемая статус-строка, powerline | `npx -y ccstatusline@latest` | — |
| [repowise-dev/repowise](https://github.com/repowise-dev/repowise) | 7 114 | Контекст репозитория + `distill` для вывода | `get_context`: 393 против 13 984 токенов (−97.2%, только один ответ). Агент −31.6% вывода. `distill pytest` −61%, `git log` −89% | не нашёл |
| [Haleclipse/CCometixLine](https://github.com/Haleclipse/CCometixLine) / [Owloops/claude-powerline](https://github.com/Owloops/claude-powerline) | 3 469 / 1 171 | Статус-строки | — | — |
| [rohitg00/agentmemory](https://github.com/rohitg00/agentmemory) | 29 053 | Память агента | «92% fewer tokens», R@5 95.2% | не нашёл |

Сборка «всё сразу»: [oratelecom/tokenwar](https://github.com/oratelecom/tokenwar), 65 ★ (caveman + rtk + context-mode + …). Цифр замеров в README не нашёл.

### Рейтинг по реальному выигрышу

Мнение на основе источников выше. Независимых замеров для rtk, context-mode, serena, codebase-memory нет.

1. **Гигиена контекста, встроенная**: `/clear` между задачами, CLAUDE.md до 200 строк, субагенты для шумных операций, следить за кэшем через `/usage`. Счёт в основном за чтение контекста (это же нашли JetBrains), а здесь он режется в разы и бесплатно.
2. **Tool search / меньше MCP**: −85% на описаниях инструментов по данным Anthropic. Уже включён — проверить, что шлюз его не выключил.
3. **Сжатие того, что агент читает**: context-mode (вывод инструментов), rtk (вывод Bash), прокси caveman. По логике выше п. 4: бьют по входу, а вход — основной объём. Цифры пока только авторские. Независимо замерена только прокси caveman, и то авторами: −33%.
4. **Навигация по коду**: serena, codebase-memory-mcp. Экономят на больших репозиториях, где агент иначе читает файлы целиком.
5. **Стиль вывода** (caveman-скилл, ponytail): независимо −8.5% выходных токенов (JetBrains). Выход меньше входа, итог ~10%. Ponytail режет код, а не текст, — эффект другого рода.
6. **Учёт**: ccusage, статус-строка. Сами не экономят, но показывают, куда уходят токены.

## 4. Картинки для слайдов (все отдают HTTP 200, проверено 2026-10-01)

| Что | URL |
|---|---|
| caveman: демо | https://raw.githubusercontent.com/JuliusBrussee/caveman/main/docs/assets/caveman-demo.gif |
| ponytail: бенчмарк по LOC, токенам, цене, времени | https://raw.githubusercontent.com/DietrichGebert/ponytail/main/assets/benchmark-agentic.svg |
| serena: схема | https://raw.githubusercontent.com/oraios/serena/main/resources/serena-block-diagram.svg |
| codebase-memory-mcp: граф | https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/docs/graph-ui-screenshot.png |
| repowise: экономия | https://raw.githubusercontent.com/repowise-dev/repowise/main/.github/assets/savings.png |
| claude-mem: демо | https://raw.githubusercontent.com/thedotmack/claude-mem/main/docs/public/cm-preview.gif |
| ccusage: скриншот | https://raw.githubusercontent.com/ccusage/ccusage/main/docs/public/screenshot.png |
| ccstatusline: демо | https://raw.githubusercontent.com/sirmalloc/ccstatusline/main/screenshots/demo.gif |
| claude-hud: превью | https://raw.githubusercontent.com/jarrodwatts/claude-hud/main/claude-hud-preview-5-2.png |
| hooks-mastery: обложка | https://raw.githubusercontent.com/disler/claude-code-hooks-mastery/main/images/hooked.png |
| context7: обложка | https://raw.githubusercontent.com/upstash/context7/master/public/cover.png |
| dcg: иллюстрация | https://raw.githubusercontent.com/Dicklesworthstone/destructive_command_guard/main/illustration.webp |
| tokenwar: схема стека | https://raw.githubusercontent.com/oratelecom/tokenwar/main/docs/tokenwar-stack.png |
| context-mode: OG-картинка (не проверял, что там) | https://raw.githubusercontent.com/mksglu/context-mode/main/web/og/context-saving.png |

rtk: картинок в репозитории не нашёл.
