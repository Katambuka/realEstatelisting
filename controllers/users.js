const mongodb = require('../data/database');
const ObjectId  = require('mongodb').ObjectId;

const getAll = async (req, res) => {
   //#swagger.tags =['Users]
  try {
    const result = await mongodb.getDatabase().db('').collection('listings').find().toArray();
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSingle = async (req, res) => {
   //#swagger.tags =['Users]
  try {
    const listingId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('listings').findOne({ _id: listingId });
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Listing not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createListing = async (req, res) => {
   //#swagger.tags =['Users]
  const listing = {
    title: req.body.title,
    location: req.body.location,
    price: req.body.price,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    area: req.body.area,
  };

  try {
    const response = await mongodb.getDatabase().db().collection('listings').insertOne(listing);
    if (response.acknowledged > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred during listing creation.');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateListing = async (req, res) => {
   //#swagger.tags =['Users]
  const listingId = new ObjectId(req.params.id);
  const listing = {
    title: req.body.title,
    location: req.body.location,
    price: req.body.price,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    area: req.body.area,
  };

  try {
    const response = await mongodb.getDatabase().db().collection('listings').replaceOne({ _id: listingId }, listing);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred during listing update.');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteListing = async (req, res) => {
   //#swagger.tags =['Users]
  const listingId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDatabase().db().collection('listings').deleteOne({ _id: listingId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred during listing deletion.');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}; 

module.exports = {
  getAll,
  getSingle,
  createListing,
  updateListing,
  deleteListing
};
