import redis from "redis";

const client = redis.createClient({
  port: "6379",
  host: "127.0.0.1",
});

client.on("connect", (err) => {
  console.log("client is connected to redis...");
});

client.on("ready", (err) => {
  console.log("client is ready to use...");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", (err) => {
  console.log("Client disconnected from redis");
});

export default client;
