# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Auth >> should show error when signing in with non-existent email
- Location: e2e\auth.spec.ts:117:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.bg-rose-500') to be visible

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
          - textbox "Email" [ref=e109]: nonexistent-user@example.com
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
  6  | // SignInPage — Page Object Model для страницы входа /sign-in
  7  | // Содержит селекторы элементов и методы для взаимодействия с формой логина
  8  | export class SignInPage {
  9  |   readonly page: Page; // Ссылка на страницу браузера (нужна для навигации)
  10 |   readonly emailInput: Locator; // Поле ввода email
  11 |   readonly passwordInput: Locator; // Поле ввода пароля
  12 |   readonly submitButton: Locator; // Кнопка отправки формы "Sign In"
  13 |   readonly errorBlock: Locator; // Блок с сообщением об ошибке (появляется при неверном логине)
  14 |   readonly signUpLink: Locator; // Ссылка на страницу регистрации "Sign Up"
  15 | 
  16 |   // Конструктор — принимает объект Page и инициализирует все локаторы
  17 |   constructor(page: Page) {
  18 |     this.page = page;
  19 |     // Ищем поле email через атрибут type="email"
  20 |     this.emailInput = page.locator('input[type="email"]');
  21 |     // Ищем поле password через атрибут type="password"
  22 |     this.passwordInput = page.locator('input[type="password"]');
  23 |     // Ищем кнопку "Sign In" по её роли button и тексту
  24 |     this.submitButton = page.getByRole("button", { name: /Sign In/i });
  25 |     // Ищем блок ошибки по CSS-классу bg-rose-500 (красный фон)
  26 |     this.errorBlock = page.locator(".bg-rose-500");
  27 |     // Ищем ссылку "Sign Up" по её роли link и тексту
  28 |     this.signUpLink = page.getByRole("link", { name: /Sign Up/i });
  29 |   }
  30 | 
  31 |   // goto — переходит на страницу /sign-in
  32 |   async goto() {
  33 |     await this.page.goto(ROUTES.SIGN_IN);
  34 |   }
  35 | 
  36 |   // fillEmail — заполняет поле email переданным значением
  37 |   async fillEmail(email: string) {
  38 |     await this.emailInput.fill(email);
  39 |   }
  40 | 
  41 |   // fillPassword — заполняет поле password переданным значением
  42 |   async fillPassword(password: string) {
  43 |     await this.passwordInput.fill(password);
  44 |   }
  45 | 
  46 |   // clickSubmit — нажимает кнопку "Sign In"
  47 |   async clickSubmit() {
  48 |     await this.submitButton.click();
  49 |   }
  50 | 
  51 |   // signIn — выполняет полный сценарий входа: заполняет email, пароль и нажимает Submit
  52 |   async signIn(email: string, password: string) {
  53 |     await this.fillEmail(email);
  54 |     await this.fillPassword(password);
  55 |     await this.clickSubmit();
  56 |   }
  57 | 
  58 |   // hasError — ожидает появления блока ошибки и возвращает его текст
  59 |   async hasError(): Promise<string | null> {
> 60 |     await this.errorBlock.waitFor({ state: "visible" });
     |                           ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  61 |     return this.errorBlock.textContent();
  62 |   }
  63 | }
  64 | 
```