import React from "react";
import { useNavigate } from "react-router-dom";
import CreateButton from "../../components/Buttons/CreateButton";
import Header from "../../components/Header";
import Table from "./EducationLevelTable";

const EducationLevelPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        title="Уровни обучения"
        extra={
          <CreateButton
            onClick={() => navigate(`/education-levels/create`)}
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

export default EducationLevelPage;
