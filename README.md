```markdown
# University Registration System

## Overview
The University Registration System is designed to manage student registrations, course enrollments, and fee payments. This project provides a comprehensive solution for a university setting, leveraging MySQL as the database and Node.js with Express for the server-side application.

## Project Structure
```
bc-university-registration/
├── controllers/
│   └── studentController.js
├── middleware/
│   └── isAuthenticated.js
├── public/
│   └── css/
│       └── dashboard.css
├── routes/
│   └── studentRoutes.js
├── views/
│   ├── courses.ejs
│   ├── dashboard.ejs
│   ├── frontpage.ejs
│   ├── login.ejs
│   └── register.ejs
├── .env
├── app.js
├── package.json
└── README.md
```

## Database
The project uses MySQL as the database. Ensure that the database is set up correctly and the necessary tables are created.

### Example SQL Commands
To create the necessary tables, you can use the following SQL commands:

```sql
INSERT INTO Courses (Name, Code, Capacity,createdAt) VALUES
('Namee', 'CODE101', 30, NOW()),
('Code', 'CODE102', 25, NOW()),
('Capacity', 'CODE103', 20, NOW()),
('createdAt' , 'code04', 15, NOW());


-- Insert sample data into Courses table
INSERT INTO Courses (CourseName, CourseCode, CourseCapacity, createdAt) VALUES
('Introduction to Computer Science', 'CS101', 30, NOW()),
('Data Structures', 'CS102', 25, NOW()),
('Database Systems', 'CS103', 20, NOW()),
('Software Engineering', 'CS104', 35, NOW());
```

## Environment Variables
Create a `.env` file in the root directory and add your environment variables:

```env
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASS=your-database-password
DB_NAME=your-database-name
```

## Explanation of Key Files

### `app.js`
This is the main entry point of the application. It sets up the Express server, middleware, database connection, and routes.

### `studentRoutes.js`
This file defines the routes for handling student-related actions such as registration, login, viewing courses, adding courses, and removing courses.

### `views`
This directory contains the EJS templates for rendering the HTML pages. Key files include:
- `courses.ejs`
- `dashboard.ejs`
- `frontpage.ejs`
- `login.ejs`
- `register.ejs`

### `dashboard.css`
This file contains the CSS styles for the dashboard page.

## Conclusion
This project provides a comprehensive solution for managing student registrations in a university setting. By following the instructions in this README, you should be able to set up and run the application successfully.
```

