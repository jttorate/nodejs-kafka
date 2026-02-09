const express = require("express");
const kafka = require("../kafka");

const app = express();
app.use(express.json());

const producer = kafka.producer();

let i = 0;
app.post("/orders", async (req, res) => {
  const order = req.body;
  i++;

  await producer.connect();
  await producer.send({
    topic: "order.created",
    messages: [{ key: `key-${i}`, value: JSON.stringify(order) }],
  });
  await producer.disconnect();

  res.send({ status: "Order created", order });
});

app.listen(3000, () => console.log("API running on port 3000"));
