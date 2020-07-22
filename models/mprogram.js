/**
 * Created by revelation on 18/05/2020.
 */
const dbConn = require('./mysql');
let eng = dbConn.engine;
let conn = dbConn.conn;
//add models
let myprogram = require('./mmyprograms');
//user class
class Mprogram extends eng.Model {
}
Mprogram.init({
    pid: {primaryKey: true, autoIncrement: true, type: eng.DataTypes.INTEGER},
    puid: {type: eng.DataTypes.INTEGER, allowNull: true},
    peid: {type: eng.DataTypes.INTEGER},
    ptitle: {type: eng.DataTypes.STRING, allowNull: false},
    palias: {type: eng.DataTypes.STRING, allowNull: false, unique: true},
    pdesc: {type: eng.DataTypes.TEXT, allowNull: false},
    pbanner: {type: eng.DataTypes.STRING, allowNull: false, defaultValue: 'https://firebasestorage.googleapis.com/v0/b/ema-front.appspot.com/o/banners%2Fimage-placeholder.jpg?alt=media'},
    plocation: {type: eng.DataTypes.STRING, allowNull: true},
    pspeakers: {type: eng.DataTypes.TEXT, allowNull: true},
    passets: {type: eng.DataTypes.TEXT, allowNull: true},
    pdoc: {type: eng.DataTypes.STRING, allowNull: true},
    plonglat: {type: eng.DataTypes.STRING, allowNull: true},
    paddress: {type: eng.DataTypes.STRING, allowNull: true},
    pstart: {type: eng.DataTypes.STRING},
    pend: {type: eng.DataTypes.STRING},
    pdate: {type: eng.DataTypes.STRING},
    pprivate: {type: eng.DataTypes.INTEGER, defaultValue: 0},
    pstatus: {type: eng.DataTypes.INTEGER, defaultValue: 1},
}, {sequelize: conn, modelName: 'rs_programs'});
Mprogram.hasMany(myprogram, {as: 'myprograms', foreignKey: 'xid'});
conn.sync();
module.exports = Mprogram;