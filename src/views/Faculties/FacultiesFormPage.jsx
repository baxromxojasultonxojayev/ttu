import { MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CancelButton from "../../components/Buttons/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton";
import FormCard from "../../components/FormCard";
import FRow from "../../components/FormElements/FRow";
import HFImageUpload from "../../components/FormElements/HFImageUpload";
import HFTextField from "../../components/FormElements/HFTextField";
import HFSelect from "../../components/FormElements/HFSelect";
import Header from "../../components/Header";
import facultyService from "../../services/facultyService";
import getAllLevels from "../../utils/getAllLevels";
import TabLanguage from "../../components/TabLanguage";

const FacultiesFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ru");
  const [btnLoader, setBtnLoader] = useState(false);
  const [loader, setLoader] = useState(true);
  const [level, setLevel] = useState("");
  const [educationLevel, setEducationLevel] = useState();

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
      // title: "",
      name_uz: "",
      name_ru: "",
      name_en: "",
    },
  });

  useEffect(() => {
    fetchData();
    getAllLevels(setEducationLevel);
  }, []);

  const fetchData = () => {
    if (!id) return setLoader(false);

    facultyService
      .getById(id)
      .then((res) => {
        const computed = {
          ...res,
          education_level_id: res.education_level?.id,
          image_url: res.image_url,
        };
        reset(computed);
      })
      .finally(() => setLoader(false));
  };

  const onSubmit = (values) => {
    if (id) return update(values);
    create(values);
  };

  const create = (data) => {
    setBtnLoader(true);
    facultyService
      .create({ ...data, education_level_id: `${level}` })
      .then((res) => {
        navigate(`/faculties`);
      })
      .finally(() => setBtnLoader(false));
  };

  const update = (data) => {
    setBtnLoader(true);
    facultyService
      .update(id, {
        ...data,
        // education_level_id: `${level}`,
      })
      .then((res) => {
        navigate(`/faculties`);
      })
      .finally(() => setBtnLoader(false));
  };

  const handleLangBtn = (lang) => {
    setActiveTab(lang);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header
        loader={loader}
        backButtonLink={"/faculties"}
        title="Создать"
      ></Header>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "100%" }}>
          <FormCard visible={!loader} title="Выбранное направление">
            <FRow label="Название">
              <HFTextField
                fullWidth
                control={control}
                name={`name_${activeTab}`}
                value={watch(`name_${activeTab}`)}
                required={true}
              />
            </FRow>
          </FormCard>
        </div>
        <div style={{ width: "100%" }}>
          <FormCard maxWidth="100%" visible={!loader} title="Уровень обучения:">
            <FRow label="Уровни обучения">
              <HFSelect
                options={educationLevel}
                fullWidth
                control={control}
                name="education_level_id"
              />
            </FRow>
            <FRow label="Фото">
              <HFImageUpload control={control} name="image_url" />
            </FRow>
          </FormCard>
        </div>
      </div>
      <Box position="absolute" bottom="0" width="95%">
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

export default FacultiesFormPage;
