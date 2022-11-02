import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonsPopover from "../../components/ButtonsPopover";
import {
  CTable,
  CTableBody,
  CTableCell,
  CTableHead,
  CTableHeadRow,
  CTableRow,
} from "../../components/CTable";
import applicationsService from "../../services/applicationsService";
import { format } from "date-fns";

import { pageToOffset } from "../../utils/pageToOffset";
import { Checkbox } from "@mui/material";

const ApplicationTable = ({ search, date }) => {
  const navigate = useNavigate();
  const permission = localStorage.getItem("permissions");
  const [tableData, setTableData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTableData = () => {
    setLoader(true);
    applicationsService
      .getList({
        search: search,
        limit: 10,
        offset: pageToOffset(currentPage),
        from_date: date[0] ? format(date[0], "yyyy-MM-dd") : "",
        to_date: date[1] ? format(date[1], "yyyy-MM-dd") : "",
      })
      .then((res) => {
        setTableData(res.applications);
        setPageCount(Math.ceil(res?.count / 10));
      })
      .finally(() => setLoader(false));
  };

  const deleteTableData = (e, id) => {
    setLoader(true);
    applicationsService
      .delete(id)
      .then((res) => {
        fetchTableData();
      })
      .catch(() => setLoader(false));
  };

  const navigateToEditForm = (e, id) => {
    navigate(`/applications/${id}`);
  };

  useEffect(() => {
    if (permission === "admin") {
      fetchTableData();
    }
  }, [currentPage]);

  useEffect(() => {
    if (search.length > 4) {
      fetchTableData();
    }

    if (!!date[0] && !!date[1]) {
      fetchTableData();
    }
  }, [currentPage, search, date]);

  return (
    <CTable
      count={pageCount}
      page={currentPage}
      setCurrentPage={setCurrentPage}
      columnsCount={4}
      loader={loader}
    >
      <CTableHead>
        <CTableHeadRow>
          {/* <CTableCell>
            <Checkbox />
          </CTableCell> */}

          <CTableCell width={20}>№</CTableCell>
          <CTableCell>ФИО</CTableCell>
          <CTableCell>Дата рождения</CTableCell>
          <CTableCell>Факультеты</CTableCell>
          <CTableCell>Программы обучения</CTableCell>
          <CTableCell>Телефон</CTableCell>
          <CTableCell width={30}></CTableCell>
        </CTableHeadRow>
      </CTableHead>
      {
        <CTableBody
          loader={loader}
          columnsCount={7}
          dataLength={tableData?.length}
        >
          {tableData?.map((data, index) => (
            <CTableRow
              key={data.id}
              onClick={() => navigate(`/applications/${data.id}`)}
              // onClick={() => navigate(`/projects/${data.id}/backlog`)}
            >
              <CTableCell>{index + 1}</CTableCell>
              <CTableCell>
                {`${data?.last_name ?? "-"} ${data?.first_name ?? "-"} ${
                  data?.third_name ?? "-"
                }`}
              </CTableCell>
              <CTableCell>{data?.date_of_birth ?? "-"}</CTableCell>

              <CTableCell>{data?.speciality}</CTableCell>
              <CTableCell>{data?.education_type}</CTableCell>
              <CTableCell>{data?.phone_number}</CTableCell>
              <CTableCell>
                <ButtonsPopover
                  itemId={data.id}
                  onEditClick={navigateToEditForm}
                  onDeleteClick={deleteTableData}
                />
              </CTableCell>
            </CTableRow>
          ))}
        </CTableBody>
      }
    </CTable>
  );
};

export default ApplicationTable;
