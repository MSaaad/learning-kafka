const { Kafka } = require("kafkajs");

const produceMessage = async (clientId, broker, topic, dataArray) => {
	try {
		const kafka = new Kafka({
			clientId: clientId,
			brokers: [broker],
		});

		const producer = kafka.producer();
		await producer.connect();

		await producer.send({
			topic: topic,
			messages: [{ value: JSON.stringify(dataArray) }],
		});
	} catch (error) {
		console.log(error);
	}
};

const consumeMessage = async (clientId, broker, groupId, topic) => {
	const kafka = new Kafka({
		clientId: clientId,
		brokers: [broker],
	});
	const consumer = kafka.consumer({ groupId: groupId });

	// Consuming
	await consumer.connect();
	await consumer.subscribe({ topic: topic, fromBeginning: true });

	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			console.log({
				topic,
				partition,
				offset: message.offset,
				value: JSON.parse(message.value.toString()),
			});
		},
	});
};

module.exports = { produceMessage, consumeMessage };
