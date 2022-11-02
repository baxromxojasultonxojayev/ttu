import { useState } from "react";
import Header from "../../components/Header";
import ApplicationTable from "./ApplicationTable";
import { useNavigate } from "react-router-dom";
import CreateButton from "../../components/Buttons/CreateButton";
import SearchInput from "../../components/SearchInput";
import DownloadButton from "../../components/DownloadButton";
import { Grid } from "@mui/material";
import CRangePicker from "../../components/CRangePicker/CRangePicker";
import applicationService from "../../services/applicationsService";
import ModalButton from "../../components/ButtonModal";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import StudentsModal from "./StudentsModal.";
import StudentAddedModal from "./StudentAddedModal";

const Applications = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState([null, null]);
  const [search, setSearch] = useState("");
  const permission = localStorage.getItem("permissions");
  const [openModal, setOpenModal] = useState();
  const [addedModal, setAddedModal] = useState();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const openAddedModal = () => setAddedModal(true);
  const closeAddedModal = () => setAddedModal(false);

  const downloadExcel = () => {
    applicationService.applicationStudentExcel().then((res) => {
      window.location.href = res.url;
    });
  };

  return (
    <div className="PositionsPage">
      <Header
        title="Заявки"
        extra={
          permission === "admin" && (
            <CreateButton
              style={{ fontSize: "14px" }}
              onClick={() => navigate(`/applications/create`)}
              title="Создать"
            />
          )
        }
      />
      <div
        style={{
          background: "#FFFFFF",
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            background: "#FFFFFF",
            display: "flex",
          }}
        >
          <Grid item>
            <SearchInput
              value={search}
              fullWidth
              onChange={setSearch}
              lebel={"Поиск..."}
            />
          </Grid>
          {permission === "admin" && (
            <Grid item sx={{ marginLeft: "12px" }}>
              <CRangePicker value={date} onChange={setDate} />
            </Grid>
          )}
        </div>
        {permission === "admin" && (
          <Grid
            item
            columnSpacing={20}
            justify="flex-end"
            sx={{ display: "flex", columnGap: "12px" }}
          >
            <DownloadButton onClick={downloadExcel} title="Скачать" />
            <ModalButton onClick={handleOpenModal} title="Выбранные заявки" />
            <PrimaryButton
              onClick={openAddedModal}
              sx={{
                backgroundColor: "#E65300",
                color: "white",
                fontSize: "14px",
              }}
            >
              Добавить к зачислённым
            </PrimaryButton>
          </Grid>
        )}
      </div>
      <StudentsModal
        openModal={openModal}
        openAddedModal={openAddedModal}
        handleCloseModal={handleCloseModal}
      />
      <StudentAddedModal
        handleCloseModal={closeAddedModal}
        openModal={addedModal}
      />
      <div style={{ padding: "20px" }}>
        <ApplicationTable search={search} date={date} setSearch={setSearch} />
      </div>
    </div>
  );
};

export default Applications;
