import { useEffect, useState } from "react";
import ColEvents from "./events/ColEvents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getInforUser } from "../untils/functions";

const Calendar = (props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(0);
  const [valueDate, setValueDate] = useState();

  const [color, setColor] = useState("text-black");
  useEffect(() => {
    if (props.darkmode == "active dark mode") {
      setColor("text-white");
    } else {
      setColor("text-black");
    }
  }, [props.darkmode]);
  const user = getInforUser();
  const getCurrentWeekDays = () => {
    const daysInWeek = 7; // Số ngày trong một tuần
    const weekDays = [];
    const currentDayOfWeek = (
      valueDate ? new Date(valueDate) : currentDate
    ).getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const compareDates = (formattedDate, taskDate) => {
      if (formattedDate && taskDate) {
        const formattedParts = formattedDate.split("/");
        const taskParts = taskDate.split("-");
        // So sánh năm, tháng và ngày
        return (
          formattedParts[2] === taskParts[0] && // Năm
          0 + formattedParts[1] === taskParts[1] && // Tháng
          (formattedParts[0] < 10 ? 0 + formattedParts[0] : formattedParts[0]) === taskParts[2] // Ngày
        );
      }
    };
    // Tính toán ngày bắt đầu của tuần
    const weekStart = new Date(valueDate || currentDate);
    weekStart.setDate(weekStart.getDate() - currentDayOfWeek);
    for (let i = 0; i < daysInWeek; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      const isToday =
        day.toDateString() === currentDate.toDateString() && currentWeek === 0;
      const formattedDate = `${day.getDate()}/${day.getMonth() + 1
        }/${day.getFullYear()}`;

      const dayObj = {
        weekday: daysOfWeek[i],
        date: formattedDate,
        events: [], // Khởi tạo events rỗng ban đầu
        color: isToday ? "bg-blue-300" : "bg-slate-200",
      };

      // Duyệt qua từng task trong listTask
      if (user.dashboard.length > 0) {
        user.dashboard[0].listTask.forEach((task) => {
          if (compareDates(formattedDate, task.date)) {
            dayObj.events.push({ name: task.title, description: task.description });
          }
        });
      }

      weekDays.push(dayObj);
    }

    return weekDays;
  };

  // Handler cho nút Next
  const handleNextWeek = () => {
    const nextWeekDate = new Date(currentDate);
    nextWeekDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeekDate);
    setValueDate(nextWeekDate);
    setCurrentWeek(currentWeek + 1);
  };

  // Handler cho nút Prev
  const handlePrevWeek = () => {
    const prevWeekDate = new Date(currentDate);
    prevWeekDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(prevWeekDate);
    setValueDate(prevWeekDate);
    setCurrentWeek(currentWeek - 1);
  };

  const handleOnchange = (e) => {
    setValueDate(e.target.value);
    setCurrentDate(new Date(e.target.value));
    setCurrentWeek(0);
  };

  return (
    <div className={`calendar p-4`}>
      <div>
        <h2 className={`font-bold py-4 text-2xl text-center ${color}`}>
          My Calendar
        </h2>
      </div>
      <div className="nav-buttons flex justify-center items-center gap-6 py-5">
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:${color === "text-white" ? 'bg-gray-700' : 'bg-gray-200'}`}
          onClick={handlePrevWeek}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={`${color} text-xl`}
          />
        </button>
        <input
          type="date"
          className={`mx-4 cursor-pointer bg-transparent text-lg ${color}`}
          onChange={handleOnchange}
        />
        <button
          onClick={handleNextWeek}
          className={`flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:${color === "text-white" ? 'bg-gray-700' : 'bg-gray-200'}`}
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            className={`${color} text-xl`}
          />
        </button>
      </div>
      <ColEvents days={getCurrentWeekDays()} />
    </div>
  );
};
const mapDispatchToProps = () => {
  return {};
};
const mapStateToProps = (state) => {
  return {
    darkmode: state.darkmode,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
