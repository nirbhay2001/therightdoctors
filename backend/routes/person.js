const express = require('express');
const Person = require('../models/Person');

const router = express.Router();

// GET /person: Displays a table with a list of people
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// GET /person/:id: Get a person by ID
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    
    if (!person) return res.status(404).send('Person not found');
    
    res.json(person);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


// POST /person: Displays a form to create a single person
router.post('/', async (req, res) => {
  const { name, age, gender, mobileNumber } = req.body;

  try {
    const newPerson = new Person({ name, age, gender, mobileNumber });
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// PUT /person/:id: Edit and update a person
router.put('/:id', async (req, res) => {
  const { name, age, gender, mobileNumber } = req.body;

  try {
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      { name, age, gender, mobileNumber },
      { new: true }
    );

    if (!person) return res.status(404).send('Person not found');
    res.json(person);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE /person/:id: Delete a person
router.delete('/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);

    if (!person) return res.status(404).send('Person not found');
    res.json({ message: 'Person deleted successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
