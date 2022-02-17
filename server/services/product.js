const connection = require('../database');
const mongodb = require('mongodb');

const product = {
  list: async () => await connection.db.collection('products').find({}).toArray(),

  getOne: async id => await connection.db.collection('products').find({_id: new mongodb.ObjectId(id)}).toArray(),

  create: async data => await connection.db.collection('products').insertOne(data),

  replace: async (id, data) => await connection.db.collection('products').replaceOne({_id: new mongodb.ObjectId(id)}, data),

  edit: async (id, data) => await connection.db.collection('products').findOneAndUpdate({_id: new mongodb.ObjectId(id)}, {$set: data}, {returnDocument: "after"}),

  destroy: async id => await connection.db.collection('products').deleteOne({_id: new mongodb.ObjectId(id)}),
};

module.exports = product;