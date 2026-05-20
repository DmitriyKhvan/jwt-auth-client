// Импортируем функции test (для объявления тестов) и expect (для проверок) из Playwright
import { test, expect } from "@playwright/test";
// Импортируем константы маршрутов из общих констант проекта
import { ROUTES } from "../src/shared/constants/routes";
// Импортируем Page Object для страницы входа
import { SignInPage } from "./pages/sign-in.page";
// Импортируем Page Object для страницы регистрации
import { SignUpPage } from "./pages/sign-up.page";
// Импортируем Page Object для главной страницы
import { HomePage } from "./pages/home.page";
// Импортируем Page Object для хедера (навигация, кнопка выхода)
import { HeaderWidget } from "./pages/header.widget";
// Импортируем данные тестового пользователя (email и пароль)
// Для тестов аутентификации используем обычного пользователя
import { TEST_USER } from "./fixtures/test-user";

// test.describe — группирует тесты в один блок "Auth"
// Это удобно для организации тестов по функциональным областям
test.describe("Auth", () => {
  // test — объявляет отдельный тест-кейс
  // Первый аргумент — название теста (отображается в отчёте)
  // Второй аргумент — асинхронная функция, которая содержит шаги теста
  //
  // { page } — это деструктуризация встроенной фикстуры (fixture) Playwright.
  // Фикстура — это объект, который Playwright автоматически создаёт, настраивает
  // и передаёт в тест перед его выполнением, а после завершения — очищает.
  //
  // Где определяется фикстура page?
  //   Внутри Playwright — это встроенная фикстура. Она:
  //   1. Открывает новый браузер (из проектов в playwright.config.ts — chromium)
  //   2. Создаёт новую вкладку (BrowserContext + Page) для каждого теста
  //   3. Применяет настройки из use { baseURL, ... }
  //   4. После теста автоматически закрывает вкладку и браузер
  //
  // Мы просто { page } — Playwright сам управляет жизненным циклом браузера.
  test("should sign in with valid credentials", async ({ page }) => {
    // Создаём экземпляр Page Object для страницы входа
    // Передаём в конструктор объект page — так POM получает доступ к браузеру
    const signInPage = new SignInPage(page);
    // Создаём экземпляр Page Object для главной страницы
    const homePage = new HomePage(page);

    // Шаг 1: переходим на страницу /sign-in
    // Метод goto() внутри вызывает page.goto("/sign-in")
    await signInPage.goto();

    // Шаг 2: заполняем форму входа email и паролем, затем нажимаем "Sign In"
    // Метод signIn() последовательно вызывает fillEmail(), fillPassword() и clickSubmit()
    // TEST_USER.email и TEST_USER.password берутся из файла test-user.ts
    await signInPage.signIn(TEST_USER.email, TEST_USER.password);

    // Шаг 3: ожидаем, что главная страница загрузилась и текст "Home" виден
    // isVisible() ждёт появления элемента с текстом "Home" внутри <main>
    await homePage.isVisible();

    // Шаг 4: проверяем, что URL изменился на корневой "/"
    // expect создаёт assertion (утверждение) — если URL не "/", тест упадёт
    await expect(page).toHaveURL(ROUTES.HOME);
  });

  test("should sign out after login", async ({ page }) => {
    // Создаём Page Object для страницы входа, главной страницы и хедера
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const header = new HeaderWidget(page);

    // Шаг 1: логинимся
    await signInPage.goto();
    await signInPage.signIn(TEST_USER.email, TEST_USER.password);
    await homePage.isVisible();

    // Шаг 2: нажимаем Sign Out в хедере
    await header.clickSignOut();

    // Шаг 3: проверяем, что произошёл редирект на страницу входа
    await expect(page).toHaveURL(ROUTES.SIGN_IN);
    // и что кнопка Sign Out больше не отображается (сессия сброшена)
    await expect(header.signOutButton).not.toBeVisible();
  });

  // Генерируем уникальный email для теста регистрации
  // Используем Date.now(), чтобы каждый запуск создавал нового пользователя
  const uniqueEmail = `e2e-test-${Date.now()}@example.com`;

  test("should sign up a new user and redirect to home", async ({ page }) => {
    // Создаём Page Object для страницы регистрации и главной
    const signUpPage = new SignUpPage(page);
    const homePage = new HomePage(page);

    // Шаг 1: переходим на страницу /sign-up
    await signUpPage.goto();

    // Шаг 2: заполняем форму регистрации уникальным email и паролем
    await signUpPage.signUp(uniqueEmail, TEST_USER.password);

    // Шаг 3: ожидаем, что после успешной регистрации произошёл редирект на главную
    await homePage.isVisible();
    await expect(page).toHaveURL(ROUTES.HOME);
  });

  test("should show error when signing in with wrong password", async ({
    page,
  }) => {
    const signInPage = new SignInPage(page);

    // Шаг 1: переходим на страницу /sign-in
    await signInPage.goto();

    // Шаг 2: вводим правильный email, но неверный пароль
    await signInPage.signIn(TEST_USER.email, "WrongPassword123!");

    // Шаг 3: проверяем, что появился блок с ошибкой
    const error = await signInPage.hasError();
    expect(error).toBeTruthy(); // ошибка не пустая
  });

  test("should show error when signing in with non-existent email", async ({
    page,
  }) => {
    const signInPage = new SignInPage(page);

    // Шаг 1: переходим на страницу /sign-in
    await signInPage.goto();

    // Шаг 2: вводим несуществующий email
    await signInPage.signIn("nonexistent-user@example.com", TEST_USER.password);

    // Шаг 3: проверяем, что появился блок с ошибкой
    const error = await signInPage.hasError();
    expect(error).toBeTruthy();
  });

  test("should show error when signing up with existing email", async ({
    page,
  }) => {
    const signUpPage = new SignUpPage(page);

    // Шаг 1: переходим на страницу /sign-up
    await signUpPage.goto();

    // Шаг 2: пытаемся зарегистрироваться с уже существующим email
    await signUpPage.signUp(TEST_USER.email, TEST_USER.password);

    // Шаг 3: проверяем, что появился блок с ошибкой
    const error = await signUpPage.hasError();
    expect(error).toBeTruthy();
  });
});
