/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//user class
class Epurchase extends eng.Model {}
Epurchase.init({
    bid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    beid: {type: eng.DataTypes.INTEGER, allowNull: false},
    buid: {type: eng.DataTypes.INTEGER, allowNull: false},
    bticket: {type: eng.DataTypes.STRING, unique: true, allowNull: false},
    bfamily: {type: eng.DataTypes.STRING, allowNull: true},
}, {sequelize: conn, modelName: 'rs_epurchase'});
conn.sync();
module.exports = Epurchase;