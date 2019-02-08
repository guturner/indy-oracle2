import AuthPage from "views/AuthPage/AuthPage.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import RosterPage from "views/RosterPage/RosterPage.jsx";

var indexRoutes = [
  { path: "/roster", name: "RosterPage", component: RosterPage },
  { path: "/auth", name: "AuthPage", component: AuthPage },
  { path: "/", name: "LandingPage", component: LandingPage }
];

export default indexRoutes;
