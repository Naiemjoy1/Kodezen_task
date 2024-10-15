import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.css"; // Import your CSS file for styling
import { MdEdit } from "react-icons/md";
import { HiOutlineDuplicate } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";

const Dropdown = ({ color, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside of dropdown
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropbtn">
        Dropdown
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <a href="#">
            <button
              onClick={() => {
                onEdit(color);
                // setDropdownOpen(false);
              }}
            >
              <MdEdit className="kzui-dropdown-icon" /> Edit
            </button>
          </a>
          <a href="#">
            <button
              onClick={() => {
                // onDuplicate(color);
                // setDropdownOpen(false);
              }}
            >
              <HiOutlineDuplicate className="kzui-dropdown-icon" /> Duplicate
            </button>
          </a>
          <a href="#">
            <button
              onClick={() => {
                //   onDelete(color.id);
                //   setDropdownOpen(false);
              }}
            >
              <RiDeleteBinLine className="kzui-dropdown-icon" /> Delete
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
