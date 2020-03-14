/**
 * emp routes
 * @author vinod khetade on 13/03/2020.
 */
module.exports = function(app) {
var emp = require('../controllers/emp.controller.js')
	app.get('/api/emp/init', emp.init);
	app.post('/api/emp/findEmp', emp.emps);
	app.post('/api/emp/searchName',emp.searchName);
}