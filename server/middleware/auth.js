import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization; // Bearer<Space><token>
    if (!token) {
      return res.status(403).json({ message: `Token not verified` });
    }
    token = token.split(" ")[1]; // extract the token

    const verified = jwt.verify(token, process.env.JWT_SECRET); // returns data from payload
    if (!verified) {
      // this is unnecessary jwt.verify will throw error itself
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = verified;
    next();
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
