var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = new Schema({


   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   comment:{
      type: String
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



module.exports = mongoose.model('Comment', Comment);
