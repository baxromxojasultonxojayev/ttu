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
import HFTextField from "../../components/FormElements/HFTextField";
import HFMultipleSelect from "../../components/FormElements/HFMultipleSelect";

import Header from "../../components/Header";
import educationType from "../../services/educationTypeService";
import TabLanguage from "../../components/TabLanguage";
import getAllSpecialities from "../../utils/getAllSpecialities";

const EducationTypeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ru");
  const [btnLoader, setBtnLoader] = useState(false);
  const [loader, setLoader] = useState(true);
  const [specialities, setSpecialities] = useState([]);

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
      name_ru: "",
      name_uz: "",
      name_en: "",
    },
  });

  useEffect(() => {
    fetchData();
    getAllSpecialities(setSpecialities);
  }, []);

  const fetchData = () => {
    if (!id) return setLoader(false);

    educationType
      .getById(id)
      .then((res) => {
        console.log(res);
        const specialityIds = [];
        if (res?.specialities) {
          res?.specialities.forEach((el) => {
            if (el.id) specialityIds.push(el.id);
          });
        }
        const computed = {
          ...res,
          speciality_ids: specialityIds,
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
      educationType
        .create(data)
        .then((res) => {
          navigate(`/education-type`);
        })
        .finally(() => setBtnLoader(false));
    });
  };

  const update = (data) => {
    setBtnLoader(true);
    educationType
      .update(id, {
        ...data,
      })
      .then((res) => {
        navigate(`/education-type`);
      })
      .finally(() => setBtnLoader(false));
  };

  const handleLangBtn = (lang) => {
    setActiveTab(lang);
    console.log(lang);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header
        loader={loader}
        backButtonLink={"/education-type"}
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
                required={true}
              />
            </FRow>
          </FormCard>
        </div>
        <div style={{ width: "50%" }}>
          <FormCard title="Программы обучения:">
            <HFMultipleSelect
              options={specialities}
              fullWidth
              control={control}
              name="speciality_ids"
            />
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

export default EducationTypeFormPage;
