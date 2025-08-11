import "dotenv/config";
import { app } from "./app";

const port = Number(process.env.PORT) || 5000;
app.listen({ port }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 Server running at ${address}`);
});
