const express = require("express");
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const travels = require("../services/travels");

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

/* GET */
router.get("/:id?", async function (req, res, next) {
  try {
    console.log("id", req.params.id)
    res.json(await travels.getBookings(req.params.id));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});


// Define a route to handle CSV file upload
router.post('/', upload.single('csvfile'), async (req, res, next) => {
  const filePath = path.join(__dirname, '../../', req.file.path);
  let importedData = [];
  let promises = [];

  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          // Create a promise for each row and store it in the promises array
          const promise = travels.create(row)
            .then(data => {
              if (data) {
                importedData.push(data?.result);
              }
            })
            .catch(err => {
              console.error(`Error while analyzing CSV:`, err.message);
              reject(err);
            });

          promises.push(promise);
        })
        .on('end', () => {
          // Wait for all promises to resolve before proceeding
          Promise.all(promises)
            .then(() => {
              console.log('CSV file successfully processed');
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        })
        .on('error', (err) => {
          console.error('Error processing CSV file:', err);
          reject(err);
        });
    });

    // Delete the uploaded file after processing
    fs.unlinkSync(filePath);

    // Send the response after all rows have been processed
    res.json({ data: importedData, message: 'CSV file successfully processed' });
  } catch (err) {
    console.error('Error processing CSV file:', err);
    res.status(500).send('Error processing CSV file');
  }
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

/* DELETE */
router.delete("/", async function (req, res, next) {
  try {
    res.json(await travels.remove(req));
  } catch (err) {
    console.error(`Error while deleting data`, err.message);
    next(err);
  }
});

// router.get("/:id", async function (req, res, next) {
//   try {
//     res.json(await travels.search(req.params.id));
//   } catch (err) {
//     console.error(`Error while searching data `, err.message);
//     next(err);
//   }
// });
module.exports = router;
