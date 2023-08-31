const beaches = require("../data/beaches-data");

// Validation middleware
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (beaches[propertyName]) {
      next();
    }
    next({
      status: 400,
      message: `Must include a '${propertyName}' property`,
    });
  };
}

function beachExists(req, res, next) {
  const beach = res.locals.beach
  const foundBeach = beaches.find((beach) => beach.id === Number(beachId));
  if (foundBeach) {
    res.locals.beach = foundBeach
    return next();
  } else {
    return next({
      status: 400,
      message: `Beach ID not found: ${beachId}`,
    });
  }
}

function validateNumber(fieldName, errorMessage) {
  return (req, res, next) => {
    const value = req.body.data[fieldName];

    if (value <= 0 || !Number.isInteger(value)) {
      return next({
        status: 400,
        message: errorMessage,
      });
    }

    next();
  };
}

const expirationValidator = validateNumber(
  "expiration",
  "Expiration requires a valid number"
);

const areaCodeValidator = validateNumber(
  "areaCode",
  "Area code requires a valid number"
);


// C.R.U.D --> (list), create, read, update, delete


function list(req, res) {
  res.json({ data: beaches });
}

// Variable to hold the next ID
// Because some IDs may already be used, find the largest ID assigned
let lastBeachId = beaches.reduce(
  (maxId, beach) => Math.max(maxId, beach.id),
  0
);
// Create
function create(req, res) {
  const { data: { name, area_code, county, expiration, text } = {} } = req.body;
  const newBeach = {
    id: ++lastBeachId,
    name,
    area_code,
    county,
    expiration,
    text,
  };
  beaches.push(newBeach);
  res.status(201).json({ data: newBeach });
}

// Read
function read(req, res) {
  res.status(200).json({ data: res.locals.beach });
}

// Update
function update(req, res) {
  const beach = res.locals.beach
  const { data: { name, area_code, county, expiration, text } = {} } = req.body;

  beach.name = name;
  beach.area_code = area_code;
  beach.county = county;
  beach.expiration = expiration;
  beach.text = text;

  res.json({ data: beach });
}

// Delete
function destroy(req, res) {
  const { beachId } = req.params
  const index = beaches.findIndex((beach) => beach.id === Number(beachId));
  const deletedBeach = beaches.splice(index, 1);
  res.sendStatus(204);
}

module.exports = {
  create: [
    bodyDataHas("name"),
    bodyDataHas("area_code"),
    bodyDataHas("county"),
    bodyDataHas("expiration"),
    bodyDataHas("text"),
    expirationValidator,
    areaCodeValidator,
    create,
  ],
  read: [beachExists, read],
  update: [
    bodyDataHas("name"),
    bodyDataHas("area_code"),
    bodyDataHas("county"),
    bodyDataHas("expiration"),
    bodyDataHas("text"),
    beachExists,
    expirationValidator,
    areaCodeValidator,
    update,
  ],
  delete: [beachExists, destroy],
  list,
};
