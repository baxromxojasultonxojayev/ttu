import React from "react";
import { useNavigate } from "react-router-dom";
import CreateButton from "../../components/Buttons/CreateButton";
import Header from "../../components/Header";
import Table from "./EducationTypeTable";

const EducationTypePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        title="Форма обучения"
        extra={
          <CreateButton
            onClick={() => navigate(`/education-type/create`)}
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

export default EducationTypePage;
