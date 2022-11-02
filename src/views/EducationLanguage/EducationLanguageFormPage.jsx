import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CancelButton from "../../components/Buttons/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton";
import FormCard from "../../components/FormCard";
import FRow from "../../components/FormElements/FRow";
import HFTextField from "../../components/FormElements/HFTextField";
import HFMultipleSelect from "../../components/FormElements/HFMultipleSelect";
import Header from "../../components/Header";
import educationLanguagesService from "../../services/educationLanguagesServices";
import getFaculties from "../../utils/getFaculties";
import TabLanguage from "../../components/TabLanguage";
import getAllSpecialities from "../../utils/getAllSpecialities";

const EducationLanguageFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [loader, setLoader] = useState(true);
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
      name_ru: "",
      name_uz: "",
      name_en: "",
    },
  });

  useEffect(() => {
    fetchData();
    getFaculties(setFaculties);
    getAllSpecialities(setSpecialities);
  }, []);

  const fetchData = () => {
    if (!id) return setLoader(false);

    educationLanguagesService
      .getById(id)
      .then((res) => {
        const facultyIds = [];
        if (res?.faculties) {
          res?.faculties.forEach((element) => {
            if (element.id) facultyIds.push(element.id);
          });
        }
        const specialityIds = [];
        if (res?.specailities) {
          res?.specailities.forEach((el) => {
            if (el.id) specialityIds.push(el.id);
          });
        }
        const computed = {
          ...res,
          faculty_ids: facultyIds,
          speciality_ids: specialityIds,
        };
        console.log("res", res);
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
      educationLanguagesService
        .create(data)
        .then((res) => {
          console.log(res);
          navigate(`/education-language`);
        })
        .finally(() => setBtnLoader(false));
    });
  };

  const update = (data) => {
    setBtnLoader(true);
    educationLanguagesService
      .update(id, {
        ...data,
      })
      .then((res) => {
        console.log(res);
        navigate(`/education-language`);
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
        backButtonLink={"/education-language"}
        title="Создать"
      />
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <FormCard title="Выбранное направление">
            <TabLanguage handleLangBtn={handleLangBtn} activeTab={activeTab} />
            <br></br>
            <FRow label={`Название (${activeTab})`}>
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
          <FormCard title="Общие сведение">
            <FRow label="Программы обучения">
              <HFMultipleSelect
                options={specialities}
                fullWidth
                control={control}
                name="speciality_ids"
              />
            </FRow>
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

export default EducationLanguageFormPage;
