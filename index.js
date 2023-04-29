require("dotenv").config()
const app = require("./server/app")
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is live on ${process.env.API_URL}:${PORT}`)
})