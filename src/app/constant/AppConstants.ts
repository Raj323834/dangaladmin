export class AppConstants {


    public static NEW_GAMES_CATEGORY: string = 'New Games';
    public static CARD_GAMES_CATEGORY: string = 'Card Games';
    public static CASUAL_GAMES_CATEGORY: string = 'Casual Games';
    public static NEW_GAMES_KEY: string = 'NewGames';
    public static CARD_GAMES_KEY: string = 'CardGames';
    public static CASUAL_GAMES_KEY: string = 'CasualGames';

    public static NO_QUERY_PARAM: string = "";
    public static NO_URL_PARAM: string = "";
    public static DEFAULT_IP: string = "0.0.0.0";

    public static INSTANT: string = "INSTANT";
    public static MANUAL: string = "MANUAL";

    public static FIND_USERID_HEADER: string = " Select Mobile / Email / Username ";
    public static MOBILE: string = "Mobile";
    public static EMAIL: string = "Email";
    public static DANGAL_USER: string = "dangalUser";
    public static MOBILE_MSG: string = "Enter a valid mobile number";
    public static EMAIL_MSG: string = "Enter a valid Email";
    public static DANGAL_USER_MSG: string = "Enter a valid Username";


    public static NO_ACCESS_PERMISSION: string = "You dont have the access to  ";
    public static ENTER_ALL_DETAILS_IN_RANK: string = "Enter all the fields of this particular rank ";


    public static DEFAULT_BASE_TIME: string = "00:00";


    public static getTimestamp(strDate: string) {
        return Date.parse(strDate);
    }

    public static getTimestampInMonthDayYear(strDate: string) {
        const date = strDate;
        const [day, month, year] = date.split('/');
        const result = [ month, day, year].join('/');
        var dateTimestamp = Date.parse(result);
        return dateTimestamp;
    }

    public static getTimestampInYearMonthDay(strDate: string) {
        const date = strDate;
        console.log("date"+date)
        const [year, month, day] = date.split('/,-,T');
        const result = [ month, day, year].join('/');
        console.log(result)
        var dateTimestamp = Date.parse(result);
        console.log("result"+dateTimestamp)
        return dateTimestamp;
    }

    public static getDatefromTimestamp(timeStamp): string {
        const date = new Date(timeStamp);
        return date.toDateString();
    }

    public static getDifferenceInDays(date1, date2) {
        const millisecondsInADay = 1000 * 60 * 60 * 24;
        const diffInMs = Math.abs(date2 - date1);
        return Math.floor(diffInMs / millisecondsInADay);
    }

    public static getDifferenceInHours(date1, date2) {
        const millisecondsInAnHour = 1000 * 60 * 60;
        const diffInMs = Math.abs(date2 - date1);
        return Math.floor(diffInMs / millisecondsInAnHour);
    }


}
