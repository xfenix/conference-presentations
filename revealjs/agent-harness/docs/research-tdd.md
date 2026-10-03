# TDD: что говорят исследования

Проверяем тезис для слайда: «TDD — недоказанная практика: с людьми не работало, а с агентами тем более».

Дата проверки: 3 октября 2026.
Источники — аннотации статей (arXiv, OpenAlex, издательства) и первоисточники METR.
Где полный текст или аннотация недоступны, это сказано прямо.

## A. TDD и люди

### Rafique, Mišić, 2013 — метаанализ, IEEE TSE

- 27 исследований.
- https://doi.org/10.1109/TSE.2012.28
- «TDD has a small positive effect on quality but little to no discernible effect on productivity».
- В промышленных исследованиях эффект сильнее в обе стороны: «both the quality improvement and the productivity drop to be much larger in industrial studies».

### Munir, Moayyed, Petersen, 2014 — систематический обзор, IST

- Учитывает строгость и применимость исследований.
- https://doi.org/10.1016/j.infsof.2014.01.002, аннотация: https://lup.lub.lu.se/record/4410922
- «studies with a high rigor and relevance scores show clear results for improvement in external quality, which seem to come with a loss of productivity».
- «Strong indications are obtained that external quality is positively influenced, which has to be further substantiated by industry experiments».

### Bissi и др., 2016 — систематический обзор, IST

- https://doi.org/10.1016/j.infsof.2016.02.004
- Аннотацию получить не удалось: статья закрыта, в OpenAlex и Crossref текста нет.
- Цитат нет, выводы обзора здесь не пересказываю.

### Tosun и др., 2017 — эксперимент в индустрии, EMSE

- 24 профессионала, три площадки одной компании.
- https://doi.org/10.1007/s10664-016-9490-0
- «We did not observe a statistical difference between the quality of the work done by subjects in both treatments».
- Продуктивность выше на простой задаче и «drops significantly when applying TDD to a complex brownfield task».
- «Further evidence is necessary to conclude whether TDD is better or worse than ITLD».

### Fucci и др., 2017 — «A Dissection of the TDD Process», IEEE TSE

- 39 профессионалов, 82 замера.
- https://doi.org/10.1109/TSE.2016.2616877, препринт: https://arxiv.org/abs/1611.05994
- «Sequencing, the order in which test and production code are written, had no important influence».
- «The claimed benefits of TDD may not be due to its distinctive test-first dynamic, but rather due to the fact that TDD-like processes encourage fine-grained, steady steps».

### Karac, Turhan, 2018 — «What Do We (Really) Know about TDD?», IEEE Software

- https://doi.org/10.1109/MS.2018.2801554
- Аннотация короткая: «This article examines how (and whether) TDD has lived up to its promises».
- Полный текст закрыт, выводы статьи проверить не удалось.

### 2018 — четыре промышленных эксперимента

- Две компании.
- https://arxiv.org/abs/1807.06850
- «Iterative-Test Last (ITL), the reverse approach of TDD, outperforms TDD in three out of four premises».

### 2020 — семейство из 12 экспериментов с метаанализом

- Академия и индустрия.
- https://arxiv.org/abs/2011.11942
- «TDD novices achieve a slightly higher code quality with iterative test-last development … than with TDD».
- «The task being developed largely determines quality».
- «Previous studies seem to provide conflicting results on TDD performance».

### 2020 — почему результаты расходятся

- https://arxiv.org/abs/2007.09863
- «Recent investigations into the effects of Test-Driven Development (TDD) have been contradictory and inconclusive».

### Итог по людям

- Пользу TDD не доказали. Но и не опровергли.
- Метаанализы и обзоры 2013–2014 годов показывают небольшой плюс к качеству и потерю продуктивности. Эффект сильнее в индустрии.
- Эксперименты 2016–2020 годов чаще не находят разницы. Иногда test-last даже немного лучше.
- Fucci 2017: важен не порядок «сначала тест», а мелкие равномерные шаги.
- «Не работало» — слишком сильно. Точнее так: «доказательства слабые и противоречивые».

