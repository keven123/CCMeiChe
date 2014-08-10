var model = require('../../model');
var async = require('async');
var User = model.user;

/**
 * 获取车辆
 * @param  number 车牌
 */
exports.get = function (req, res, next) {

  User.findOne({
    phone: req.user.phone
  }, function (err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).send(user.cars);
  });

};

/**
 * 添加车辆
 * @param  pic 照片
 * @param  types 车型
 * @param  number 车牌
 * @param  color 颜色
 * @param  comment 备注
 */
exports.post = function (req, res, next) {
  var number = req.body.number;
  var pic = req.body.pic;
  var type = req.body.type;
  var color = req.body.color;
  var comment = req.body.comment;
  var phone = req.user.phone;
  var action = req.body.action;
  var car = {
    pic: pic,
    number: number,
    type: type,
    color: color,
    comment: comment
  };

  if (!number) {
    return res.status(400).send("bad request");
  }

  User.findOne({
    phone: phone,
    "cars.number": number
  }, function (err, user) {
    if (err) {
      return next(err);
    }

    if (user) {
      return res.status(400).send("您已添加过该车牌");
    }

    User.update({
      phone: phone
    }, {
      $addToSet: {
        cars: car
      }
    }, function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).send("ok");
    });
  });


};