
module.exports = {
    connection: function () {
        const mongoose = require('mongoose');

        mongoose.connect("mongodb://localhost:27017/credex", { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log("mongodb connected"))
            .catch((err) => console.log(err));
    }
}
// const ipl = {
//     teams: 8,
//     winner: "Mumbai Indians"
// }
// module.exports = ipl;
