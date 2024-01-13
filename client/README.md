# MERN Stack MasterQuiz App
## 

This repository contains the source code for a Quiz App developed using the MERN (MongoDB, Express.js, React, Node.js) stack. The project is divided into a backend server and a frontend client.

## Backend Server (Node.js)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/quiz-app.git
    cd quiz-app/server
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure the environment variables:

    Create a `.env` file in the `server` directory and add the following:

    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_uri
    ```

### Usage

Run the server:

    ```bash
    npm start
    ```

The server will be running on `http://localhost:8000`.

### API Endpoints

- Users:
    - Register: `/api/users/register`
    - Login: `/api/users/login`

- Exams:
    - Add Exam: `/api/exams/add`
    - Get All Exams: `/api/exams/get-all-exams`
    - Get Exam by ID: `/api/exams/get-exam-by-id/:examId`
    - Edit Exam by ID: `/api/exams/edit-exam-by-id/:examId`
    - Delete Exam by ID: `/api/exams/delete-exam-by-id/:examId`
    - Add Question to Exam: `/api/exams/add-question-to-exam`
    - Delete Question in Exam: `/api/exams/delete-question-in-exam`
    - Edit Question in Exam: `/api/exams/edit-question-in-exam/:questionId`

- Reports:
    - Add Report: `/api/reports/add-report`
    - Get All Reports: `/api/reports/get-all-reports`
    - Get All Reports by User: `/api/reports/get-all-reports-by-user`

## Frontend Client (React)

### Installation

1. Move to the `client` directory:

    ```bash
    cd ../client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Usage

Run the React app:

    ```bash
    npm start
    ```

The app will be accessible at `http://localhost:3000`.

### Structure

- `apiCalls`:
    - `users.js`
    - `reports.js`
    - `exams.js`

- `components`:
    - `protectRoute.js`
    - `PageTitle.js`
    - `Loader.js`

- `pages`:
    - Admin:
        - `AdminReport.js`
        - `Exams.js`
    - Common:
        - `Home.js`
        - `Login.js`
        - `Register.js`
    - User:
        - `UserReports.js`
        - `WriteExams.js`

- `redux`:
    - `userSlice.js`
    - `store.js`
    - `loaderSlice.js`

## Contributing

Feel free to contribute to this project by creating issues or submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[![GitHub stars](https://img.shields.io/github/stars/your-username/quiz-app.svg?style=flat&logo=github)](https://github.com/MahmoudAliKhider/Online_Quiz-_App)

