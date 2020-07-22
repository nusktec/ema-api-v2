/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//user class
class Speaker extends eng.Model {
}
Speaker.init({
    sid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    suid: {type: eng.DataTypes.INTEGER, allowNull: true},
    sname: {type: eng.DataTypes.STRING, allowNull: false},
    semail: {type: eng.DataTypes.STRING, unique: true, allowNull: false},
    sphone: {type: eng.DataTypes.STRING, allowNull: true},
    sdesc: {type: eng.DataTypes.TEXT, allowNull: true},
    scountry: {type: eng.DataTypes.STRING, allowNull: true},
    sstate: {type: eng.DataTypes.STRING, allowNull: true},
    surl: {type: eng.DataTypes.STRING, allowNull: true},
    sgender: {type: eng.DataTypes.STRING(10), allowNull: true},
    sprivate: {type: eng.DataTypes.INTEGER, defaultValue: 1},
    savatar: {type: eng.DataTypes.STRING, allowNull: true, defaultValue: 'https://firebasestorage.googleapis.com/v0/b/ema-front.appspot.com/o/avatars%2Fimage-placeholder.jpg?alt=media'},
}, {sequelize: conn, modelName: 'rs_speakers'});
conn.sync();
module.exports = Speaker;