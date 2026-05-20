// Импортируем типы Page (страница браузера) и Locator (локатор элемента) из Playwright
import { type Page, type Locator } from "@playwright/test";

// HeaderWidget — Page Object Model для хедера (верхней навигационной панели)
// Хедер содержит логотип, ссылки навигации и кнопку "Sign Out"
export class HeaderWidget {
  readonly page: Page; // Ссылка на страницу браузера
  readonly homeLink: Locator; // Ссылка "Home" в навигации
  readonly aboutLink: Locator; // Ссылка "About" в навигации
  readonly usersLink: Locator; // Ссылка "Users" в навигации
  readonly signOutButton: Locator; // Кнопка выхода из системы "Sign Out"

  // Конструктор — принимает объект Page и инициализирует локаторы
  constructor(page: Page) {
    this.page = page;
    // Ищем навигационные ссылки по тексту
    this.homeLink = page.getByRole("link", { name: /^Home$/ });
    this.aboutLink = page.getByRole("link", { name: /^About$/ });
    this.usersLink = page.getByRole("link", { name: /^Users$/ });
    // Ищем кнопку "Sign Out" по её роли button и тексту (регистронезависимо)
    this.signOutButton = page.getByRole("button", { name: /Sign Out/i });
  }

  // clickHome — нажимает ссылку "Home" в навигации
  async clickHome() {
    await this.homeLink.click();
  }

  // clickAbout — нажимает ссылку "About" в навигации
  async clickAbout() {
    await this.aboutLink.click();
  }

  // clickUsers — нажимает ссылку "Users" в навигации
  async clickUsers() {
    await this.usersLink.click();
  }

  // clickSignOut — нажимает кнопку "Sign Out" для выхода из системы
  async clickSignOut() {
    await this.signOutButton.click();
  }

  // isSignOutVisible — проверяет, видна ли кнопка "Sign Out" на странице
  // Возвращает true/false (используется для проверки, что пользователь авторизован)
  async isSignOutVisible() {
    return this.signOutButton.isVisible();
  }
}
