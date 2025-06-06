# 💰 My Pet Project - Криптофінансовий трекер

**My Pet Project** — це Spring Boot застосунок, який дозволяє користувачам контролювати свої криптовалютні прибутки та витрати. Основна ідея полягає у створенні одного або кількох портфоліо, до яких додаються транзакції, що дозволяє відслідковувати фінансову історію кожного портфеля.

---

## 🔧 Використані технології

- Java 17+
- Spring Boot
- Spring Data JPA
- PostgreSQL (або інша реляційна БД)
- REST API
- Maven
- dotenv
- Spring Security (JWT авторизація)

---

## 🧩 Структура проєкту

- `config/` — налаштування безпеки (`SecurityConfig.java`)
- `controller/` — REST-контролери для користувачів та портфоліо
- `dao/` — DAO-інтерфейси для роботи з БД 
- `dotenv/` — конфігурація для роботи з `.env` файлами
- `dto/` — DTO-класи для передачі даних Entity класів
- `entity/` — Entity-класи
- `exception_handling/` — Глобальний обробник помилок API
- `filter/` — JWT фільтр (`JwtFilter.java`) для обробки токенів
- `handler/` — обробники безпеки
- `service/` — Бізнес-логіка для користувачів, портфоліо

---

## 🔌 API (Оновлений роутинг - 05.06.2025)

### 🛡️ Авторизація `/api/v1/auth`

| Метод  | Endpoint           | Опис                  |
|--------|--------------------|-----------------------|
| POST   | `/api/v1/auth/login`    | Авторизація користувача  |
| POST   | `/api/v1/auth/register` | Реєстрація користувача  |

---

### 👤 Користувачі `/api/v1/users/me`

| Метод  | Endpoint                 | Опис                                |
|--------|--------------------------|------------------------------------|
| GET    | `/api/v1/users/me`       | Отримати дані авторизованого користувача  |
| PUT    | `/api/v1/users/me`       | Оновити дані авторизованого користувача    |
| DELETE | `/api/v1/users/me`       | Видалити акаунт авторизованого користувача  |

---

### 💼 Портфоліо `/api/v1/users/me/portfolios`

| Метод  | Endpoint                              | Опис                                 |
|--------|-------------------------------------|-------------------------------------|
| GET    | `/api/v1/users/me/portfolios`       | Отримати всі портфоліо користувача |
| POST   | `/api/v1/users/me/portfolios`       | Створити нове портфоліо користувача              |
| GET    | `/api/v1/users/me/portfolios/{id}`  | Отримати конкретне портфоліо за ID  |
| PUT    | `/api/v1/users/me/portfolios/{id}`  | Оновити портфоліо                    |
| DELETE | `/api/v1/users/me/portfolios/{id}`  | Видалити портфоліо                   |

---

### 💸 Транзакції `/api/v1/users/me/portfolios/{id}/transactions`

| Метод  | Endpoint                                                | Опис                                  |
|--------|---------------------------------------------------------|--------------------------------------|
| GET    | `/api/v1/users/me/portfolios/{portfolioId}/transactions`         | Отримати всі транзакції портфоліо    |
| POST   | `/api/v1/users/me/portfolios/{portfolioId}/transactions`         | Додати нову транзакцію в портфоліо               |
| GET    | `/api/v1/users/me/portfolios/{portfolioId}/transactions/{id}`   | Отримати конкретну транзакцію за ID |
| PUT    | `/api/v1/users/me/portfolios/{portfolioId}/transactions/{id}`   | Оновити транзакцію                   |
| DELETE | `/api/v1/users/me/portfolios/{portfolioId}/transactions/{id}`   | Видалити транзакцію                  |

---

## 📌 Стан проєкту

Проєкт перебуває в активній розробці. Основна функціональність Back-End уже майже реалізована, включно з JWT-авторизацією. Подальші плани включають рефакторинг, покращення валідації даних, створення Front-End частини.

---

> English Version Translate Below / Англомовна версія перекладу нижче

---

# 💰 My Pet Project - Crypto Financial Tracker

**My Pet Project** is a Spring Boot application that allows users to track their cryptocurrency income and expenses. The main idea is to create one or more portfolios, to which transactions can be added. This allows tracking the financial history of each individual portfolio.

---

## 🔧 Technologies Used

- Java 17+
- Spring Boot
- Spring Data JPA
- PostgreSQL (or another relational database)
- REST API
- Maven
- dotenv
- Spring Security (JWT authentication)

---

## 🧩 Project Structure

- `config/` — security configuration (`SecurityConfig.java`)
- `controller/` — REST controllers for users and portfolios
- `dao/` — DAO interfaces for working with the database
- `dotenv/` — configuration for working with `.env` files
- `dto/` — DTO classes for transferring data between Entity classes and the outside world
- `entity/` — Entity classes
- `exception_handling/` — Global API exception handler
- `filter/` — JWT filter (`JwtFilter.java`) for processing tokens
- `handler/` — custom security handlers
- `service/` — Business logic for users and portfolios

---

## 🔌 API (Updated Routing - 05.06.2025)

### 🛡️ Authentication `/api/v1/auth`

| Method | Endpoint                 | Description              |
|--------|--------------------------|--------------------------|
| POST   | `/api/v1/auth/login`     | User login               |
| POST   | `/api/v1/auth/register`  | User registration        |

---

### 👤 Users `/api/v1/users/me`

| Method | Endpoint             | Description                            |
|--------|----------------------|----------------------------------------|
| GET    | `/api/v1/users/me`   | Get the currently authorized user’s data |
| PUT    | `/api/v1/users/me`   | Update the authorized user's data      |
| DELETE | `/api/v1/users/me`   | Delete the authorized user's account   |

---

### 💼 Portfolios `/api/v1/users/me/portfolios`

| Method | Endpoint                                | Description                        |
|--------|-----------------------------------------|------------------------------------|
| GET    | `/api/v1/users/me/portfolios`           | Get all portfolios of the user     |
| POST   | `/api/v1/users/me/portfolios`           | Create a new user portfolio        |
| GET    | `/api/v1/users/me/portfolios/{id}`      | Get a specific portfolio by ID     |
| PUT    | `/api/v1/users/me/portfolios/{id}`      | Update a portfolio                 |
| DELETE | `/api/v1/users/me/portfolios/{id}`      | Delete a portfolio                 |

---

### 💸 Transactions `/api/v1/users/me/portfolios/{id}/transactions`

| Method | Endpoint                                                  | Description                          |
|--------|-----------------------------------------------------------|--------------------------------------|
| GET    | `/api/v1/users/me/portfolios/{portfolioId}/transactions`           | Get all transactions in the portfolio |
| POST   | `/api/v1/users/me/portfolios/{portfolioId}/transactions`           | Add a new transaction to the portfolio |
| GET    | `/api/v1/users/me/portfolios/{portfolioId}/transactions/{id}`     | Get a specific transaction by ID     |
| PUT    | `/api/v1/users/me/portfolios/{portfolioId}/transactions/{id}`     | Update a transaction                 |
| DELETE | `/api/v1/users/me/portfolios/{portfolioId}/transactions/{id}`     | Delete a transaction                 |

---

## 📌 Project Status

The project is under active development. The core Back-End functionality is nearly complete, including JWT authentication. Future plans include refactoring, improving data validation, and developing the Front-End part.
