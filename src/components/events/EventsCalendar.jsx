const EventsCalendar = ({ events, schedule }) => {
  return (
    <div className="events-calendar">
      {events.map((event, index) => (
        <div key={index} className="event mb-8">
          {schedule ?
            <>
              <div><span className="text-sm">{`${event.lophocphan}`}</span></div>
              <div><span className="text-sm">{`${event.giangvien !== undefined ? event.giangvien : ""}`}</span></div>
              <div><span className="text-sm">{`${event.tiethoc !== undefined ? event.tiethoc : ""}`}</span></div>
              <div><span className="text-sm">{`${event.diadiem !== undefined ? event.diadiem : ""}`}</span></div>
            </> :
            <>
              <h4 className="text-bold text-xl mt-5">{event.name}</h4>
              <div><span className="text-sm">{`${event.description.slice(0, 50)}...`}</span></div>
            </>
          }
        </div>
      ))}
    </div>
  );
};
export default EventsCalendar;