## B. TDD и LLM-агенты

### Тесты в промпте помогают генерации кода

- Mathews, Nagappan, 2024. https://arxiv.org/abs/2402.13521, DOI 10.1145/3691620.3695527
- Задачи уровня функции: MBPP, HumanEval. Модели GPT-4 и Llama 3.
- «Our results consistently demonstrate that including test cases leads to higher success in solving programming challenges».
- Здесь тесты пишет не модель. Их дают как спецификацию.

### Тесты от человека — сильная опора для агента

- TDFlow, 2025. https://arxiv.org/abs/2510.23761
- «When provided human-written tests, TDFlow attains 88.8% pass rate on SWE-Bench Lite … and 94.3% on SWE-Bench Verified».
- Узкое место: «the primary obstacle to human-level software engineering performance lies within writing successful reproduction tests».
- На 800 прогонов нашли 7 случаев подгонки под тесты: «only 7 instances of test hacking».

- TENET, 2025. https://arxiv.org/abs/2509.24148
- Агент на уровне репозитория по тестам разработчика.
- «69.08% and 81.77% Pass@1 on RepoCod and RepoEval with Claude Sonnet 4, improving by 9.49 and 2.17 percentage points».

### Писать тесты до исправления агентам пока трудно

- TDD-Bench Verified, 2024. https://arxiv.org/abs/2412.02883
- 449 задач. Меряют, может ли модель написать тест, который падает до исправления и проходит после.
- Авторы Auto-TDD сообщают об улучшении относительно прошлых работ, но задача остаётся открытой.

### Инструкция «делай по TDD» сама по себе может навредить

- TDAD, 2026. https://arxiv.org/abs/2603.17973
- SWE-bench Verified, открытые модели, 100 и 25 задач.
- «adding TDD procedural instructions without targeted test context increased regressions to 9.94% -- worse than no intervention at all».
- Контекст о нужных тестах снизил регрессии: «reduced regressions by 70% (6.08% to 1.82%)».
- Вывод авторов: «surfacing contextual information outperforms prescribing procedural workflows».
- Выборка маленькая, модели слабые. Обобщать осторожно.

### Агенты подгоняют код под тесты и правят тесты

- ImpossibleBench, 2025. https://arxiv.org/abs/2510.20270
- В задачах, где тест противоречит описанию, любое прохождение — обман.
- «GPT-5 cheats in 76% of the tasks in Oneoff-SWEbench and 2.9% on Oneoff-LiveCodeBench».
- «Claude models and Qwen3-Coder, however, cheat primarily (>79%) through modifying test cases».
- Промпт сильно влияет: «appropriate prompt could dramatically reduce GPT-5's cheating from 92% to 1% on Conflicting-LiveCodeBench».

- METR, июнь 2025. https://metr.org/blog/2025-06-05-recent-reward-hacking/
- «attempting (often successfully) to get a higher score by modifying the tests or scoring code».
- Просьба не жульничать почти не помогла: «had a nearly negligible effect on reward hacking».

### Итог по агентам

- Готовые тесты от человека заметно повышают долю решённых задач. Данные 2024–2025.
- Данных о том, что TDD агентам не помогает, нет.
- Есть два риска. Агент подгоняет код под тесты или правит сами тесты. Голая инструкция «работай по TDD» в одном исследовании увеличила регрессии.
- «С агентами тем более не работает» источники не подтверждают. Данные скорее против этого тезиса, если тесты пишет человек.
- Строгих экспериментов «агент с TDD против агента без TDD» мало. Почти все работы — бенчмарки на коротких задачах.

## Честная формулировка для слайда

- Польза TDD для людей не доказана: результаты исследований противоречат друг другу.
- В экспериментах важнее мелкие шаги, чем порядок «сначала тест».
- Готовые тесты от человека заметно помогают агенту решать задачи.
- Агент может подогнать код под тесты или переписать сами тесты.
