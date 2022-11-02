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
import questionType from "../../services/questionType";
import TabLanguage from "../../components/TabLanguage";

const QuestionFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ru");
  const [btnLoader, setBtnLoader] = useState(false);
  const [loader, setLoader] = useState(true);

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
      // ...data,
      title_en: "",
      title_ru: "",
      title_uz: "",
      description_en: "",
      description_ru: "",
      description_uz: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (!id) return setLoader(false);

    questionType
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

  const validateInputField = () => {
    // write down the logic of input field validation
    // const items = {
    //   title_en: "",
    //   title_ru: "",
    //   title_uz: "",
    //   description_en: "",
    //   description_ru: "",
    //   description_uz: "",
    // };
    const langs = ["ru", "uz", "en"];
    const keys = Object.keys(watch());
    for (let i = 0; i < keys.length; i++) {
      if (!watch(keys[i])) {
        console.log("test");
        const lng = keys[i].slice(-2);
        const activeLng = langs.find((data) => data === lng);
        // alert("salom" + activeLng);
        setActiveTab(activeLng);
        return false;
      }
    }

    return true;
  };

  const validate = (arg, next) => {
    if (validateInputField(arg)) {
      next();
      return;
    }
    // write down alert message
    return;
  };

  const create = (data) => {
    console.log("arg");
    validate(data, () => {
      setBtnLoader(true);
      questionType
        .create(data)
        .then((res) => {
          navigate(`/asked-questions`);
        })
        .finally(() => setBtnLoader(false));
    });
  };

  const update = (data) => {
    validate(data, () => {
      setBtnLoader(true);
      questionType
        .update(id, {
          ...data,
        })
        .then((res) => {
          navigate(`/asked-questions`);
        })
        .finally(() => setBtnLoader(false));
    });
  };
  const handleLangBtn = (lang) => {
    setActiveTab(lang);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header
        loader={loader}
        backButtonLink={"/asked-questions"}
        title="Создать"
      />
      <div style={{ width: "100%" }}>
        <FormCard title="Вопрос/Ответ" maxWidth="100%">
          <FRow label="Вопрос">
            <HFTextField
              fullWidth
              control={control}
              name={`title_${activeTab}`}
              value={watch(`title_${activeTab}`)}
              required
            />
          </FRow>
          <FRow label="Ответ ">
            <HFTextField
              // size="medium"
              fullWidth
              control={control}
              name={`description_${activeTab}`}
              value={watch(`description_${activeTab}`)}
              multiline
              rows={3}
              required
            />
          </FRow>
        </FormCard>
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

export default QuestionFormPage;
