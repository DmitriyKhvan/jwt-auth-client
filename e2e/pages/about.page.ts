import { type Page, type Locator } from "@playwright/test";
// Импортируем константы маршрутов из общих констант проекта
import { ROUTES } from "../../src/shared/constants/routes";

// AboutPage — Page Object Model для страницы /about
export class AboutPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    // Текст "About" на странице
    this.heading = page.locator("text=About");
  }

  async goto() {
    await this.page.goto(ROUTES.ABOUT);
  }

  async isVisible() {
    await this.heading.waitFor({ state: "visible" });
  }
}
