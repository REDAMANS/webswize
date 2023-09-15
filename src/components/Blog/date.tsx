import { format } from 'date-fns';

const DateComponent = ({ dateString }: { dateString: string }) => {
    return (
        <time dateTime={dateString}>
            {format(new Date(dateString), "LLLL d, yyyy")}
        </time>
    );
}

export default DateComponent;