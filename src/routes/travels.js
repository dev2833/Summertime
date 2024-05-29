const express = require("express");
const router = express.Router();
const travels = require("../services/travels");

/* GET all */
router.get("/", async function (req, res, next) {
  try {
    res.json(await travels.getMultiple());
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

/* POST */
router.post("/", async function (req, res, next) {
  try {
    res.json(await travels.create(req.body));
  } catch (err) {
    console.error(`Error while creating data`, err.message);
    next(err);
  }
});

/* PUT */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await travels.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating data`, err.message);
    next(err);
  }
});

/* DELETE */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await travels.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting data`, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await travels.search(req.params.id));
  } catch (err) {
    console.error(`Error while searching data `, err.message);
    next(err);
  }
});
module.exports = router;
