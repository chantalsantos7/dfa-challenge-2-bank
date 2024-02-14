export default class DateHelper {
    static FormatDate(date)
    {
        let formatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' });
        let formattedDate = formatter.format(date);
        return formattedDate;
    }

    static getCurrentDate()
    {
        return new Date();
    }
}