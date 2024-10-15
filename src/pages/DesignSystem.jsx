import { useState } from "react";
import Color from "./Color";
import "./DesignSystem.css";

const DesignSystem = () => {
  const [activeTab, setActiveTab] = useState("Color");

  return (
    <div className="kzui-space-y-2">
      <p className="kzui-font-semibold">Design System</p>
      <div className="kzui-border kzui-border-t-2"></div>

      <div className="kzui-space-y-2">
        <div className="kzui-flex kzui-justify-between kzui-items-center">
          <div className="kzui-flex kzui-justify-start kzui-gap-4 kzui-text-gray-400">
            <p
              className={`kzui-cursor-pointer ${
                activeTab === "Color" ? "kzui-text-black" : ""
              }`}
              onClick={() => setActiveTab("Color")}
            >
              Color
            </p>
            <p
              className={`kzui-cursor-pointer ${
                activeTab === "Typography" ? "kzui-text-black" : ""
              }`}
              onClick={() => setActiveTab("Typography")}
            >
              Typography
            </p>
            <p
              className={`kzui-cursor-pointer ${
                activeTab === "Shadow" ? "kzui-text-black" : ""
              }`}
              onClick={() => setActiveTab("Shadow")}
            >
              Shadow
            </p>
          </div>
          <input
            placeholder="Search..."
            className="kzui-border kzui-rounded-md kzui-pl-2"
            type="text"
          />
        </div>

        <div className="kzui-border kzui-border-t-2"></div>

        {activeTab === "Color" && (
          <div>
            <Color></Color>
          </div>
        )}
        {activeTab === "Typography" && (
          <div>
            <p>this Typography</p>
          </div>
        )}
        {activeTab === "Shadow" && (
          <div>
            <p>this Shadow</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignSystem;
