const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const analysis = require('./api/parse')
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json())

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})
app.use(express.static(path.resolve(__dirname, './dist')))
app.use('/parse', analysis)

app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, './utils/web-monitor-sdk.js'), 'utf-8')
  res.send(html)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`listen at ${PORT}`);
})