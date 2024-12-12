import app from "./app";
import { AppDataSource } from "./dataBase/configuration/AppDataSource";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    await AppDataSource.initialize();
    console.log(`Server starts on http://localhost:${PORT}`);
})