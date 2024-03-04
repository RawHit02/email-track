const express = require('express');
const EmailSequence = require('../models/EmailSequence');
const router = express.Router();

// POST: Create a new email sequence
router.post('/', async (req, res) => {
    const sequence = new EmailSequence({
        name: req.body.name,
        nodes: req.body.nodes,
    });

    try {
        await sequence.save();
        res.status(201).send(sequence);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET: List all email sequences
router.get('/', async (req, res) => {
    try {
        const sequences = await EmailSequence.find({});
        res.status(200).send(sequences);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET: Retrieve a single email sequence by ID
router.get('/:id', async (req, res) => {
    try {
        const sequence = await EmailSequence.findById(req.params.id);
        if (!sequence) {
            return res.status(404).send();
        }
        res.status(200).send(sequence);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT: Update an email sequence by ID
router.put('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'nodes']; // Specify allowed fields for updates
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const sequence = await EmailSequence.findById(req.params.id);

        if (!sequence) {
            return res.status(404).send();
        }

        updates.forEach((update) => sequence[update] = req.body[update]);
        await sequence.save();
        res.send(sequence);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE: Delete an email sequence by ID
router.delete('/:id', async (req, res) => {
    try {
        const sequence = await EmailSequence.findByIdAndDelete(req.params.id);

        if (!sequence) {
            return res.status(404).send();
        }

        res.send(sequence);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
