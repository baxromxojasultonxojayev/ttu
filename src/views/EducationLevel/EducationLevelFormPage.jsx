import React, { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CancelButton from "../../components/Buttons/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton";
import CBreadcrumbs from "../../components/CBreadcrumbs";
import FormCard from "../../components/FormCard";
import FRow from "../../components/FormElements/FRow";
import HFImageUpload from "../../components/FormElements/HFImageUpload";
import HFTextField from "../../components/FormElements/HFTextField";
import HFMultipleSelect from "../../components/FormElements/HFMultipleSelect";

import Header from "../../components/Header";
import educationLevelsService from "../../services/educationLevelsService";
import getAllFaculties from "../../utils/getFaculties";
import TabLanguage from "../../components/TabLanguage";

const EducationLevelFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [btnLoader, setBtnLoader] = useState(false);
  const [loader, setLoader] = useState(true);
  const [faculties, setFacultes] = useState([]);
  const [activeTab, setActiveTab] = useState("ru");

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
      name_en: "",
      name_uz: "",
      name_ru: "",
    },
  });

  useEffect(() => {
    fetchData();
    getAllFaculties(setFacultes);
  }, []);

  const fetchData = () => {
    if (!id) return setLoader(false);

    educationLevelsService
      .getById(id)
      .then((res) => {
        const facultyId = [];
        console.log("res", res);
        if (res?.faculties) {
          res?.faculties.forEach((el) => {
            el.id && facultyId.push(el.id);
          });
        }

        const computed = {
          ...res,
          faculty_ids: facultyId,
        };
        reset(computed);
      })
      .finally(() => setLoader(false));
  };

  const onSubmit = (values) => {
    if (id) return update(values);
    create(values);
  };

  const validateInput = () => {
    const langs = ["ru", "uz", "en"];
    const keys = Object.keys(watch());

    for (let i = 0; i < keys.length; i++) {
      if (!watch(keys[i])) {
        const lng = keys[i].slice(-2);
        const activeLang = langs.find((data) => data === lng);
        setActiveTab(activeLang);
        return false;
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
      educationLevelsService
        .create(data)
        .then((res) => {
          navigate(`/education-levels`);
        })
        .finally(() => setBtnLoader(false));
    });
  };

  const update = (data) => {
    setBtnLoader(true);
    educationLevelsService
      .update(id, {
        ...data,
      })
      .then((res) => {
        navigate(`/education-levels`);
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
        backButtonLink={"/education-levels"}
        title="Создать"
      />
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <FormCard title="Выбранное направление">
            <FRow label="Название">
              <HFTextField
                fullWidth
                control={control}
                name={`name_${activeTab}`}
                value={watch(`name_${activeTab}`)}
                required
              />
            </FRow>
          </FormCard>
        </div>
        <div style={{ width: "50%" }}>
          <FormCard title="Факультеты:">
            <FRow label="Факультеты">
              <HFMultipleSelect
                options={faculties}
                fullWidth
                control={control}
                name="faculty_ids"
              />
            </FRow>
          </FormCard>
        </div>
      </div>
      <Box position="absolute" bottom="0" width="95.6%">
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

export default EducationLevelFormPage;
