const Publication = require('../models/publication');
const User = require('../models/user');
const Comment = require('../models/comments');


/**
 * 
getAll
 */
exports.getAll = (req, res, next) => {
	Publication.find().populate('comments').then(publications => {
		res.send(publications);
	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	})
}


/**
 * 
 * create publication
 */
exports.create = (req, res, next) => {

	var publication = new Publication(req.body);
	publication.save().then(data => {
		return res.status(201).json({ success: true, msg: 'Successful created new Publication', publication: data });  //creation successfull
	}).catch(err => {
		console.log(err)
		return res.status(403).json({ err: err });
	});

}




/*
Delete Publication
*/
exports.deletePublication = (req, res, next) => {
	Publication.deleteOne({ _id: req.params.id, user_id:req.params.user_id}).then(
		() => {

			res.status(201).json({
				message: 'Publication Deleted !'
			});
		}
	).catch(
		(error) => {
			res.status(400).json({
				error: error
			});
		}
	);
}

/*
 Get Publication by Id
  */
 exports.getPublication = (req, res, next) => {
	Publication.findById(req.params.id).populate('user_id').populate({
        path: 'comments',
        model: 'Comment',
        populate: { path: 'user_id' }
      }).then(publication => {
        res.send(publication);

	}).catch(err => {
		console.log('ERROR', err)
		res.status(401).json({
			error: err
		});
	});
}


/** 
 * add Comment
 * 
*/
exports.addComment = (req, res, next) => {
    console.log(req.body);
    Publication.findById(req.params.id).populate('user_id').populate({
        path: 'comments',
        model: 'Comment',
        populate: { path: 'user_id' }
      }).then(publication => {
      const commentaire = new Comment({
        account_id: req.body.account_id,
        content: req.body.content,
        created_at: Date.now()
      });
      commentaire.save().then((resComment) => {
        publication.comments.push(resComment._id);
        Publication.updateOne({ _id: publication._id }, publication).then((newpublication) => {
          res.status(202).json({ newpublication });
        });
      })
  
  
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });
  }


  /*
get Publication by user ID
*/

exports.getPublicationByUserId = (req, res, next) => {
    Publication.find({ account_id: req.params.id }).populate('user_id').populate({
      path: 'comments',
      model: 'Comment',
      populate: { path: 'account_id' }
    }).then(publication => {
      res.send(publication).status(200);
    }).catch(err => {
      console.log('ERROR', err)
      res.status(401).json({
        error: err
      });
    });
  }


  
/*Delete Comment by Id Comment */
exports.deleteComment = (req, res, next) => {

    Publication.findByIdAndUpdate(
      req.params.id, { $pull: { "comments": req.body.comment_id } }, { safe: true, upsert: true },
      function (err, publication) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(publication.comments);
      });
  
  
  }