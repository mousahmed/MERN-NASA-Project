const http = require("http");
const app = require("./app");
require("dotenv").config();
const {mongoConnect} = require("./services/mongo");
const {loadPlanetData} = require("./models/planets.model");
const {loadLaunchData} = require("./models/launches.model");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
	await mongoConnect();
	await loadPlanetData();
	await loadLaunchData();
	server.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
}

startServer();
