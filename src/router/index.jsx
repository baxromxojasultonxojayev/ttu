import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../views/Auth/Login";
import Registration from "../views/Auth/Registration";
import ApplicationFormPage from "../views/Applications/ApplicationsFormPage";
import ApplicationPage from "../views/Applications";
import EnrolledStudentsPage from "../views/EnrolledStudents";
import EnrolledStudentsFormPage from "../views/EnrolledStudents/EnrolledStudentsFormPage";
import FacultiesPage from "../views/Faculties";
import FacultiesFormPage from "../views/Faculties/FacultiesFormPage";
import SpecialityPage from "../views/Speciality";
import SpecialityFormPage from "../views/Speciality/SpecialityFormPage";
import EducationLevelPage from "../views/EducationLevel/index";
import EducationLevelFormPage from "../views/EducationLevel/EducationLevelFormPage";
import EducationTypeFormPage from "../views/EducationType/EducationTypeFormPage";
import EducationTypePage from "../views/EducationType";
import EducationLAnguagePage from "../views/EducationLanguage";
import EducationLanguageFormPage from "../views/EducationLanguage/EducationLanguageFormPage";
import QuestionsPage from "../views/Questions";
import QuestionFormPage from "../views/Questions/QuestionFormPage";

const Router = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const permission = localStorage.getItem("permissions");
  console.log(
    "isAuth",
    permission
  );
  if (!isAuth)
    return (
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login " />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <Navigate
              to={
                permission === "application"
                  ? "/enrolled-students"
                  : "/applications"
              }
            />
          }
        />
        <Route path="applications" element={<ApplicationPage />} />
        <Route path="applications/create" element={<ApplicationFormPage />} />
        <Route path="applications/:id" element={<ApplicationFormPage />} />

        <Route path="enrolled-students" element={<EnrolledStudentsPage />} />
        <Route
          path="enrolled-students/create"
          element={<EnrolledStudentsFormPage />}
        />
        <Route
          path="enrolled-students/:id"
          element={<EnrolledStudentsFormPage />}
        />

        <Route path="faculties" element={<FacultiesPage />} />
        <Route path="faculties/create" element={<FacultiesFormPage />} />
        <Route path="faculties/:id" element={<FacultiesFormPage />} />

        <Route path="speciality" element={<SpecialityPage />} />
        <Route path="speciality/create" element={<SpecialityFormPage />} />
        <Route path="speciality/:id" element={<SpecialityFormPage />} />

        <Route path="education-levels" element={<EducationLevelPage />} />
        <Route
          path="education-levels/create"
          element={<EducationLevelFormPage />}
        />
        <Route
          path="education-levels/:id"
          element={<EducationLevelFormPage />}
        />

        <Route path="education-type" element={<EducationTypePage />} />
        <Route
          path="education-type/create"
          element={<EducationTypeFormPage />}
        />
        <Route path="education-type/:id" element={<EducationTypeFormPage />} />

        <Route path="education-language" element={<EducationLAnguagePage />} />
        <Route
          path="education-language/create"
          element={<EducationLanguageFormPage />}
        />
        <Route
          path="education-language/:id"
          element={<EducationLanguageFormPage />}
        />

        <Route path="asked-questions" element={<QuestionsPage />} />

        <Route path="asked-questions/create" element={<QuestionFormPage />} />
        <Route path="asked-questions/:id" element={<QuestionFormPage />} />

        {/* <Route path="*" element={<Navigate to="positions" />} /> */}
      </Route>
      {/* <Route path="*" element={<Navigate to="positions" />} /> */}
    </Routes>
  );
};

export default Router;
