/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//add more model
let muser = require('./musers');
let mpurchase = require('./mpurchase');
let mprogram = require('./mprogram');
//user class
class Mprolist extends eng.Model {}
Mprolist.init({
    lid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    luid: {type: eng.DataTypes.INTEGER, allowNull: false},
    lxid: {type: eng.DataTypes.INTEGER, allowNull: false},
    lpid: {type: eng.DataTypes.INTEGER, allowNull: false},
    lticket: {type: eng.DataTypes.STRING, allowNull: false},
}, {sequelize: conn, modelName: 'rs_eprolist'});
//do belonging
Mprolist.belongsTo(muser, {as: 'user', foreignKey: 'luid'});
Mprolist.belongsTo(mpurchase, {as: 'purchase', foreignKey: 'lxid'});
Mprolist.belongsTo(mprogram, {as: 'program', foreignKey: 'lpid'});
conn.sync();
module.exports = Mprolist;