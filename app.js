const express = require("express");
const tableRouter = require("./routes/table.routes");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/api", tableRouter);

app.listen(PORT, () => console.log(`Server hass been started on PORT ${PORT}`));
