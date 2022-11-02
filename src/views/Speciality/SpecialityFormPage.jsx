import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CancelButton from "../../components/Buttons/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton";
import FormCard from "../../components/FormCard";
import FRow from "../../components/FormElements/FRow";
import HFImageUpload from "../../components/FormElements/HFImageUpload";
import HFSelect from "../../components/FormElements/HFSelect";
import HFTextField from "../../components/FormElements/HFTextField";
import Header from "../../components/Header";
import TabLanguage from "../../components/TabLanguage";
import specialityService from "../../services/specialityService";
import { showAlert } from "../../store/alert/alert.thunk";
import getAllEducationTypes from "../../utils/getAllEducationTypes";
import getAllFaculties from "../../utils/getFaculties";
import getLanguages from "../../utils/getLanguages";
import { data } from "./data";
import "./style.scss";

const SpecialityFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ru");
  const [btnLoader, setBtnLoader] = useState(false);
  const [loader, setLoader] = useState(true);
  const [faculties, setFaculties] = useState([]);
  const [educationType, setEducationType] = useState([]);
  const [languages, setLanguages] = useState([]);
  const dispatch = useDispatch();

  const breadCrumbItems = [
    {
      label: "Positions",
    },
    {
      label: "Create",
    },
  ];

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      ...data,
    },
  });

  useEffect(() => {
    fetchData();
    getAllFaculties(setFaculties);
    getAllEducationTypes(setEducationType);
    getLanguages(setLanguages);
  }, []);

  const fetchData = () => {
    if (!id) return setLoader(false);

    specialityService
      .getById(id)
      .then((res) => {
        const computed = {
          ...res,
          education_type_id: res?.education_type?.id,
          faculty_id: res?.faculty.id,
          faculty_language_id: res.faculty_language && res.faculty_language.id,
        };
        reset(computed);
      })
      .catch((err) => {
        console.log("ERR ===>", err);
      })
      .finally(() => setLoader(false));
  };
  const onSubmit = (values) => {
    if (id) return update(values);
    create(values);
  };

  const validateInput = () => {
    const langs = ["ru", "en", "uz"];
    const keys = Object.keys(watch());
    for (let i = 0; i < keys.length; i++) {
      const lng = keys[i].slice(-2);
      const activeLang = langs.find((data) => data === lng);
      if (activeLang && typeof watch(keys[i]) === "object") {
        const keys2 = Object.keys(watch(keys[i]));
        for (let j = 0; j < keys2.length; j++) {
          if (!watch(keys[i])[keys2[j]]) {
            setActiveTab(activeLang);
            return;
          }
        }
      }
    }
    return true;
  };

  const validate = (arg, next) => {
    if (validateInput(arg)) {
      next();
      return;
    }
    return;
  };

  const create = (data) => {
    validate(data, () => {
      setBtnLoader(true);
      specialityService
        .create({ ...data, price: data.price ? +data.price : 0 })
        .then((res) => {
          console.log(res);
          navigate(`/speciality`);
          dispatch(showAlert("Успешно сохранено", "success"));
        })
        .finally(() => setBtnLoader(false));
    });
  };
  const update = (data) => {
    setBtnLoader(true);
    specialityService
      .update(id, {
        ...data,
        price: data.price ? +data.price : 0,
      })
      .then((res) => {
        console.log("res", res);
        dispatch(showAlert("Успешно сохранено", "success"));
        navigate(`/speciality`);
      })
      .finally(() => setBtnLoader(false));
  };

  const handleLangBtn = (lang) => {
    setActiveTab(lang);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header loader={loader} backButtonLink={"/speciality"} title="Создать" />
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <FormCard visible={!loader} title="Общие сведение">
            <FRow label="Название">
              <HFTextField
                fullWidth
                control={control}
                name={`info_${activeTab}.name`}
                value={watch(`info_${activeTab}.name`)}
                required={true}
                placeholder="Введите "
              />
            </FRow>
            <FRow label="Описание">
              <HFTextField
                fullWidth
                control={control}
                name={`info_${activeTab}.description`}
                value={watch(`info_${activeTab}.description`)}
                multiline
                rows={4}
                required={true}
                placeholder="Введите "
              />
            </FRow>
            <div style={{ display: "flex" }}>
              <FRow label="Форма обучения">
                <HFSelect
                  options={educationType}
                  fullWidth
                  control={control}
                  required={true}
                  name="education_type_id"
                />
                {/* <HFMultipleSelect
                  options={educationType}
                  fullWidth
                  control={control}
                  name="education_types"
                /> */}
              </FRow>

              <p style={{ margin: "0 8px" }}></p>
              <FRow label="Приём">
                <HFTextField
                  fullWidth
                  control={control}
                  name={`info_${activeTab}.visiting_month`}
                  value={watch(`info_${activeTab}.visiting_month`)}
                  required={true}
                  placeholder="Введите "
                />
              </FRow>
            </div>
            <FRow label="Срок">
              <HFTextField
                fullWidth
                control={control}
                name={`info_${activeTab}.deadline`}
                value={watch(`info_${activeTab}.deadline`)}
                required={true}
                placeholder="Введите "
              />
            </FRow>

            <FRow label="Цены">
              <HFTextField
                fullWidth
                control={control}
                name={`info_${activeTab}.price_in_word`}
                value={watch(`info_${activeTab}.price_in_word`)}
                required={true}
                placeholder="Введите"
              />
            </FRow>
            <FRow label="Вступительный экзамен">
              <HFTextField
                fullWidth
                control={control}
                name={`info_${activeTab}.diplom`}
                value={watch(`info_${activeTab}.diplom`)}
                required={true}
                placeholder="Введите"
              />
            </FRow>

            <FRow label="Документы">
              <HFTextField
                fullWidth
                control={control}
                name={`info_${activeTab}.document_info`}
                value={watch(`info_${activeTab}.document_info`)}
                required={true}
                placeholder="Введите"
              />
            </FRow>
          </FormCard>
        </div>
        <div style={{ width: "50%" }}>
          <FormCard visible={!loader} title="Фото">
            <HFImageUpload
              style={{ width: "100%" }}
              control={control}
              name="image_url"
              required={true}
            />
          </FormCard>

          <div style={{ marginTop: "-16px" }}>
            <FormCard visible={!loader} title="Факультет">
              <HFSelect
                options={faculties}
                fullWidth
                control={control}
                name="faculty_id"
                required={true}
              />
            </FormCard>
          </div>
        </div>
      </div>
      <Box width="100%">
        <Header
          loader={loader}
          extra={
            <>
              <CancelButton title="Отменить" onClick={() => navigate(-1)} />{" "}
              <SaveButton title="Сохранить" type="submit" loading={btnLoader} />
            </>
          }
        ></Header>
      </Box>
    </form>
  );
};

export default SpecialityFormPage;
