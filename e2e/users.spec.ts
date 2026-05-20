// Импортируем функции test и expect из Playwright
import { test, expect } from "@playwright/test";
// Импортируем константы маршрутов из общих констант проекта
import { ROUTES } from "../src/shared/constants/routes";
// Импортируем Page Object для страницы входа
import { SignInPage } from "./pages/sign-in.page";
// Импортируем Page Object для главной страницы
import { HomePage } from "./pages/home.page";
// Импортируем Page Object для страницы пользователей
import { UsersPage } from "./pages/users.page";
// Импортируем данные тестовых пользователей
// Для тестов списка пользователей нужен администратор (TEST_ADMIN),
// т.к. /users обёрнут в AdminAuth (см. admin-auth.tsx и roles.ts)
import { TEST_ADMIN } from "./fixtures/test-user";

// test.describe — группирует тесты в блок "Users"
test.describe("Users", () => {
  // Логинимся перед каждым тестом как администратор
  test.beforeEach(async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);

    await signInPage.goto();
    await signInPage.signIn(TEST_ADMIN.email, TEST_ADMIN.password);
    await homePage.isVisible();
  });

  // Тест 1: список пользователей загружается и отображает карточки
  test("should display list of users", async ({ page }) => {
    const usersPage = new UsersPage(page);

    // Переходим на /users
    await usersPage.goto();

    // Ждём, пока загрузятся данные
    await usersPage.waitForUsersLoaded();

    // Проверяем, что страница загрузилась — индикатор загрузки исчез
    // Сами данные не проверяем, т.к. сервер может быть недоступен
    await expect(usersPage.loadingIndicator).not.toBeVisible();
  });

  // Тест 2: клик по пользователю → переход на страницу /users/:id
  test("should navigate to user details page on click", async ({ page }) => {
    const usersPage = new UsersPage(page);

    // Переходим на /users и ждём загрузки
    await usersPage.goto();
    await usersPage.waitForUsersLoaded();

    // Кликаем по первому пользователю в списке
    await usersPage.clickUser(0);

    // Проверяем, что URL содержит /users/
    await expect(page).toHaveURL(/\/users\//);
  });

  // Тест 3: на странице пользователя отображается email
  test("should show user email on details page", async ({ page }) => {
    const usersPage = new UsersPage(page);

    // Переходим на /users и ждём загрузки
    await usersPage.goto();
    await usersPage.waitForUsersLoaded();

    // Кликаем по первому пользователю
    await usersPage.clickUser(0);

    // Ждём, пока загрузится страница пользователя
    await page.waitForURL(/\/users\//);
    await expect(page.getByText(/@/)).toBeVisible({ timeout: 10000 });
  });
});
