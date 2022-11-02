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
import specialityService from "../../services/specialityService";

import { pageToOffset } from "../../utils/pageToOffset";

const SpecialityTable = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchTableData = () => {
    setLoader(true);
    specialityService
      .getList({
        limit: 10,
        offset: pageToOffset(currentPage),
      })
      .then((res) => {
        setTableData(res.specialities);
        setPageCount(Math.ceil(res?.count / 10));
      })
      .finally(() => setLoader(false));
  };

  const deleteTableData = (e, id) => {
    setLoader(true);

    specialityService
      .delete(id)
      .then((res) => {
        fetchTableData();
      })
      .catch(() => setLoader(false));
  };

  const navigateToEditForm = (e, id) => {
    navigate(`/speciality/${id}`);
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
          <CTableCell>форма обучения</CTableCell>
          <CTableCell width={30}></CTableCell>
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
              onClick={() => navigate(`/speciality/${data.id}/`)}
            >
              <CTableCell>{index + 1}</CTableCell>
              <CTableCell>{data.info_uz.name}</CTableCell>
              <CTableCell>{data.info_ru.name}</CTableCell>
              <CTableCell>{data.info_en.name}</CTableCell>
              <CTableCell>{data.education_type?.name_uz}</CTableCell>

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

export default SpecialityTable;
