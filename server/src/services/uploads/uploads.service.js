// Initializes the `uploads` service on path `/uploads`
// const createService = require('feathers-mongoose');
// const createModel = require('../../models/uploads.model');
const hooks = require('./uploads.hooks');

// feathers blob service
  // It only accepts and retrieves files encoded as dataURI strings.
  // so you can only POST uri strings
  const blobService = require('feathers-blob');
  // Here we initialize a FileSystem storage,
  // but you can use feathers-blob with any other
  // storage service like AWS or Google Drive.
  const fs = require('fs-blob-store');

  // File storage location. Folder must be created before upload.
  // Example: './uploads' will be located under feathers app top level.
  const blobStorage = fs('./uploads');
  
  //chunks the files into bits, uploads and rejoins everything on the server
  const multer = require('multer');
  const multipartMiddleware = multer(); 


module.exports = function (app) {
  // const Model = createModel(app);
  // const paginate = app.get('paginate');

  const options = {
    Model: blobStorage,
    // paginate
  };

  // Initialize our service with any options it requires
  app.use(
    '/uploads',
    // multer parses the file named 'uri'.
    // Without extra params the data is
    // temporarely kept in memory
    multipartMiddleware.single('uri'),

    // another middleware, this time to
    // transfer the received file to feathers
    (req, res, next) => {
      req.feathers.file = req.file;
      next();
    },
    blobService(options)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.hooks(hooks);
};
