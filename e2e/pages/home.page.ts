// Импортируем типы Page (страница браузера) и Locator (локатор элемента) из Playwright
import { type Page, type Locator } from "@playwright/test";
// Импортируем константы маршрутов из общих констант проекта
import { ROUTES } from "../../src/shared/constants/routes";

// HomePage — Page Object Model для главной страницы "/"
export class HomePage {
  readonly page: Page; // Ссылка на страницу браузера
  readonly heading: Locator; // Заголовок "Home" в основной области страницы

  // Конструктор — принимает объект Page и инициализирует локаторы
  constructor(page: Page) {
    this.page = page;
    // Ищем текст "Home" только внутри элемента <main>
    // Это нужно, чтобы не захватить ссылку "Home" из навигационного меню в хедере
    this.heading = page.getByRole("main").getByText("Home");
  }

  // goto — переходит на главную страницу "/"
  async goto() {
    await this.page.goto(ROUTES.HOME);
  }

  // isVisible — ожидает, пока заголовок "Home" появится на экране
  // Используется для проверки, что пользователь успешно перешёл на главную после входа
  async isVisible() {
    await this.heading.waitFor({ state: "visible" });
  }
}
