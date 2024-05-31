const db = require("./db");

async function getBookings(BookingNumber = null) {
  let query = `SELECT * FROM travel`;
  if (BookingNumber) {
    query += ` WHERE BookingNumber='${BookingNumber}'`
  }
  const data = await db.query(query);
  let message = 'Feteched bookings successfully!';
  if (data.length == 0) {
    message = 'No bookings exists.'
  }

  return {
    data, message
  };
}

async function create(travel) {

  try {
    const result = await db.query(
      `INSERT INTO travel 
    (DepartureDate, BookingNumber, TO_Name, FlightNumber, FlightDepTime, PickUpTime, PickupDate, Hotel, PickupPoint, ServiceType, FlyFrom, FlyTo, Language) 
    VALUES 
    (STR_TO_DATE('${travel.DepartureDate}', '%d %b %Y'), ${travel.BookingNumber}, '${travel.TO_Name}', '${travel.FlightNumber}', '${travel.FlightDepTime}', '${travel.PickUpTime}', STR_TO_DATE('${travel.PickupDate}', '%d %b %Y'), '${travel.Hotel}', '${travel.PickupPoint}', '${travel.ServiceType}', '${travel.FlyFrom}', '${travel.FlyTo}', '${travel.Language}')
    ON DUPLICATE KEY UPDATE
    DepartureDate = VALUES(DepartureDate),
    TO_Name = VALUES(TO_Name),
    FlightNumber = VALUES(FlightNumber),
    FlightDepTime = VALUES(FlightDepTime),
    PickUpTime = VALUES(PickUpTime),
    PickupDate = VALUES(PickupDate),
    Hotel = VALUES(Hotel),
    PickupPoint = VALUES(PickupPoint),
    ServiceType = VALUES(ServiceType),
    FlyFrom = VALUES(FlyFrom),
    FlyTo = VALUES(FlyTo),
    Language = VALUES(Language)`
    );


    let err = null;

    // Return the updated row
    return { err, result: travel };
  } catch (error) {
    err = "Error in updating data";
    return { err, result: [] };
  }

}

async function remove(req) {
  const departureDate = req.body.DepartureDate;
  const bookingNumber = req.body.BookingNumber;
  let result;
  let message = "Error in deleting data";

  if (departureDate) {
    result = await db.query(
      `DELETE FROM travel WHERE DepartureDate >= STR_TO_DATE(?, '%d %b %Y')`,
      [departureDate]
    );
    message = 'Booking data deleted by DepartureDate successfully'
  }

  if (bookingNumber) {
    result = await db.query(
      `DELETE FROM travel WHERE BookingNumber=${bookingNumber}`
    );
    message = 'Booking data deleted by BookingNumber successfully'
  }

  return { message };
}

async function cleanDatabase() {
  // Calculate the date 5 days ago from today
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  // Convert the date to MySQL DATE format
  const formattedDate = `${fiveDaysAgo.getFullYear()}-${(fiveDaysAgo.getMonth() + 1).toString().padStart(2, '0')}-${fiveDaysAgo.getDate().toString().padStart(2, '0')}`;

  // Delete entries older than 5 days from the DepartureDate
  const result = await db.query(
    `DELETE FROM travel WHERE DepartureDate < ?`,
    [formattedDate]
  );

  if (result) {
    console.log('Number of rows deleted:', result.affectedRows);
  }
  return;
}


module.exports = {
  getBookings,
  create,
  remove,
  cleanDatabase
};
