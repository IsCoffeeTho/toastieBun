import { beforeAll, expect, mock, test } from "bun:test";
import toastie from "..";

const mockhost = "127.0.0.1";
const mockport = Math.floor(Math.random() * 9999) + 1000;

const endpoint = `http://${mockhost}:${mockport}`;

var dynamicCounter = 0;

const mockserver = new toastie.server()
	.get("/", (req, res) => {
		res.send("TEST SERVER");
	})
	.get("/test-route", (req, res) => {
		res.send("Success for Test Route");
	})
	.get("/another-test-route", (req, res) => {
		res.send("Success for Test Route again");
	})
	.get("/json-test", (req, res) => {
		res.send({
			test: "json"
		});
	})
	.get("/test-file", (req, res) => {
		res.sendFile(`${__dirname}/../mockserver/test.txt`, () => {
			res.status(404).send("404");
		});
	})
	.get("/missing-file", (req, res) => {
		res.sendFile(`${__dirname}/../mockserver/doesnt-exist.test`, () => {
			res.status(404).send("404");
		});
	})
	.get("/appliance", (req, res) => {
		res.status(418).send("Short and Stout");
	})
	.get("/increment", (req, res) => {
		res.send(`${++dynamicCounter}`);
	})
	.get("/decrement", (req, res) => {
		res.send(`${--dynamicCounter}`);
	})
	.get("*", (req, res) => {
		res.status(404).send("404");
	});

beforeAll(() => {
	mockserver.listen(mockhost, mockport, () => {

	});

	test("Server Hooked?", async () => {
		expect((await fetch(`${endpoint}`)).ok).toBe(true);
	});
});


export {
	mockhost,
	mockport,
	mockserver,
	endpoint
}