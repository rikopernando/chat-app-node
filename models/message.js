'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    handle: DataTypes.STRING,
    message: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};
