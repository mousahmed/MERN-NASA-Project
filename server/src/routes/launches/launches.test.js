const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
	test("It should respond with 200", async () => {
		const response = await request(app)
			.get("/launches")
			.expect("Content-Type", /json/)
			.expect(200);
	});
});

describe("Test POST /launches", () => {
	const completeLaunchData = {
		mission: "NCS5000",
		rocket: "NCS Rocket R34",
		launchDate: "January 17, 2030",
		target: "kepler-5 my budda",
	};

	const launchDataWithInvalidDate = {
		mission: "NCS5000",
		rocket: "NCS Rocket R34",
		launchDate: "invalid",
		target: "kepler-5 my budda",
	};
	test("It should respond with 201 created", async () => {
		const response = await request(app)
			.post("/launches")
			.send(completeLaunchData)
			.expect("Content-Type", /json/)
			.expect(201);

		const requestDate = new Date(completeLaunchData.launchDate).valueOf();
		const responseDate = new Date(response.body.launchDate).valueOf();

		expect(requestDate).toBe(responseDate);
	});

	test("It should catch missing required launch property", async () => {
		const response = await request(app)
			.post("/launches")
			.expect("Content-Type", /json/)
			.expect(400);

		expect(response.body).toStrictEqual({
			error: "Missing required launch property",
		});
	});

	test("It should catch invalid dates", async () => {
		const response = await request(app)
			.post("/launches")
			.send(launchDataWithInvalidDate)
			.expect("Content-Type", /json/)
			.expect(400);

		expect(response.body).toStrictEqual({
			error: "Invalid launch date",
		});
	});
});
