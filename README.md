> Ukrainian and English Versions Translate Below / Українська та Англійська версії перекладу
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

---

## 🧩 Структура проєкту

- `controller/` — REST-контролери для користувачів та портфоліо
- `dao/` — DAO-інтерфейси (UserDAO, PortfolioDAO)
- `dotenv/` — конфігурація для роботи з `.env` файлами
- `dto/` — DTO-класи для передачі даних (UserDTO, PortfolioDTO)
- `entity/` — Entity-класи: User, Portfolio, Transaction
- `exception_handler/` — Глобальний обробник помилок API
- `service/` — Бізнес-логіка для користувачів та портфоліо

---

## 🔌 API (коротка інструкція)

### 👤 Користувачі `/api/users`

| Метод | Endpoint                  | Опис                        |
|-------|---------------------------|-----------------------------|
| GET   | `/api/users`             | Отримати всіх користувачів |
| GET   | `/api/users/{userId}`    | Отримати користувача за ID |
| POST  | `/api/users`             | Створити користувача       |
| PUT   | `/api/users/{userId}`    | Оновити користувача        |
| DELETE| `/api/users/{userId}`    | Видалити користувача       |

### 💼 Портфоліо `/api/portfolios`

| Метод | Endpoint                                                              | Опис                                          |
|-------|-----------------------------------------------------------------------|-----------------------------------------------|
| GET   | `/api/portfolios/users/{userId}/portfolios`                          | Отримати всі портфоліо користувача            |
| GET   | `/api/portfolios/users/{userId}/portfolios/{portfolioId}`           | Отримати конкретне портфоліо                  |
| POST  | `/api/portfolios/users/{userId}/portfolios`                         | Створити портфоліо                            |
| PUT   | `/api/portfolios/users/{userId}/portfolios/{portfolioId}`          | Оновити портфоліо                             |
| DELETE| `/api/portfolios/users/{userId}/portfolios/{portfolioId}`          | Видалити портфоліо                            |

---

## 📌 Стан проєкту

Проєкт перебуває в активній розробці. Основна функціональність back-end уже майже реалізована, однак можливі подальші вдосконалення, рефакторинг і розширення функцій у майбутньому.

---

> English Version Translate Below / Англомовна версія перекладу нижче

---

# 💰 My Pet Project - Crypto Financial Tracker

**My Pet Project** is a Spring Boot application that allows users to manage their cryptocurrency profits and expenses. Users can create one or multiple portfolios, each containing individual transactions, enabling clear financial tracking.

---

## 🔧 Technologies Used

- Java 17+
- Spring Boot
- Spring Data JPA
- PostgreSQL (or another RDBMS)
- REST API
- Maven
- dotenv

---

## 🧩 Project Structure

- `controller/` — REST controllers for Users and Portfolios
- `dao/` — DAO interfaces (UserDAO, PortfolioDAO)
- `dotenv/` — Configuration for `.env` support
- `dto/` — Data Transfer Objects (UserDTO, PortfolioDTO)
- `entity/` — Entity classes: User, Portfolio, Transaction
- `exception_handler/` — Global REST API error handler
- `service/` — Business logic for User and Portfolio operations

---

## 🔌 API (Quick Reference)

### 👤 Users `/api/users`

| Method | Endpoint                | Description                 |
|--------|-------------------------|-----------------------------|
| GET    | `/api/users`           | Get all users               |
| GET    | `/api/users/{userId}`  | Get user by ID              |
| POST   | `/api/users`           | Create a user               |
| PUT    | `/api/users/{userId}`  | Update a user               |
| DELETE | `/api/users/{userId}`  | Delete a user               |

### 💼 Portfolios `/api/portfolios`

| Method | Endpoint                                                            | Description                             |
|--------|---------------------------------------------------------------------|-----------------------------------------|
| GET    | `/api/portfolios/users/{userId}/portfolios`                        | Get all portfolios of a user            |
| GET    | `/api/portfolios/users/{userId}/portfolios/{portfolioId}`         | Get specific portfolio                  |
| POST   | `/api/portfolios/users/{userId}/portfolios`                       | Create a portfolio                      |
| PUT    | `/api/portfolios/users/{userId}/portfolios/{portfolioId}`        | Update a portfolio                      |
| DELETE | `/api/portfolios/users/{userId}/portfolios/{portfolioId}`        | Delete a portfolio                      |

---

## 📌 Project Status

The project is under active development. The main back-end functionality is almost implemented, but further improvements, refactorings, and feature extensions are possible in the future.
