import { container, title } from "assets/jss/material-kit-react.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-kit-react/customCheckboxRadioSwitch.jsx";

const basicsStyle = {
  sections: {
    padding: "70px 0"
  },
  boldButton: {
    color: "#000000",
    fontWeight: "bold",
    "&:hover": {
      color: "#000000"
    }
  },
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  space50: {
    height: "50px",
    display: "block"
  },
  space70: {
    height: "70px",
    display: "block"
  },
  icons: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF"
  },
  textCenter: {
    textAlign: "center"
  },
  textMuted: {
    color: "#6c757d"
  },
  ...customCheckboxRadioSwitch
};

export default basicsStyle;
