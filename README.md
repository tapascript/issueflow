<div align="center">

# 🚀 IssueFlow

**A lightweight issue tracker for engineering teams — built with Next.js and Supabase.**

Track engineering work, collaborate with your team, and keep issues moving toward completion.

[![YouTube](https://img.shields.io/badge/Watch%20the%20build-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/Ms9VOyoWDpI)

</div>

---

## 📖 What is IssueFlow?

IssueFlow is a modern issue tracker for engineering teams. It lets you create, organize, search, sort, and filter issues — and share a filtered view of your board with anyone via the URL.

The project is a hands-on, end-to-end build covering a production-style Next.js App Router application backed by Supabase (Postgres), including database design, migrations, seed data, server-side data fetching, and a polished UI.

### ✨ Features

- 🗂️ **Issue list** with rich cards showing status, priority, labels, and assignee
- 🔍 **Search** across issue titles and descriptions
- ↕️ **Sorting** by created date, priority, or title (ascending/descending)
- 🎛️ **Filtering** by status, priority, and assignee — all combinable
- 🔗 **Shareable filters** — active filters are reflected in the URL so you can copy and share a filtered view
- 📄 **Pagination** with configurable page size
- 📊 **Dashboard** with issue statistics (To do / In progress / Done)
- ⚡ **Loading, empty, and error states** throughout

---

## 🎥 Watch the Build

Follow along with the full build on YouTube:

👉 **[Build IssueFlow — watch the video](https://youtu.be/Ms9VOyoWDpI)**

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI Library | [React 19](https://react.dev) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Database / Backend | [Supabase](https://supabase.com) (Postgres) |
| Supabase Client | `@supabase/supabase-js` + `@supabase/ssr` |
| Testing | [Vitest](https://vitest.dev) |
| Linting | [ESLint](https://eslint.org) |

---

## 🚀 Run Locally

### Prerequisites

- [Node.js](https://nodejs.org) **20+** (the project is developed on Node 22)
- npm (or your preferred package manager)
- A [Supabase](https://supabase.com) project — cloud or local (see [Supabase setup](#-supabase-setup--schema))

### 1. Clone the repository

```bash
git clone https://github.com/tapascript/issueflow.git
cd issueflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

> You can find these in your Supabase dashboard under **Project Settings → API** (see [Supabase setup](#-supabase-setup--schema) below).

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🗄️ Supabase Setup & Schema

IssueFlow uses **Supabase (Postgres)** for storage. All schema definitions live in the `supabase/` directory as SQL migrations.

### Option A — Supabase Cloud (recommended)

1. Create a project at [supabase.com](https://supabase.com).
2. From your project dashboard, open **Project Settings → API** and copy:
   - The **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - The **publishable key** (or `anon` key) → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
3. Run the migrations and seed data against your project:

```bash
npm install -g supabase
supabase link --project-ref <your-project-ref>
supabase db push
```

`supabase db push` applies the migrations in `supabase/migrations/` (including the seed data) to your remote database.

### Option B — Local Supabase CLI

If you prefer to develop against a local database:

```bash
supabase start
supabase db reset
```

- `supabase start` boots a local Postgres + API (default API URL: `http://127.0.0.1:54321`).
- `supabase db reset` applies migrations and seeds fresh local data.

Then point your `.env.local` at the local instance:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<local-anon-key-from-supabase-status>
```

### Schema Overview

The database consists of four tables:

#### `profiles` — team members

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | Primary key |
| `name` | `text` | Not null |
| `avatar_url` | `text` | Nullable |
| `created_at` | `timestamptz` | Defaults to `now()` |

#### `issues` — the core entity

| Column | Type | Notes |
|--------|------|-------|
| `id` | `bigint` | Identity primary key |
| `title` | `text` | Not null |
| `description` | `text` | Nullable |
| `status` | `text` | One of `todo`, `in_progress`, `done` |
| `priority` | `text` | One of `low`, `medium`, `high`, `critical` |
| `assignee_id` | `uuid` | FK → `profiles.id` (`ON DELETE SET NULL`) |
| `created_at` | `timestamptz` | Defaults to `now()` |
| `updated_at` | `timestamptz` | Auto-updated by trigger |

#### `labels` — issue tags

| Column | Type | Notes |
|--------|------|-------|
| `id` | `bigint` | Identity primary key |
| `name` | `text` | Not null, unique |
| `color` | `text` | Hex color for the label |
| `created_at` | `timestamptz` | Defaults to `now()` |

#### `issue_labels` — many-to-many join table

| Column | Type | Notes |
|--------|------|-------|
| `issue_id` | `bigint` | FK → `issues.id` (`ON DELETE CASCADE`) |
| `label_id` | `bigint` | FK → `labels.id` (`ON DELETE CASCADE`) |

> Primary key is the composite `(issue_id, label_id)`.

The schema also includes:

- Indexes on `status`, `priority`, `assignee_id`, and `created_at` for fast filtering/sorting.
- A `set_updated_at()` trigger that keeps `issues.updated_at` in sync.
- Row Level Security (RLS) policies for `profiles`, `issues`, `labels`, and `issue_labels`.

### Migrations

| File | Purpose |
|------|---------|
| `20261008051341_create_issueflow_schema.sql` | Creates tables, indexes, trigger, and RLS policies |
| `20261008051643_seed_issueflow_data.sql` | Seeds team members and labels |
| `20261008054452_seed_issueflow_issues.sql` | Seeds sample issues |
| `20261008054638_seed_issueflow_issue_labels.sql` | Seeds issue ↔ label relationships |

---

## 🧪 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the Vitest test suite |

---

## ⭐ Support the Project

If you find IssueFlow helpful, please consider supporting the work:

- ⭐ **Star this repository** — it really helps!
- 🎥 **Watch the build video** → [youtu.be/Ms9VOyoWDpI](https://youtu.be/Ms9VOyoWDpI)
- 📺 **Follow the tapaScript channel** for tech career growth, tutorials, and more → [youtube.com/tapasadhikary](https://www.youtube.com/tapasadhikary)

---

## 📄 License

[MIT](./LICENSE) © [tapaScript](https://github.com/tapascript)
