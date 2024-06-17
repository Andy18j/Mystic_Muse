# Mystic_Muse

Mystic_Muse is an e-commerce platform for selling ladies' jackets, shoes, and various ladies' equipment. This project leverages modern web technologies to provide a seamless shopping experience.

Table of Contents
Features
Technologies Used
Installation
Usage
API Endpoints
Deployment
Contributing
License
Features
User authentication and authorization (registration, login, password encryption)
Product listing (jackets, shoes, and other ladies' equipment)
Shopping cart functionality
Order management
Responsive design for various devices
Technologies Used
Backend
Node.js: Server-side JavaScript runtime
Express.js: Web framework for Node.js
Mongoose: ODM (Object Data Modeling) library for MongoDB
MongoDB: NoSQL database for storing user and product data
Bcrypt: Library for hashing passwords


Frontend
HTML5: Markup language
CSS3: Styling
JavaScript: Programming language for client-side scripting
Data
JSON: Format for data interchange



Clone the repository
git clone https://github.com/yourusername/mystic_muse.git



Create a .env file in the root directory and add the following:
env


Run the application
To start the backend code : npm run server

Access the application
Open your browser and navigate to http://localhost:9000



Authentication
POST /api/auth/register - Register a new user
POST /api/auth/login - Login an existing user

Products
GET /api/products - Retrieve a list of products
GET /api/products/:id - Retrieve a single product by ID
POST /api/products - Add a new product (admin only)
PUT /api/products/:id - Update a product by ID (admin only)
DELETE /api/products/:id - Delete a product by ID (admin only)

Orders
GET /api/orders - Retrieve all orders (admin only)
POST /api/orders - Create a new order


Deployment
The project is deployed at: (https://lively-belekoy-a4c5ad.netlify.app)

To deploy your own instance, consider using platforms like Heroku, Vercel, or DigitalOcean. Ensure your environment variables are correctly set up in the hosting environment.

Contributing
Fork the repository.
Create a new branch: git checkout -b feature-branch-name.
Make your changes and commit them: git commit -m 'Add some feature'.
Push to the branch: git push origin feature-branch-name.
Submit a pull request.
