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
import educationLanguagesService from "../../services/educationLanguagesServices";
import { pageToOffset } from "../../utils/pageToOffset";

const EducationLanguageTable = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTableData = () => {
    setLoader(true);
    educationLanguagesService
      .getList({
        limit: 10,
        offset: pageToOffset(currentPage),
      })
      .then((res) => {
        setTableData(res.faculty_languages);
        setPageCount(Math.ceil(res?.count / 10));
      })
      .finally(() => setLoader(false));
  };

  const deleteTableData = (e, id) => {
    setLoader(true);

    educationLanguagesService
      .delete(id)
      .then((res) => {
        fetchTableData();
      })
      .catch(() => setLoader(false));
  };

  const navigateToEditForm = (e, id) => {
    navigate(`/education-language/${id}`);
  };

  useEffect(() => {
    fetchTableData();
  }, [currentPage]);
  console.log("table", tableData);

  return (
    <CTable
      count={pageCount}
      page={currentPage}
      setCurrentPage={setCurrentPage}
      columnsCount={5}
      loader={loader}
    >
      <CTableHead>
        <CTableHeadRow>
          <CTableCell width={20}>No</CTableCell>
          <CTableCell>Название(UZ) </CTableCell>
          <CTableCell>Название(RU) </CTableCell>
          <CTableCell>Название(EN) </CTableCell>

          <CTableCell width={80}> </CTableCell>
        </CTableHeadRow>
      </CTableHead>
      {
        <CTableBody
          loader={loader}
          columnsCount={3}
          dataLength={tableData?.length}
        >
          {tableData?.map((data, index) => (
            <CTableRow
              key={data.id}
              onClick={() => navigate(`/education-language/${data.id}`)}
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

export default EducationLanguageTable;
