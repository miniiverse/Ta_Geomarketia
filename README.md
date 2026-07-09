# Geomarketia — Geospatial-Based Market Analysis Platform

Geomarketia is a web-based platform that integrates Geographic Information System (GIS) technology to help business owners, investors, and local governments analyze market potential spatially. The platform provides interactive map visualization, clustering analysis, and AI-powered insights to support more accurate, data-driven business location decisions.

---

## Background

Conventional and intuitive approaches to selecting business locations lead to a high risk of business failure. Geomarketia addresses this by integrating spatial data, clustering analysis, and artificial intelligence into a single responsive and user-friendly platform.

---

## Key Features

**Map Analysis**
- Market distribution map visualization with business location markers
- Radius selector for analysis ranging from 1.5 to 10 km
- Business detail popup for each marker on the map
- AI Chat for map-based geospatial analysis

**Cluster Area**
- Business density cluster visualization
- Area summary including density level, total businesses, average rating, total reviews, digital presence, dominant business category, rating distribution, and top businesses by review count
- Color-coded density markers
- Brief cluster summary (number of businesses) on selection

**Intelligent System**
- Interactive map for location recommendations
- Filter recommendations by Sub District, Sub Category, and Top Rank
- Recommendation results based on the selected filters

**Project Management**
- Browsable list of available market analysis projects
- Map and Cluster preview before purchasing
- Pre-Purchase AI Chat for consultation before transaction
- Integrated payment system via Midtrans

**Admin & Manager Dashboard**
- Project management (add, edit, delete) — restricted to Manager
- Purchase transaction and payment detail monitoring
- Export sales report to Excel format (.xlsx)
- User data management (view, edit, delete)
- Role management (promote/demote between Manager and User)

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

This research applies the **Agile Software Development** method, which emphasizes an iterative, flexible, and collaborative approach to responding to dynamically changing system requirements (Ramadhan et al., 2025). Development begins with **Requirements & Planning**, identifying the platform's functional needs such as spatial data integration and map visualization features, based on priority. In the **Analysis & Design** stage, these requirements are translated into the system architecture, GeoJSON data structures, and interface prototypes built in Figma. Core development takes place in the **Iteration/Development** phase through modular coding cycles using Next.js and mapping libraries to dynamically present location data.

Software quality is maintained through the **Testing & Quality Assurance** stage using black-box testing to validate coordinate accuracy and platform responsiveness. Once the system is confirmed stable, the **Deployment** stage migrates the code to a hosting server so Geomarketia can be accessed publicly. The methodology concludes with the **Review** stage, evaluating system performance and spatial data accuracy to ensure the development results align with the functional objectives and user needs (Ramadhan et al., 2025).

---

## System Requirements

### Functional Requirements


| No. | Code | Actor | Description |
|-----|------|-------|--------------|
| 1 | FR-01 | User, Manager | Register a new account. |
| 2 | FR-02 | User, Admin, Manager | Log in to the system. |
| 3 | FR-03 | User | View the platform landing page. |
| 4 | FR-04 | User | View the list of available market analysis projects. |
| 5 | FR-05 | User | Search for projects using the search field. |
| 6 | FR-06 | User | Search for projects by category. |
| 7 | FR-07 | User | Display an interactive map, select a search radius, and view nearby business information in the Map Analysis feature. |
| 8 | FR-08 | User | Purchase a project. |
| 9 | FR-09 | User | Make payment for a project. |
| 10 | FR-10 | User | Access the Map Analysis feature after a successful purchase. |
| 11 | FR-11 | User | View an interactive map with business location markers in Map Analysis. |
| 12 | FR-12 | User | Select a search radius from 1.5 km to 10 km in Map Analysis. |
| 13 | FR-13 | User | View a business information popup when a marker is selected in Map Analysis. |
| 14 | FR-14 | User | Access the Cluster Area feature after a successful purchase. |
| 15 | FR-15 | User | View an area summary including business density level, total businesses, average rating, total reviews, digital presence, dominant business category, rating distribution, and top businesses by review count. |
| 16 | FR-16 | User | View density markers with different colors in Cluster Area. |
| 17 | FR-17 | User | View a brief cluster summary (number of businesses) when a cluster is selected. |
| 18 | FR-18 | User | Access the Intelligent System feature after a successful purchase. |
| 19 | FR-19 | User | View an interactive map in the Intelligent System feature. |
| 20 | FR-20 | User | Filter location recommendations by Sub District, Sub Category, and Top Rank. |
| 21 | FR-21 | User | View location recommendation results based on the selected filters. |
| 22 | FR-22 | Admin, Manager | View the list of available analysis projects in the system. |
| 23 | FR-23 | Admin, Manager | View the list of project purchase transactions. |
| 24 | FR-24 | Admin, Manager | View payment transaction details. |
| 25 | FR-25 | Admin, Manager | Export sales report data to Excel (.xlsx). |
| 26 | FR-26 | Admin, Manager | Edit a project and its information. |
| 27 | FR-27 | Admin, Manager | Delete user data when necessary. |
| 28 | FR-28 | Admin, Manager | View the list of user data. |
| 29 | FR-29 | Admin, Manager | Edit user information, such as full name, username, and email. |
| 30 | FR-30 | Admin | Add a new project along with its information to the system. |
| 31 | FR-31 | Admin | Delete a project along with its information. |
| 32 | FR-32 | Admin | Change an account role from Manager to User. |
| 33 | FR-33 | Admin | Change an account role from User to Manager. |

