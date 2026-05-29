const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getOne = async (req, res) => {
  const id = req.params.id.trim();
  
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const productId = new ObjectId(id);
    const result = await mongodb
      .getDb()
      .db('Project1')
      .collection('products')
      .findOne({ _id: productId });

    if (!result) {
      return res.status(404).json({ message: "product not found" });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('Project1').collection('products').find();
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  });
};

const createProduct = async (req, res) => {
  const product = {
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    color: req.body.color,
  };
  const response = await mongodb.getDb().db('Project1').collection('products').insertOne(product);
  if(response.acknowledged) {
    res.status(201).json({ id: response.insertedId });
  } else {
    res.status(500).json(response.error || 'An error occured when uploading the product.');
  }
};

const updateProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const product = {
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    color: req.body.color, 
  };
  const response = await mongodb.getDb().db('Project1').collection('products').replaceOne({_id: productId}, product);
  if(response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured while updating the product.');
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db('Project1')
      .collection('products')
      .deleteOne({ _id: productId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAll,
    getOne,
    createProduct,
    updateProduct,
    deleteProduct
};