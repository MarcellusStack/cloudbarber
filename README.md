# CloudBarber

CloudBarber is a comprehensive management system designed specifically for barbershops. It offers a range of features tailored to streamline various aspects of running a barbershop, from appointment booking and payment to inventory management and employee performance tracking.

## Technologies Used
- **Next.js**: A React framework for building server-side rendered and static web applications.
- **Directus**: An open-source headless CMS (Content Management System) for managing content and databases.

## Features
- **Appointment Booking with Payment Integration**
- **QR Code Generation for Reviews and Feedback** after Scanning and Payment
- **Employee Performance Tracking**
- **Inventory Management**
- **To-do Lists**
- **Shift Scheduling**
- **Service Display Page with Images**

## Installation

### Backend
1. Clone this repository:
   ```bash
   git clone https://github.com/MarcellusStack/cloudbarber.git
   ```
2. Set up Docker Compose for managing the backend services.
3. Install the Directus extension sync from [here](https://github.com/tractr/directus-sync).
4. Put the extension into the extension folder
5. Check if the extension is installed in Directus
6. change Directus url, email and password in directus-sync.config.js
7. run: npx directus-sync push

### Frontend
Coming soon.
