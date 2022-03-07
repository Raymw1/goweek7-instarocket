const routes = require("express").Router();
const uploadConfig = require("./config/upload");
const upload = require("multer")(uploadConfig);

const controllers = require("./app/controllers");

routes.get("/posts", controllers.PostController.index);
routes.post(
  "/posts",
  (req, res) => console.log(req),
  upload.single("image"),
  controllers.PostController.store
);
routes.post("/posts/:id/like", controllers.LikeController.store);

module.exports = routes;
