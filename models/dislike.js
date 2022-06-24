var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DisLike = new Schema({


   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   type:{
      type: String,
      default:"dislike"
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



module.exports = mongoose.model('DisLike', DisLike);
