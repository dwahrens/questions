const path = require('path')
const questionRoutes = require("./question")

const appRouter = (app, fs) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/index.html'))
  })

  questionRoutes(app, fs)
}

module.exports = appRouter