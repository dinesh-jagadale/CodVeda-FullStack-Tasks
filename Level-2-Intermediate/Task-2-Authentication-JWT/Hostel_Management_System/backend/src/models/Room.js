import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({

  roomNumber: {
    type: String,
    required: true
  },

  block: {
    type: String,
    default: "A"
  },

  capacity: {
    type: Number,
    required: true
  },

  occupants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]

}, {
  timestamps: true
});

const Room = mongoose.model("Room", roomSchema);

export default Room;