import { type Page, type Locator } from "@playwright/test";
import { ROUTES } from "../../src/shared/constants/routes";

// UsersPage — Page Object Model для страницы списка пользователей /users
export class UsersPage {
  readonly page: Page;
  readonly loadingIndicator: Locator; // Индикатор загрузки "Loading users..."
  readonly userCards: Locator; // Карточки пользователей

  constructor(page: Page) {
    this.page = page;
    this.loadingIndicator = page.getByText("Loading users...");
    // Ищем ссылки на пользователей внутри списка (UserCard рендерит <Link to={`/users/${id}`}>)
    // UserCard обёрнут в <li> внутри <ul> с классом grid grid-cols-3
    this.userCards = page.locator("ul.grid a");
  }

  async goto() {
    await this.page.goto(ROUTES.USERS);
  }

  async waitForUsersLoaded() {
    // Ждём, пока исчезнет индикатор загрузки
    await this.loadingIndicator.waitFor({ state: "hidden" });
  }

  async clickUser(index: number = 0) {
    // Кликаем по n-му пользователю в списке
    await this.userCards.nth(index).click();
  }
}
