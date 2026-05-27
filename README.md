# Geomarketia — Geospatial-Based Market Analysis Platform

Geomarketia is a web-based platform that integrates Geographic Information System (GIS) technology to help business owners, investors, and local governments analyze market potential spatially. The platform provides interactive map visualization, clustering analysis, and AI-powered insights to support more accurate, data-driven business location decisions.

---

## Background

Conventional and intuitive approaches to selecting business locations lead to a high risk of business failure. Geomarketia addresses this by integrating spatial data, clustering analysis, and artificial intelligence into a single responsive and user-friendly platform.

---

## Key Features

**Map Analysis**
- Market distribution map visualization with business location markers
- Radius selector for analysis ranging from 1 to 5 km
- Business detail popup for each marker on the map
- AI Chat for map-based geospatial analysis

**Cluster Area**
- Business density cluster visualization
- Area distribution and density statistics
- Color-coded density markers
- AI Chat for cluster-based analysis

**Project Management**
- Browsable list of available market analysis projects
- Map and Cluster preview before purchasing
- Pre-Purchase AI Chat for consultation before transaction
- Integrated payment system via Midtrans

**Admin Dashboard**
- Project management (add, edit, delete)
- Purchase transaction monitoring
- Export sales report to Excel format (.xlsx)

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js, JavaScript, Tailwind CSS |
| Backend | Laravel (PHP) |
| Database | MySQL |
| Mapping | Leaflet.js |
| Spatial Data | GeoJSON |
| Visualization | Heatmap, Marker Clustering |
| Payment | Midtrans Payment Gateway |
| UI Design | Figma |

---

## Development Method

This project was developed using the **Agile Software Development** method with the following stages:

1. Requirements & Planning
2. Analysis & Design
3. Iteration / Development
4. Testing & Quality Assurance (Black-box Testing)
5. Deployment
6. Review

---

## Database Structure

Main entities in the system:

- `users` — User data and roles (user/admin)
- `projects` — Market analysis project data
- `categories` — Project categories (Retail, F&B, Healthcare)
- `orders` — Purchase transaction records
- `payments` — Payment details via Midtrans
- `cities` & `provinces` — Geographic location data
- `chatbot_sessions` & `chatbot_messages` — AI interaction history

---

## Installation

### Prerequisites

- PHP >= 8.0
- Node.js >= 18
- MySQL >= 8.0
- Composer
- NPM

### Steps

```bash
# Clone the repository
git clone https://github.com/nelifauziyah88/Geomarketia.git
cd Geomarketia

# Install backend dependencies
composer install

# Install frontend dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
# DB_DATABASE=geomarketia
# DB_USERNAME=root
# DB_PASSWORD=

# Run migrations and seeders
php artisan migrate --seed

# Build frontend
npm run build

# Start the server
php artisan serve
```

Access the application at `http://localhost:8000`

---

## Functional Requirements

The system supports 29 use cases including:

- User registration and authentication
- Project search and category filtering
- Map and cluster preview before purchase
- Project purchase and payment
- Map Analysis and Cluster Area access after purchase
- AI interaction for geospatial analysis
- Project and transaction management by admin
- Sales report export

---

## Non-Functional Requirements

| Code | Category | Description |
|------|----------|-------------|
| NFR-01 | Performance | Pages load within 5 seconds on a normal connection |
| NFR-02 | Security | Passwords are hashed; access is role-protected |
| NFR-03 | Reliability | No fatal errors during testing; data persists on restart |
| NFR-04 | Usability | Responsive UI for both desktop and mobile |
| NFR-05 | Compatibility | Compatible with Chrome and Edge browsers |

---

## Supported Sectors

- Retail
- Food & Beverage (F&B)
- Healthcare

---

## Development Team

| Student ID | Name | Role |
|------------|------|------|
| 3312401007 | Neli Fauziyah | Frontend (Home, Dashboard, Projects, Transactions, Admin), Backend (Authentication, Project Management, AI Dataset Integration) |
| 3312401105 | Suci Engjelia Putri | Frontend (Register, Profile, Export Report), Backend (Purchase, Payment, Transaction Management) |

**Supervisor:** Agung Riyadi, S.Si., M.Kom

**Institution:** Informatics Engineering Study Program, Politeknik Negeri Batam

---

## Links

- Repository: [github.com/nelifauziyah88/Geomarketia](https://github.com/nelifauziyah88/Geomarketia.git)
- Presentation Video: [youtu.be/BKvkmWBjipg](https://youtu.be/BKvkmWBjipg?si=W59mMHW5CI6p4D16)
- Presentation Slides: [Google Drive](https://drive.google.com/file/d/1erVV18He2zdie33EHZxhObcB5n0qQKvf/view?usp=drive_link)
- Final Report: [Google Drive](https://drive.google.com/file/d/1fvNhSIxAmVQnLmOtl1aS4zTA3BE7Sme0/view?usp=drive_link)

---

## SDGs Contribution

The development of Geomarketia contributes to the achievement of **SDG 9: Industry, Innovation and Infrastructure** by leveraging geospatial technology to drive innovation in data-driven business decision-making and support the development of inclusive and sustainable economic infrastructure across the Retail, F&B, and Healthcare sectors.

---

## License

This project was developed as part of the Project-Based Learning (PBL) program in the Informatics Engineering Study Program, Politeknik Negeri Batam, 2026.

---

*© 2026 Geomarketia. Developed by Neli Fauziyah and Suci Engjelia Putri, Politeknik Negeri Batam.*
