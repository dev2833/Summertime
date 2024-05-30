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

  const result = await db.query(
    `INSERT INTO travel 
    (DepartureDate, BookingNumber, TO_Name, FlightNumber, FlightDepTime, PickUpTime, PickupDate, Hotel, PickupPoint, ServiceType, FlyFrom, FlyTo, Language) 
    VALUES 
    (STR_TO_DATE('${travel.DepartureDate}', '%d-%b-%y'), ${travel.BookingNumber}, '${travel.TO_Name}', '${travel.FlightNumber}', '${travel.FlightDepTime}', '${travel.PickUpTime}', STR_TO_DATE('${travel.PickupDate}', '%d-%b-%y'), '${travel.Hotel}', '${travel.PickupPoint}', '${travel.ServiceType}', '${travel.FlyFrom}', '${travel.FlyTo}', '${travel.Language}')
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

  if (result.affectedRows) {
    return { err, result };
  }

  err = "Error in updating data";
  return { err, result };
}

async function update(id, travel) {
  const result = await db.query(
    `UPDATE data 
    SET name="${travel.name}", released_year=${travel.released_year}, githut_rank=${travel.githut_rank}, 
    pypl_rank=${travel.pypl_rank}, tiobe_rank=${travel.tiobe_rank} 
    WHERE id=${id}`
  );

  let message = "Error in updating data";

  if (result.affectedRows) {
    message = "data updated successfully";
  }

  return { message };
}

async function remove(req) {
  const departureDate = req.body.DepartureDate;
  const bookingNumber = req.body.BookingNumber;
  let result;
  let message = "Error in deleting data";

  if (departureDate) {
    result = await db.query(
      `DELETE FROM travel WHERE DepartureDate >= STR_TO_DATE(?, '%d-%b-%y')`,
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

async function search(id) {
  const rows = await db.callSpSearch(id);
  const data = "";

  return {
    data
  };
}

module.exports = {
  getBookings,
  create,
  update,
  remove,
  search
};
