/**
 * emp cntrl
 * @author vinod khetade on 13/03/2020..
 */

const Emp = require('../models/emp.model.js');
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
				console.log(err,result);
			});
			// Emp.insertMany(user)  
			// .then((result) => {
			// 		callback(null,true)
			// })
			// .catch(err => {
			// 	callback(err)
			// });
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
		console.log(results);
	  });
}


exports.emps = (req, res) => {
	if (!req.body){
		return res.status(400).send({
			            message:  "Emp id missing."
			        });
	}
	var myMatch={}
	if (req.body.name) {
        var pattern = req.body.name
        myMatch['$or'] = [{ 'name': { "$regex": pattern, $options: "i" } }]
	  }
	  
	  if (req.body.start_value && req.body.end_value) {
		var value_range = {
		  $gte: req.body.start_value,
		  $lte: req.body.end_value
		}
		myMatch["salary"] = value_range
	
	  } else if (req.body.start_value) {
		var value_range = {
		  $gte: req.body.start_value
		}
		myMatch["salary"] = value_range
	  } else if (req.body.end_value) {
		var value_range = {
		  $lte: req.body.end_value
		}
		myMatch["salary"] = value_range
	  }
	var pipeline = [
        {
            "$match": myMatch
        }
       
    ]
	Emp.aggregate(pipeline)
		.then(empList => {
			res.send(empList);
		}).catch(err => {
			res.status(500).send({
				message: err.message
			});
		});
};

exports.updateEmp = (req, res) => {
	if (!req.body.productId){
		return res.status(400).send({
			            message:  "productId id missing."
			        });
	}
    Prod.findOneAndUpdate({productId:req.body.productId},req.body, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "dept data not found with id " + req.body.productId
            });
        }
        res.send(note);
    }).catch(err => {
     
        return res.status(500).send({
            message: "Error updating product data with id " 
        });``
    });
};

