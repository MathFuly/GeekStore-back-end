import cors from "cors";
import express from "express";

import { staffRoute } from "./infrastructure/routes/staffRoute";
import { categoryRoute } from "./infrastructure/routes/categoryRoute";
import { dropRoute } from "./infrastructure/routes/dropRoute";
import { themeRoute } from "./infrastructure/routes/themeRoute";
import { productRoute } from "./infrastructure/routes/productRoute";
import { invetoryRoute } from "./infrastructure/routes/invetoryRoute";
import { kartRoute } from "./infrastructure/routes/kartRoute";
import { userRoute } from "./infrastructure/routes/userRoute";
import { saleRoute } from "./infrastructure/routes/saleRoute";

export const app = express();

app.use(cors({ credentials: true }));

app.use(express.json());
app.use(staffRoute);
app.use(categoryRoute);
app.use(dropRoute);
app.use(themeRoute);
app.use(productRoute);
app.use(invetoryRoute);
app.use(userRoute);
app.use(kartRoute);
app.use(saleRoute);
