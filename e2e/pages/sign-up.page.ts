// Импортируем типы Page (страница браузера) и Locator (локатор элемента) из Playwright
import { type Page, type Locator } from "@playwright/test";
// Импортируем константы маршрутов из общих констант проекта
import { ROUTES } from "../../src/shared/constants/routes";

// SignUpPage — Page Object Model для страницы регистрации /sign-up
// Содержит селекторы элементов и методы для взаимодействия с формой регистрации
export class SignUpPage {
  readonly page: Page; // Ссылка на страницу браузера
  readonly emailInput: Locator; // Поле ввода email
  readonly passwordInput: Locator; // Поле ввода пароля
  readonly submitButton: Locator; // Кнопка отправки формы "Sign Up"
  readonly errorBlock: Locator; // Блок с сообщением об ошибке
  readonly signInLink: Locator; // Ссылка на страницу входа "Sign In"

  // Конструктор — принимает объект Page и инициализирует все локаторы
  constructor(page: Page) {
    this.page = page;
    // Ищем поле email через атрибут type="email"
    this.emailInput = page.locator('input[type="email"]');
    // Ищем поле password через атрибут type="password"
    this.passwordInput = page.locator('input[type="password"]');
    // Ищем кнопку "Sign Up" по её роли button и тексту
    this.submitButton = page.getByRole("button", { name: /Sign Up/i });
    // Ищем блок ошибки по CSS-классу bg-rose-500 (красный фон)
    this.errorBlock = page.locator(".bg-rose-500");
    // Ищем ссылку "Sign In" по её роли link и тексту
    this.signInLink = page.getByRole("link", { name: /Sign In/i });
  }

  // goto — переходит на страницу /sign-up
  async goto() {
    await this.page.goto(ROUTES.SIGN_UP);
  }

  // fillEmail — заполняет поле email переданным значением
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  // fillPassword — заполняет поле password переданным значением
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  // clickSubmit — нажимает кнопку "Sign Up"
  async clickSubmit() {
    await this.submitButton.click();
  }

  // signUp — выполняет полный сценарий регистрации: заполняет email, пароль и нажимает Submit
  async signUp(email: string, password: string) {
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
