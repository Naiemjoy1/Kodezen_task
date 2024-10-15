import { useState } from "react";
import useTabs from "./pages/useTabs";
import "./App.css";

const App = () => {
  const [tabsData] = useTabs();
  const [tab, setTab] = useState(0);

  const handleTabs = (index) => {
    setTab(index);
  };

  return (
    <div className="kzui-container">
      <p className="kzui-text-xl kzui-font-semibold">Settings</p>
      <div className="kzui-flex kzui-justify-between kzui-gap-4">
        <div className="kzui-w-30 kzui-border kzui-rounded-lg kzui-p-4">
          {tabsData.map((aTabs) => (
            <p
              key={aTabs.tab}
              className={
                tab === aTabs.tab
                  ? "kzui-text-black kzui-bg-gray-200 kzui-px-2 kzui-rounded-md kzui-py-2"
                  : "kzui-text-gray-400 kzui-px-2 kzui-rounded-md kzui-py-2"
              }
              onClick={() => handleTabs(aTabs.tab)}
            >
              <span className="kzui-flex kzui-items-center kzui-gap-2">
                {aTabs.icon}
                {aTabs.name
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            </p>
          ))}
        </div>
        <div className="kzui-w-70 kzui-border kzui-rounded-lg kzui-p-4">
          {tabsData.map(
            (aTabs) =>
              tab === aTabs.tab && <div key={aTabs.tab}>{aTabs.page}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
