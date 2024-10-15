import { useEffect, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  HiDotsVertical,
  HiOutlineDotsHorizontal,
  HiOutlineDuplicate,
} from "react-icons/hi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdEdit, MdOutlineCreateNewFolder } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from "react-sortable-hoc";

import "./Color.css";

const RenameModal = ({ isOpen, currentName, onClose, onRename }) => {
  const [newName, setNewName] = useState(currentName);

  const handleRename = () => {
    onRename(newName);
    onClose();
  };
  return (
    isOpen && (
      <div className="kzui-rename-modal-overlay">
        <div className="kzui-rename-modal-content">
          <h2 className="kzui-rename-modal-title">Rename Group</h2>
          <input
            type="text"
            className="kzui-rename-modal-input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="kzui-rename-modal-buttons">
            <button className="kzui-rename-modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="kzui-rename-modal-change" onClick={handleRename}>
              Change Name
            </button>
          </div>
        </div>
      </div>
    )
  );
};

const SortableItem = SortableElement(
  ({ color, onEdit, onSelect, isSelected, onDuplicate, onDelete }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = (e) => {
      e.stopPropagation(); // Prevent event from bubbling
      console.log("Dropdown toggled"); // Debugging
      setDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        const dropdown = document.querySelector(".kzui-dropdown-container");
        if (dropdown && !dropdown.contains(event.target)) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="kzui-group-item relative">
        <button className="kzui-drag-handle" onClick={onSelect}>
          <HiDotsVertical />
        </button>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="kzui-group-item-checkbox"
        />
        <div className="kzui-group-item-title">
          <p>{color.title}</p>
        </div>
        <div className="kzui-group-item-color">
          <div className="kzui-color-box">
            <div
              className="kzui-color-preview"
              style={{ backgroundColor: color.color }}
            ></div>
            <input
              type="text"
              className="kzui-color-input"
              value={color.color}
              readOnly
            />
          </div>
          <button className="kzui-dropdown-button" onClick={toggleDropdown}>
            Edit
          </button>
          <div className="kzui-dropdown-container">
            {isDropdownOpen && (
              <ul className={`kzui-dropdown-menu show`}>
                <li>
                  <button
                    onClick={() => {
                      onEdit(color);
                      setDropdownOpen(false);
                    }}
                    className="kzui-dropdown-item"
                  >
                    <MdEdit className="kzui-dropdown-icon" /> Edit
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onDuplicate(color);
                      setDropdownOpen(false);
                    }}
                    className="kzui-dropdown-item"
                  >
                    <HiOutlineDuplicate className="kzui-dropdown-icon" />{" "}
                    Duplicate
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onDelete(color.id);
                      setDropdownOpen(false);
                    }}
                    className="kzui-dropdown-item"
                  >
                    <RiDeleteBinLine className="kzui-dropdown-icon" /> Delete
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
);

// Sortable List (the container that holds the sortable items)
const SortableList = SortableContainer(
  ({ colors, onEdit, selectedColors, onSelectColor }) => {
    return (
      <div>
        {colors.map((color, index) => (
          <SortableItem
            key={`item-${color.id}`} // Ensure unique key
            index={index}
            color={color}
            onEdit={onEdit}
            isSelected={selectedColors.includes(color.id)}
            onSelect={() => onSelectColor(color.id)}
          />
        ))}
      </div>
    );
  }
);

