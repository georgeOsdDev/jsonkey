if (typeof window !== "undefined") {
  window.JSONKey = require("./lib/jsonkey");
} else {
  module.exports = require("./lib/jsonkey");
}