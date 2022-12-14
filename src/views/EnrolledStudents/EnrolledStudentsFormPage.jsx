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
        dispatch(showAlert("???????????? ??????????????????", "success"));
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
        title="??????????????"
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
              "??????????????"
              // <div>
              //   <img src="/public/downloadIcon.png" />
              // <p>??????????????</p>
              // </div>
            }
            displaay="flex"
            size="small"
            style={{ width: "100%" }}
            renderValue={(selected) => {
              if (downloadPdf === "") {
                return <em>??????????????</em>;
              }

              return (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={downLoadIcon}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <p style={{ margin: "1px" }}>??????????????</p>
                </div>
              );
              // return selected;
            }}
            value={downloadPdf}
            onChange={(e) => setDownloadPdf(e.target.value)}
          >
            <MenuItem value={"???????? ????????????????"} onClick={invoiceDoc}>
              <img src="/docIcon.png" /> <p>???????? ????????????????</p>
            </MenuItem>
            <MenuItem value={"???????? PDF"} onClick={invoicePdf}>
              <img src="/pdfIcon.png" />
              <p>???????? PDF</p>
            </MenuItem>
            <MenuItem value={"?????????????????????? PDF"} onClick={openPdfLink}>
              <img src="/pdfIcon.png" />
              <p>?????????????????????? PDF </p>
            </MenuItem>
          </Select>
        </Grid>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "700px" }}>
          <FormCard visible={!loader} title="??????????????">
            <FRow label="??????">
              <HFTextField
                fullWidth
                control={control}
                name="first_name"
                placeholder="?????????????? "
                required
                disabled={permission === "application"}
              />
            </FRow>
            <FRow label="??????????????">
              <HFTextField
                fullWidth
                control={control}
                name="last_name"
                placeholder="?????????????? "
                required
                disabled={permission === "application"}
              />
            </FRow>
            <FRow label="????????????????">
              <HFTextField
                fullWidth
                control={control}
                name="patronym"
                placeholder="?????????????? "
                required
              />
            </FRow>
            <FRow label="??????????????">
              <HFTextField
                type="number"
                fullWidth
                control={control}
                name="phone_number"
                placeholder="?????????????? "
                required
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>{" "}
            <FRow label="???????? ??????????????????">
              <HFTextField
                type="number"
                fullWidth
                control={control}
                name="contract_day"
                placeholder="?????????????? "
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            {/* <FRow label="?????????? ??????????????????">
              <HFTextField
                fullWidth
                control={control}
                name="contract_month"
                placeholder="?????????????? "
                required
                disabled={
                  permission === "application" ||
                  permission === "callCentre"
              }
              />
            </FRow> */}
            <FRow label="???????? ???????????? ??????????????????">
              <HFTextField
                fullWidth
                control={control}
                name="contract_pay_deadline"
                placeholder="?????????????? "
                required
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <div style={{ display: "flex", columnGap: "16px" }}>
              <FRow label="?????????? ????????????????">
                <HFTextField
                  fullWidth
                  control={control}
                  name="passport_series"
                  placeholder="AB"
                  required
                  disabled={permission === "callCentre"}
                />
              </FRow>

              <FRow label="H???????? ????????????????">
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
                    ????????????????????, ?????????????????? ?????? ???????? 7 ??????????????
                  </p>
                ) : (
                  ""
                )}
              </FRow>
            </div>
            <div style={{ display: "flex", columnGap: "16px" }}>
              <FRow label="????????????????????">
                <HFImageUpload control={control} name="image_url" />
              </FRow>

              <FRow label="????????????">
                <HFImageUpload control={control} name="image_url" />
              </FRow>
            </div>
            <FRow label="??????????">
              <HFTextField
                fullWidth
                type="text"
                control={control}
                name="passport_pinfl"
                maxLength={14}
                placeholder="?????????????? "
                required
                disabled={permission === "callCentre"}
              />
              {dataInfo?.passport_pinfl.length < 14 ||
              dataInfo?.passport_pinfl.length > 14 ? (
                <p style={{ color: "red", padding: 0, margin: 0 }}>
                  ????????????????????, ?????????????????? ?????? ???????? 14 ??????????????
                </p>
              ) : (
                ""
              )}
            </FRow>
          </FormCard>
        </div>
        <div style={{ width: "700px" }}>
          <FormCard visible={!loader}>
            <FRow label="?????????????????????? ??????????">
              <HFTextField
                fullWidth
                control={control}
                name="contract_number"
                placeholder="?????????????? "
                required
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <FRow label="?????? ??????????????????????">
              <HFTextField
                fullWidth
                control={control}
                name="shift"
                placeholder="?????????????? "
                required
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <FRow label="?????????????????? ??????????????????????">
              <HFTextField
                fullWidth
                control={control}
                name="speciality"
                placeholder="?????????????? "
                required
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <FRow label="?????????????? ??????????????????????">
              <HFSelect
                options={[
                  { label: "????????????????", value: "????????????????" },
                  {
                    label: "????????????????????????",
                    value: "????????????????????????",
                  },
                ]}
                fullWidth
                control={control}
                name="course"
                placeholder="??????????????"
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <FRow label="??????????????????????????????????:">
              <HFSelect
                options={[
                  { label: "1-??????", value: "1-??????" },
                  { label: "2-??????", value: "2-??????" },
                  { label: "3-??????", value: "3-??????" },
                  { label: "4-??????", value: "4-??????" },
                  { label: "5-??????", value: "5-??????" },
                ]}
                fullWidth
                control={control}
                name="course_deadline"
                placeholder="??????????????"
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <FRow label="????????">
              <HFSelect
                options={[
                  { label: "1-????????", value: "1-????????" },
                  { label: "2-????????", value: "2-????????" },
                  { label: "3-????????", value: "3-????????" },
                  { label: "4-????????", value: "4-????????" },
                  { label: "5-????????", value: "5-????????" },
                ]}
                fullWidth
                control={control}
                name="course_number"
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            <FRow label="????????">
              <HFTextField
                type="number"
                fullWidth
                control={control}
                name="price"
                placeholder="?????????????? "
                required
                // type="number"
                disabled={
                  permission === "application" || permission === "callCentre"
                }
              />
            </FRow>
            {/* <FRow label="???????? ????????">
              <HFDatePicker
                // fullWidth
                width={630}
                control={control}
                name="invoice_date"
                placeholder="?????????????? "
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
            <CancelButton title="????????????????" onClick={() => navigate(-1)} />{" "}
            <SaveButton title="??????????????????" type="submit" loading={btnLoader} />
          </>
        }
      ></Header>
    </form>
  );
};

export default EnrolledStudentsFormPage;
