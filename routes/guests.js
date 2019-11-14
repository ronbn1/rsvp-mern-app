const router = require("express").Router();
const verifyToken = require("./verifyToken");
const { guestValidation } = require("../validation");

//Guest Model
const Guest = require("../model/Guest");

router.get("/", verifyToken, async (req, res) => {
  try {
    const guests = await Guest.find({ user: req.user._id });
    res.json(guests);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { error } = guestValidation(req.body);
  if (error) res.send(error.details[0].message);

  const { name, phone, dietary, isconfirmed } = req.body;
  try {
    const guest = new Guest({
      user: req.user._id,
      name,
      phone,
      dietary,
      isconfirmed
    });
    await guest.save();
    res.json(guest);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).send("Guest not found");
    await Guest.findByIdAndRemove(req.params.id);
    res.send("Guest Removed");
  } catch (err) {
    res.status(500).send("Server Removed");
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { name, phone, dietary, isconfirmed } = req.body;
  const updatedGuest = { name, phone, dietary, isconfirmed };
  try {
    let guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).send("Guest not found");
    guest = await Guest.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedGuest
      },
      { new: true }
    );
    res.send(guest);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
module.exports = router;
