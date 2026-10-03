# Что дальше: проверка тезисов для финальных слайдов

Проверено 2026-10-03.
Цитаты даны в оригинале.
Graph engineering, context rot у Anthropic, Lost in the middle, IFScale и harness engineering у OpenAI уже проверены в `research-timeline.md`, здесь не повторяются.

Сайты Chroma, Stanford и BLS напрямую не открылись (403).
Их тексты взяты из копий в Wayback Machine (`web.archive.org/web/<год>id_/<URL>`).

## 1. Проблему контекста закидывают компьютом, явного решения нет

### Окна растут

| Когда | Кто | Цитата | Источник |
|---|---|---|---|
| 25 мар 2025 | Google, Gemini 2.5 Pro | «ships today with a 1 million token context window (2 million coming soon)» | https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/ |
| 12 авг 2025 | Anthropic, Claude Sonnet 4 | «Claude Sonnet 4 now supports up to 1 million tokens of context on the Anthropic API—a 5x increase» | https://www.anthropic.com/news/1m-context |

Страницы OpenAI про GPT-4.1 и Meta про Llama 4 из этой сети не открылись, их цифры не проверены.

### Качество на длинном контексте падает

- **Chroma, Context Rot, 14 июл 2025.** 18 моделей.
  «we evaluate 18 LLMs, including the state-of-the-art GPT-4.1, Claude 4, Gemini 2.5, and Qwen3 models. Our results reveal that models do not use their context uniformly; instead, their performance grows increasingly unreliable as input length grows.»
  https://research.trychroma.com/context-rot
- **NoLiMa, arXiv 2502.05167, 7 фев 2025, ICML 2025.** 13 моделей с заявленным окном от 128K.
  «At 32K, for instance, 11 models drop below 50% of their strong short-length baselines. Even GPT-4o […] experiences a reduction from an almost-perfect baseline of 99.3% to 69.7%.»
  https://arxiv.org/abs/2502.05167

### Вердикт: частично

- Рост окон до 1M и падение качества на длинном входе подтверждены первоисточниками.
- «Закидывают компьютом» — авторская трактовка. Прямых заявлений вендоров «решаем контекст параметрами» не нашёл. Данных про рост числа параметров и inference compute я не собирал.
- «Явного решения нет» — тоже вывод, а не факт из источника. Anthropic в ответ предлагает инженерный подход (context engineering), а не большее окно.

## 2. LLM не может полностью вытеснить человека из цикла поставки

### METR, рандомизированное исследование (RCT), 10 июл 2025

16 опытных разработчиков, 246 задач в их собственных репозиториях.
«developers forecast that allowing AI will reduce completion time by 24% […] Surprisingly, we find that allowing AI actually increases completion time by 19%»
https://arxiv.org/abs/2507.09089, https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/

### METR, обновление, 24 фев 2026: данные стали ненадёжными

«we believe it is likely that developers are more sped up from AI tools now — in early 2026 — compared to our estimates from early 2025.»
Новые оценки: «a speedup of -18% with a confidence interval between -38% and +9%» (те же разработчики) и «-4% […] between -15% and +9%» (новые).
Причина ненадёжности: «a significant increase in developers choosing not to participate in the study because they do not wish to work without AI».
https://metr.org/blog/2026-02-24-uplift-update/

Вывод: цифру «на 19% медленнее» нельзя подавать как текущее состояние. Это начало 2025 года, и сам METR считает, что сейчас ускорение вероятно.

### METR, горизонт задач (time horizon)

- Определение: длина задачи в часах работы эксперта, которую агент решает с успехом 50%.
- Исходная статья (arXiv 2503.14499, март 2025): «doubling approximately every seven months since 2019».
- Страница обновлена 8 мая 2026, набор задач Time Horizon 1.1. Удвоение с 2023 года: 128,7 дня, доверительный интервал 104–158 дней. Это около 4 месяцев.
- Последние значения 50%-горизонта из `benchmark_results_1_1.yaml`:
  - Claude Opus 4.6 (релиз 5 фев 2026): 718,8 минуты, около 12 часов.
  - Claude Mythos Preview, ранняя версия (7 апр 2026): 1044,8 минуты, около 17 часов. METR предупреждает: «Measurements above 16 hrs are unreliable with our current task suite».
- METR: «Our tasks […] are designed to be self-contained and well-specified». Это не реальная поставка с неясными требованиями.
- https://metr.org/time-horizons/, https://metr.org/assets/benchmark_results_1_1.yaml

### Osmani, «Own the Outer Loop», 9 июл 2026

«Engineers own the outer loop.»
«A factory is loops at scale - the agents ship the work inside, while humans own the decisions at the boundary.»
«Scarcer resources are review, validation, understanding, and maintenance.»
Он ссылается на исследование GitLab (июнь 2026): ревью и проверка — главные узкие места. Само исследование GitLab я не открывал.
https://addyo.substack.com/p/own-the-outer-loop

### Вердикт: частично

- «Человек сейчас нужен на границе: ревью, решение, ответственность» — подтверждается (Osmani, мнение практика).
- «Не может полностью вытеснить» как закон не подтверждается. Горизонт агентов удваивается примерно за 4 месяца.
- RCT METR 2025 устарел: сам METR в 2026 году пишет, что ускорение сейчас вероятно.

## 3. Индустрия становится компактнее

### Indeed, вакансии разработчиков в США (FRED, ряд IHLIDXUSTPSOFTDEVE, 1 фев 2020 = 100)

