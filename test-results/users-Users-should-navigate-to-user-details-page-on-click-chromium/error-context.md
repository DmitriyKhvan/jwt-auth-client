# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users.spec.ts >> Users >> should navigate to user details page on click
- Location: e2e\users.spec.ts:44:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('main').getByText('Home') to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - img [ref=e5]
    - button "Open Tanstack query devtools" [ref=e53] [cursor=pointer]:
      - img [ref=e54]
  - main [ref=e103]:
    - generic [ref=e104]:
      - heading "Sign In" [level=1] [ref=e105]
      - generic [ref=e106]:
        - generic [ref=e107]:
          - generic [ref=e108]: Email
          - textbox "Email" [ref=e109]: admin@mail.ru
        - generic [ref=e110]:
          - generic [ref=e111]: Password
          - textbox "Password" [active] [ref=e112]: "12345"
          - generic [ref=e113]: Minimum 6 characters
        - button "Sign In" [ref=e114] [cursor=pointer]
        - link "Sign Up" [ref=e115] [cursor=pointer]:
          - /url: /sign-up
```

# Test source

```ts
  1  | // Импортируем типы Page (страница браузера) и Locator (локатор элемента) из Playwright
  2  | import { type Page, type Locator } from "@playwright/test";
  3  | // Импортируем константы маршрутов из общих констант проекта
  4  | import { ROUTES } from "../../src/shared/constants/routes";
  5  | 
  6  | // HomePage — Page Object Model для главной страницы "/"
  7  | export class HomePage {
  8  |   readonly page: Page; // Ссылка на страницу браузера
  9  |   readonly heading: Locator; // Заголовок "Home" в основной области страницы
  10 | 
  11 |   // Конструктор — принимает объект Page и инициализирует локаторы
  12 |   constructor(page: Page) {
  13 |     this.page = page;
  14 |     // Ищем текст "Home" только внутри элемента <main>
  15 |     // Это нужно, чтобы не захватить ссылку "Home" из навигационного меню в хедере
  16 |     this.heading = page.getByRole("main").getByText("Home");
  17 |   }
  18 | 
  19 |   // goto — переходит на главную страницу "/"
  20 |   async goto() {
  21 |     await this.page.goto(ROUTES.HOME);
  22 |   }
  23 | 
  24 |   // isVisible — ожидает, пока заголовок "Home" появится на экране
  25 |   // Используется для проверки, что пользователь успешно перешёл на главную после входа
  26 |   async isVisible() {
> 27 |     await this.heading.waitFor({ state: "visible" });
     |                        ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  28 |   }
  29 | }
  30 | 
```