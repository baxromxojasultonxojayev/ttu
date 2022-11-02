import React from "react";
import { useNavigate } from "react-router-dom";
import CreateButton from "../../components/Buttons/CreateButton";
import Header from "../../components/Header";
import Table from "./SpecialityTable";

const SpecialityPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        title="Программы обучения"
        extra={
          <CreateButton
            onClick={() => navigate(`/speciality/create`)}
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

export default SpecialityPage;
