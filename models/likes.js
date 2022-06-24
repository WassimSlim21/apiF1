var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Like = new Schema({


   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   type:{
      type: String,
      enum: ['like', 'heart'],
      default: 'like'
   }, 
   created_at: {
      type: Date,
   },
   updated_at: {
      type: Date,
    },
   deleted_at: {
      type: Date
   }
});



module.exports = mongoose.model('Like', Like);