const Color = () => {
  const [colors, setColors] = useState([
    {
      id: 1,
      icon: <IoColorPaletteOutline />,
      title: "Primary",
      color: "#156BED",
    },
    {
      id: 2,
      icon: <IoColorPaletteOutline />,
      title: "Secondary",
      color: "#ED1976",
    },
    {
      id: 3,
      icon: <IoColorPaletteOutline />,
      title: "Title Text",
      color: "#000000",
    },
    {
      id: 4,
      icon: <IoColorPaletteOutline />,
      title: "Supporting Text",
      color: "#595959",
    },
  ]);

  const [editingColor, setEditingColor] = useState(null);
  const [colorValue, setColorValue] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [groupedColors, setGroupedColors] = useState([]);

  // New state for adding a color
  const [newColorTitle, setNewColorTitle] = useState("");
  const [newColorValue, setNewColorValue] = useState("#ffffff");
  const [isAddColorVisible, setIsAddColorVisible] = useState(false); // State for showing/hiding add color section

  const [isGroupedDropdownOpen, setIsGroupedDropdownOpen] = useState(false);

  // New states for renaming group
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("New Group"); // Default name for the group

  const handleRenameGroup = (newName) => {
    setGroupName(newName);
  };

  const toggleGroupedDropdown = () => {
    setIsGroupedDropdownOpen((prev) => !prev);
  };

  const onSortStart = () => {
    console.log("Drag started");
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(`Moved from ${oldIndex} to ${newIndex}`);
    setColors((prevColors) => arrayMove(prevColors, oldIndex, newIndex));
  };

  const handleEdit = (color) => {
    setEditingColor(color);
    setColorValue(color.color);
  };

  const handleSave = () => {
    if (editingColor) {
      setColors((prev) =>
        prev.map((color) =>
          color.id === editingColor.id ? { ...color, color: colorValue } : color
        )
      );
      setEditingColor(null);
      setColorValue("");
    }
  };

  const handleCloseDrawer = () => {
    setEditingColor(null);
    setColorValue("");
  };

  const handleSelectColor = (colorId) => {
    setSelectedColors((prevSelected) =>
      prevSelected.includes(colorId)
        ? prevSelected.filter((id) => id !== colorId)
        : [...prevSelected, colorId]
    );
  };

  const handleCreateGroup = () => {
    const selected = colors.filter((color) =>
      selectedColors.includes(color.id)
    );
    setGroupedColors((prev) => [...prev, ...selected]);
    setColors((prev) =>
      prev.filter((color) => !selectedColors.includes(color.id))
    );
    setSelectedColors([]); // Reset selected colors after creating group
  };

  // Function to add a new color
  const handleAddColor = () => {
    if (newColorTitle && newColorValue) {
      const newColor = {
        id: colors.length + 1, // Simple ID assignment
        title: newColorTitle,
        color: newColorValue,
      };
      setColors((prev) => [...prev, newColor]);
      setNewColorTitle("");
      setNewColorValue("#ffffff"); // Reset to default color
      setIsAddColorVisible(false); // Hide the add color section after adding
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center font-semibold">
        <div className="w-1/2">
          <p>Name</p>
        </div>
        <div className="w-1/2">
          <p>Value</p>
        </div>
      </div>
      <div className="border border-t-2"></div>

      {/* Sortable List Component */}
      <SortableList
        colors={colors}
        onSortEnd={onSortEnd}
        lockAxis="y"
        // useDragHandle
        onEdit={handleEdit}
        selectedColors={selectedColors}
        onSelectColor={handleSelectColor}
        // onCloseDropdown={handleCloseDrawer}
        onSortStart={onSortStart}
      />

      {/* Button to Create Group (conditionally rendered) */}
      {selectedColors.length > 0 && (
        <div className="kzui-create-group-button">
          <div className="flex gap-2 items-center">
            <p>
              <RxCross2 />
            </p>
            <p>{selectedColors.length} item selected</p>
          </div>
          <button onClick={handleCreateGroup}>
            <MdOutlineCreateNewFolder /> Group
          </button>
        </div>
      )}

      {/* Add New Color Section (only show when no colors are selected) */}
      {selectedColors.length === 0 && (
        <>
          <button
            onClick={() => setIsAddColorVisible(!isAddColorVisible)}
            className="kzui-add-color-button"
          >
            {isAddColorVisible ? "- Add Color" : "+ Add Color"}
          </button>

          {isAddColorVisible && (
            <div className="kzui-add-color-section">
              <div className="kzui-add-color-input">
                <input
                  type="text"
                  placeholder="Color Name"
                  className="kzui-add-color-input-text"
                  value={newColorTitle}
                  onChange={(e) => setNewColorTitle(e.target.value)}
                />
                <input
                  type="color"
                  className="kzui-add-color-input-color"
                  value={newColorValue}
                  onChange={(e) => setNewColorValue(e.target.value)}
                />
                <button onClick={handleAddColor}>Add Color</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Grouped Colors Section */}
      {groupedColors.length > 0 && (
        <div className="kzui-grouped-colors-section">
          <div className="kzui-grouped-colors-header">
            <h3 className="font-bold">{groupName}</h3>
            <button onClick={toggleGroupedDropdown}>
              <BiDotsHorizontalRounded />
            </button>
            {isGroupedDropdownOpen && (
              <div className="kzui-grouped-colors-dropdown">
                <ul>
                  <li>
                    <button
                      onClick={() => {
                        setIsRenameModalOpen(true);
                        setIsGroupedDropdownOpen(false);
                      }}
                    >
                      <MdEdit className="mr-2" /> Rename
                    </button>
                  </li>
                  <li>
                    <a href="#">
                      <HiOutlineDuplicate className="mr-2" /> Duplicate
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <RiDeleteBinLine className="mr-2" /> Delete
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="border border-t-2 mt-2"></div>
          {groupedColors.map((color) => (
            <div key={color.id} className="kzui-grouped-color-item">
              <div className="kzui-grouped-color-info">
                <p>
                  <IoColorPaletteOutline />
                </p>
                <p className="font-semibold">{color.title}</p>
              </div>
              <div className="kzui-grouped-color-input-container">
                <div
                  className="kzui-grouped-color"
                  style={{ backgroundColor: color.color }}
                ></div>
                <input
                  type="text"
                  className="kzui-readonly-color-input"
                  value={color.color}
                  readOnly
                />
                <button className="kzui-color-options-button">
                  <HiOutlineDotsHorizontal />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <RenameModal
        isOpen={isRenameModalOpen}
        currentName={groupName}
        onClose={() => setIsRenameModalOpen(false)}
        onRename={handleRenameGroup}
      />

      {/* Edit Drawer */}
      {editingColor && (
        <div className="kzui-editing-color-drawer">
          <div className="kzui-editing-color-content">
            <div>
              <div>
                <label className="kzui-editing-color-label">Name</label>
                <input
                  type="text"
                  className="kzui-editing-color-input-field"
                  value={editingColor.title}
                  readOnly
                />
              </div>

              <div className="kzui-editing-color-row">
                <label className="kzui-editing-color-label mr-2">
                  Color Value
                </label>
                <input
                  type="color"
                  className="kzui-editing-color-input-half"
                  value={colorValue}
                  onChange={(e) => setColorValue(e.target.value)}
                />
                <input
                  type="text"
                  className="kzui-editing-color-input-half"
                  value={colorValue}
                  readOnly
                />
              </div>
            </div>

            <div className="kzui-editing-color-actions">
              <button className="kzui-editing-color-save" onClick={handleSave}>
                Save Changes
              </button>
              <button
                className="kzui-editing-color-cancel"
                onClick={handleCloseDrawer}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Color;
