import express from 'express'

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.get('/returnName/:name', (req, res) => {
  res.send(req.params.name)
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`)
})