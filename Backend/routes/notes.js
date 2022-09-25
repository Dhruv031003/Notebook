const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
var fetchuser = require('../middleware/fetchUser')
const Notes = require('../mongoModels/Notes')

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured.")
    }
})

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 Characters long.').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await notes.save();
        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error occured.")
    }
})

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find note ot be updated
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json({ note });
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured.")
    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find note ot be updated
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)

        res.json({ "Sucess": "Note has been deleted" });
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured.")
    }
})

module.exports = router;