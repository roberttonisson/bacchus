import { IDate } from "../domain/IDate";

export abstract class Utils {

    /* Method for converting milliseconds into days, hours, minutes and seconds.*/
    static convertToDaysHoursMinutesSeconds(milliseconds: number) : IDate {
        var day, hour, minute, second;
        second = Math.floor(milliseconds / 1000);
        minute = Math.floor(second / 60);
        second = second % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        return {
            days: day,
            hours: hour,
            minutes: minute,
            seconds: second
        };


    }
}