const jwt = require('jsonwebtoken');
const JWT_SECRET_SIGNATURE = "darksSecretcode_kuch_bhi_rkh_lo";
const fetchuser = (req, res, next) => {

    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "Please Authenticate the Valid Token" })
    }
    try {
        let data = jwt.verify(token, JWT_SECRET_SIGNATURE);
        // hamara jb token verify ho jaye ga to jo user us token sy login hua ho ga us ka sara data mery req.user mein aa jaye ga phr mei req.user.id yaa req.user.name kr ky data utha skoo ga jahan bhi mei ny y function use kia ho ga
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate the Valid Token" })

    }

}
module.exports = fetchuser;