const db = require("./db");

async function getMultiple() {
  const data = await db.query(
    `SELECT * FROM travel`
  );

  return {
    data,
  };
}

async function create(travel) {
  const result = await db.query(
    `INSERT INTO travel 
    (DepartureDate, BookingNumber, TO_Name, FlightNumber, FlightDepTime, PickUpTime, PickupDate, Hotel, PickupPoint, ServiceType, FlyFrom, FlyTo, Language) 
    VALUES 
    (STR_TO_DATE('${travel.DepartureDate}', '%d-%b-%y'), ${travel.BookingNumber}, '${travel.TO_Name}', '${travel.FlightNumber}', '${travel.FlightDepTime}', '${travel.PickUpTime}', STR_TO_DATE('${travel.PickupDate}', '%d-%b-%y'), '${travel.Hotel}', '${travel.PickupPoint}', '${travel.ServiceType}', '${travel.FlyFrom}', '${travel.FlyTo}', '${travel.Language}')`
  );

  let message = "Error in creating data";

  if (result.affectedRows) {
    message = "data created successfully";
  }

  return { message };
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

async function remove(id) {
  const result = await db.query(
    `DELETE FROM data WHERE id=${id}`
  );

  let message = "Error in deleting data";

  if (result.affectedRows) {
    message = "data deleted successfully";
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
  getMultiple,
  create,
  update,
  remove,
  search
};
