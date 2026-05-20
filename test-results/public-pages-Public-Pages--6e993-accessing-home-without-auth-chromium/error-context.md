# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-pages.spec.ts >> Public Pages >> should redirect to sign-in when accessing home without auth
- Location: client\e2e\public-pages.spec.ts:39:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation to "/sign-in" until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - img [ref=e5]
    - button "Open Tanstack query devtools" [ref=e53] [cursor=pointer]:
      - img [ref=e54]
  - generic [ref=e102]: You aren't authorized to see this
  - link "Login" [ref=e103] [cursor=pointer]:
    - /url: /sign-in
```

# Test source

```ts
  1  | // Импортируем функции test и expect из Playwright
  2  | import { test, expect } from "@playwright/test";
  3  | // Импортируем Page Object для страницы входа
  4  | import { SignInPage } from "./pages/sign-in.page";
  5  | // Импортируем Page Object для страницы регистрации
  6  | import { SignUpPage } from "./pages/sign-up.page";
  7  | 
  8  | // test.describe — группирует тесты в блок "Public Pages"
  9  | //
  10 | // ВАЖНО: в этом проекте публичные (доступные без авторизации) страницы —
  11 | // только те, что обёрнуты в AuthLayout:
  12 | //   /sign-in, /sign-up
  13 | // Все остальные страницы (Home, About, Users) обёрнуты в MainLayout
  14 | // с requireAuth() и требуют токена.
  15 | test.describe("Public Pages", () => {
  16 |   // Тест 1: страница входа /sign-in доступна без авторизации
  17 |   test("should show sign-in page without auth", async ({ page }) => {
  18 |     const signInPage = new SignInPage(page);
  19 | 
  20 |     // Переходим на /sign-in
  21 |     await signInPage.goto();
  22 | 
  23 |     // Проверяем, что форма логина отображается (поле email видно)
  24 |     await expect(signInPage.emailInput).toBeVisible();
  25 |   });
  26 | 
  27 |   // Тест 2: страница регистрации /sign-up доступна без авторизации
  28 |   test("should show sign-up page without auth", async ({ page }) => {
  29 |     const signUpPage = new SignUpPage(page);
  30 | 
  31 |     // Переходим на /sign-up
  32 |     await signUpPage.goto();
  33 | 
  34 |     // Проверяем, что форма регистрации отображается (поле email видно)
  35 |     await expect(signUpPage.emailInput).toBeVisible();
  36 |   });
  37 | 
  38 |   // Тест 3: защищённая страница / (Home) редиректит на /sign-in без токена
  39 |   test("should redirect to sign-in when accessing home without auth", async ({
  40 |     page,
  41 |   }) => {
  42 |     // Переходим на главную (она защищена requireAuth)
  43 |     await page.goto("/");
  44 | 
  45 |     // Должен сработать редирект на страницу входа
> 46 |     await page.waitForURL("/sign-in");
     |                ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  47 |     await expect(page.getByRole("button", { name: /Sign In/i })).toBeVisible();
  48 |   });
  49 | 
  50 |   // Тест 4: несуществующая страница отображается (не падает с ошибкой)
  51 |   test("should show not found page for unknown route", async ({ page }) => {
  52 |     // Переходим на несуществующий URL
  53 |     const response = await page.goto("/nonexistent-route");
  54 | 
  55 |     // Проверяем, что сервер ответил
  56 |     expect(response).not.toBeNull();
  57 | 
  58 |     // Проверяем, что страница отобразилась (текст NotFoundPage)
  59 |     const body = await page.textContent("body");
  60 |     expect(body).toContain("NotFoundPage");
  61 |   });
  62 | });
  63 | 
```