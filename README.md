# Task Management App (Nest JS + Next JS)
This app has been created with the latest technologies of Nest JS and Next JS. 
It is basic "Task Management App" with the following features:
- User Authentication with JWT
- Route Guards with Next JS Route Guard
- Task CRUD is guarded and Task Create, Update and Delete are guarded for Users with 'Developer' and 'Tester' role.
- Backend Services are guarded with Local Auth Strategy and JWT Strategy
- Interceptors are used to check input and transform output data
- Mongodb is used as the database solution
- Task and User Entities are created with appropriate limitations and default values
- Next JS Route structure (Folder structure of pages folder) is used because it is easier to set and maintain than React Route
- Pages in Frontend
- - Home Page(Guarded), Tasks(Guarded), Create Task(Guarded), Backlog(Guarded), Settings, Profile(Guarded), Auth
- Home Page shows stats of tasks in the app
- Tasks Page shows active tasks (tasks not in backlog), gives functionality of moving tasks forward and backwards
- Create Task Page enables users (with Manager or Admin role) to create new tasks
- Backlog displays tasks in status of "Backlog", gives functionality of deleting task, editing task and moving the task to ready status
- Settings Page enables theme selection
- Profile Page shows loggedIn user info and enables editing profile and changing password
- Auth Page enables users to register and login

## Initial Setup
To run the app properly, please follow the steps:

- Clone project to local environment
```bash
git clone https://github.com/zeynalalakus/nest-react-app.git
```
- Open the project in an IDE and run frontend and backed npm install
```bash
cd frontend
npm install
cd ..
cd backend
npm install
```
- Connect to the database. Copy your MongoDB connection URL.
- Open backend/src/app.module.ts file and assing connection URL to mongoDbConnectionUrl variable
- Run the backend and frontend app
```bash
cd frontend
npm run dev
cd ..
cd backend
npm run start:dev
```
- Go to http://localhost:3000
