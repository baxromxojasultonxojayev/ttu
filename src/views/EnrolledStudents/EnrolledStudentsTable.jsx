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
import enrolledStudentsService from "../../services/enrolledStudentService";
import { pageToOffset } from "../../utils/pageToOffset";

const EnrolledStudentsTable = ({ search, level = "1" }) => {
  const navigate = useNavigate();
  const permission = localStorage.getItem("permissions");
  const [tableData, setTableData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTableData = () => {
    setLoader(true);
    enrolledStudentsService
      .getList({
        search,
        limit: 10,
        offset: pageToOffset(currentPage),
        level,
      })
      .then((res) => {
        setTableData(res.enrolled_students);
        setPageCount(Math.ceil(res?.count / 10));
      })
      .finally(() => setLoader(false));
  };

  const deleteTableData = (e, id) => {
    setLoader(true);

    enrolledStudentsService
      .delete(id)
      .then((res) => {
        fetchTableData();
      })
      .catch(() => setLoader(false));
  };

  const navigateToEditForm = (e, id) => {
    navigate(`/enrolled-students/${id}`);
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

    if (level) {
      fetchTableData();
    }
  }, [currentPage, search, level]);

  useEffect(() => {
    if (search && search.length > 5) {
      setCurrentPage(1);
    }
  }, [search]);

  // useEffect(() => {
  //   navigate(
  //     `/enrolled-students?limit=10&page=${currentPage}${
  //       search ? `&search=${search}` : ""
  //     }`
  //   );
  // }, [search, currentPage]);

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
          <CTableCell width={20}>№</CTableCell>
          <CTableCell>ФИО</CTableCell>
          <CTableCell>Факультеты</CTableCell>
          <CTableCell>Тип образования</CTableCell>
          <CTableCell>Телефон</CTableCell>
          <CTableCell width={30}></CTableCell>
        </CTableHeadRow>
      </CTableHead>
      {
        <CTableBody
          loader={loader}
          columnsCount={5}
          dataLength={tableData?.length}
        >
          {tableData?.map((data, index) => (
            <CTableRow
              key={data.id}
              onClick={() => navigate(`/enrolled-students/${data.id}`)}
            >
              <CTableCell>{index + 1}</CTableCell>
              <CTableCell>
                {`${data?.last_name ?? "-"} ${data?.first_name ?? "-"} ${
                  data?.patronym ?? "-"
                }`}
              </CTableCell>
              <CTableCell>{data.speciality}</CTableCell>
              <CTableCell>{data.course}</CTableCell>
              <CTableCell>{data.phone_number}</CTableCell>

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

export default EnrolledStudentsTable;
