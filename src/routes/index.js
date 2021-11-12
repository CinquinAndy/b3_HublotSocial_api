import {Router} from "express";
import authRouter from "./authRoute";
import userRoute from "./userRoute";
import participantRoute from "./participantRoute";
import conversationRoute from "./conversationRoute";
import messageRoute from "./messageRoute";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRoute);
apiRouter.use("/participant", participantRoute);
apiRouter.use("/conversation", conversationRoute);
apiRouter.use("/message", messageRoute);

export default apiRouter;
