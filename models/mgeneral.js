/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//user class
class Mgeneral extends eng.Model {
}
Mgeneral.init({
    gid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    gtitle: {type: eng.DataTypes.STRING, allowNull: false, defaultValue: 'No Title'},
    galias: {type: eng.DataTypes.STRING, allowNull: false, defaultValue: 'no-alias'},
    gtype: {type: eng.DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    gbody: {type: eng.DataTypes.TEXT, allowNull: false},
}, {sequelize: conn, modelName: 'rs_mgeneral'});
conn.sync();
module.exports = Mgeneral;