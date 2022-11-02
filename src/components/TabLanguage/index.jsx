import React, { useState } from "react";

const TabLanguage = ({ activeTab, handleLangBtn }) => {
  return (
    <div className="langList">
      <button
        type="button"
        onClick={() => handleLangBtn("ru")}
        className={` ${activeTab === "ru" ? "activeBtn" : ""}`}
      >
        <img src="/specialityIcon/ru.png" />
        <p>Русский</p>
      </button>
      <button
        type="button"
        onClick={() => handleLangBtn("uz")}
        className={` ${activeTab === "uz" ? "activeBtn" : ""}`}
      >
        <img src="/specialityIcon/uz.png" />
        <p>O'zbekcha</p>
      </button>
      <button
        type="button"
        onClick={() => handleLangBtn("en")}
        className={` ${activeTab === "en" ? "activeBtn" : ""}`}
      >
        <img src="/specialityIcon/en.png" />
        <p>English</p>
      </button>
    </div>
  );
};

export default TabLanguage;
