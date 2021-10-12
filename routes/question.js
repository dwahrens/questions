const dataPath = "./data/question.json"
var fs = require('fs').promises


const questionRoutes = (app) => {
  app.get("/questions", async (req, res) => {
    let data = await fs.readFile(dataPath, "utf8")
      .catch(err => { throw new Error(err)})
    console.log(data)
    res.send(JSON.parse(data))
  })
  // Post for creating new questions
  app.post("/questions", async (req, res) => {
    // get the request body
    let data = JSON.parse(req.body)
    // read the questions.json file into the correct object
    let questions = await fs.readFile(dataPath, "utf8")
    questions.push(data)
    await fs.writeFileSync(dataPath, JSON.stringify(questions))
      .then(() => {
        req.send(JSON.parse("{ 'success': true }"))
      })
      .catch(err => { throw new Error(err)})
  })
  // 
  app.patch("/questions", async (req, res) => {
    let data = JSON.parse(req.body)
    let questions = await fs.readFile(dataPath, "utf8")
    questions.splice(data.id, 1)
    questions.push(data.question)
    await fs.writeFileSync(dataPath, JSON.stringify(questions))
      .then(() => {
        req.send(JSON.parse("{ 'success': true }"))
      })
      .catch(err => { throw new Error(err)})
  })
  /*app.get("/lbcf/:id", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) { throw err }
      var id = parseInt(req.params.id)-1
      var lbcf = JSON.parse(data)
      res.send(JSON.stringify(lbcf.chapters[id]))
    })
  })*/
}

module.exports = questionRoutes