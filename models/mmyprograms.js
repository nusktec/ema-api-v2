/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//user class
class Myprogram extends eng.Model {
}
Myprogram.init({
    xid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    xuid: {type: eng.DataTypes.STRING, allowNull: false},
    xpid: {type: eng.DataTypes.STRING, allowNull: false},
}, {sequelize: conn, modelName: 'rs_myprograms'});
conn.sync();
module.exports = Myprogram;