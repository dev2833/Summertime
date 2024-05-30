const express = require("express");
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const travels = require("../services/travels");

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

/* GET all */
router.get("/", async function (req, res, next) {
  try {
    res.json(await travels.getMultiple());
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});


// Define a route to handle CSV file upload
router.post('/', upload.single('csvfile'), (req, res) => {
  const filePath = path.join(__dirname, '../../', req.file.path);

  // Read and parse the CSV file
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async (row) => {
      // Assuming your CSV columns match your table columns, you can insert/update rows here
      // Adjust the query according to your table structure

      try {
        await travels.create(row);
      } catch (err) {
        console.error(`Error while analyzing CSV`, err.message);
        next(err);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      res.send('CSV file successfully processed');
      // Delete the uploaded file after processing
      fs.unlinkSync(filePath);
    })
    .on('error', (err) => {
      console.error('Error processing CSV file:', err);
      res.status(500).send('Error processing CSV file');
    });
});

// /* POST */
// router.post("/", async function (req, res, next) {
//   try {
//     res.json(await travels.create(req.body));
//   } catch (err) {
//     console.error(`Error while creating data`, err.message);
//     next(err);
//   }
// });

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
