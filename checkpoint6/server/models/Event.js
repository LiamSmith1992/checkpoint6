import { Schema } from "mongoose";


export const EventSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  name: { type: String, required: true, maxLength: 30 },
  description: { type: String, required: true, },
  coverImg: { type: String, required: true, maxLength: 250 },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital'] }
}, { timestamps: true, toJSON: { virtuals: true } })



EventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})