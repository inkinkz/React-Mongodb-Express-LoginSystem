import React, { Component } from "react";
import { translate } from "react-i18next";

class Landing extends Component {
  render() {
    const { t } = this.props;

    return (
      <div className="container">
        <h1 className="text-center">{t("WELCOME")} FANCYAPP </h1>
      </div>
    );
  }
}

export default translate("translations")(Landing);
