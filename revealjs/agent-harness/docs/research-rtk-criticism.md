# rtk (Rust Token Killer): критика

Дата сбора: 3 октября 2026.
Репозиторий: https://github.com/rtk-ai/rtk (около 82 тыс. звёзд, создан 22 января 2026).
Описание в репозитории: «reduces LLM token consumption by 60-90%».

Источники просмотрены напрямую: GitHub API (1258 issue), блоги Quesma, JetBrains и rtk, тред на Hacker News.
Reddit отдаёт 403 из корпоративной сети, Algolia HN заблокирована прокси.
Поэтому Reddit в выборку не попал.
Статья Przemek Mroczek «The Token Compression Illusion» нашлась в поиске, но по ссылке отдаёт 404. В выводы её не включаю.

## 1. Оговорка самого автора

README, раздел «How Savings Work»: https://github.com/rtk-ai/rtk#how-savings-work

- «RTK cuts up to 90% of the bash output your agent reads. That is what RTK measures, and it is not the same as cutting your bill by 90%.»
- «The token counts RTK reports are estimated as `bytes / 4` — RTK ships no tokenizer, so the percentages are reliable but the absolute token numbers are approximate.»
- «the hook only runs on Bash tool calls. Claude Code built-in tools like `Read`, `Grep`, and `Glob` do not pass through the Bash hook».

Блог rtk, 7 августа 2026, ответ на замер JetBrains: https://www.rtk-ai.app/blog/rtk-on-skillsbench/

- «Bash output is a thin slice of the bill. (estimated 3% on global tasks and can reach 5-6% on dev tasks…)»
- «RTK rewrites ~1/3 of Bash calls, covering ~20% of tool-output characters → ceiling ~3% of the bill.»
- «compressing one layer of an agentic system is very different from reducing the cost of the entire system.»

## 2. Независимые замеры

### JetBrains, июль 2026

https://blog.jetbrains.com/ai/2026/07/rtk-claude-code-token-savings/

- Схема: парный A/B, Claude Code + claude-sonnet-5, SkillsBench, rtk v0.43.0, 425 оплаченных прогонов, около 320 долларов.
- «Measured on real agent work: +7.6% more expensive at low reasoning effort (p=0.004), ±0% at high effort.»
- «Either way, at no point did rtk save anything.»
- Счётчик rtk: «`rtk gain` reported 96.2 million tokens saved — 99.8% of everything it touched; while the measured bill for the same trials went up.»
- Причина: «rtk counts the full raw output as its counterfactual. One cat of a 1.2 MB CSV logged 320k tokens "saved"», хотя Claude Code сам обрезает такой вывод.
- В пользу rtk: качество задач не упало. Сломанных перезаписей почти нет: одна на ~150 вызовов Bash.

### Quesma, 11 сентября 2026

https://quesma.com/blog/does-rtk-make-ai-coding-cheaper/
Авторы: Bartosz Kotrys, Jacek Migdal.

- Схема: Terminal-Bench 2.1, Claude Code + Fable 5.0 и OpenCode + DeepSeek V4 Pro, 1740 попыток, более 1500 долларов.
- «With RTK, costs fell by 5% for Fable and rose by 5% for DeepSeek.»
- «Almost all of Fable's savings with RTK came from one task… Across the other tasks, the savings were less than 1%.»
- «DeepSeek's task cost rose 17% on average.»
- «In train-fasttext, the model requested head -1 train.txt twice. RTK credited 120.5 million tokens saved each time».
- Вывод раздела: «rtk gain is useless as a cost metric».

### Hacker News, обсуждение замера Quesma

https://news.ycombinator.com/item?id=49656471, 11 сентября 2026, 170 очков, 84 комментария.
Очки отдельных комментариев HN не показывает.

- oefrha: «Agent runs rtk command-that-prints-100k-tokens | tail -5 costs 5 lines, maybe 100 tokens without rtk, but rtk will report 100k savings.» https://news.ycombinator.com/item?id=49659631
- lopatin: «My RTK findings are the same. It worsens task performance and overall you don't save money.» https://news.ycombinator.com/item?id=49658835
- jghn: «I kept seeing the model get confused in the reasoning text and retry a command bypassing rtk.» https://news.ycombinator.com/item?id=49659070
- kgeist: «If the output is not what it expects, an LLM may issue more tool calls than before». https://news.ycombinator.com/item?id=49657868
- GodelNumbering, автор агента Dirac: «it was actually a net negative in both CPU time and accuracy». https://news.ycombinator.com/item?id=49657648
- santiago-pl: «1 token != 4 bytes». https://news.ycombinator.com/item?id=49658605
- Автор rtk (patrick_rtk), 14 сентября: «Bash output is a small share of the bill, so that's the ceiling, and turn-count variance is bigger than the ceiling.» https://news.ycombinator.com/item?id=49693773
- В пользу rtk: patriciobcs пишет об экономии на `gh` и `docker`, drgo — о 3–7% на `cargo`.

