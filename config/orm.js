
// Here is the O.R.M. where you write functions that takes inputs and conditions
// and turns them into database commands like SQL.

var connection = require("./connection.js");

function questionMarks(len) {
  let query = [];
  for (let i = 0; i < len; i++) {
    query.push("?");
  }
  return query.toString();
}

function convertToSql(obj) {
  let query = [];

  for (let key in obj) {
    query.push(key + "=" + obj[key]);
  }

  return query.toString();
}

var orm = {
  all: function(table, cb) {
    var queryString = "SELECT * FROM " + table + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // vals is an array of values that we want to save to cols
  // cols are the columns we want to insert the values into
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") " + "VALUES (" + questionMarks(vals.length) + ")";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // objColVals would be the columns and values that you want to update
  // an example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table + " SET " + convertToSql(objColVals) + " WHERE " + condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;
