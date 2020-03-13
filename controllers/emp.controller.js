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
		var user = [
			{
				eId: "1",
				name: "Nitin jadhav",
				email: "n@gmail.com",
				salary: 10000,
			},
			{
				eId: "2",
				name: "rahul pawar",
				email: "H@gmail.com",
				salary: 1111
			},
			{
				eId: "3",
				name: "paradip patil",
				email: "p@ymail.com",
				salary: 12690
			},
			{
				eId: "4",
				name: "rambhau jadhav",
				email: "pd@ymail.com",
				salary: 8000
			},
			{
				eId: "5",
				name: "kadam rahul",
				email: "k@ymail.com",
				salary: 5678
			},
			{
				eId: "6",
				name: "priti patil",
				email: "pp@yma.com",
				salary: 23000,
			},
			{
				eId: "7",
				name: "satech ramesh",
				email: "jm@gmail.com",
				salary: 55908
	
			}
		]
	}
	async.parallel([
		function(callback) {
			Emp.insertMany(user)  
			.then((result) => {
					callback(null,true)
			})
			.catch(err => {
				callback(err)
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

