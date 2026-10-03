# pylines: правила кода и пример до/после

Срез на 3 октября 2026.
Звёзды и даты взяты из GitHub API.
Тексты правил взяты из клона репозитория на commit `e6f4482` (локальный кэш скилла `~/.agents/skills/pylines/cache/pylines/`, обновлён перед чтением).

## 1. Что это

- Репозиторий: https://github.com/community-of-python/pylines
- Описание в GitHub: «Py[thon] [Guide]lines for backend and full-stack (typescript) developers in the modern enterprise world».
- Звёзды: 43.
- Последний commit: `e6f4482`, 26 сентября 2026, «Требуем от тестов максимального покрытия».
- Состав (`README.md`): `code-style.md`, `solid.md` (703 строки, в работе), `rest.md`, `tests.md`, `our-stack.md`, `frontend.md`, `frontend-generation.md`, эталонный `pyproject.toml`.
  Гайд по архитектуре — ссылка на статью на Хабре.

### Установка скилла
Команда из `README.md`, раздел «Agent skill»:

```
npx skills add https://github.com/community-of-python/pylines -g
```

- `-g` ставит глобально, без флага — в текущий проект.
- Имя скилла: `pylines` (`pylines-skill/SKILL.md` в репозитории).
- Гайды в скилл не вшиты.
  Скилл запускает `sync.sh`: тот делает shallow clone репозитория в `cache/pylines/` не чаще раза в час (`PYLINES_TTL_MIN`).
  Без сети остаётся последняя копия.
- Скилл требует читать гайд целиком, кроме `solid.md`: для него сначала `index.md` с оглавлением.
  Цитата из `SKILL.md`: «Never answer from memory about what these guides say».
- Список поддерживаемых агентов в README не указан.
  Установку делает утилита `npx skills`, она сама раскладывает скилл по агентам.
  Локально скилл лежит в `~/.agents/skills/pylines/`, рядом есть копия для совместимости `python-guidelines`.

### Линтер правил: COP
`code-style.md`, раздел «Настройка», требует поставить:

```
uv add --dev ruff mypy community-of-python-flake8-plugin flake8-pyproject auto-typing-final
```

Плагин https://github.com/community-of-python/flake8-plugin (4 звезды) проверяет правила автоматически:

| Код | Правило |
|-----|---------|
| COP001 | больше двух имён из модуля — импорт модуля целиком |
| COP002 | стандартную библиотеку импортировать целиком |
| COP003 | не писать явные скалярные аннотации |
| COP004–COP008 | атрибуты, переменные, аргументы, функции, классы — от 8 символов |
| COP009 | имя функции — глагол |
| COP010 | без `get_` у async-функций |
| COP011 | без временных переменных на одно использование |
| COP012 | классы помечать `typing.final` |
| COP013 | словари модуля оборачивать в `types.MappingProxyType` |
| COP014 | dataclass с `kw_only=True, slots=True, frozen=True` |
| COP015 | переменная цикла начинается с `one_` |
| COP016 | больше двух обычных аргументов — ставить `*` или `/` |
| COP017 | без повторного присваивания, если имя не помечено `Mutable` |

