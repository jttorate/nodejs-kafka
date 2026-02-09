const kafka = require("../kafka");

const consumer = kafka.consumer({ groupId: "email-group" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "order.created", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        key: message.key?.toString(),
        value: message.value.toString(),
        offset: message.offset,
      });
    },
  });
}

run().catch(console.error);
