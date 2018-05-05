const router = require('express').Router();

router.get('/api/login', (req, res) => {

  res.send({
    data:[
      {user: "m6cheung", password: "123"}
    ]
  });

})

module.exports = router;