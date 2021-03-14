const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/studentsapi", {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify:false
}).then(function () {
	console.log("connection is successful.");
}).catch(function (e) {
	console.log("No connection");
});  