| Дата | Значение |
|---|---|
| 28 фев 2022 (пик) | 233,8 |
| 1 янв 2024 | 72,6 |
| 1 июл 2025 (дно) | 65,4 |
| 18 сен 2026 (последнее) | 77,3 |

https://fred.stlouisfed.org/series/IHLIDXUSTPSOFTDEVE

- Вакансий на 23% меньше, чем в феврале 2020, и на 67% меньше пика 2022 года.
- С июля 2025 ряд растёт: +18% к сентябрю 2026.
- Пик 2022 года — это постковидный найм. Вакансии упали ещё до массовых агентов.

### Stanford Digital Economy Lab, Brynjolfsson, Chandar, Chen, «Canaries in the Coal Mine?», 2025 (PDF от ноября 2025)

«early-career workers (ages 22-25) in the most AI-exposed occupations have experienced a 13 percent relative decline in employment even after controlling for firm-level shocks. In contrast, employment for workers in less exposed fields and more experienced workers in the same occupations has remained stable or continued to grow.»
https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/

### Маленькие команды

OpenAI harness engineering: около миллиона строк силами 3 инженеров. Цифра есть только в поисковой выдаче, страница не открывалась (см. `research-timeline.md`).

### Вердикт: частично

- Меньше вакансий и меньше найма новичков — подтверждено.
- Общее число занятых в источниках не падает: у опытных стабильно или растёт, BLS даёт прогноз роста (см. п. 4).
- Данные по увольнениям (layoffs) я не собирал.

## 4. Однако парадокс Джевонса

### Определение, Jevons, «The Coal Question», 1865

«It is wholly a confusion of ideas to suppose that the economical use of fuel is equivalent to a diminished consumption. The very contrary is the truth.»
Скан на archive.org распознан с опечатками («equiva- lent», «wry»), в цитате они исправлены.
https://archive.org/details/TheCoalQuestion

### Satya Nadella, X, 27 янв 2025

«Jevons paradox strikes again! As AI gets more efficient and accessible, we will see its use skyrocket, turning it into a commodity we just can't get enough of.»
https://x.com/satyanadella/status/1883753899255046301
Речь про спрос на сам ИИ, а не на инженеров. Твит вышел на неделе DeepSeek R1, но в самом тексте DeepSeek не упомянут.

### BLS, Occupational Outlook Handbook (снимок Wayback 2026)

«Overall employment of software developers, quality assurance analysts, and testers is projected to grow 10 percent from 2025 to 2035, much faster than the average for all occupations.»
Занятых в 2025 году: 1 905 400. Прирост за 2025–2035: 185 400. Вакансий в год: около 106 100.
https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm

Это прогноз, а не измерение. Причину роста BLS к Джевонсу не привязывает.

### Чего не нашёл

Серьёзного исследования, где удешевление разработки доказанно увеличило спрос на инженеров, нет.
Материалы a16z и Stack Overflow не проверял.

### Вердикт: определение подтверждено, применение к инженерам — гипотеза

## Для слайдов

### 1. Контекст и компьют
Вердикт: частично. Рост окон и деградация подтверждены, «закидывают компьютом» — наша трактовка.
- В 2025 году Gemini 2.5 Pro и Claude Sonnet 4 получили окно в миллион токенов.
- Chroma проверила 18 моделей: с ростом входа ответы становятся ненадёжнее.
- На 32 тысячах токенов 11 из 13 моделей теряют больше половины качества.

Источники: blog.google, 25 мар 2025; anthropic.com/news/1m-context, 12 авг 2025; research.trychroma.com/context-rot, 14 июл 2025; arxiv.org/abs/2502.05167.

### 2. Человек в цикле
Вердикт: частично. Человек нужен на границе, но «никогда не вытеснит» данными не доказано.
- Длина задач, которые решает агент, удваивается примерно каждые 4 месяца.
- Тесты METR — короткие задачи с чётким условием, не реальная поставка.
- Osmani: агенты крутят внутренний цикл, инженеры отвечают за внешний.

Источники: metr.org/time-horizons (обновлено 8 мая 2026); addyo.substack.com/p/own-the-outer-loop, 9 июл 2026.
Цифру «опытные разработчики на 19% медленнее» на слайд не ставить: METR в феврале 2026 сам считает её устаревшей.

### 3. Индустрия компактнее
Вердикт: частично. Найма меньше, но общее число занятых не падает.
- Вакансий разработчиков в США на 23% меньше, чем в феврале 2020.
- У разработчиков 22–25 лет занятость относительно упала на 13%.
- У опытных разработчиков занятость стабильна или растёт.

Источники: FRED IHLIDXUSTPSOFTDEVE (Indeed), 18 сен 2026; Stanford Digital Economy Lab, «Canaries in the Coal Mine?», 2025.

### 4. Парадокс Джевонса
Вердикт: определение подтверждено, для разработки — гипотеза без прямых данных.
- Джевонс, 1865: экономия угля не снижает его потребление, а увеличивает.
- Наделла, январь 2025: ИИ дешевеет, и его потребление резко вырастет.
- BLS ждёт роста числа разработчиков на 10% к 2035 году.

Источники: Jevons, «The Coal Question», 1865 (archive.org/details/TheCoalQuestion); x.com/satyanadella/status/1883753899255046301, 27 янв 2025; bls.gov/ooh, прогноз 2025–2035.
