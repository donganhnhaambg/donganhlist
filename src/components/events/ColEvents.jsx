import EventsCalendar from "./EventsCalendar";

const ColEvents = ({ days, schedule }) => {
  return (
    <div className="col-events flex min-h-96">
      {days.map((day, index) => (
        <div key={index} className={`day text-center ${day.color} p-6 flex-grow border border-gray-400`}>
          <div className="day-weeksday font-bold text-2xl pb-3">{day.weekday}</div>
          <div className="day-date font-bold text-l pb-2">{day.date}</div>
          <EventsCalendar events={day.events} schedule={schedule} />
        </div>
      ))}
    </div>
  );
};
export default ColEvents;
