'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    message: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Chat.associate = function(models) {
    models.Chat.belongsTo(models.Users, {
      foreignKey: 'user_id'
    })
  };
  return Chat;
};
