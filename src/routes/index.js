import {Router} from "express";
import authRouter from "./authRoute";
import userRoute from "./userRoute";
import participantRoute from "./participantRoute";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRoute);
apiRouter.use("/participant", participantRoute);

export default apiRouter;
