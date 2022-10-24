const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const startServer = async () => {
	const app = express();
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app: app, path: '/gq' });
	app.use((req, res) => {
		res.send('Hello from express apollo server');
	});
	dotenv.config();
	await mongoose
		.connect(process.env.MONGO_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		.then(() => console.log('DB connection Successful!'))
		.catch((err) => {
			console.log(err);
		});

	app.listen(4000, () => console.log('server is running on 4000'));
};
startServer();
