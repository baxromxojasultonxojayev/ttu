import { Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CancelButton from "../../components/Buttons/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton";
import FormCard from "../../components/FormCard";
import FRow from "../../components/FormElements/FRow";
import HFDatePicker from "../../components/FormElements/HFDatePicker";
import HFImageUpload from "../../components/FormElements/HFImageUpload";
import HFSelect from "../../components/FormElements/HFSelect";
import HFTextField from "../../components/FormElements/HFTextField";
import Header from "../../components/Header";
import enrolledStudentsService from "../../services/enrolledStudentService";
import downLoadIcon from "./download.png";
import { showAlert } from "../../store/alert/alert.thunk";

const EnrolledStudentsFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [downloadPdf, setDownloadPdf] = useState();
  const [dataInfo, setDataInfo] = useState();
  const [btnLoader, setBtnLoader] = useState(false);
  const [loader, setLoader] = useState(true);
  const [url, setURL] = useState("");
  const permission = localStorage.getItem("permissions");

  const breadCrumbItems = [
    {
      label: "Positions",
    },
    {
      label: "Create",
    },
  ];

  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      // title: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (!id) return setLoader(false);

    enrolledStudentsService
      .getById(id)
      .then((res) => {
        console.log("res", res);
        // setURL(res.contract_url);
        reset(res);
        setDataInfo(res);
      })
      .finally(() => setLoader(false));
  };

  const onSubmit = (values) => {
    console.log(id);
    if (id) {
      dowloadContract();
      return update(values);
    }
    create(values);
  };

  const dowloadContract = () => {
    const dataValue = getValues();
    const former = {
      contract_day: dataValue.contract_day,
      contract_month: dataValue.contract_month,
      contract_number: dataValue.contract_number,
      contract_pay_deadline: dataValue.contract_pay_deadline,
      course: dataValue.course,
      course_deadline: dataValue.course_deadline,
      course_number: dataValue.course_number,
      first_name: dataValue.first_name,
      id: dataValue.id,
      last_name: dataValue.last_name,
      patronym: dataValue.patronym,
      phone_number: dataValue.phone_number,
      price: String(dataValue.price).replace(/\s+/g, ""),
      price_in_characters: dataValue.price_in_characters,
      shift: dataValue.shift,
      speciality: dataValue.speciality,
      order_number: dataValue.order_number,
      invoice_date: dataValue.invoice_date,
      price_in_characters_ru: dataValue.price_in_characters_ru,
      panel:
        permission === "application" || permission === "callCentre"
          ? "APPLICATION"
          : undefined,
    };
    enrolledStudentsService
      .postTouContract(former)
      .then((link) => {
        // if (permission === "application" || permission === "callCentre") {
        // openPdf(link?.file_url);
        console.log("link", link);
        // }
      })
      .catch((err) => {
        setBtnLoader(false);
      })
      .finally(() => {
        setBtnLoader(false);
      });
  };

  const create = (data) => {
    setBtnLoader(true);
    enrolledStudentsService
      .create({
        ...data,
      })
      .then((res) => {
        // dowloadContract();

        navigate(`/enrolled-students`);
      })
      .finally(() => setBtnLoader(false));
  };

  const update = (data) => {
    setBtnLoader(true);
    enrolledStudentsService
      .update(id, {
        ...data,
      })
      .then((res) => {
        reset(res);
        console.log(res);
        dispatch(showAlert("Данные сохранены", "success"));
        window.location.reload();
      })
      .finally(() => setBtnLoader(false));
  };
  console.log(url);

  const openPdfLink = (url = dataInfo.contract_url) => {
    // if (permission === "application" || permission === "callCentre") {
    //   downloadAgreement();
    // } else {
    console.log(dataInfo);
    window.open(
      dataInfo.contract_url.includes("https")
        ? dataInfo.contract_url
        : `https://${dataInfo.contract_url}`,
      "_blank"
    );
    // }
  };
  const invoiceDoc = (url = dataInfo.invoice_url_docx) => {
    window.open(
      dataInfo.invoice_url_docx.includes("https")
        ? dataInfo.invoice_url_docx
        : `https://${dataInfo.invoice_url_docx}`,
      "_blank"
    );
  };

  const invoicePdf = (url = dataInfo.invoice_url_pdf) => {
    // if (permission === "application" || permission === "callCentre") {
    //     downloadAgreement();
    // } else {
    window.open(
      dataInfo.invoice_url_pdf.includes("https")
        ? dataInfo.invoice_url_pdf
        : `https://${dataInfo.invoice_url_pdf}`,
      "_blank"
    );
    // }
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header
        loader={loader}
        backButtonLink={"/enrolled-students"}
        title="Создать"
      ></Header>
      <div
        style={{
          background: "#FFFFFF",
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        <Grid item>
          <Select
            defaultValue={
              "Скачать"
              // <div>
              //   <img src="/public/downloadIcon.png" />
              // <p>Скачать</p>
              // </div>
            }
            displaay="flex"
            size="small"
            style={{ width: "100%" }}
            renderValue={(selected) => {
              if (downloadPdf === "") {
                return <em>Скачать</em>;
              }

              return (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={downLoadIcon}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <p style={{ margin: "1px" }}>Скачать</p>
                </div>
              );
              // return selected;
            }}
            value={downloadPdf}
            onChange={(e) => setDownloadPdf(e.target.value)}
          >
            <MenuItem value={"Счет Документ"} onClick={invoiceDoc}>
              <img src="/docIcon.png" /> <p>Счет Документ</p>
            </MenuItem>
            <MenuItem value={"Счет PDF"} onClick={invoicePdf}>
              <img src="/pdfIcon.png" />
              <p>Счет PDF</p>
            </MenuItem>
            <MenuItem value={"Контрактный PDF"} onClick={openPdfLink}>
              <img src="/pdfIcon.png" />
              <p>Контрактный PDF </p>
            </MenuItem>
          </Select>
        </Grid>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "700px" }}>
          <FormCard visible={!loader} title="Профиль">
            <FRow label="Имя">
              <HFTextField
                fullWidth
                control={control}
                name="first_name"
                placeholder="Введите "
                required
                disabled={permission === "application"}
              />
            </FRow>
            <FRow label="Фамилия">
              <HFTextField
                fullWidth
                control={control}
                name="last_name"
                placeholder="Введите "
                required
                disabled={permission === "application"}
              />
            </FRow>
            <FRow label="Отчество">
              <HFTextField
                fullWidth
                control={control}
                name="patronym"
                placeholder="Введите "
                required
              />
            </FRow>
            <FRow label="Телефон">
              <HFTextField
                type="number"
                fullWidth
                control={control}
                name="phone_number"
                placeholder="Введите "
                required
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>{" "}
            <FRow label="День контракта">
              <HFTextField
                type="number"
                fullWidth
                control={control}
                name="contract_day"
                placeholder="Введите "
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            {/* <FRow label="Месяц контракта">
              <HFTextField
                fullWidth
                control={control}
                name="contract_month"
                placeholder="Введите "
                required
                disabled={
                  permission === "application" ||
                  permission === "callCentre"
              }
              />
            </FRow> */}
            <FRow label="Срок оплаты контракта">
              <HFTextField
                fullWidth
                control={control}
                name="contract_pay_deadline"
                placeholder="Введите "
                required
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <div style={{ display: "flex", columnGap: "16px" }}>
              <FRow label="Серия паспорта">
                <HFTextField
                  fullWidth
                  control={control}
                  name="passport_series"
                  placeholder="AB"
                  required
                  disabled={permission === "callCentre"}
                />
              </FRow>

              <FRow label="Hомер паспорта">
                <HFTextField
                  type="number"
                  fullWidth
                  control={control}
                  name="passport_number"
                  onKeyDown={blockInvalidChar}
                  placeholder="12345678"
                  required
                  disabled={permission === "callCentre"}
                />
                {dataInfo?.passport_number.length < 7 ||
                dataInfo?.passport_number.length > 7 ? (
                  <p style={{ color: "red", padding: 0, margin: 0 }}>
                    Пожалуйста, заполните это поле 7 цифрами
                  </p>
                ) : (
                  ""
                )}
              </FRow>
            </div>
            <div style={{ display: "flex", columnGap: "16px" }}>
              <FRow label="Сертификат">
                <HFImageUpload control={control} name="image_url" />
              </FRow>

              <FRow label="Диплом">
                <HFImageUpload control={control} name="image_url" />
              </FRow>
            </div>
            <FRow label="ПИНФЛ">
              <HFTextField
                fullWidth
                type="text"
                control={control}
                name="passport_pinfl"
                maxLength={14}
                placeholder="Введите "
                required
                disabled={permission === "callCentre"}
              />
              {dataInfo?.passport_pinfl.length < 14 ||
              dataInfo?.passport_pinfl.length > 14 ? (
                <p style={{ color: "red", padding: 0, margin: 0 }}>
                  Пожалуйста, заполните это поле 14 цифрами
                </p>
              ) : (
                ""
              )}
            </FRow>
          </FormCard>
        </div>
        <div style={{ width: "700px" }}>
          <FormCard visible={!loader}>
            <FRow label="Контрактный номер">
              <HFTextField
                fullWidth
                control={control}
                name="contract_number"
                placeholder="Введите "
                required
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <FRow label="Тип образования">
              <HFTextField
                fullWidth
                control={control}
                name="shift"
                placeholder="Введите "
                required
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <FRow label="Выбранное направление">
              <HFTextField
                fullWidth
                control={control}
                name="speciality"
                placeholder="Введите "
                required
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <FRow label="Уровень образования">
              <HFSelect
                options={[
                  { label: "Бакалавр", value: "Бакалавр" },
                  {
                    label: "Магистратура",
                    value: "Магистратура",
                  },
                ]}
                fullWidth
                control={control}
                name="course"
                placeholder="Введите"
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <FRow label="Продолжительность:">
              <HFSelect
                options={[
                  { label: "1-йил", value: "1-йил" },
                  { label: "2-йил", value: "2-йил" },
                  { label: "3-йил", value: "3-йил" },
                  { label: "4-йил", value: "4-йил" },
                  { label: "5-йил", value: "5-йил" },
                ]}
                fullWidth
                control={control}
                name="course_deadline"
                placeholder="Введите"
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <FRow label="Курс">
              <HFSelect
                options={[
                  { label: "1-курс", value: "1-курс" },
                  { label: "2-курс", value: "2-курс" },
                  { label: "3-курс", value: "3-курс" },
                  { label: "4-курс", value: "4-курс" },
                  { label: "5-курс", value: "5-курс" },
                ]}
                fullWidth
                control={control}
                name="course_number"
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <FRow label="Цена">
              <HFTextField
                type="number"
                fullWidth
                control={control}
                name="price"
                placeholder="Введите "
                required
                // type="number"
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            {/* <FRow label="Счет Дата">
              <HFDatePicker
                // fullWidth
                width={630}
                control={control}
                name="invoice_date"
                placeholder="Введите "
                openuni
                required
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow> */}
          </FormCard>
        </div>
      </div>
      <Header
        loader={loader}
        extra={
          <>
            <CancelButton title="Отменить" onClick={() => navigate(-1)} />{" "}
            <SaveButton title="Сохранить" type="submit" loading={btnLoader} />
          </>
        }
      ></Header>
    </form>
  );
};

export default EnrolledStudentsFormPage;