## 2. Правила с цитатами
Всё ниже, кроме отмеченного, из `code-style.md` (https://github.com/community-of-python/pylines/blob/main/code-style.md).

### Инструменты
- ruff со всеми правилами (`pyproject.toml`): `select = ["ALL"]`, `line-length = 120`, `fix = true`, `unsafe-fixes = true`.
- Отключены: `EM`, `FBT`, `TRY003`, `D1`, `D203`, `D213`, `G004`, `FA`, `COM812`, `ISC001`; в `tests/*.py` ещё `S101`, `S311`.
  Причины расписаны в `code-style.md`, строки 16–22.
  Например, «D1, D203, D213 — не имеет смысла принуждать людей писать докстринги без разбора».
- mypy: `[tool.mypy] strict = true`.
- flake8 только для COP: `[tool.flake8] select = ["COP"]`.
- Импорты (isort в ruff): `lines-after-imports = 2`.

### Импорты (строки 32–34)
- «Все встроенные библиотеки нужно импортировать целиком: `import os`, `import typing`».
- «Все модули в которых более 2 импортов нужно импортировать целиком».
- Сторонние модули с одним-двумя именами можно через `from`: в `tests.md` есть `from litestar.testing import TestClient`.

### Типизация (строки 35–72)
- «Покрывайте 100% кода аннотациями типов: переменные, константы, атрибуты, аргументы, всё без исключений».
- «Подключайте mypy в режиме strict».
- «Не пишите скалярные типы, их выведет mypy сам (typing.Final указывать всё равно стоит)».
- «Стоит сужать типы максимально»: в примерах `dict` → `dict[str, int | str]` → `typing.Final[...]` → `TypedDict` → `Literal`.

### Иммутабельность (строки 126–160)
- «Все переменные имеет смысл аннотировать `typing.Final`».
  Для автоматической расстановки есть пакет https://github.com/vrslev/auto-typing-final
- «Все классы по-умолчанию имеет смысл размечать `typing.final` (с маленькой буквы)».
- «Все словари по-умолчанию имеет смысл оборачивать в `types.MappingProxyType`».
- Повторное присваивание запрещает COP017, разрешает только аннотация `Mutable` из `cop_extensions`.

### Именование (строки 88–124)
- «Имена всех переменных, функций, модулей, классов ... должны иметь длину не менее 8 символов. Имена типа `a`, `b` запрещены».
- «Переменная вроде `data` ... или `user`, например, смысла не несут ... Используйте конкретику — `public_user`».
- «Все функции должны называться глаголами ... Использование существительных запрещено, кроме использования с `@property`».
- «Не стоит использовать префикс get для имен функций».
  `get` допустим, только если значение берётся из оперативной памяти.
  Вместо него: «Fetch, retrieve, download, parse, build, create, make, prepare».
- Правила «полные слова, без сокращений» в тексте нет.
  Есть только порог в 8 символов и требование смысла в имени.

### Комментарии (строка 93)
- «Не пишите комментарии (докстринги) никогда».
- «Пишите комментарий только тогда, когда вам есть что сказать (очень сложное неявное поведение, например)».

### Исключения (строки 74–87)
- «Любые обращения по индексу (`item[0]`) или ключу (`item["something"]`) могут и будут «падать», они опасны».
- «Не стоит писать `except Exception`, лучше писать максимально конкретный класс ошибки».
- «Имеет смысл сужать количество строк между конструкциями try и except до одной штуки».
- «Лучше проверить, чем поймать эксепшн»: LBYL вместо EAFP, проверка через `in`.
  «Исключения должны использоваться в исключительных случаях».

### Классы (строки 163–178)
- «Лучше использовать композицию вместо наследования».
- «Используйте датаклассы».
  Базовый вариант: `@dataclasses.dataclass(kw_only=True, slots=True, frozen=True)`.
- Интерфейсы через `typing.Protocol` и внедрение зависимостей разобраны в `solid.md` (раздел DIP, строки 492–700).

### Ранний выход (строки 180–214)
- «Старайтесь использовать приём «инверсия» для условий, он помогает делать вложенность меньше».
  В примере вложенные `if` заменены на `if not ...: return`.

### Ретраи (строки 217–225)
- «Всё, что выходит за рамки походов в оперативную память, может сломаться».
- «Для ретраев мы используем библиотеку stamina».
- Ретраить: SQL-запросы, чтение и запись файлов, исходящий HTTP, consumer и producer.
- «Количество ретраев стоит ограничивать, интервал между попытками стоит рандомизировать».
- При риске перегрузки — circuit breaker: https://github.com/community-of-python/circuit-breaker-box

### Магия и константы (строки 226–228)
- «hasattr, getattr — признаки такого поведения».
- «Магические числа, т.е. всё, что не является нулём или единицей, запрещены».
  Их выносят в `settings.py` или в константы модуля.
  «Это касается любых типов данных: чисел, строк, массивов».

### Временные переменные (строки 229–246)
- «Не создавайте временные переменные без причины. Переменные нужны только если имя добавляет смысл или значение переиспользуется».

### Размер (строка 248)
- «20-40 строк на функцию, 100 строк на класс, 200-300 символов на модуль — это максимум».
  Про модуль в тексте именно «символов».

### Чего в code-style.md нет
- Отдельного правила про изменяемые значения по умолчанию нет.
  Их ловит ruff `B006`, он входит в `select = ["ALL"]`.
- Отдельных правил про async нет.
  Есть только COP010 (без `get_` у async-функций) и выбор асинхронных библиотек в `our-stack.md`.
- Раскладки проекта по папкам нет.
  Архитектура вынесена в статью на Хабре, в репозитории ссылка (`architecture-guide.md`).
- `print` прямо не запрещён.
  Его ловит ruff `T201`, логгер по `our-stack.md` — structlog.

### Стек (`our-stack.md`)
- Фреймворки: Litestar (основной), FastAPI (второй).
- Сервер: granian вместо Uvicorn.
- DI: that-depends, modern-di или dishka.
- ORM: SQLAlchemy.
- Валидация: pydantic или msgspec; настройки — pydantic-settings.
- HTTP: base-client от community-of-python, для сложных случаев httpx или niquests.
- Пакеты: uv. Логи: structlog. Ретраи: stamina.

## 3. Примеры в самом репозитории
Пары «❌ Плохо / ✅ Хорошо» в `code-style.md`:
- строки 40–49: скалярные аннотации;
- строки 53–72: сужение типов от `dict` до `Literal`;
- строки 96–122: `get_` → `fetch_` и `build_`;
- строки 129–149: `typing.Final` у переменных;
- строки 182–214: вложенные `if` → инверсия условий;
- строки 231–246: лишние временные переменные.

Ещё примеры:
- `tests.md`: AAA, parametrize, faker и hypothesis;
- `solid.md`: SRP, OCP, LSP, ISP, DIP с кодом;
- `frontend.md`: правила для TypeScript и React.

## 4. Пример до и после
Задача: взять заказы клиента по HTTP, сложить оплаченные, для VIP дать скидку 10%.

### До (18 строк)

```python
import requests

def get_total(uid, vip=False, statuses=["paid"]):
    try:
        r = requests.get(f"https://shop.example/api/orders?user={uid}")
        d = r.json()
    except:
        print("ERROR!!!")
        return 0
    tmp = 0
    for x in d:
        if x["status"] in statuses:
            if vip:
                tmp += x["amount"] * 0.9
            else:
                tmp += x["amount"]
    print("total:", tmp)
    return tmp
```

### После (45 строк вместе с импортами)
Целиком в 12–16 строк по правилам pylines это не влезает.
Для слайда лучше два блока.

Блок 1 — импорты, константы, схема ответа (строки 1–21):

```python
import decimal
import typing

import httpx
import pydantic
import stamina


ORDERS_URL: typing.Final = "https://shop.example/api/orders"
PAID_STATUSES: typing.Final = frozenset({"paid"})
VIP_DISCOUNT: typing.Final = decimal.Decimal("0.9")
RETRY_ATTEMPTS: typing.Final = 3


@typing.final
class OrderPayload(pydantic.BaseModel):
    order_status: str = pydantic.Field(alias="status")
    order_amount: decimal.Decimal = pydantic.Field(alias="amount")


ORDERS_ADAPTER: typing.Final = pydantic.TypeAdapter(list[OrderPayload])
```

Блок 2 — функция (строки 24–45):

```python
@stamina.retry(on=httpx.HTTPError, attempts=RETRY_ATTEMPTS)
async def calculate_paid_total(
    http_client: httpx.AsyncClient,
    *,
    customer_id: int,
    is_vip_client: bool = False,
    order_statuses: frozenset[str] = PAID_STATUSES,
) -> decimal.Decimal:
    http_response: typing.Final = await http_client.get(
        ORDERS_URL, params={"user": customer_id}
    )
    http_response.raise_for_status()
    paid_total: typing.Final = sum(
        one_order.order_amount
        for one_order in ORDERS_ADAPTER.validate_json(
            http_response.content
        )
        if one_order.order_status in order_statuses
    )
    if not is_vip_client:
        return decimal.Decimal(paid_total)
    return paid_total * VIP_DISCOUNT
```

Переносы строк сделаны под ширину слайда, 70 символов.
`ruff format` с длиной строки 120 склеит часть из них обратно.

### Проверка
Оба файла прогнаны с `pyproject.toml` из pylines 3 октября 2026.

| Проверка | «До» | «После» |
|----------|------|---------|
| ruff, `select = ["ALL"]` | 11 ошибок | 1 ошибка: `CPY001`, нет строки с копирайтом |
| mypy `--strict` | 1 ошибка | чисто |
| flake8 `--select COP` | 8 ошибок | чисто |
| тест на `httpx.MockTransport` | — | 120 без скидки, 108.0 со скидкой |

Ошибки «До»:
- ruff: `ANN001` ×3, `ANN201`, `B006`, `S113` (запрос без timeout), `E722`, `T201` ×2, `I001`, `CPY001`;
- COP: `COP016`, `COP006` ×2, `COP005` ×3, `COP011`, `COP015`.

Линтеры не поймали: `get_` у синхронной функции, магическое `0.9`, доступ по ключу `x["status"]`, отсутствие ретраев.
Это ловит только чтение правил, то есть ревью или агент со скиллом.

## 5. Какое правило за какую строку отвечает
Номера строк «После» — по полному файлу из 45 строк.

| Что было «До» (строка) | Что стало «После» (строка) | Правило | Где |
|------------------------|----------------------------|---------|-----|
| `uid`, `vip`, `r`, `d`, `tmp`, `x` (3, 5, 6, 10, 11) | `customer_id`, `is_vip_client`, `http_response`, `paid_total`, `one_order` (28, 29, 32, 36, 38) | имена от 8 символов, со смыслом | `code-style.md` стр. 90–91; COP004–COP006 |
| `for x in d` (11) | `for one_order in` (38) | переменная цикла с `one_` | COP015 |
| `get_total` (3) | `calculate_paid_total` (25) | функция — глагол, без `get` | `code-style.md` стр. 92, 94 |
| нет аннотаций (3) | аргументы и результат с типами (26–31) | 100% аннотаций, mypy strict | `code-style.md` стр. 35–37 |
| обычные присваивания (5, 6, 10) | `typing.Final` (9–12, 21, 32, 36) | неизменяемые переменные | `code-style.md` стр. 128; COP017 |
| `statuses=["paid"]` (3) | `frozenset` в константе (10, 30) | без изменяемых значений по умолчанию | ruff `B006` из `select = ["ALL"]` |
| три позиционных аргумента (3) | `*` перед аргументами (27) | больше двух аргументов — `*` | COP016 |
| `0.9`, URL, `"paid"` в коде (5, 3, 14) | `VIP_DISCOUNT`, `ORDERS_URL`, `PAID_STATUSES` (9–11) | без магических чисел и строк | `code-style.md` стр. 228 |
| `x["status"]`, `x["amount"]` (12, 14, 16) | модель `OrderPayload` и `TypeAdapter` (15–21, 39) | доступ по ключу опасен; узкие типы; валидация через pydantic | `code-style.md` стр. 51, 74; `our-stack.md` |
| поля `status`, `amount` | `order_status`, `order_amount` с `alias` (17, 18) | 8 символов действуют и на атрибуты | COP004 |
| класса нет | `@typing.final` (15) | классы помечать `final` | `code-style.md` стр. 151; COP012 |
| `except:` и `return 0` (7–9) | ошибки не глушатся, HTTP-ошибки ретраятся (24) | конкретные исключения, а не все подряд | `code-style.md` стр. 84 |
| нет ретраев (5) | `@stamina.retry` с лимитом попыток (24) | всё за пределами памяти ретраить через stamina | `code-style.md` стр. 217–224 |
| вложенные `if vip` (13–16) | `if not is_vip_client: return` (43–45) | инверсия условий | `code-style.md` стр. 180–214 |
| `tmp += ...` в цикле (10, 14, 16) | один `sum(...)` (36–42) | без переприсваивания | COP017 |
| `print` (8, 17) | убран | ruff `T201`; логгер — structlog | `pyproject.toml`; `our-stack.md` |
| `import requests` (1) | `import httpx`, модули целиком (1–6) | стандартную библиотеку импортировать целиком; httpx из рекомендованного стека | `code-style.md` стр. 33; `our-stack.md` |

### Что изменено не по pylines
- Деньги в `decimal.Decimal`, а не во `float`.
  В pylines правила про это нет, в примерах гайда `decimal.Decimal` для баланса встречается (`code-style.md`, стр. 176).
- `async` и `httpx.AsyncClient` — выбор стека (Litestar и FastAPI асинхронные), а не правило стиля.
- `raise_for_status()`: в «До» статус ответа не проверялся.
- Поведение при сбое другое.
  «До» возвращало 0 при любой ошибке.
  «После» делает три попытки и пробрасывает `httpx.HTTPError` выше.
