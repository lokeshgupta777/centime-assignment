import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import i18n from "../../config/i18next";
import { useState } from "react";
import styles from "./Header.module.css";
import Logo from "../../assets/svg/logo.svg"

const Header = () => {
  const [currLng, setCurrLng] = useState(i18n.language);

  const languageChangeHandler = async (event: SelectChangeEvent) => {
    try {
      const selectedLng = event.target.value;
      await i18n.changeLanguage(selectedLng);
      setCurrLng(selectedLng);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className={styles.header}>
      <img src={Logo} alt="logo" data-testid="header-logo" />
      <Select
        value={currLng}
        onChange={languageChangeHandler}
        size="small"
        data-testid="language-select"
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="hi" data-testid="select-option-1">
          Hindi
        </MenuItem>
      </Select>
    </header>
  );
};

export default Header;
