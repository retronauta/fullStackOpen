const express = require("express")
const router = express.Router()

const configs = require("../util/config")
const { setAsync, getAsync } = require("../redis")

let visits = 0

/* GET index data. */
router.get("/", async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits,
  })
})

router.get("/statistics", async (req, res) => {
  const numberAdded = await getAsync("added_todos")
  res.send({ added_todos: numberAdded })
})

module.exports = router
