const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get("/", auth, _get);

function _get(req, res) {
    const { authData } = res.locals;
    return res.send({
        "message": `Protected endpoint! User ${authData.id}`
    });
}

module.exports = router;