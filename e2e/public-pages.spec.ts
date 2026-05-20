// Импортируем функции test и expect из Playwright
import { test, expect } from "@playwright/test";
// Импортируем константы маршрутов из общих констант проекта
import { ROUTES } from "../src/shared/constants/routes";
// Импортируем Page Object для страницы входа
import { SignInPage } from "./pages/sign-in.page";
// Импортируем Page Object для страницы регистрации
import { SignUpPage } from "./pages/sign-up.page";

// test.describe — группирует тесты в блок "Public Pages"
//
// ВАЖНО: в этом проекте публичные (доступные без авторизации) страницы —
// только те, что обёрнуты в AuthLayout:
//   /sign-in, /sign-up
// Все остальные страницы (Home, About, Users) обёрнуты в MainLayout
// с requireAuth() и требуют токена.
test.describe("Public Pages", () => {
  // Тест 1: страница входа /sign-in доступна без авторизации
  test("should show sign-in page without auth", async ({ page }) => {
    const signInPage = new SignInPage(page);

    // Переходим на /sign-in
    await signInPage.goto();

    // Проверяем, что форма логина отображается (поле email видно)
    await expect(signInPage.emailInput).toBeVisible();
  });

  // Тест 2: страница регистрации /sign-up доступна без авторизации
  test("should show sign-up page without auth", async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    // Переходим на /sign-up
    await signUpPage.goto();

    // Проверяем, что форма регистрации отображается (поле email видно)
    await expect(signUpPage.emailInput).toBeVisible();
  });

  // Тест 3: защищённая страница / (Home) показывает ErrorPage без токена
  test("should show error page when accessing home without auth", async ({
    page,
  }) => {
    // Переходим на главную (она защищена requireAuth)
    await page.goto("/");

    // requireAuth() кидает Response со статусом 401,
    // react-router ловит его в errorElement и показывает ErrorPage
    // ErrorPage отображает: "You aren't authorized to see this" + ссылка Login
    await expect(
      page.getByText("You aren't authorized to see this"),
    ).toBeVisible();

    // Проверяем, что есть ссылка Login, ведущая на /sign-in
    const loginLink = page.getByRole("link", { name: /Login/i });
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute("href", ROUTES.SIGN_IN);
  });

  // Тест 4: несуществующая страница отображается (не падает с ошибкой)
  test("should show not found page for unknown route", async ({ page }) => {
    // Переходим на несуществующий URL
    const response = await page.goto("/nonexistent-route");

    // Проверяем, что сервер ответил
    expect(response).not.toBeNull();

    // Проверяем, что страница отобразилась (текст NotFoundPage)
    const body = await page.textContent("body");
    expect(body).toContain("NotFoundPage");
  });
});
