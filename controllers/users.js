const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const sendErrorResponse = (res, statusCode, message) =>
  res.status(statusCode).json({ error: message });

const getAll = async (req, res) => {
  //#swagger.tags = ['Listings']
  try {
    const result = await mongodb.getDatabase().db().collection('listings').find().toArray();
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    sendErrorResponse(res, 500, 'Internal Server Error');
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Listings']
  const listingId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDatabase().db().collection('listings').findOne({ _id: listingId });
    if (result) {
      res.json(result);
    } else {
      sendErrorResponse(res, 404, 'Listing not found');
    }
  } catch (error) {
    console.error('Error:', error);
    sendErrorResponse(res, 500, 'Internal Server Error');
  }
};

const createListing = async (req, res) => {
  //#swagger.tags = ['Listings']
  const { title, location, price, bedrooms, bathrooms, area } = req.body;
  if (!title || !location || !price || !bedrooms || !bathrooms || !area) {
    return sendErrorResponse(res, 400, 'Missing required fields');
  }

  const listing = { title, location, price, bedrooms, bathrooms, area };

  try {
    const response = await mongodb.getDatabase().db().collection('listings').insertOne(listing);
    if (response.acknowledged > 0) {
      res.status(204).send();
    } else {
      sendErrorResponse(res, 500, response.error || 'Some error occurred during listing creation.');
    }
  } catch (error) {
    console.error('Error:', error);
    sendErrorResponse(res, 500, 'Internal Server Error');
  }
};

const updateListing = async (req, res) => {
  //#swagger.tags = ['Listings']
  const listingId = new ObjectId(req.params.id);
  const { title, location, price, bedrooms, bathrooms, area } = req.body;
  if (!title || !location || !price || !bedrooms || !bathrooms || !area) {
    return sendErrorResponse(res, 400, 'Missing required fields');
  }

  const updatedListing = { title, location, price, bedrooms, bathrooms, area };

  try {
    const response = await mongodb.getDatabase().db().collection('listings').replaceOne({ _id: listingId }, updatedListing);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      sendErrorResponse(res, 500, response.error || 'Some error occurred during listing update.');
    }
  } catch (error) {
    console.error('Error:', error);
    sendErrorResponse(res, 500, 'Internal Server Error');
  }
};

const deleteListing = async (req, res) => {
  //#swagger.tags = ['Listings']
  const listingId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDatabase().db().collection('listings').deleteOne({ _id: listingId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      sendErrorResponse(res, 500, response.error || 'Some error occurred during listing deletion.');
    }
  } catch (error) {
    console.error('Error:', error);
    sendErrorResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = {
  getAll,
  getSingle,
  createListing,
  updateListing,
  deleteListing
};
