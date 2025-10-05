
import Home from "../app/home/Home";
import Showroom from "../app/showroom/Showroom";
import Mission from "../app/mission/Mission";
import Referral from "../app/referral/Referral";
import Profile from "../app/profile/Profile";
import Garage from "../app/garage/Garage";
import routes from "./routes";
import LeaderBoard from "../app/leaderBoard/LeaderBoard";
import Box from "../app/box/Box";


const routeList = [
  
  {
    path:routes.Home, element: Home, props: { title: "Trang chủ" }, routers: []
  },
  {
    path: routes.Showroom, element: Showroom, props: { title: "Showroom" }, routers: []
  },
  {
    path: routes.Mission, element: Mission, props: { title: "Showroom" }, routers: []
  },
  {
    path: routes.Referral, element: Referral, props: { title: "Referral" }, routers: []
  },
  {
    path: routes.Profile, element: Profile, props: { title: "Profile" }, routers: []
  },
  {
    path: routes.Garage, element: Garage, props: { title: "Garage" }, routers: []
  },
  {
    path: routes.LeaderBoard, element: LeaderBoard, props: { title: "LeaderBoard" }, routers: []
  },
  {
    path: routes.Box, element: Box, props: { title: "LeaderBoard" }, routers: []
  },
];
export default routeList;