var models = [
  "user",
  "vcode",
  "order",
  "worker",
  "service",
  "error",
  "cartype",
  "usermessage",
  "rechargeorder",
  "admin",
  "refund",
  "promoqr"
];

models.forEach(function(name){
  exports[name] = require("./" + name);
});