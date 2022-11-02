import { Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateButton from "../../components/Buttons/CreateButton";
import DownloadButton from "../../components/DownloadButton";
import Header from "../../components/Header";
import SearchInput from "../../components/SearchInput";
import enrolledStudentsService from "../../services/enrolledStudentService";
import useQuery from "../../utils/useQuery";
import EnrolledStudentsTable from "./EnrolledStudentsTable";

const EnrolledStudentsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const query = useQuery();
  const permission = localStorage.getItem("permissions");

  useEffect(() => {
    if (query.get("search")) {
      setSearch(query.get("serach"));
    }
  }, [query.get("serach")]);

  console.log("query", search);
  const downloadExcel = () => {
    enrolledStudentsService
      .enrolledStudentExcel({ level: level })
      .then((res) => {
        window.location.href = res.url;
      });
  };

  return (
    <div>
      <Header
        title="Зачисленные студенты"
        extra={
          permission === "admin" && (
            <CreateButton
              style={{ fontSize: "14px" }}
              onClick={() => navigate(`/enrolled-students/create`)}
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
          // borderTop: "1px solid #e5e9eb",
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
              fullWidth
              onChange={setSearch}
              value={search}
              lebel={"Поиск..."}
            />
          </Grid>
          {/* {permission === "admin" ? (
            <Grid item sx={{ marginLeft: "12px" }}>
              <Select
                size="small"
                style={{ width: "150px" }}
                placeholder="Выберите группу"
                displayEmpty
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <span> Выберите курс</span>;
                  }
                  return selected;
                }}
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <MenuItem value={1}>1 курс</MenuItem>
                <MenuItem value={2}>2 курс</MenuItem>
                <MenuItem value={3}>3 курс</MenuItem>
                <MenuItem value={4}>4 курс</MenuItem>
              </Select>
            </Grid>
          ) : (
            ""
          )} */}
        </div>
        {permission === "admin" ? (
          <Grid
            item
            columnSpacing={20}
            justify="flex-end"
            sx={{ marginRight: "30px" }}
          >
            <DownloadButton onClick={downloadExcel} title="Скачать отчет" />
          </Grid>
        ) : (
          ""
        )}
      </div>
      <div style={{ padding: "20px" }}>
        <EnrolledStudentsTable search={search} level={level} />
      </div>
    </div>
  );
};

export default EnrolledStudentsPage;
