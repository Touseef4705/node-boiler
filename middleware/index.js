import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export async function verifyToken(req, res, next) {
    const response = new Response(res);

    const { authorization } = req.headers;
    if (!authorization) {
        return res.staus(400).json({ message: "Unauthorized" });
    }

    const parts = authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(400).json({ mess: "Invalid token format" })
    }

    const authToken = parts[1];

    try {
        let verified = jwt.verify(authToken, process.env.JWT_SECRET);

        req.user = verified;
        next();

    } catch (error) {
        const errorMsg = req.query.dev == 1 ? error?.message : 'Unauthorized';
        return res.status(400).json({ message: errorMsg });
    }
}

export default verifyToken;