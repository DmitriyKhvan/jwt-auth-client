# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Auth >> should sign up a new user and redirect to home
- Location: e2e\auth.spec.ts:85:3

# Error details

```
Error: locator.fill: Error: strict mode violation: locator('input[type="password"]') resolved to 2 elements:
    1) <input id="_r_1_" type="password" name="password" class="rounded border border-slate-300 focus:border-teal-600 px-2 h-10 outline-none"/> aka getByRole('textbox', { name: 'Password', exact: true })
    2) <input id="_r_2_" type="password" name="confirmPassword" class="rounded border border-slate-300 focus:border-teal-600 px-2 h-10 outline-none"/> aka getByRole('textbox', { name: 'Confirm password' })

Call log:
  - waiting for locator('input[type="password"]')

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
      - heading "Sign Up" [level=1] [ref=e105]
      - generic [ref=e106]:
        - generic [ref=e107]:
          - generic [ref=e108]: Email
          - textbox "Email" [active] [ref=e109]: e2e-test-1782995758398@example.com
        - generic [ref=e110]:
          - generic [ref=e111]: Password
          - textbox "Password" [ref=e112]
        - generic [ref=e113]:
          - generic [ref=e114]: Confirm password
          - textbox "Confirm password" [ref=e115]
        - button "Sign Up" [ref=e116] [cursor=pointer]
        - link "Sign In" [ref=e117] [cursor=pointer]:
          - /url: /sign-in
```

# Test source

```ts
  1  | // Импортируем типы Page (страница браузера) и Locator (локатор элемента) из Playwright
  2  | import { type Page, type Locator } from "@playwright/test";
  3  | // Импортируем константы маршрутов из общих констант проекта
  4  | import { ROUTES } from "../../src/shared/constants/routes";
  5  | 
  6  | // SignUpPage — Page Object Model для страницы регистрации /sign-up
  7  | // Содержит селекторы элементов и методы для взаимодействия с формой регистрации
  8  | export class SignUpPage {
  9  |   readonly page: Page; // Ссылка на страницу браузера
  10 |   readonly emailInput: Locator; // Поле ввода email
  11 |   readonly passwordInput: Locator; // Поле ввода пароля
  12 |   readonly submitButton: Locator; // Кнопка отправки формы "Sign Up"
  13 |   readonly errorBlock: Locator; // Блок с сообщением об ошибке
  14 |   readonly signInLink: Locator; // Ссылка на страницу входа "Sign In"
  15 | 
  16 |   // Конструктор — принимает объект Page и инициализирует все локаторы
  17 |   constructor(page: Page) {
  18 |     this.page = page;
  19 |     // Ищем поле email через атрибут type="email"
  20 |     this.emailInput = page.locator('input[type="email"]');
  21 |     // Ищем поле password через атрибут type="password"
  22 |     this.passwordInput = page.locator('input[type="password"]');
  23 |     // Ищем кнопку "Sign Up" по её роли button и тексту
  24 |     this.submitButton = page.getByRole("button", { name: /Sign Up/i });
  25 |     // Ищем блок ошибки по CSS-классу bg-rose-500 (красный фон)
  26 |     this.errorBlock = page.locator(".bg-rose-500");
  27 |     // Ищем ссылку "Sign In" по её роли link и тексту
  28 |     this.signInLink = page.getByRole("link", { name: /Sign In/i });
  29 |   }
  30 | 
  31 |   // goto — переходит на страницу /sign-up
  32 |   async goto() {
  33 |     await this.page.goto(ROUTES.SIGN_UP);
  34 |   }
  35 | 
  36 |   // fillEmail — заполняет поле email переданным значением
  37 |   async fillEmail(email: string) {
  38 |     await this.emailInput.fill(email);
  39 |   }
  40 | 
  41 |   // fillPassword — заполняет поле password переданным значением
  42 |   async fillPassword(password: string) {
> 43 |     await this.passwordInput.fill(password);
     |                              ^ Error: locator.fill: Error: strict mode violation: locator('input[type="password"]') resolved to 2 elements:
  44 |   }
  45 | 
  46 |   // clickSubmit — нажимает кнопку "Sign Up"
  47 |   async clickSubmit() {
  48 |     await this.submitButton.click();
  49 |   }
  50 | 
  51 |   // signUp — выполняет полный сценарий регистрации: заполняет email, пароль и нажимает Submit
  52 |   async signUp(email: string, password: string) {
  53 |     await this.fillEmail(email);
  54 |     await this.fillPassword(password);
  55 |     await this.clickSubmit();
  56 |   }
  57 | 
  58 |   // hasError — ожидает появления блока ошибки и возвращает его текст
  59 |   async hasError(): Promise<string | null> {
  60 |     await this.errorBlock.waitFor({ state: "visible" });
  61 |     return this.errorBlock.textContent();
  62 |   }
  63 | }
  64 | 
```