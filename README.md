# Image Hub API

**Image Hub API** — REST API на NestJS для загрузки, хранения и управления изображениями. Файлы — в папке `uploads`, мета-данные — в PostgreSQL.

---

## Основной функционал

- `POST /images` — загрузка изображения (multipart/form-data: `file`, `description`)
- `GET /images` — список изображений
- `GET /images/:id` — изображение по ID
- `PATCH /images/:id` — обновление описания (DTO: `description`)
- `DELETE /images/:id` — удаление файла и записи в БД

---

## Установка

```bash
git clone <repo_url>
cd project-root
npm install
```

Создайте `.env` по примеру `.env.example`, укажите параметры подключения к PostgreSQL и базовый URL.

### Запуск

```bash
npm run start:dev
```

Swagger доступен по адресу: `http://localhost:3000/documents`

### Docker

```bash
docker-compose up --build
```

---


