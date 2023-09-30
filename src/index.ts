import { app } from "./server/server";

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Server online on port ${port}`));
