import AuthPage from "views/AuthPage/AuthPage.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";

var indexRoutes = [
  { path: "/auth", name: "AuthPage", component: AuthPage },
  { path: "/", name: "LandingPage", component: LandingPage }
];

export default indexRoutes;
