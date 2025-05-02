# Company_Employee_Management_API


The **Company_Employee_Management_API** is a robust backend system designed to manage staff and student data efficiently. Built using **TypeScript**, **Node.js**, and **Sequelize**, this project supports role-based authentication using **JWT tokens**, ensuring secure access and operations.

<br><br>

## 📄 API Documentation


All API endpoints, sample responses, and test cases are documented in Postman:

🔗 [View Postman Collection](https://www.postman.com/navigation-cosmologist-2842457/workspace/nova-mini-ts/collection/38429330-d0ad5604-7c89-4465-9e8e-0ef02b72a978?action=share&creator=38429330)

<br>


## 🔐 Authentication


- The authentication using **JWT tokens**.
- On successful login, a **JWT token** is returned.
- Include the token in the headers as:  
  `Authorization: <your_token_here>`


<br>

## 🚪 Login Endpoints

- **company Login** – `POST {{url}}`

Each returns a JWT token upon valid credentials.

<br>

## 📌 Company Routes


| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| POST   | `/compny/`                   | Register a new Company               |
| GET    | `/compny/`                   | Get compny with assigned Employee    |
| PUT    | `/compny/:id`                | Update compny details                |
| DELETE | `/compny/:id`                | Delete a compny                      |
| GET    | `/compny/:id`                | Get single compny details            |

<br>

## 🎓 Employee Routes


| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| POST   | `/employee/`                 | Create a new employee                |
| GET    | `/employee/`                 | Get all employee                     |
| GET    | `/employee/:id`              | Get single employee details          |
| PUT    | `/employee/:id`              | Update employee information          |
| DELETE | `/employee/:id`              | Delete a employee                    |
| POST   | `/employee/profile/:id`      | Set a Employee profile picture       | 
| POST   | `/employee/csvupload`        | Bulkinsert Employee using csv file   |


<br>


## 🧰 Built With


- Node.js  
- TypeScript  
- Express  
- Sequelize ORM  
- MySQL  
- JWT Authentication  
- CSV file handling
- AWS 
