import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CancelButton from "../../components/Buttons/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton";
import CBreadcrumbs from "../../components/CBreadcrumbs";
import FormCard from "../../components/FormCard";
import FRow from "../../components/FormElements/FRow";
import HFTextField from "../../components/FormElements/HFTextField";
import HFDatePicker from "../../components/FormElements/HFDatePicker";
import HFSwitch from "../../components/FormElements/HFSwitch";
import Header from "../../components/Header";
import applicationsService from "../../services/applicationsService";
import { useDispatch } from "react-redux";
import { showAlert } from "../../store/alert/alert.thunk";
import HFImageUpload from "../../components/FormElements/HFImageUpload";

const PositionsFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const permission = localStorage.getItem("permissions");
  const [btnLoader, setBtnLoader] = useState(false);
  const [loader, setLoader] = useState(true);
  const [info, setInfo] = useState();

  const breadCrumbItems = [
    {
      label: "Positions",
    },
    {
      label: "Create",
    },
  ];

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      // title: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (!id) return setLoader(false);

    applicationsService
      .getById(id)
      .then((res) => {
        reset(res);
      })
      .finally(() => setLoader(false));
  };

  const onSubmit = (values) => {
    if (id) return update(values);
    create(values);
  };

  const create = (data) => {
    setBtnLoader(true);
    applicationsService
      .create({
        ...data,
        passport_number: data.passport_number ? +data.passport_number : 0,
      })
      .then((res) => {
        navigate(`/applications`);

        console.log(res);
      })
      .catch((err) => {
        if (
          err.data ===
          'rpc error: code = InvalidArgument desc = ERROR: duplicate key value violates unique constraint "application_passport_pinfl_idx" (SQLSTATE 23505)'
        ) {
          dispatch(showAlert("Повторяющийся номер PINFL", "error"));
        } else if (
          err.data ===
          'rpc error: code = InvalidArgument desc = ERROR: duplicate key value violates unique constraint "application_passport_idx" (SQLSTATE 23505)'
        ) {
          dispatch(showAlert("Дубликат паспорта серии", "error"));
        } else if (
          err.data ===
          'rpc error: code = InvalidArgument desc = ERROR: duplicate key value violates unique constraint "application_phone_number_idx" (SQLSTATE 23505)'
        ) {
          dispatch(showAlert("Дублирующий номер телефона", "error"));
        } else if (err.data === "passport_pinfl must be 14 digits") {
          dispatch(
            showAlert("Номер PINFL должен состоять из 14 цифр", "error")
          );
        } else if (err.data === "passport_number must be 7 digits") {
          dispatch(
            showAlert("Номер паспорта должен состоять из 7 цифр", "error")
          );
        }
      })
      .finally(() => setBtnLoader(false));
  };

  const update = (data) => {
    setInfo(data);
    setBtnLoader(true);
    applicationsService
      .update(id, {
        ...data,
        passport_number: data.passport_number ? +data.passport_number : 0,
      })
      .then((res) => {
        // navigate(`/applications`);
        dispatch(showAlert("Данные сохранены", "success"));
        window.location.reload();
      })
      .catch((err) => {
        if (
          err.data ===
          'rpc error: code = InvalidArgument desc = ERROR: duplicate key value violates unique constraint "application_passport_pinfl_idx" (SQLSTATE 23505)'
        ) {
          dispatch(showAlert("Повторяющийся номер PINFL", "error"));
        } else if (
          err.data ===
          'rpc error: code = InvalidArgument desc = ERROR: duplicate key value violates unique constraint "application_passport_idx" (SQLSTATE 23505)'
        ) {
          dispatch(showAlert("Дубликат паспорта серии", "error"));
        } else if (
          err.data ===
          'rpc error: code = InvalidArgument desc = ERROR: duplicate key value violates unique constraint "application_phone_number_idx" (SQLSTATE 23505)'
        ) {
          dispatch(showAlert("Дублирующий номер телефона", "error"));
        } else if (err.data === "passport_pinfl must be 14 digits") {
          dispatch(
            showAlert("Номер PINFL должен состоять из 14 цифр", "error")
          );
        } else if (err.data === "passport_number must be 7 digits") {
          dispatch(
            showAlert("Номер паспорта должен состоять из 7 цифр", "error")
          );
        }
      })
      .finally(() => setBtnLoader(false));
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header
        loader={loader}
        backButtonLink={"/applications"}
        title="Создать"
      ></Header>
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
              />
            </FRow>
            <FRow label="Фамилия">
              <HFTextField
                fullWidth
                control={control}
                name="last_name"
                placeholder="Введите "
                required
              />
            </FRow>
            <FRow label="Отчество">
              <HFTextField
                fullWidth
                control={control}
                name="third_name"
                placeholder="Введите "
                required
              />
            </FRow>
            <FRow label="Дата рождения">
              <HFDatePicker
                // fullWidth
                width={630}
                control={control}
                name="date_of_birth"
                placeholder="Введите "
                disabled={permission === "callCentre"}
              />
            </FRow>
            <FRow label="Телефон">
              <HFTextField
                fullWidth
                control={control}
                name="phone_number"
                placeholder="Введите "
                required
                disabled={permission === "callCentre"}
              />
            </FRow>{" "}
            <FRow label="Создано">
              <HFTextField
                fullWidth
                control={control}
                name="created_at"
                placeholder="Введите "
                disabled
              />
            </FRow>
            <FRow label="Обновлено">
              <HFTextField
                fullWidth
                control={control}
                name="updated_at"
                placeholder="Введите "
                disabled
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
                {info?.passport_number.length < 7 ||
                info?.passport_number.length > 7 ? (
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
              {info?.passport_pinfl.length < 14 ||
              info?.passport_pinfl.length > 14 ? (
                <p style={{ color: "red", padding: 0, margin: 0 }}>
                  Пожалуйста, заполните это поле 14 цифрами
                </p>
              ) : (
                ""
              )}
            </FRow>
            {/* <FRow label="Может редактировать">
              <HFSwitch control={control} name="can_edit" />
            </FRow> */}
          </FormCard>
        </div>
        <div style={{ width: "700px" }}>
          <FormCard visible={!loader} title="Выбранное направление">
            <FRow label="Программы обучения">
              <HFTextField
                fullWidth
                control={control}
                name="speciality"
                placeholder="Введите "
                required
                disabled={permission === "callCentre"}
              />
            </FRow>
            {/* <FRow label="Уровни обучения">
              <HFTextField
                fullWidth
                control={control}
                name="education_level"
                placeholder="Введите "
                required
                disabled={permission === "callCentre"}
              />
            </FRow> */}
            <FRow label="Форма обучения">
              <HFTextField
                fullWidth
                control={control}
                name="education_type"
                placeholder="Введите "
                required
                disabled={permission === "callCentre"}
              />
            </FRow>
          </FormCard>
        </div>
      </div>
      {/* <Box position="absolute" bottom="0" width="100%"> */}
      <Header
        loader={loader}
        extra={
          <>
            <CancelButton title="Отменить" onClick={() => navigate(-1)} />{" "}
            <SaveButton title="Сохранить" type="submit" loading={btnLoader} />
          </>
        }
      ></Header>
      {/* </Box> */}
    </form>
  );
};

export default PositionsFormPage;
