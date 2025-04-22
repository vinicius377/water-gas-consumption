import Fastify from "fastify"

const server = Fastify({
  logger: true
})

server.get("/", () => {
  return "helloworld"
})

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})


