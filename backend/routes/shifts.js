'use strict';

const express = require('express');
const router = express.Router();

// Dummy data to simulate a database
let shifts = [];

// GET all shifts
router.get('/', (req, res) => {
    res.json(shifts);
});

// POST a new shift
router.post('/', (req, res) => {
    const newShift = {
        id: shifts.length + 1,
        ...req.body
    };
    shifts.push(newShift);
    res.status(201).json(newShift);
});

// PUT to update a shift
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const index = shifts.findIndex(shift => shift.id == id);

    if (index === -1) {
        return res.status(404).json({ message: 'Shift not found' });
    }

    shifts[index] = { id: id, ...req.body };
    res.json(shifts[index]);
});

// DELETE a shift
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = shifts.findIndex(shift => shift.id == id);

    if (index === -1) {
        return res.status(404).json({ message: 'Shift not found' });
    }

    shifts.splice(index, 1);
    res.status(204).end();
});

module.exports = router;