### Non-Functional Requirements


| No. | Code | Category | Description |
|-----|------|----------|--------------|
| 1 | NFR-01 | Security | User passwords are stored as hashes, and dashboard/project access is restricted to logged-in users. |
| 2 | NFR-02 | Reliability | The system does not experience fatal errors during testing, and data persists in the database even after a server restart. |
| 3 | NFR-03 | Usability | The UI is easy for MSME (UMKM) users to understand, with a clear usage flow and a responsive layout for at least desktop and mobile. |
| 4 | NFR-04 | Compatibility | The application runs properly on Chrome and Edge browsers at standard laptop screen resolutions. |

---

## Database Structure

Main entities in the system:

- `users` — User data and roles (Manager, Admin, User)
- `projects` — Market analysis project data
- `categories` — Project categories (Retail, F&B, Healthcare)
- `orders` — Purchase transaction records
- `payments` — Payment details via Midtrans
- `cities` & `provinces` — Geographic location data

---

## System Integration

After all system components were configured, integration was performed to connect the Next.js frontend, Laravel backend, and MySQL database into a single, fully functional system.

**1. Frontend–Backend Integration**
The frontend is integrated with the backend by connecting Next.js to the Laravel API endpoints via HTTP requests. The frontend sends requests to the backend API to retrieve and submit data, such as project data, user authentication, and market analysis results.

**2. Interactive Map Integration**
Leaflet.js is integrated on the frontend to render interactive market analysis map visualizations. Spatial data in GeoJSON format is sent from the backend and rendered by Leaflet.js on the user interface, including the marker clustering feature.

**3. Payment Gateway Integration**
Midtrans is integrated to process project purchase transactions on the Geomarketia platform. The Laravel backend communicates with the Midtrans API to create transactions, and the results are forwarded to the frontend for display to the user.

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
- ATS Documents: [Google Drive](https://drive.google.com/drive/folders/18ne8UPHXVe9NYQj5sZowtidbADqI2gsl?usp=sharing)
- ATS Presentation Video: [youtu.be/BKvkmWBjipg](https://youtu.be/BKvkmWBjipg?si=W59mMHW5CI6p4D16)
- AAS Documents: [Google Drive](https://drive.google.com/drive/folders/1adKKXROS612SLRa0vxjNSak6IDOtZoGp?usp=drive_link)
- AAS Presentation Video: [youtu.be/BNZwai6gIAo](https://youtu.be/Z2fgdHofdus)
- Product Demo Video: [youtu.be/BNZwai6gIAo](https://youtu.be/BNZwai6gIAo)
---

## SDGs Contribution

The development of Geomarketia contributes to the achievement of **SDG 9: Industry, Innovation and Infrastructure** by leveraging geospatial technology to drive innovation in data-driven business decision-making and support the development of inclusive and sustainable economic infrastructure across the Retail, F&B, and Healthcare sectors.

---

## License

This project was developed as part of the Project-Based Learning (PBL) program in the Informatics Engineering Study Program, Politeknik Negeri Batam, 2026.

---

*© 2026 Geomarketia. Developed by Neli Fauziyah and Suci Engjelia Putri, Politeknik Negeri Batam.*
