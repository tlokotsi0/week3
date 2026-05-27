const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getOne = async (req, res) => {
  const id = req.params.id.trim();
  
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const userId = new ObjectId(id);
    const result = await mongodb
      .getDb()
      .db('Project1')
      .collection('users2')
      .findOne({ _id: userId });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('Project1').collection('users2').find();
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  });
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
    maritalStatus: req.body.maritalStatus,
    numberOfChildren: req.body.numberOfChildren
  };
  const response = await mongodb.getDb().db('Project1').collection('users2').insertOne(user);
  if(response.acknowledged) {
    res.status(201).json({ id: response.insertedId });
  } else {
    res.status(500).json(response.error || 'An error occured when uploading the user.');
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
    maritalStatus: req.body.maritalStatus,
    numberOfChildren: req.body.numberOfChildren 
  };
  const response = await mongodb.getDb().db('Project1').collection('users2').replaceOne({_id: userId}, user);
  if(response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured while updating the user.');
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db('Project1')
      .collection('users2')
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAll,
    getOne,
    createUser,
    updateUser,
    deleteUser
};