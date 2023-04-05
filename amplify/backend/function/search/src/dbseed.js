const mysql = require('mysql')

const con = mysql.createConnection({
    host     : "database-1.cwd3greadrvm.us-east-1.rds.amazonaws.com",
    user     : "admin",
    password : "922962700",
    port     : 3306
  });
console.log("yay");
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM db.LocationList where name Like '%List%'", 
    function (err, result, fields) {
      console.log(result);
      
    });
    con.end();
});