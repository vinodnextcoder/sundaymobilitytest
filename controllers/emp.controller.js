/**
 * emp cntrl
 * @author vinod khetade on 13/03/2020..
 */

var async = require("async");
// insert dummy data to test
exports.init = (req, res) => {
	if (req.body.users) {
		var product = req.body.users
	}
	else {
		var records = [
			[
				 1,
				"Nitin jadhav",
				 "n@gmail.com",
				 10000,
			],
			[
				 2,
				"rahul pawar",
				 "H@gmail.com",
				 1111
			],
			[
				 3,
				"paradip patil",
				 "p@ymail.com",
				 12690
			],
			[
				 4,
				"rambhau jadhav",
				 "pd@ymail.com",
				 8000
			],
			[
				 5,
				"kadam rahul",
				 "k@ymail.com",
				 5678
			],
			[
				 6,
				"priti patil",
				 "pp@yma.com",
				 23000,
			],
			[
				7,
				"satech ramesh",
				 "jm@gmail.com",
				 55908
	
			]
		]
	}
	async.parallel([
		function(callback) {
			var sql = "INSERT INTO emptable (eId,name,email,salary) VALUES ?";
			var query = db.query(sql, [records], function(err, result) {
				if (err)
				{
					callback(err)
				}
				else{
					callback(null,result);
				}
			});
		},
		function(callback) {
			callback(null,true);
		}
	  ],
	  function(err, results) {
		  if (err){
			res.status(400).json({'success': 'Duplicate Document ids error!'});
		  }else
		  {
			  res.status(200).json({'success': 'New Documents Added!'});
		  }
	  });
}

exports.searchName = (req, res) => {
	if (!req.body.startValue && !req.body.endValue) {
		return res.status(400).send({
			message: "start value and end value  missing."
		});
	}
	var str = {
		stringPart: req.body.name
	}
	var queryString = 'SELECT * FROM emptable WHERE salary BETWEEN ' + req.body.startValue + ' AND ' + req.body.endValue
	db.query(queryString, function (err, rows, fields) {
		if (err) throw err;
		var data = [];
		for (i = 0; i < rows.length; i++) {
			data.push(rows[i]);
		}
		if (Array.isArray(data) && data.length > 0) {
			res.send(data);
		}
		else {
			res.send({ "msg": "No data found" });
		}
	});
};

