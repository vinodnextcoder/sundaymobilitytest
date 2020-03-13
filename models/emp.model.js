/**
 * emp
 * @author vinod khetade on 13/03/2020..
 */
const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const EmpSchema = mongoose.Schema({
    eId: { type: String, index:true,unique : true },
    name: { type: String, index:true },
    email: { type: String, index:true,unique : true  },
    salary: Number
});

module.exports = mongoose.model('Emp', EmpSchema);
