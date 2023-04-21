import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, //TODO createAt, updateAt
    versionKey: false,
  }
);

UserSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
export default mongoose.model('users', UserSchema);
