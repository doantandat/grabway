import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiHome, BiUser } from "react-icons/bi";
import { IoBag } from "react-icons/io5";
import { MdPlayLesson } from "react-icons/md";
import { FaGift } from "react-icons/fa6";
// ✅ import action từ slice của bạn
import { setTabBottom } from "@/store/appSlice"; // chỉnh đường dẫn cho đúng
import routes from "@/utils/routes"; // nếu bạn có file routes

export const BottomTab = () => {
  const tabBottom = useSelector((state) => state.app.tabBottom);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTab = (value, path) => () => {
    navigate(path);
    dispatch(setTabBottom(value));
  };

  const tabs = [
    { value: routes.Home, label: "Home",     icon: <BiHome className="text-xl" />,       path: routes.Home },
    { value:routes.Showroom, label: "Showroom", icon: <IoBag className="text-xl" />,        path: routes.Showroom },
    { value: routes.Mission, label: "Mission",  icon: <MdPlayLesson className="text-xl" />, path: routes.Mission },
    { value:routes.Referral, label: "Referral", icon: <FaGift className="text-xl" />,       path: routes.Referral },
    { value: routes.Profile, label: "Profile",  icon: <BiUser className="text-xl" />,       path: routes.Profile },
  ];

  return (
    <div className="grid grid-cols-5 fixed bottom-0 w-full bg-gray-100 p-2 z-[1000] left-0 h-[50px]">
      {tabs.map((tab) => {
        const active = tabBottom === tab.value;
        return (
          <button
            key={tab.value}
            className={`flex flex-col items-center justify-center rounded-lg py-1 transition
                       ${active ? " text-blue-600" : "text-gray-600 hover:bg-gray-200"}`}
            onClick={handleTab(tab.value, tab.path)}
          >
            <span className={active ? "text-blue-600" : "text-gray-500"}>{tab.icon}</span>
            <span className={`text-xs ${active ? "text-blue-600" : "text-gray-600"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
