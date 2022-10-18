const express = require("express");
const app = express();
const { consumeMessage } = require("./library/Kafka");

const clientId = process.env.CLIENT_ID;
const kafkaBroker = process.env.KAFKA_BROKER;
const topic = process.env.TOPIC;
const groupId = process.env.GROUP_ID;

const messageConsumed = async () => {
	await consumeMessage(clientId, kafkaBroker, topic, groupId);
};

messageConsumed();

const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
