
const { createConnection } = require('typeorm');
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
// Load env vars
dotenv.config({ path: './config/config.env' });

const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
// const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
// const connectDB = require('./config/db');
// const pool = require("./db")


// Entity
import { Client } from './models/Client';
import { Banker } from './models/Banker';
import { Transaction } from './models/Transaction';
import { User } from './models/User';


// Route
const company = require('./routes/company');
const auth = require('./routes/auth');
const usersRouter = require('./routes/users')
const examplesRouter = require('./routes/examples')


const app = express();

const main = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: "postgres",
			password: 'password',
			database: 'typeorm',
			entities: [Client, Banker, Transaction, User],
			synchronize: true,
		});
		console.log('Connected to Postgres');


		// Body parser
		app.use(express.json());

		// Cookie parser
		app.use(cookieParser());

		// Dev logging middleware
		if (process.env.NODE_ENV === 'development') {
		  app.use(morgan('dev'));
		}

		// File uploading
		app.use(fileupload());

		// Set security headers
		app.use(helmet());

		// Prevent XSS attacks
		app.use(xss());

		// Rate limiting
		const limiter = rateLimit({
		  windowMs: 10 * 60 * 1000, // 10 mins
		  max: 100
		});
		app.use(limiter);

		// Prevent http param pollution
		app.use(hpp());

		// Enable CORS
		app.use(cors());

		// // Mount routers
		// app.use('/api/v1/company', company);
		// app.use('/api/v1/auth', auth);
		app.use('/api/v1/examples', examplesRouter);
		app.use('/api/v1/users', usersRouter);
		// app.use('/api/v1/courses', courses);
		// app.use('/api/v1/reviews', reviews);

		app.use(errorHandler);

		const PORT = process.env.PORT || 5000;

		const server = app.listen(
		PORT,
		console.log(
			// @ts-ignore
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
		)
		);

		// Handle unhandled promise rejections
		process.on('unhandledRejection', (err, promise) => {
			// @ts-ignore
			console.log(`Error unhandledRejection: ${err.message}`.red);
		// Close server & exit process
		// server.close(() => process.exit(1));
		});

		// Handle uncaught exception
		process.on('uncaughtException', (err) => {
			// @ts-ignore
			console.log(`Error uncaughtException: ${err.message}`.red);
		})
	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};


main();

