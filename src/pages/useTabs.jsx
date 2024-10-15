import General from "./General";
import DesignSystem from "./DesignSystem";
import Intergration from "./Intergration";
import { CgCopy } from "react-icons/cg";
import { IoIosGitCompare } from "react-icons/io";
import { SiStackoverflow } from "react-icons/si";

const useTabs = () => {
  const tabsData = [
    {
      name: "general",
      icon: <CgCopy />,
      tab: 0,
      page: <General></General>,
    },
    {
      name: "design system",
      icon: <SiStackoverflow />,
      tab: 1,
      page: <DesignSystem></DesignSystem>,
    },
    {
      name: "intergration",
      icon: <IoIosGitCompare />,
      tab: 2,
      page: <Intergration></Intergration>,
    },
  ];
  return [tabsData];
};

export default useTabs;
