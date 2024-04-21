import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getInforUser } from "../../untils/functions";

const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);
};

const FormSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = getInforUser();
  const modalRef = useRef(null);

  // Custom hook to handle outside click
  useOutsideClick(modalRef, () => {
    setIsModalOpen(false);
  });

  // Xử lý sự kiện thay đổi input và tìm kiếm
  const handleChange = event => {
    if (user && user !== null) {
      if (user.dashboard) {
        if (user.dashboard.length > 0) {
          setSearchTerm(event.target.value);
          const results = user.dashboard[0].listTask.filter(task =>
            task.title.toLowerCase().includes(event.target.value.toLowerCase())
          );
          setSearchResults(results);
        }
      }
    }
    setIsModalOpen(true); // Mở modal khi có kết quả tìm kiếm
  };

  return (
    <div className="relative" ref={modalRef}>
      <div className="relative">
        <input
          type="text"
          className="border border-gray-300 p-2 pl-10 w-full rounded-full"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
        </div>
      </div>
      {/* Hiển thị kết quả tìm kiếm */}
      {isModalOpen && (
        <div className="bg-gray-300 w-full rounded mt-2 z-10 p-3 absolute top-full left-0">
          {searchResults.map(result => (
            <div className="mb-2" key={result.id}>
              <h3 className="cursor-pointer">{result.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormSearch;
