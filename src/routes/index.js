import {Router} from "express";
import authRouter from "./authRoute";
import userRoute from "./userRoute";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRoute);

export default apiRouter;
