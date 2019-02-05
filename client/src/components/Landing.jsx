import React, { Component } from "react";
import { translate } from "react-i18next";

class Landing extends Component {
  render() {
    const { t, i18n } = this.props;

    const switchingLanguage = () => {
      var selectedLanguage = document.getElementById("langselector").value;
      if (selectedLanguage.length === 2) {
        i18n.changeLanguage(selectedLanguage);
        sessionStorage.setItem("selectedLanguage", selectedLanguage);
      }
    };

    return (
      <div className="container">
        <h1 className="text-center">{t("WELCOME")} FANCYAPP </h1>
        <h2 className="font-mukta">
          <br />
          <br />
          {t("LANGUAGES")}
          <br />

          <select id="langselector" onChange={() => switchingLanguage(this)}>
            <option value="" disabled="disabled">
              Fancy App
            </option>
            <option>{t("SELECT_LANGUAGE")}</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="jp">日本語 </option>
            <option value="ch">中文</option>
            <option value="kr">한국어</option>
            <option value="th">ไทย</option>
          </select>
        </h2>
      </div>
    );
  }
}

export default translate("translations")(Landing);
