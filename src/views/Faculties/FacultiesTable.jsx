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
import facultyService from "../../services/facultyService";
import { pageToOffset } from "../../utils/pageToOffset";

const FacultiesTab = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchTableData = () => {
    setLoader(true);
    facultyService
      .getList({
        limit: 10,
        offset: pageToOffset(currentPage),
      })
      .then((res) => {
        setTableData(res.faculties);
        setPageCount(Math.ceil(res?.count / 10));
      })
      .finally(() => setLoader(false));
  };

  const deleteTableData = (e, id) => {
    setLoader(true);
    facultyService
      .delete(id)
      .then((res) => {
        fetchTableData();
      })
      .catch(() => setLoader(false));
  };

  const navigateToEditForm = (e, id) => {
    navigate(`/faculties/${id}`);
  };

  useEffect(() => {
    fetchTableData();
  }, [currentPage]);

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
          <CTableCell>Название </CTableCell>
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
              onClick={() => navigate(`/faculties/${data.id}`)}
            >
              <CTableCell>{index + 1}</CTableCell>
              <CTableCell>{data.name_uz}</CTableCell>
              <CTableCell>{data.name_ru}</CTableCell>
              <CTableCell>{data.name_en}</CTableCell>

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

export default FacultiesTab;
