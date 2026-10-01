# 📊 Sales Analytics Dashboard (Elasticsearch + Node.js + React)

A full-stack Sales Analytics Dashboard built to demonstrate real-time data indexing, search, and complex aggregations using **Elasticsearch**, **Node.js/Express**, and **React**.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────┐
│     React Frontend      │  (Vite + Recharts + Lucide Icons)
│  http://localhost:5173  │
└────────────┬────────────┘
             │  HTTP REST Requests
             ▼
┌─────────────────────────┐
│  Node.js + Express API  │  (@elastic/elasticsearch Official Client)
│  http://localhost:5000  │
└────────────┬────────────┘
             │  Elasticsearch Client Queries & Aggregations
             ▼
┌─────────────────────────┐
│     Elasticsearch       │  (Index: sales_orders)
│  http://localhost:9200  │
└─────────────────────────┘
```

> **Security Note:** Elasticsearch best practices recommend connecting through a lightweight server-side API proxy (Node.js/Express) rather than exposing the Elasticsearch database directly to the web browser.

---

## 🚀 Key Features

1. **Top Metric Cards (KPI Metrics):**
   - **Total Sales Revenue:** Computed via Elasticsearch `sum` metric aggregation.
   - **Total Orders:** Computed via matching document hits (`hits.total`).
   - **Average Order Value (AOV):** Computed via Elasticsearch `avg` metric aggregation.
   - **Total Unique Customers:** Computed via Elasticsearch `cardinality` aggregation.

2. **Interactive Visual Analytics (Recharts):**
   - **Sales Over Time:** Monthly sales & order volume using `date_histogram` bucket aggregation.
   - **Sales by Category:** Category sales breakdown using `terms` bucket aggregation.
   - **Orders by Status:** Status distribution (Completed, Pending, Shipped, Cancelled) using `terms` aggregation.
   - **Sales by Region:** Regional market share using `terms` aggregation.

3. **Elasticsearch Document Search & Filtering:**
   - Multi-field search across `orderId`, `customer`, and `product` with fuzzy matching.
   - Filter by `category`, `status`, and `region`.
   - Paginated document table.
   - Clickable **JSON Inspect Modal** to view raw Elasticsearch `_source` document data.

4. **Elasticsearch Query Inspector:**
   - Built-in live inspector drawer showing exact Elasticsearch JSON query payloads (`aggs`, `date_histogram`, `terms`, `cardinality`, `multi_match`).

---

## 🛠️ Tech Stack

- **Database / Search Engine:** Elasticsearch (Official `@elastic/elasticsearch` client v8)
- **Backend:** Node.js, Express, CORS, dotenv
- **Frontend:** React (Vite), Recharts, Lucide-React, Modern Glassmorphism CSS

---

## 📥 Project Structure

```
elasticsearch-dashboard/
├── backend/
│   ├── server.js            # Express server entry point
│   ├── elasticsearch.js     # ES client connection & aggregation engines
│   ├── seedData.js          # 55+ realistic sample sales documents
│   ├── seed.js              # Standalone CLI seeding script
│   ├── routes/
│   │   └── dashboard.js     # REST API routes
│   ├── .env                 # Environment config
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/      # Navbar, MetricCards, FilterBar, Charts, OrdersTable, Inspector
    │   ├── App.jsx          # Main Dashboard component
    │   └── index.css        # Premium glassmorphism design system
    ├── index.html
    └── package.json
```

---

## 🚦 How to Run the Project

### 1. Start Backend Server
```bash
cd backend
npm install
npm start
```
The backend starts at `http://localhost:5000`.

### 2. Start React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📡 API Endpoints

- `GET /api/dashboard/summary` — Returns totalSales, totalOrders, averageOrderValue, totalCustomers
- `GET /api/dashboard/sales-over-time` — Returns monthly sales histogram
- `GET /api/dashboard/categories` — Returns sales by category
- `GET /api/dashboard/regions` — Returns sales by region
- `GET /api/dashboard/statuses` — Returns order count by status
- `GET /api/dashboard/orders` — Returns search results & paginated orders
- `POST /api/dashboard/seed` — Seeds sample documents into Elasticsearch

---

## 📽️ Loom Video Explanation Script

When explaining this project to your trainer or team:

> *"For Training Task 2, I developed a complete Sales Analytics Dashboard using React, Node.js, Express, and Elasticsearch. Elasticsearch stores our sales documents and performs fast search and analytical aggregation operations. The Node.js backend acts as an API proxy layer using the official `@elastic/elasticsearch` client. The React dashboard consumes these APIs and displays summary metrics, area and bar charts, real-time filters, and document search results. All charts are powered directly by Elasticsearch aggregations such as `date_histogram`, `terms`, `sum`, `avg`, and `cardinality`."*
