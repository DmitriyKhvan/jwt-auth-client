// Импортируем функцию defineConfig для создания конфигурации Playwright
// и объект devices с предустановками для разных браузеров
import { defineConfig, devices } from "@playwright/test";

// Экспортируем конфигурацию Playwright, созданную через defineConfig
export default defineConfig({
  // testDir — путь к папке, где лежат e2e тесты
  testDir: "./e2e",

  // fullyParallel — запускать все тесты параллельно (каждый тест в своём worker'е)
  fullyParallel: true,

  // forbidOnly — запретить использование test.only в CI (чтобы случайно не запустить только один тест)
  forbidOnly: !!process.env.CI,

  // retries — количество повторных попыток при падении теста
  // В CI — 2 попытки, локально — 0 (не перезапускать)
  retries: process.env.CI ? 2 : 0,

  // workers — количество параллельных worker'ов
  // В CI — 1 (последовательный запуск), локально — undefined (максимум)
  workers: process.env.CI ? 1 : undefined,

  // reporter — формат вывода результатов тестов (html — генерирует отчёт в папку playwright-report)
  reporter: "html",

  // use — общие настройки для всех тестов
  use: {
    // baseURL — базовый URL, к которому добавляются относительные пути из page.goto()
    baseURL: "http://localhost:5173",

    // trace — запись трассировки (действий в браузере) только при первом перезапуске упавшего теста
    trace: "on-first-retry",
  },

  // projects — список проектов (браузеров), в которых будут запускаться тесты
  projects: [
    {
      // name — название проекта (используется в отчётах и логах)
      name: "chromium",
      // use — настройки для этого конкретного браузера (берём предустановку Desktop Chrome)
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // webServer — настройки для автоматического запуска dev-сервера перед тестами
  webServer: {
    // command — команда для запуска сервера
    command: "npm run dev",

    // url — URL, по которому Playwright будет проверять, что сервер запущен
    url: "http://localhost:5173",

    // reuseExistingServer — не убивать сервер после завершения тестов (локально)
    // В CI — false (каждый раз запускать заново)
    reuseExistingServer: !process.env.CI,

    // timeout — максимальное время ожидания запуска сервера (30 секунд)
    timeout: 30000,
  },
});
