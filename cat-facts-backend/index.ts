import express from "express";
import cors from "cors";
import router from "./router";

const PORT = process.env.PORT || 1337;

const app = express();

app.use(cors());
app.use(router);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
