/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//user class
class Yenagoa extends eng.Model {
}
Yenagoa.init({
    yid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    yname: {type: eng.DataTypes.STRING, allowNull: false},
    yemail: {type: eng.DataTypes.STRING, unique: true, allowNull: false},
    yphone: {type: eng.DataTypes.STRING, allowNull: true},
    ydesc: {type: eng.DataTypes.TEXT, allowNull: true},
    yurl: {type: eng.DataTypes.STRING, allowNull: true},
    yavatar: {type: eng.DataTypes.STRING, allowNull: true, defaultValue: 'https://firebasestorage.googleapis.com/v0/b/ema-front.appspot.com/o/avatars%2Fimage-placeholder.jpg?alt=media'},
    ytype: {type: eng.DataTypes.STRING, allowNull: true},
}, {sequelize: conn, modelName: 'rs_yenagoa'});
conn.sync();
module.exports = Yenagoa;