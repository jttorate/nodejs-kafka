const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "nodejs-kafka",
  brokers: ["localhost:29092"], // Matches docker-compose
});

module.exports = kafka;
