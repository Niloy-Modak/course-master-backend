backend/
│
├── package.json
├── .env                # Environment variables (MONGO_URI, JWT_SECRET, PORT, etc.)
├── server.js           # Entry point of the backend
│
├── src/
│   ├── ap/
│   │   └── db.js       # MongoDB connection setup
│   │
│   ├── controllers/    # Logic for handling requests
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   ├── assignmentController.js
│   │   └── quizController.js
│   │
│   ├── routes/         # Express routes
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   ├── assignmentRoutes.js
│   │   └── quizRoutes.js
│   │
│   ├── models/         # Mongoose schemas
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   ├── Assignment.js
│   │   └── Quiz.js
│   │
│   ├── middleware/     # Express middleware
│   │   ├── authMiddleware.js   # JWT auth & role check
│   │   └── errorMiddleware.js  # Global error handling
│   │
│   ├── utils/          # Helper functions
│   │   └── generateToken.js    # JWT generation
│   │
│   └── services/       # Optional: Business logic separated from controllers
│       └── courseService.js
│
└── .gitignore
