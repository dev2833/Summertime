const express = require("express");
const cron = require('node-cron');
const app = express();
const port = 8080;
const travelsRouter = require("./routes/travels");
const travelService = require("./services/travels");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/api/booking", travelsRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Schedule the cleanDatabase method to run once a day
cron.schedule('0 0 * * *', async () => {
  try {
    await travelService.cleanDatabase();
  } catch (err) {
    console.error('Error:', err);
  }
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
