import { withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";

//////////////////////////////   Step Connector   ///////////////////////////////
export const CheckoutStepConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },

  active: {
    "& $line": {
      backgroundImage: "linear-gradient(45deg, #2196f3,  30%, #045694 90%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage: "linear-gradient(45deg, #045694,  30%, #2196f3 90%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);
