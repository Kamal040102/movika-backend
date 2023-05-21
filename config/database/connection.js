const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE_URL).then(() => console.log("Database connected.")).catch((err) => console.log("Database cannot be connected."))