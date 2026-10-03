# Loop engineering, harness и Python: факты на 3 октября 2026

Звёзды и версии сняты через GitHub API и PyPI JSON 2026-10-03.
Пометка «[поиск]» значит, что первоисточник напрямую не открылся (openai.com требует JS), текст взят из поисковой выдачи по этому домену.
Цитаты даны в оригинале.

## 1. Loop engineering

### Статус термина

- Термин молодой, ему около четырёх месяцев. Появился в июне 2026 года.
- Уже есть: эссе Osmani, письмо Andrew Ng, статья на arXiv, обзоры в The New Stack, IBM, ADTmag.
- Устоявшимся стандартом его называть рано. Ng прямо пишет «hot buzzphrase», авторы arXiv пишут про «bold claims and vocal skepticism» и отмечают, что принятие никто не измерял.
- Устоявшиеся соседи: agent loop (2024–2025), context engineering (2025), harness engineering (февраль 2026).

### Кто ввёл

- Boris Cherny (руководит Claude Code в Anthropic): «I don't prompt Claude anymore. I have loops running that prompt Claude and figuring out what to do. My job is to write loops». Цитата по Osmani: https://addyo.substack.com/p/loop-engineering
- Peter Steinberger (автор OpenClaw): «You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents.» Там же. Твит: https://x.com/steipete/status/2063697162748260627 (сам X не открывался).
- Addy Osmani дал паттерну имя в эссе «Loop Engineering», 8 июня 2026 по Substack. The New Stack пишет «Sunday», то есть 7 июня по США: https://thenewstack.io/loop-engineering/
- Andrew Ng, The Batch, 26 июня 2026: «“Loop engineering” is a hot buzzphrase after mentions of it by Boris Cherny (Claude Code’s creator) and Peter Steinberger (OpenClaw's creator) went viral on social media». https://www.deeplearning.ai/the-batch/issue-359

### Определения

- Osmani: «Loop engineering is replacing yourself as the person who prompts the agent. You design the system that does it instead.» https://addyo.substack.com/p/loop-engineering
- Osmani, состав: петле нужны пять частей и «one place to remember stuff»: автоматизации по расписанию, worktrees, skills, плагины и коннекторы, суб-агенты. Плюс внешняя память. Там же.
- arXiv 2608.21884 (Lulla, Nersesyan, Mohsenimofidi, Treude, Baltes; v1 22 авг 2026): «Instead of prompting an agent interactively, developers design systems that prompt agents for them. These systems start agent runs on a schedule or on repository events and stop them when a machine-checkable condition holds.» https://arxiv.org/abs/2608.21884
- Тот же arXiv, состав хорошей петли по обзору серой литературы: «triggered agent runs bounded by machine-checkable stop conditions, persistent state files, verifier sub-agents, token budgets, and defined points of escalation to humans».
- Ng, «agentic coding loop»: агент пишет код, тестирует и «keep iterating until the code is bug-free and meets its specification». Ещё две его петли: developer feedback loop (десятки минут – часы) и external feedback loop (дни – недели). https://www.deeplearning.ai/the-batch/issue-359

### Связь с соседними терминами

- arXiv выстраивает лестницу абстракций: «from phrasing prompts to engineering context to configuring the harness around the model», а loop engineering называет следующим уровнем. https://arxiv.org/abs/2608.21884
- Osmani: «Loop engineering sits one floor above the harness. The harness but it runs on a timer, it spawns little helpers, and it feeds itself.» https://addyo.substack.com/p/loop-engineering
- Osmani, 9 июля 2026: «Now they run the inner execution loop. Engineers own the outer loop.» https://addyo.substack.com/p/own-the-outer-loop
- Context engineering по Anthropic (29 сен 2025): «what configuration of context is most likely to generate our model’s desired behavior?» Это «natural progression of prompt engineering». https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Agent loop — внутренний цикл одного агента. Anthropic, 19 дек 2024: агенты — «typically just LLMs using tools based on environmental feedback in a loop». https://www.anthropic.com/engineering/building-effective-agents
- Предшественник loop engineering — «Ralph» у Geoffrey Huntley, 14 июля 2025: «In its purest form, Ralph is a Bash loop. `while :; do cat PROMPT.md | claude-code ; done`». https://ghuntley.com/ralph/
- OpenAI в посте про harness engineering называет цикл «агент правит, пока все агенты-ревьюеры не довольны» Ralph Wiggum Loop [поиск]. https://openai.com/index/harness-engineering/

## 2. Harness

- Mitchell Hashimoto, 5 фев 2026, раздел «Engineer the Harness»: «I've grown to calling this "harness engineering." It is the idea that anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again.» Две формы: AGENTS.md и «actual, programmed tools», например скрипты для скриншотов и запуска отфильтрованных тестов. https://mitchellh.com/writing/my-ai-adoption-journey
- OpenAI, Ryan Lopopolo, 11 фев 2026, «Harness engineering: leveraging Codex in an agent-first world» (дата по RSS openai.com). Работа команды — «design environments, specify intent, and build feedback loops» [поиск]. https://openai.com/index/harness-engineering/
- OpenAI: Codex harness — «the agent loop and logic that underlies all Codex experiences» [поиск]. https://openai.com/index/unlocking-the-codex-harness/ (4 фев 2026)
- LangChain, Vivek Trivedy, 10 мар 2026: «Agent = Model + Harness. … If you're not the model, you're the harness. A harness is every piece of code, configuration, and execution logic that isn't the model itself.» https://blog.langchain.com/the-anatomy-of-an-agent-harness/
- Anthropic, 26 ноя 2025: «The Claude Agent SDK is a powerful, general-purpose agent harness adept at coding». https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Osmani: agent harness engineering — «making the environment one single agent runs inside». https://addyo.substack.com/p/loop-engineering

Кратко: agent loop — цикл «модель → инструмент → результат → модель». Harness — весь код вокруг модели, который этот цикл крутит и проверяет. Loop engineering — система, которая сама запускает harness по расписанию или событию и останавливает по проверяемому условию.

## 3. Связь с Python

### Агентный цикл — это `while` с вызовом инструментов

- OpenAI Agents SDK (Python), описание `Runner`: «The runner then runs a loop: 1. We call the LLM… If the LLM produces tool calls, we run those tool calls, append the results, and re-run the loop. If we exceed the `max_turns` passed, we raise a `MaxTurnsExceeded` exception.» https://github.com/openai/openai-agents-python/blob/main/docs/running_agents.md
- mini-swe-agent (Princeton/Stanford, команда SWE-agent): «Just some 100 lines of python for the agent class». Единственный инструмент — bash: «Does not have any tools other than bash», история линейная. https://github.com/SWE-agent/mini-swe-agent
- Geoffrey Huntley (24 авг 2025): «it's 300 lines of code running in a loop With LLM tokens». Язык в цитате не указан. https://ghuntley.com/agent/
- smolagents (Hugging Face): «the logic for agents fits in ~1,000 lines of code». `CodeAgent` пишет действия в виде кода на Python. Ссылаясь на статью, авторы пишут, что такой подход «uses 30% fewer steps» по сравнению с JSON-вызовами инструментов. https://github.com/huggingface/smolagents
- Pydantic AI: «a typed, extensible agent loop». https://github.com/pydantic/pydantic-ai

### Harness Claude Code из Python

- Claude Agent SDK (Python): `pip install claude-agent-sdk`, Python 3.10+, CLI Claude Code уже вложен в пакет. https://github.com/anthropics/claude-agent-sdk-python
- Там же: `ClaudeSDKClient` поддерживает custom tools и hooks, «both of which can be defined as Python functions». Свои инструменты работают как MCP-серверы внутри процесса.
- Anthropic описывает цикл агента так: «gather context -> take action -> verify work -> repeat». https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk (29 сен 2025)

### Проверка внутри петли: линтеры и типы

- Anthropic, там же: «Code linting is an excellent form of rules-based feedback… it is usually better to generate TypeScript and lint it than it is to generate pure JavaScript because it provides you with multiple additional layers of feedback.» Для Python напрашивается аналогия: аннотации типов плюс mypy или pyright. Это наш вывод, в источнике про Python ничего нет.
- Hashimoto: лучший способ — «give the agent fast, high quality tools to automatically tell it when it is wrong». https://mitchellh.com/writing/my-ai-adoption-journey
- Hooks в Claude Code: при exit code 2 в `PostToolUse` Claude Code «Shows stderr to Claude; the tool already ran». Вывод ruff, pytest или mypy, отправленный в stderr с кодом 2, попадает агенту. https://code.claude.com/docs/en/hooks
- Anthropic держит в репозитории пример hook на Python: https://github.com/anthropics/claude-code/blob/main/examples/hooks/bash_command_validator_example.py
- Hook как скрипт uv: shebang `#!/usr/bin/env -S uv run --script`, зависимости — в inline metadata по PEP 723 (`uv add --script`). https://docs.astral.sh/uv/guides/scripts/
- В официальном маркетплейсе плагинов есть `pyright-lsp` — «Python language server (Pyright) for type checking and code intelligence». https://github.com/anthropics/claude-plugins-official/blob/main/.claude-plugin/marketplace.json

### MCP на Python

- MCP Python SDK, пакет `mcp`: версия 2.3.0. https://github.com/modelcontextprotocol/python-sdk
- FastMCP: версия 4.0.10, репозиторий переехал в `PrefectHQ/fastmcp`. https://github.com/PrefectHQ/fastmcp

### Цифры на 2026-10-03 (PyPI, GitHub API)

| Проект | PyPI | Версия | Звёзды |
|---|---|---|---|
| OpenAI Agents SDK | openai-agents | 0.23.1 | 29 811 |
| smolagents | smolagents | 1.26.0 | 29 656 |
| FastMCP | fastmcp | 4.0.10 | 27 959 |
| MCP Python SDK | mcp | 2.3.0 | 24 461 |
| Pydantic AI | pydantic-ai | 2.53.0 | 20 367 |
| Claude Agent SDK | claude-agent-sdk | 0.2.163 | 8 207 |
| mini-swe-agent | mini-swe-agent | 2.4.6 | 8 161 |
| LangGraph | langgraph | 1.2.12 | 42 635 |

Все перечисленные пакеты требуют Python 3.10 и выше. Для сравнения: `anthropics/claude-code` (TypeScript) — 148 980 звёзд, `openai/codex` (Rust) — 127 641.

## 4. Факты для слайдов

1. «My job is to write loops» — Boris Cherny, создатель Claude Code. Июнь 2026. https://addyo.substack.com/p/loop-engineering
2. Ralph — `while :; do cat PROMPT.md | claude-code ; done`. Вся «петля» в одной строке bash, июль 2025. https://ghuntley.com/ralph/
3. Агент SWE-уровня — около 100 строк Python, единственный инструмент — bash. https://github.com/SWE-agent/mini-swe-agent
4. OpenAI: около миллиона строк кода за пять месяцев, около 1 500 PR, три инженера, 3,5 PR на инженера в день, код руками не писали [поиск]. https://openai.com/index/harness-engineering/
5. arXiv: из 36 710 репозиториев эвристика нашла 256, автономные петли подтвердились в 217. Конфигурацию петель коммитят, файлы состояния почти никто не коммитит. https://arxiv.org/abs/2608.21884

## Что не проверено

- Полный текст поста OpenAI: openai.com отдаёт JS-заглушку, цифры взяты из поисковой выдачи по openai.com.
- Блог addyosmani.com и ampcode.com закрыты корпоративным фильтром. Эссе Osmani прочитано на Substack.
- Статья Martin Fowler про harness engineering: martinfowler.com не ответил.
- Видео и твит Cherny на X не открывались. Цитата дана по Osmani и The New Stack.
