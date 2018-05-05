const router = require('express').Router();

router.get('/login', (req, res) => {

  return {
    data:[
      {user: "m6cheung", password: "123"}
    ]
  };

})

module.exports = router;