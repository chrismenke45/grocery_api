import mongoose from "mongoose"

const itemShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "???",
  },
  price: {
    type: Number,
    required: true,
    default: NaN,
  },
  image: {
    type: String,
    required: false,
  },
})

const ItemModel = mongoose.model("Item", itemShema)
export { ItemModel }