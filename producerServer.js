const express = require("express");
const app = express();
const { produceMessage } = require("./library/Kafka");

const clientId = process.env.CLIENT_ID;
const kafkaBroker = process.env.KAFKA_BROKER;
const topic = process.env.TOPIC;

const randomObject = {};
let intervalTimer;

const randomValues = () => {
	return Math.floor(Math.random() * 100) + 1;
};

const messageProduced = async () => {
	for (let i = 1; i <= 10; i++) {
		const key = i.toString().padStart(2, "0");
		randomObject[key] = randomValues();
	}
	console.log(randomObject);
	await produceMessage(clientId, kafkaBroker, topic, randomObject);
};

intervalTimer = setInterval(function () {
	messageProduced();
}, 5000);

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
