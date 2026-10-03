# Как менялась работа с LLM: хронология терминов

Проверено 2026-10-03.
Цитаты даны в оригинале.
Этапы 5 и 6 подробно разобраны в `research-loop-engineering-python.md`, здесь только итог.

## Таблица

| Этап | Когда | Кто | Цитата | Источник |
|---|---|---|---|---|
| Prompt programming (научная основа) | 15 фев 2021 | Laria Reynolds, Kyle McDonell (на GPT-3) | «we discuss methods of prompt programming, emphasizing the usefulness of considering prompts through the lens of natural language» | https://arxiv.org/abs/2102.07350 |
| Prompt-based learning (обзор) | 28 июл 2021 | Pengfei Liu, Graham Neubig и др. | «a new paradigm in natural language processing, which we dub "prompt-based learning"» | https://arxiv.org/abs/2107.13586 |
| Prompt engineering идёт в массы | 30 ноя 2022 — запуск ChatGPT; 24 янв 2023 — твит Karpathy | OpenAI; Andrej Karpathy | «The hottest new programming language is English» | https://openai.com/index/chatgpt (дата по RSS openai.com); https://x.com/karpathy/status/1617979122625712128 |
| Agent loop: ReAct | 6 окт 2022 (v1) | Shunyu Yao и др. (Princeton, Google) | «we explore the use of LLMs to generate both reasoning traces and task-specific actions in an interleaved manner» | https://arxiv.org/abs/2210.03629 |
| Function calling в API OpenAI | 13 июн 2023 | OpenAI | «Developers can now describe functions to gpt-4-0613 and gpt-3.5-turbo-0613, and have the model intelligently choose to output a JSON object containing arguments to call those functions» | https://openai.com/index/function-calling-and-other-api-updates (дата по RSS; текст по Wayback 15 июн 2023) |
| Tool use в Claude, GA | 30 мая 2024 | Anthropic | «Tool use, which enables Claude to interact with external tools and APIs, is now generally available across the entire Claude 3 model family» | https://www.anthropic.com/news/tool-use-ga |
| Агенты = LLM + инструменты в цикле | 19 дек 2024 | Anthropic | «typically just LLMs using tools based on environmental feedback in a loop» | https://www.anthropic.com/engineering/building-effective-agents |
| Vibe coding | 2 фев 2025 | Andrej Karpathy | «There's a new kind of coding I call "vibe coding", where you fully give in to the vibes, embrace exponentials, and forget that the code even exists.» | https://x.com/karpathy/status/1886192184808149383 |
| Agentic coding: Claude Code, research preview | 24 фев 2025 | Anthropic | «we're also introducing a command line tool for agentic coding, Claude Code» | https://www.anthropic.com/news/claude-3-7-sonnet |
| Claude Code, GA | 22 мая 2025 | Anthropic | «Claude Code is now generally available» | https://www.anthropic.com/news/claude-4 |
| Context engineering | 19 июн 2025 | Tobi Lütke (Shopify) | «I really like the term "context engineering" over prompt engineering.» | https://x.com/tobi/status/1935533422589399127 |
| Context engineering | 25 июн 2025 | Andrej Karpathy | «+1 for "context engineering" over "prompt engineering".» … «the delicate art and science of filling the context window with just the right information for the next step» | https://x.com/karpathy/status/1937902205765607626 |
| Context engineering у вендора | 29 сен 2025 | Anthropic | «natural progression of prompt engineering» | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| Harness engineering | 5 фев 2026 | Mitchell Hashimoto | «I've grown to calling this "harness engineering."» | https://mitchellh.com/writing/my-ai-adoption-journey |
| Harness engineering у вендора | 11 фев 2026 | OpenAI, Ryan Lopopolo | «design environments, specify intent, and build feedback loops» [поиск] | https://openai.com/index/harness-engineering/ |
| Loop engineering | 7–8 июн 2026 | Boris Cherny, Peter Steinberger; имя дал Addy Osmani | «Loop engineering is replacing yourself as the person who prompts the agent.» | https://addyo.substack.com/p/loop-engineering |
| Graph engineering | 18 июл 2026 | Peter Steinberger | «Are we still talking loops or did we shift to graphs yet?» | https://x.com/steipete/status/2078277297791189132 |
| Graph engineering, реакция | 22 июл 2026 | LangChain | «Graph engineering isn't a new idea. It's the latest name for a well established approach to building reliable agents.» | https://www.langchain.com/blog/3-years-of-graph-engineering-with-langgraph |

