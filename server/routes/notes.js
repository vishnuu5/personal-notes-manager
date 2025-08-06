const router = require("express").Router();
const Note = require("../models/Note");
const { protect } = require("../middleware/auth");

router.get("/", protect, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", protect, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = new Note({
      userId: req.user.id,
      title,
      content,
    });

    const note = await newNote.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", protect, async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.userId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this note" });
    }

    note.title = title || note.title;
    note.content = content || note.content;

    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.userId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this note" });
    }

    await Note.deleteOne({ _id: req.params.id });
    res.json({ message: "Note removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
