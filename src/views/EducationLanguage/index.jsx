import React from "react";

import { useNavigate } from "react-router-dom";
import CreateButton from "../../components/Buttons/CreateButton";
import Header from "../../components/Header";
import Table from "./EducationLanguageTable";

const EducationLAnguagePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        title="Язык обучения"
        extra={
          <CreateButton
            onClick={() => navigate(`/education-language/create`)}
            title="Создать"
          />
        }
      />
      <div style={{ padding: "20px" }}>
        <Table />
      </div>
    </div>
  );
};

export default EducationLAnguagePage;
