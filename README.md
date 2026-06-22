# 📰 F-145 News — Full-Stack News Portal

A modern, responsive news portal with a full-featured Admin Panel, powered by a RESTful backend API. Built with a clean frontend stack and a robust service layer for all data operations.

---

## 🌐 Live Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (Client)                   │
│ index.html · admin.html · auth.html   · category.js     │
│ script.js  · admin.js · auth.js  · service.js · news.js │
└────────────────────────┬────────────────────────────────┘
                         │  HTTP Requests (Fetch API)
                         ▼
┌─────────────────────────────────────────────────────────┐
│              REST API Backend                           │
│         https://news.apasni.me/api                      │
│                                                         │
│  POST  /auth/login       → Authenticate user            │
│  GET   /news             → Fetch paginated news         │
│  POST  /news             → Create news (admin only)     │
│  GET   /category         → Fetch all categories         │
│  POST  /category         → Create category (admin only) │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### 🎨 Styling & UI
| Tool | Purpose |
|------|---------|
| **Tailwind CSS** | Utility-first CSS framework — the primary styling engine of the project. All layouts, spacing, colors, and responsiveness are handled through Tailwind classes |
| **DaisyUI v5** | Component library built on top of Tailwind. Used for modals, alerts, buttons, dropdowns, form inputs, and badges |
| **Font Awesome 7** | Icon library used throughout navbar, news cards, and action buttons (calendar, eye, thumbs up/down, plus, etc.) |
| **SweetAlert2** | Beautiful, customizable popup alerts for confirmation dialogs and success/error notifications |

### ⚙️ Backend Communication
| Tool | Purpose |
|------|---------|
| **Fetch API** | Native browser API used for all HTTP requests to the backend — GET, POST with JSON body and Authorization headers |
| **REST API** | Backend follows REST conventions: resources as URLs, HTTP verbs for actions, JSON responses |
| **JWT (Bearer Token)** | Authentication token stored in `localStorage` and sent via `Authorization: Bearer <token>` header for protected routes |
| **Swagger / Postman** | Used during development to test and document API endpoints before integrating into the frontend |

---

## 📁 Project Structure

```
project/
│
├── index.html        # Public news feed page
├── auth.html         # Login page for admin access
├── admin.html        # Admin panel (protected route)
│
├── script.js         # News cards + pagination logic (public)
├── auth.js           # Login form handling + toast notifications
├── admin.js          # Sidebar navigation + tab switching logic
├── service.js        # Centralized API service layer (all fetch calls)
│
└── adminscr/
    ├── news.js       # Admin: news table, create/delete news
    └── category.js   # Admin: category table, create/update category
```

---

## 🔑 Key Files — Detailed Breakdown

### `service.js` — API Service Layer
> The heart of all backend communication. Every API call in the project goes through this file.

```js
const BASE_URL = 'https://news.apasni.me/api'
```

| Function | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| `getAllNews(page, limit)` | `GET` | `/news?page=&limit=` | Fetches paginated news items for the public feed |
| `login(params)` | `POST` | `/auth/login` | Sends email + password, returns JWT token and user object |
| `getAllCategory()` | `GET` | `/category` | Retrieves all categories for dropdown selects |
| `createNews(params)` | `POST` | `/news` | Creates a new article (requires Bearer token) |
| `createCategory(params)` | `POST` | `/category` | Creates a new category (requires Bearer token) |

All protected endpoints pass the JWT token via headers:
```js
headers: {
  "content-type": "application/json",
  "Authorization": `Bearer ${token}`
}
```

---

### `index.html` + `script.js` — Public News Feed

<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/4f5cb2c1-f08f-4b07-9e2a-826351cb5060" />

<br>

<img width="1919" height="870" alt="image" src="https://github.com/user-attachments/assets/0d120749-a216-4190-801d-5db19a4130c7" />


The homepage visitors see. Fetches and renders news cards dynamically from the API with **pagination support**.

**Key features:**
- `getNews(page, limit)` — calls the API and renders results
- `renderCards(arr)` — builds news card HTML with thumbnail, title, category badge, views, likes, and dislikes
- `renderPagination(activePage, totalPages)` — dynamically generates page buttons; clicking any page triggers a new API call
- Cards are rendered with Tailwind hover effects (`hover:shadow-2xl`, `hover:-translate-y-2`) for smooth interaction

---

### `auth.html` + `auth.js` — Authentication Page

<img width="1915" height="862" alt="Снимок экрана 2026-05-11 122920" src="https://github.com/user-attachments/assets/cef06cd8-f412-438e-b2cd-28550857ae20" />


Login form for admin access. Handles form submission, shows loading state, and manages response feedback.

**Key features:**
- Submits credentials via `login()` from `service.js`
- Shows a spinner inside the submit button during the request (`loading-spinner` DaisyUI class)
- On success: stores `token` and `user` in `localStorage`, redirects to `admin.html`
- On failure or if user role is `"user"`: shows an error toast via `renderToast()`
- **Toast system** built with DaisyUI's `alert` and `toast` components, auto-dismisses after 3 seconds

