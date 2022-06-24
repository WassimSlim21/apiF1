var express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const publicationCtl = require('../controllers/publication');


console.log('adding file')
/* Post publication*/
router.post('/add', publicationCtl.create);
/* Get ALL File*/
router.get('/' , publicationCtl.getAll);
/* Get File By  ID*/
router.get('/own/:id' , publicationCtl.getPublication);
/* Get File By User ID*/
router.get('/:id' , publicationCtl.getPublicationByUserId);

/*
Delete File
*/
router.delete('/:id' , publicationCtl.deletePublication);



/*
Add Comment File
*/
router.post('/comment/:id' , publicationCtl.addComment);  /* params {file_id} body {account_id , content} */
/**Delete File by Id */
router.put('/comment/:id' , publicationCtl.deleteComment);  /* params {file_id} body {comment_id} */


module.exports = router;