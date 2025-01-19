import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import routes from "./routes/index.js";

// Express app banate hain
const app = express();

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "X-Requested-With",
        "Accept",
        "Origin",
    ],
    credentials: false,
    preflightContinue: false,
    optionsSuccessStatus: 204,
};


dotenv.config();
app.use(cors(corsOptions));
app.use(express.json());

// Port define karte hain
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Ek basic route
app.get('/', (req, res) => {
    res.send('Welcome to my ES6 Node.js backend!');
});

app.use("/api", routes);


app.all("*", (req, res) => {
    const response = new Response(res);
    return res.status(404).json( 'Trying route undefined ⚠️');
});

// Server ko listen karte hain
app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`);
});
