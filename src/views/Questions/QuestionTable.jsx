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
import { pageToOffset } from "../../utils/pageToOffset";
import questionType from "../../services/questionType";

const QuestionTable = () => {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchTableData = () => {
    setLoader(true);
    questionType
      .getList({
        limit: 10,
        offset: pageToOffset(currentPage),
      })
      .then((res) => {
        setTableData(res.questions);
        setPageCount(Math.ceil(res?.count / 10));
      })
      .finally(() => setLoader(false));
  };

  const deleteTableData = (e, id) => {
    setLoader(true);

    questionType
      .delete(id)
      .then((res) => {
        fetchTableData();
      })
      .catch(() => setLoader(false));
  };

  const navigateToEditForm = (e, id) => {
    navigate(`/asked-questions/${id}`);
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
      columnsCount={6}
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
          columnsCount={3}
          dataLength={tableData?.length}
        >
          {tableData?.map((data, index) => (
            <CTableRow
              key={data.id}
              onClick={() => navigate(`/asked-questions/${data.id}`)}
            >
              <CTableCell>{index + 1}</CTableCell>
              <CTableCell>{data.title_uz}</CTableCell>
              <CTableCell>{data.title_ru}</CTableCell>
              <CTableCell>{data.title_en}</CTableCell>

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

export default QuestionTable;
