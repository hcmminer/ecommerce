const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, doc) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({ doc });
  });
};

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({ error: "Category dose not exist" });
    }
    req.category = category;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, doc) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    res.json(doc);
  });
};

exports.remove = (req, res) => {
  const category = req.category;
  category.remove((err, doc) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    res.json({ message: "Category deleted" });
  });
};

exports.list = (req, res) => {
  Category.find().exec((err, doc) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    return res.json(doc);
  });
};
