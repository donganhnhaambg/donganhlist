// import axios from "axios";
// import { useEffect, useState } from "react";
// import * as XLSX from "xlsx";
// import { getInforUser } from "../../untils/functions";

// function Schedule2() {
//   const [dataRes, setDataRes] = useState([]);
//   const user = getInforUser();
//   useEffect(() => {
//     if (user && user !== null) {
//       if (user.file !== "") {
//         const fetchData = async () => {
//           try {
//             const response = await axios.post(
//               "http://localhost:3001/action/download",
//               { id: user._id }
//             );
//             setDataRes(response.data);
//           } catch (error) {
//             console.log(error);
//           }
//         };
//         fetchData();
//       }
//     }
//   }, []);
//   const handleFileUpload = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     const fileName = e.target.files[0];
//     formData.append("id", user._id);
//     formData.append("file", fileName);
//     const reader = new FileReader();
//     reader.readAsBinaryString(e.target.files[0]);
//     reader.onload = (e) => {
//       const data = e.target.result;
//       const workbook = XLSX.read(data, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const parsedData = XLSX.utils.sheet_to_json(sheet);
//       setDataRes(parsedData);
//     };
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/action/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   console.log(dataRes);
//   return (
//     <div className="schedule mt-5 ml-5">
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

//       {dataRes.length > 0 && (
//         <table className="table">
//           {/* <thead>
//             <tr>
//               {Object.keys(dataRes[0]).map((key) => (
//                 <th key={key}>{key}</th>
//               ))}
//             </tr>
//           </thead> */}
//           <tbody>
//             {dataRes.map((row, index) => (
//               <tr key={index}>
//                 {/* {Object.values(row).map((value, index) => (
//                   <td key={index}>{value}</td>
//                 ))} */}
//                 <td>{Object.values(row)[4]}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Schedule2;

import { useEffect, useState } from "react";
// import ColEvents from "./events/ColEvents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getInforUser } from "../../untils/functions";
import axios from "axios";
import { addDays, format } from "date-fns";
import * as XLSX from "xlsx";
import ColEvents from "../events/ColEvents";

const Schedule2 = (props) => {
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
  let ngayObj = "";
  const getCurrentWeekDays = () => {
    const daysInWeek = 7; // Số ngày trong một tuần
    const weekDays = [];
    const currentDayOfWeek = (
      valueDate ? new Date(valueDate) : currentDate
    ).getDay();
    const daysOfWeek = [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const compareDates = (formattedDate, taskDate) => {
      // console.log(formattedDate);
      // console.log(taskDate);
      const formattedParts = formattedDate.split("/");
      const taskParts = taskDate.split("/");
      // So sánh năm, tháng và ngày
      return (
        formattedParts[2] === taskParts[2] && // Năm
        0 + formattedParts[1] === taskParts[1] && // Tháng
        (formattedParts[0] < 10 ? 0 + formattedParts[0] : formattedParts[0]) ===
        taskParts[0] // Ngày
      );
    };
    // Tính toán ngày bắt đầu của tuần
    const weekStart = new Date(valueDate || currentDate);
    weekStart.setDate(weekStart.getDate() - currentDayOfWeek);
    if (dataRes.length > 0) {
      const firstValue = dataRes[0];
      const chuoi = firstValue["Lớp học phần"];
      if (chuoi) {
        const date = chuoi.split("(")[1].split(" ")[0];
        const [ngay, thang, nam] = date.split("/");
        ngayObj = new Date(nam, thang - 1, ngay - 2);

        for (let i = 2; i < daysInWeek + 2; i++) {
          const day = new Date(weekStart);
          day.setDate(weekStart.getDate() + (i - 1));
          const isToday =
            day.toDateString() === currentDate.toDateString() &&
            currentWeek === 0;
          const formattedDate = `${day.getDate()}/${day.getMonth() + 1
            }/${day.getFullYear()}`;
          // Duyệt qua từng task trong listTask
          if (dataRes.length > 0) {
            let dayObj = {
              weekday: daysOfWeek[i],
              date: formattedDate,
              events: [], // Khởi tạo events rỗng ban đầu
              color: isToday ? "bg-blue-300" : "bg-slate-200",
            };
            let newDate = 1;
            let formattedNewDate = 1;
            dataRes.forEach((row, index) => {
              newDate = addDays(ngayObj, index);
              formattedNewDate = format(newDate, "dd/MM/yyyy");
              if (compareDates(formattedDate, formattedNewDate)) {
                // console.log(row["Địa điểm"]);
                if (row["Giảng viên"]) {
                  dayObj.events.push({
                    lophocphan: row["Lớp học phần"],
                    giangvien: row["Giảng viên"],
                    tiethoc: row["Tiết học"],
                    diadiem: row["Địa điểm"],
                  });
                }
                // found = true; // Đánh dấu đã tìm thấy và không cần tiếp tục lặp
              }
            });
            // dayObj.events.push({
            //   name: Object.values(row)[1],
            //   description: Object.values(row)[2],
            // })
            weekDays.push(dayObj);
          }
        }
      }
    }
    // console.log(weekDays);
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
  const [dataRes, setDataRes] = useState([]);
  useEffect(() => {
    if (user && user !== null) {
      if (user.file !== "") {
        const fetchData = async () => {
          try {
            const response = await axios.post(
              "http://localhost:3001/action/download",
              { id: user._id }
            );
            setDataRes(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }
    }
  }, []);
  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fileName = e.target.files[0];
    formData.append("id", user._id);
    formData.append("file", fileName);
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setDataRes(parsedData);
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/action/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`calendar p-4`}>
      <div>
        <h2 className={`font-bold py-4 text-2xl text-center ${color}`}>
          My Schedule
        </h2>
      </div>
      <div className="top-schedule flex justify-center items-center">
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:${color === "text-white" ? 'bg-gray-700' : 'bg-gray-200'}`}
          onClick={handlePrevWeek}
        >
          <FontAwesomeIcon icon={faAngleLeft} className={`${color} text-xl`} />
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
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div className="nav-buttons flex justify-center items-center gap-6 py-5">
        {dataRes.length > 0 && <ColEvents days={getCurrentWeekDays()} schedule={true} />}
      </div>
      {/* <ColEvents days={getCurrentWeekDays()} /> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(Schedule2);