---

### `admin.html` + `admin.js` — Admin Panel

<img width="1908" height="867" alt="Снимок экрана 2026-05-11 122813" src="https://github.com/user-attachments/assets/31effd83-4c91-4b9a-b11e-1af1b9e455c7" />
<br>
<img width="1911" height="864" alt="Снимок экрана 2026-05-11 122849" src="https://github.com/user-attachments/assets/ab4654d8-676c-4965-8e3f-25f53d6f7d17" />
<br>
<img width="1898" height="870" alt="Снимок экрана 2026-05-11 122827" src="https://github.com/user-attachments/assets/2a79600b-8d46-406b-bb99-58d358cfd8e0" />



A protected dashboard only accessible to users with `role !== "user"`. Redirects to `auth.html` if no valid token or unauthorized role is found in `localStorage`.

**Key features:**

#### Route Guard (runs before page loads):
```js
let token = localStorage.getItem("token")
let user = JSON.parse(localStorage.getItem("user"))
if (!token || !user || user.role == "user") {
  location.replace("auth.html")
}
```

#### Sidebar Navigation (`admin.js`):
- Selects all `<a>` tags in the navbar and all `.page` divs
- On each tab click: hides all pages, reveals the matching one, updates active highlight
- Includes `logOut()` — clears `localStorage` and redirects to auth
- Includes `goToWeb()` — navigates back to `index.html`
- `loaderStatus(bool)` — shows/hides a full-screen loading overlay

#### Loader Component:
Animated pulsing dots shown during async operations (API calls):
```html
<div id="loaderComp" class="fixed hidden ...">...</div>
```

---

### `adminscr/news.js` — News Management

Manages the news data table in the admin panel.

**Key features:**
- Fetches and renders all news in an HTML `<table>` with columns: News, Category, Stats, Date, Status, Actions
- **Add News modal** (`my_modal_3`) — form with fields for title, content, slug, category (populated from API), thumbnail URL
- Category dropdown is populated dynamically by calling `getAllCategory()` from `service.js`
- On form submit: calls `createNews()` with form data and Bearer token
- Delete/Edit action buttons per row

---

### `adminscr/category.js` — Category Management

Manages news categories in the admin panel.

**Key features:**
- Fetches all categories and renders them in a table: №, Title, Slug, Created Date, Updated Date, Actions
- **Add Category modal** (`my_modal_2`) — form with title and slug fields; calls `createCategory()`
- **Update Category modal** (`my_modal_4`) — pre-filled inputs (`titleinp1`, `titleinp2`) for editing existing category
- Uses DaisyUI `<dialog>` modals with backdrop click-to-close support

---

## 🔐 Authentication & Authorization Flow

```
User visits admin.html
        │
        ▼
Check localStorage for token + user
        │
   ┌────┴─────┐
   │          │
No token   Token exists
   │       + role !== "user"
   │          │
   ▼          ▼
Redirect   Show Admin Panel
to auth
```

Tokens are persisted in `localStorage` across sessions. The same token is referenced in `service.js` at module load time:
```js
let tokens = localStorage.getItem('token')
```

---

## 📡 API Integration Details

All API communication uses the **native Fetch API** — no external HTTP libraries required.

### Example: Fetching paginated news
```js
const getAllNews = async (page = 1, limit = 10) => {
  let res = await fetch(`${BASE_URL}/news?page=${page}&limit=${limit}`)
  let data = await res.json()
  return data
}
```

### Example: Creating news with auth
```js
let createNews = async (params) => {
  let res = await fetch(`${BASE_URL}/news`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${tokens}`
    }
  })
  let data = await res.json()
  return data
}
```

API endpoints were tested and documented using **Swagger UI** (provided by the backend) and **Postman** during development.

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/f145-news.git
   cd f145-news
   ```

2. **Build Tailwind CSS** (if using CLI)
   ```bash
   npx tailwindcss -i ./input.css -o ./output.css --watch
   ```

3. **Open in browser**
   ```
   Open index.html in your browser
   ```
   > No build step required for the frontend — all scripts load via CDN or local files.

4. **Admin access**
   - Navigate to `auth.html`
   - Log in with admin credentials
   - You'll be redirected to the admin panel automatically

---

## 📦 CDN Dependencies

```html
<!-- Tailwind CSS -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

<!-- DaisyUI -->
<link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" />

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/js/all.min.js"></script>

<!-- SweetAlert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
```

---

## 📌 Notes

- The project is purely frontend — all data is served from the existing REST API at `https://news.apasni.me/api`
- Role-based access is enforced both in the route guard and on the server side via JWT validation
- Pagination state is managed client-side; each page change triggers a fresh API call
- The `output.css` file is the compiled Tailwind stylesheet — regenerate it if you modify Tailwind config

---

## Live Demo & Code
#### [GitHub](https://github.com/FatimaGuseynova/news_website)
#### [Live on Vercel](https://news-website-peach-psi.vercel.app/)
