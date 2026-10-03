# Перегруженный харнесс: проверка фактов

Тезис: не обвешивай харнесс скиллами, настройками, плагинами и промптами. Это быстро устаревает. С новой моделью такая обвязка может работать хуже.

Проверено 2026-10-03. Все цитаты сняты со страниц источников.

## 1. Исследования про AGENTS.md и контекстные файлы

### Evaluating AGENTS.md (ETH и др.)
- https://arxiv.org/abs/2602.11988 — v1 от 12 фев 2026, сейчас v3.
- Аннотация: «providing context files does not generally improve task success rates, while increasing inference cost by over 20% on average».
- Из полного текста (v3): «LLM-generated context files have a marginal negative effect on task success rates, while developer-written ones provide a …» (улучшение небольшое).
- Для файлов от LLM: p-value 87% (SWE-bench) и 37% (CTXbench), то есть значимого эффекта нет. Шагов больше на 2,45 и 3,92, стоимость выше на 20% и 23% (p < 0,001%).
- Файлы, написанные людьми: «improve performance for all agents but Claude Code», стоимость выше максимум на 19%.
- «repository overviews, although popular and recommended by model providers, are not helpful».
- Сильная модель не пишет файл лучше. На CTXbench результат даже хуже на 3%: «stronger models do not necessarily generate superior context files».
- Важно: формулировка «LLM-файлы снижают успех» верна только как «незначительно и статистически незначимо». Надёжный вывод такой: пользы нет, а цена выше.

### Do Context Files Help Coding Agents? A Two-Agent Ablation Study
- https://arxiv.org/abs/2607.27250 — 28 июл 2026.
- Claude Code и Codex, 17 задач, 288 прогонов: «Context strategy does not measurably move correctness on either agent (bounded to <=10-15pp via equivalence testing)».
- «the real AGENTS.md never converts a near-miss to a pass on either agent».

### Configuration Smells in AGENTS.md Files
- https://arxiv.org/abs/2606.15828 — 14 июн 2026.
- 100 популярных репозиториев: «Lint Leakage … 62% of the files, followed by Context Bloat (42%) and Skill Leakage (35%)».

### Обратный результат (для честности)
- https://arxiv.org/abs/2601.20404 — 28 янв 2026. С AGENTS.md медианное время ниже на 28,64%, выходных токенов меньше на 16,58%, качество выполнения сопоставимое. 10 репозиториев, 124 PR.

## 2. Vercel: AGENTS.md против скиллов
- https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals — Jude Gao, 27 янв 2026.
- «In 56% of eval cases, the skill was never invoked.»
- Процент прохождения: без документации 53%, скилл по умолчанию 53% (+0pp), скилл с явной инструкцией 79%, индекс документации в AGENTS.md 100%.
- На тестах скилл хуже базового уровня: 58% против 63%. Цитата: «an unused skill in the environment may introduce noise or distraction».
- Формулировка нестабильна. «You MUST invoke the skill» → агент «Misses project context», а «Explore project first, then invoke skill» даёт «Better results».
- Индекс сжали с 40 КБ до 8 КБ.
- Оговорка: у скилла в эксперименте один фреймворк (Next.js 16) и собственные eval Vercel.

## 3. Anthropic: старые промпты на новых моделях
- https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices (текущая версия страницы).
- «Claude Opus 4.5 and Claude Opus 4.6 are also more responsive to the system prompt than previous models. If your prompts were designed to reduce undertriggering on tools or skills, these models may now overtrigger. The fix is to dial back any aggressive language. Where you might have said "CRITICAL: You MUST use this tool when...", you can use more normal prompting like "Use this tool when..."».
- «Remove over-prompting. Tools that undertriggered in previous models are likely to trigger appropriately now. Instructions like "If in doubt, use [tool]" will cause overtriggering.»

## 4. Разработчики харнессов убирают обвязку
### Anthropic
- https://www.anthropic.com/engineering/harness-design-long-running-apps — 24 мар 2026.
- «every component in a harness encodes an assumption about what the model can't do on its own, and those assumptions are worth stress testing, both because they may be incorrect, and because they can quickly go stale as models improve.»
- Пример: «Context resets were a key unlock: the harness used Sonnet 4.5 … Opus 4.5 largely removed that behavior on its own, so I was able to drop context resets from this harness entirely.»
- Метод: «removing one component at a time and reviewing what impact it had».

### OpenAI / Cursor (GPT-5)
- https://github.com/openai/openai-cookbook/blob/main/examples/gpt-5/gpt-5_prompting_guide.ipynb (GPT-5 Prompting Guide, авг 2025).
- «Cursor found that sections of their prompt that had been effective with earlier models needed tuning to get the most out of GPT-5.»
- Пример: блок «Be THOROUGH when gathering information…». Вывод: «While this worked well with older models … they found it counterproductive with GPT-5».

### Не проверено
- Цитаты Boris Cherny и команды Claude Code в духе «удаляем часть харнесса с каждой моделью» и «bitter lesson для харнесса». Первоисточник за отведённое время не найден, поэтому не использовать.

## 5. Жалобы пользователей
- Не проверено. HN Algolia закрыт корпоративным фильтром (ICAP block), Reddit не открывали.
- Нет подтверждённых тредов с числом голосов, где обвязка сломалась после выхода модели.
- Ближайшее подтверждённое: Cursor и GPT-5 (п. 4), Anthropic про overtrigger (п. 3).

## Для слайда
- Сгенерированный нейросетью AGENTS.md не повышает успех задач, но удорожает работу на 20%.
- У Vercel агент не вызвал нужный скилл в 56% случаев.
- Промпты с CRITICAL и MUST для старых моделей заставляют новые перебарщивать с инструментами.
- Anthropic: каждая часть харнесса — допущение о модели, которое быстро устаревает.

Источники: arxiv.org/abs/2602.11988 (фев 2026); vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals (янв 2026); docs.claude.com claude-4-best-practices; anthropic.com/engineering/harness-design-long-running-apps (мар 2026).
