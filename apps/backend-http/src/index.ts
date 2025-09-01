import express from "express";
import { userRouter } from "./routes/user.route";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(process.env.PORT || 3001, () => {
    console.log("HTTP Server running on port 3001");
})
