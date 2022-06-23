let { format } = require("timeago.js");

let helpers = {};

helpers.haceCuanto = (timestamp) => {
  return format(timestamp);
};

module.exports = helpers;
