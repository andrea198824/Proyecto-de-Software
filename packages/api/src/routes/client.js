
const { Router } = require("express");
const clientsService = requite('../services/clients.js');
const router = Router();
require("dotenv").config();

router.post(
  '/login',
  asyncHandler(clientsService.login),
);

router.post(
  '/logout',
  asyncHandler(clientsService.logout),
);

router.post(
  '/create',
  asyncHandler(clientsService.createUser),
);

router.post(
  '/update',
  asyncHandler(clientsService.updateUser),
);



module.exports = router;
