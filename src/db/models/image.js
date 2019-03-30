'use strict';
module.exports = function (sequelize, DataTypes) {
    var Image = sequelize.define('Image', {
        name: DataTypes.STRING,
        svg: DataTypes.TEXT
    }, {});
    Image.associate = function (models) {
        // associations can be defined here
    };
    return Image;
};
