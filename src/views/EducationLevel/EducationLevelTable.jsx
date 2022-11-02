import React, { useEffect, useState } from "react";
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
import educationLevelsService from "../../services/educationLevelsService";
import { pageToOffset } from "../../utils/pageToOffset";
const EducationLevelTable = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchTableData = () => {
    setLoader(true);
    educationLevelsService
      .getList({
        limit: 10,
        offset: pageToOffset(currentPage),
      })
      .then((res) => {
        setTableData(res.education_levels);
        setPageCount(Math.ceil(res?.count / 10));
      })
      .finally(() => setLoader(false));
  };

  const deleteTableData = (e, id) => {
    setLoader(true);

    educationLevelsService
      .delete(id)
      .then((res) => {
        fetchTableData();
      })
      .catch(() => setLoader(false));
  };

  const navigateToEditForm = (e, id) => {
    navigate(`/education-levels/${id}`);
  };

  useEffect(() => {
    fetchTableData();
  }, [currentPage]);

  console.log(tableData);

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
          <CTableCell>Название</CTableCell>

          <CTableCell width={80}> </CTableCell>
        </CTableHeadRow>
      </CTableHead>
      {
        <CTableBody
          loader={loader}
          columnsCount={4}
          dataLength={tableData?.length}
        >
          {tableData?.map((data, index) => (
            <CTableRow
              key={data.id}
              onClick={() => navigate(`/education-levels/${data.id}`)}
            >
              <CTableCell>{index + 1}</CTableCell>
              <CTableCell>{data.name_uz}</CTableCell>
              <CTableCell>{data.name_ru}</CTableCell>
              <CTableCell>{data.name_en}</CTableCell>

              {/* <CTableCell>{data.title}</CTableCell> */}

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

export default EducationLevelTable;
