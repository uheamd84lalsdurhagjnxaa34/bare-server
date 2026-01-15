import http from "http";
import { createBareServer } from "@tomphttp/bare-server-node";

const server = http.createServer();
const bare = createBareServer("/");

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) bare.routeRequest(req, res);
  else { res.writeHead(200); res.end("Bare running"); }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head);
});

server.listen(process.env.PORT || 3000, () => console.log("Bare running"));