## 3. Подтверждённые ошибки (issue закрыт как исправленный)

Реакции — число эмодзи на issue на 3 октября 2026.

| Issue | Дата | Цитата | Реакции | Статус |
|---|---|---|---|---|
| [#1418](https://github.com/rtk-ai/rtk/issues/1418) | 20.04.2026 | «the agent sees `(empty)` and concludes the directory is empty» | 4 | исправлен 22.04 |
| [#1566](https://github.com/rtk-ai/rtk/issues/1566) | 28.04.2026 | «`rtk ls <dir>` produces zero file names… reports `Chars: 458 → 8 (99% reduction)`» | 3 | исправлен 07.06 |
| [#1436](https://github.com/rtk-ai/rtk/issues/1436) | 21.04.2026 | «The rtk grep is not grep-compatible», лишние совпадения | 4, 13 комм. | исправлен 05.09 |
| [#2301](https://github.com/rtk-ai/rtk/issues/2301) | 06.06.2026 | `rg` переписывается в `rtk grep`: «silently return 0 matches / hang on stdin» | 9 | исправлен 05.09 |
| [#3220](https://github.com/rtk-ai/rtk/issues/3220) | 26.07.2026 | «"TypeScript: No errors found" is printed on a non-zero exit» | 2 | исправлен 29.08 |
| [#3543](https://github.com/rtk-ai/rtk/issues/3543) | 11.08.2026 | `npm run lint` → `rtk lint`: «false exit 1 on a tree whose own gate exits 0» | 3 | дубликат, закрыт |

## 4. Открытые жалобы (не подтверждены исправлением)

Искажение вывода и сбитый с толку агент:

- [#2360](https://github.com/rtk-ai/rtk/issues/2360), 10.06.2026, 7 реакций: «lines are duplicated, dropped, renumbered, or interleaved with stale content».
- [#2110](https://github.com/rtk-ai/rtk/issues/2110), 27.05.2026, 7 реакций: «this made the agent look confused because it was reasoning from lossy/changed search output». `rtk find` убрал абсолютный путь, нужный для следующего шага.
- [#2445](https://github.com/rtk-ai/rtk/issues/2445), 14.06.2026, 4 реакции: агент считает сжатый вывод подменой и «halt work entirely on "safety/integrity" grounds».
- [#1777](https://github.com/rtk-ai/rtk/issues/1777), 07.05.2026, 2 реакции: после сжатия вывода jest агент не увидел нужную ошибку и «got stuck in a loop until a human intervened».
- [#3194](https://github.com/rtk-ai/rtk/issues/3194), 24.07.2026: отфильтрованный `git log` «disagrees with `git rev-parse` on the exact same ref».
- [#3138](https://github.com/rtk-ai/rtk/issues/3138), 22.07.2026, на китайском: «ls 输出又被工具吞了» («вывод ls опять съеден»).

Ошибка выглядит как успех:

- [#2446](https://github.com/rtk-ai/rtk/issues/2446), 14.06.2026: «`rtk diff` returns exit code `0` when files differ».
- [#1474](https://github.com/rtk-ai/rtk/issues/1474), 23.04.2026: `gh pr comment --help` выдаёт «ok commented» — «filter discards stdout unconditionally».

Завышенная экономия в `rtk gain`:

- [#1973](https://github.com/rtk-ai/rtk/issues/1973), 19.05.2026, 4 реакции: «Tokens saved: 11989.9M (100.0%)… No Claude tool call ingests anywhere near 200K tokens».
- [#3508](https://github.com/rtk-ai/rtk/issues/3508), 10.08.2026: «reported saved 587.9M… capped @7500 tok 3.2M… overstatement 184x».
- [#4366](https://github.com/rtk-ai/rtk/issues/4366), 30.09.2026: `head -N` учитывается как чтение всего файла, «booking savings that don't exist».
- [#2468](https://github.com/rtk-ai/rtk/issues/2468), 17.06.2026: при падении по памяти на файле 2,3 ГБ записано «572M → "100% efficiency"».
- [#3359](https://github.com/rtk-ai/rtk/issues/3359), 01.08.2026: «docstring says chars/4 but code divides byte length». Для кириллицы и CJK оценка ещё грубее.
- [#3448](https://github.com/rtk-ai/rtk/issues/3448), 05.08.2026: `rtk init` пишет в CLAUDE.md про экономию 26% на `gh api`, а там «intentional 0% passthrough».

Охват:

- [#1820](https://github.com/rtk-ai/rtk/issues/1820), 09.05.2026, 8 реакций: субагенты Claude Code идут мимо rtk — «completely bypassed in the exact scenario where it matters most».

## Для слайда

- rtk сжимает только вывод Bash, а это 3–6% счёта по оценке авторов.
- JetBrains: на низком усилии с rtk дороже на 7,6%, на высоком без разницы.
- Счётчик rtk считает токены как байты/4 и сильно завышает экономию.
- Иногда сжатый вывод путает агента: он повторяет команды или обходит rtk.
