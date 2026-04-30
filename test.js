const path = require("path")

const file = require(path.join(__dirname, "utils", "ratelimit.js"))

console.log("Loaded:", file)