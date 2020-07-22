/**
 * Created by revelation on 21/05/2020.
 */
class tmpUtils {
    //dollar converter
    static rateConverter(val, cur, isDollar, label) {
        let money = parseFloat(val);
        let icur = parseFloat(cur);
        if (cur === 0 || val === 0) {
            return 0;
        }
        if (isDollar) {
            return (label) ? "$" + (money / icur).toLocaleString() : ((money / icur).toFixed(2));
        }
        return (label) ? "₦" + (money * icur).toLocaleString() : ((money * icur).toFixed(2));
    }

//time ago
    static time_ago(ts) {

        let seconds = Math.floor((new Date() - ts) / 1000);

        let interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }

//full time stamp
    static full_time(ts) {
        return new Date(ts).toDateString();
    }

//compare two dates
    static compare2D(mn, mx) {
        let d1 = new Date(mn).getTime();
        let d2 = new Date(mx).getTime();
        let ts = d2 - d1;
        let res = Math.abs(d2 - d1) / 1000;
        let days = Math.floor(res / 86400);
        return days + " Remaining";
    }

//my boolean converter let to boolean
    static vtb(d) {
        return (d === 'true');
    }

// int to boolean
    static itb(d) {
        return (parseInt(d) === 1);
    }

// str to int
    static sti(d) {
        return parseInt(d);
    }

//get random number
    static getRandom(length) {
        return parseInt((Math.random() * length + 1));
    }

//get random number
    static getRandomChar(length) {
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        let tLenght = chars.length - 1;
        let res = "";
        for (let i = 0; i <= length; i++) {
            res += chars[parseInt((Math.random() * tLenght + 1))];
        }
        return res;
    }

//open separate window
    static openWin(url) {
        let w = window.open(url, 'reedax-win', 'width=900, height=600,location=no,toolbar=no,status=no');
    }

    //generate token
    static generateTicket() {
        let d = new Date();
        return "NCDMB-" + d.getUTCFullYear() + "" + d.getMonth() + "" + d.getDate() + "-" + tmpUtils.getRandomChar(5).toUpperCase();
    }

    //generate token
    static generatePTicket() {
        let d = new Date();
        return "NCP-" + d.getUTCFullYear() + "" + d.getMonth() + "" + d.getDate() + "-" + tmpUtils.getRandomChar(5).toUpperCase();
    }
}

module.exports = tmpUtils;