var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Publication = new Schema({


   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   rapport_page:{
      type: String
   },
   rapport_name:{
      type: String
   },
   content: {
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
   },
   comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default:null
      }
    ],
    likes: [
       {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Like",
         default:null

       }
     ],
   dislikes: [
      {
      type: mongoose.Schema.Types.ObjectId,
          ref: "DisLike",
          default:null

        }
      ],
    
});



module.exports = mongoose.model('Publication', Publication);
