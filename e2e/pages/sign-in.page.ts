// Импортируем типы Page (страница браузера) и Locator (локатор элемента) из Playwright
import { type Page, type Locator } from "@playwright/test";
// Импортируем константы маршрутов из общих констант проекта
import { ROUTES } from "../../src/shared/constants/routes";

// SignInPage — Page Object Model для страницы входа /sign-in
// Содержит селекторы элементов и методы для взаимодействия с формой логина
export class SignInPage {
  readonly page: Page; // Ссылка на страницу браузера (нужна для навигации)
  readonly emailInput: Locator; // Поле ввода email
  readonly passwordInput: Locator; // Поле ввода пароля
  readonly submitButton: Locator; // Кнопка отправки формы "Sign In"
  readonly errorBlock: Locator; // Блок с сообщением об ошибке (появляется при неверном логине)
  readonly signUpLink: Locator; // Ссылка на страницу регистрации "Sign Up"

  // Конструктор — принимает объект Page и инициализирует все локаторы
  constructor(page: Page) {
    this.page = page;
    // Ищем поле email через атрибут type="email"
    this.emailInput = page.locator('input[type="email"]');
    // Ищем поле password через атрибут type="password"
    this.passwordInput = page.locator('input[type="password"]');
    // Ищем кнопку "Sign In" по её роли button и тексту
    this.submitButton = page.getByRole("button", { name: /Sign In/i });
    // Ищем блок ошибки по CSS-классу bg-rose-500 (красный фон)
    this.errorBlock = page.locator(".bg-rose-500");
    // Ищем ссылку "Sign Up" по её роли link и тексту
    this.signUpLink = page.getByRole("link", { name: /Sign Up/i });
  }

  // goto — переходит на страницу /sign-in
  async goto() {
    await this.page.goto(ROUTES.SIGN_IN);
  }

  // fillEmail — заполняет поле email переданным значением
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  // fillPassword — заполняет поле password переданным значением
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  // clickSubmit — нажимает кнопку "Sign In"
  async clickSubmit() {
    await this.submitButton.click();
  }

  // signIn — выполняет полный сценарий входа: заполняет email, пароль и нажимает Submit
  async signIn(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

  // hasError — ожидает появления блока ошибки и возвращает его текст
  async hasError(): Promise<string | null> {
    await this.errorBlock.waitFor({ state: "visible" });
    return this.errorBlock.textContent();
  }
}
