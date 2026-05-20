# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-pages.spec.ts >> Public Pages >> should show about page without auth
- Location: client\e2e\public-pages.spec.ts:24:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=About') to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - img [ref=e5]
    - button "Open Tanstack query devtools" [ref=e53] [cursor=pointer]:
      - img [ref=e54]
  - generic [ref=e102]: You aren't authorized to see this
  - link "Login" [ref=e103] [cursor=pointer]:
    - /url: /sign-in
```

# Test source

```ts
  1  | import { type Page, type Locator } from "@playwright/test";
  2  | 
  3  | // AboutPage — Page Object Model для страницы /about
  4  | export class AboutPage {
  5  |   readonly page: Page;
  6  |   readonly heading: Locator;
  7  | 
  8  |   constructor(page: Page) {
  9  |     this.page = page;
  10 |     // Текст "About" на странице
  11 |     this.heading = page.locator("text=About");
  12 |   }
  13 | 
  14 |   async goto() {
  15 |     await this.page.goto("/about");
  16 |   }
  17 | 
  18 |   async isVisible() {
> 19 |     await this.heading.waitFor({ state: "visible" });
     |                        ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  20 |   }
  21 | }
  22 | 
```