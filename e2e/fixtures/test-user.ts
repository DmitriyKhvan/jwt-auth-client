// Константа с данными тестового пользователя
// Этот пользователь должен быть предварительно зарегистрирован в базе данных
// ВАЖНО: для тестов /users пользователь должен иметь роль ADMIN
// (см. src/shared/constants/roles.ts и admin-auth.tsx)
export const TEST_USER = {
  email: "user@mail.ru", // Email для входа в тестах
  password: "123456Q", // Пароль для входа в тестах
};

export const TEST_ADMIN = {
  email: "admin@mail.ru", // Email для входа в тестах
  password: "123456Q", // Пароль для входа в тестах
};
