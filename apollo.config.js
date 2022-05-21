module.exports = {
  client: {
    includes: ["./src/graphql/queries/**"],
    service: {
      name: "amiibo",
      url: "http://localhost:3000/api/graphql",
    },
  },
};
