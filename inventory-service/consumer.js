const kafka = require("../kafka");

const consumer = kafka.consumer({ groupId: "inventory-group" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "order.created", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const order = JSON.parse(message.value.toString());
      console.log(`Inventory Service: checking stock for order ${order.id}`);
      // fake stock check
      if (order.quantity > 10) {
        console.log(`Order ${order.id} exceeds stock!`);
      } else {
        console.log(`Order ${order.id} inventory updated`);
      }
    },
  });
}

run().catch(console.error);
