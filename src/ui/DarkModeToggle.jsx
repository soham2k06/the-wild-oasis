import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../Contexts/DarkModeContext";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function DarkModeToggle() {
  const { isDarkMode, handleToggle } = useDarkMode();
  return (
    <ButtonIcon onClick={handleToggle}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
