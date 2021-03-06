var User = require('../../model/user');
var _ = require('underscore');

function santitizeLatlng(latlng){
  if(_.isString(latlng)){
    latlng = latlng.split(",");
  }

  latlng = latlng.map(function(item){
    return +item;
  });

  return latlng;
}

exports.add = function(req,res,next){
  var carpark = req.body.carpark;
  var address = req.body.address;
  var latlng = santitizeLatlng(req.body.latlng);

  if(!carpark || !latlng || !address){
    return res.status(400).send("missing params");
  }

  User.addAddress(req.user._id, req.body, function(err){
    if(err){
      if(err.name == "EEXISTS"){
        return res.status(400).send("该地址已存在");
      }else{
        return next(err);
      }
    }
    res.status(200).send({message:"ok"});
  });
}


exports.update = function(req,res,next){
  var index = req.params.index;
  var carpark = req.body.carpark;
  var address = req.body.address;
  var latlng = santitizeLatlng(req.body.latlng);


  if(!carpark || !latlng || !address){
    return res.status(400).send("missing params");
  }

  User.modifyAddress(req.user._id, index, {
    address: address,
    carpark: carpark,
    latlng: latlng
  }, function(err){
    if(err){
      return next(err);
    }
    res.status(200).send({message:"ok"});
  });
}

exports.remove = function(req,res,next){
  User.removeAddress(req.user._id, req.params.index, function(err){
    if(err){
      return next(err);
    }
    res.status(200).send({message: "ok"});

  });
}
