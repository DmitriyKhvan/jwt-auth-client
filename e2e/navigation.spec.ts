// Импортируем функции test и expect из Playwright
import { test, expect } from "@playwright/test";
// Импортируем константы маршрутов из общих констант проекта
import { ROUTES } from "../src/shared/constants/routes";
// Импортируем Page Object для страницы входа
import { SignInPage } from "./pages/sign-in.page";
// Импортируем Page Object для главной страницы
import { HomePage } from "./pages/home.page";
// Импортируем Page Object для хедера
import { HeaderWidget } from "./pages/header.widget";
// Импортируем данные тестового пользователя
import { TEST_USER } from "./fixtures/test-user";

// test.describe — группирует тесты в блок "Navigation"
// Все тесты требуют авторизации, т.к. хедер виден только после входа
test.describe("Navigation", () => {
  // Для каждого теста сначала логинимся
  test.beforeEach(async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);

    // Логинимся перед каждым тестом навигации
    await signInPage.goto();
    await signInPage.signIn(TEST_USER.email, TEST_USER.password);
    await homePage.isVisible();
  });

  // Тест 1: клик по "About" в хедере → переходим на /about
  test("should navigate to about page via header link", async ({ page }) => {
    const header = new HeaderWidget(page);

    // Кликаем по ссылке "About" в навигации хедера
    await header.clickAbout();

    // Проверяем, что URL изменился на /about
    await expect(page).toHaveURL(ROUTES.ABOUT);
  });

  // Тест 2: клик по "Home" в хедере → возвращаемся на главную
  test("should navigate back to home via header link", async ({ page }) => {
    const header = new HeaderWidget(page);

    // Сначала переходим на /about
    await header.clickAbout();
    await expect(page).toHaveURL(ROUTES.ABOUT);

    // Затем кликаем "Home" — возвращаемся на главную
    await header.clickHome();
    await expect(page).toHaveURL(ROUTES.HOME);
  });

  // Тест 3: клик по "Users" в хедере → ErrorPage (обычный пользователь без прав ADMIN)
  test("should show error when clicking users without admin role", async ({
    page,
  }) => {
    const header = new HeaderWidget(page);

    // Кликаем по ссылке "Users" в навигации хедера
    await header.clickUsers();

    // AdminAuth кидает new Error("No access rights") при отсутствии роли ADMIN
    // ErrorPage отображает error.message на странице
    await expect(page.getByText("No access rights")).toBeVisible();
  });
});