## Источники, где цепочка уже выстроена

- arXiv 2608.21884, 22 авг 2026, Lulla, Treude, Baltes и др.: «from phrasing prompts to engineering context to configuring the harness around the model». Loop engineering там следующий уровень. Цепочка: prompt → context → harness → loop. https://arxiv.org/abs/2608.21884
- arXiv 2607.00038, 28 июн 2026, Sandeco Macedo: «We position loop engineering as a new layer in the progression from prompt to context to harness to loop». Там же: loop engineering «does not retire prompt engineering». https://arxiv.org/abs/2607.00038
- arXiv 2608.21156, 21 авг 2026, Feng и ещё 34 автора, обзор: «Prompt Engineering to elicit model capabilities, Context Engineering to manage information access, Harness Engineering to organize external tools and resources, and Loop Engineering to support continual reflection and self-improvement». Следующей ступенью авторы называют Graph Engineering. https://arxiv.org/abs/2608.21156
- Andrew Ng называет loop engineering «hot buzzphrase» (The Batch, 26 июн 2026). https://www.deeplearning.ai/the-batch/issue-359

## Что появилось после июня 2026

- **Graph engineering** — единственный новый термин с датой, первоисточником и заметным охватом.
  - Твит Steinberger от 18 июля 2026: около 7 800 лайков и 3,1 млн просмотров (fxtwitter API).
  - Через 4 дня вышел пост LangChain, в августе — обзор на arXiv.
  - Смысл: несколько агентов и детерминированных шагов связаны в граф, петля — частный случай графа. LangChain: «loops are simple graphs».
  - Оговорка: значение размыто. Под «графом» понимают и оркестрацию агентов, и граф знаний. LangChain прямо называет его новым именем для старого подхода.
- **Outer loop** — у Osmani 9 июля 2026 («Engineers own the outer loop»), но это формулировка внутри loop engineering, а не отдельная дисциплина.
- **Intent engineering, specification engineering** — есть статья на arXiv (2603.09619, март 2026) и сайты консультантов. Это до loop engineering, вирусного всплеска не было.
- **Environment engineering** — блог Epsilla и обзор arXiv 2606.12191 (весна 2026), в основном про среды для обучения агентов. Тоже раньше loop engineering.
- **Agent ops, eval engineering, fleet engineering** — как названия дисциплин с датированным первоисточником и охватом не найдены.
- **«Beyond Graph Engineering» (SSRN, Ahsan Saeed)** — единичная работа про admission control. Охвата не видно.

Вывод: после loop engineering устоялся только graph engineering (июль 2026), и тот спорный. Остальные кандидаты либо старше, либо без охвата.

## Что не проверено

- Кто первым сказал «prompt engineering», не установлено. Даты дают научные статьи 2021 года и запуск ChatGPT. Данных Google Trends нет: hn.algolia.com и подобные сервисы закрыты корпоративным фильтром.
- Пост OpenAI про function calling читался по снимку Wayback от 15 июня 2023, сама страница openai.com отдаёт JS-заглушку.
- Твиты читались через api.fxtwitter.com, сам x.com не открывался. Тексты и даты совпадают с тем, что отдаёт API.
- Пост OpenAI про harness engineering — по поисковой выдаче, openai.com отдаёт JS-заглушку.
- Автор поста LangChain про graph engineering не извлёкся из страницы.
- Дата статьи Towards Data Science про graph engineering (14 сен 2026) известна только из поисковой выдачи.
- Intent engineering, environment engineering и SSRN-статья не открывались напрямую, сведения из поисковой выдачи.
