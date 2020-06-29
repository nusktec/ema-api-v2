/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//user class
class Exhibitors extends eng.Model {
}
Exhibitors.init({
    eid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    ename: {type: eng.DataTypes.STRING, allowNull: false},
    eemail: {type: eng.DataTypes.STRING, unique: true, allowNull: false},
    ephone: {type: eng.DataTypes.STRING, allowNull: true},
    edesc: {type: eng.DataTypes.TEXT, allowNull: true},
    eurl: {type: eng.DataTypes.STRING, allowNull: true},
    eavatar: {type: eng.DataTypes.STRING, allowNull: true, defaultValue: 'https://firebasestorage.googleapis.com/v0/b/ema-front.appspot.com/o/avatars%2Fimage-placeholder.jpg?alt=media'},
}, {sequelize: conn, modelName: 'rs_exhibitors'});
conn.sync();
module.exports = Exhibitors;