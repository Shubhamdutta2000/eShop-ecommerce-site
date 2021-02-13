import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  AccountBalance,
  LocalShipping,
  PeopleAlt,
  ShoppingBasket,
} from "@material-ui/icons";

/////////////////////////////////////////////   Style Step Icon   //////////////////////////////////////////////
export const useStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: "3.2rem",
    height: "3.2rem",
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "2.4rem",
      height: "2.4rem",
    },
  },
  active: {
    backgroundImage: "linear-gradient(45deg, #045694,  30%, #2196f3 90%)",
    boxShadow: "0 8px 22px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage: "linear-gradient(45deg, #045694,  30%, #2196f3 90%)",
  },
}));

////////////////////////////////////////////   Step Icon   /////////////////////////////////////////////
export function StepIcon(props) {
  const classes = useStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PeopleAlt fontSize="small" />,
    2: <LocalShipping fontSize="small" />,
    3: <AccountBalance fontSize="small" />,
    4: <ShoppingBasket fontSize="small" />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}
