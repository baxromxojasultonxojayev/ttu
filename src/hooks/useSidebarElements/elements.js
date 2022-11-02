import Widgets from "@mui/icons-material/Widgets";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import LanguageIcon from "@mui/icons-material/Language";
import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from "@mui/icons-material/School";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import PortraitIcon from "@mui/icons-material/Portrait";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const permission = localStorage.getItem("permissions");

console.log("PERmission ", permission);

export const elements =
  permission === "application"
    ? [
        {
          id: "aplications",
          title: "Заявки",
          path: "/applications",
          icon: FolderSharedIcon,
          // children: [
          //   {
          //     id: 'childPage',
          //     title: 'childPage',
          //     path: '/child-page',
          //     icon: Widgets,
          //   },
          // ],
        },
      ]
    : permission === "callCentre"
    ? [
        {
          id: "aplications",
          title: "Заявки",
          path: "/applications",
          icon: FolderSharedIcon,
        },
        {
          id: "enrolled-students",
          title: "Зачисленные студенты",
          path: "/enrolled-students",
          icon: PortraitIcon,
        },
      ]
    : [
        {
          id: "aplications",
          title: "Заявки",
          path: "/applications",
          icon: FolderSharedIcon,
        },
        {
          id: "enrolled-students",
          title: "Зачисленные студенты",
          path: "/enrolled-students",
          icon: PortraitIcon,
        },
        {
          id: "faculties",
          title: "Факультеты",
          path: "/faculties",
          icon: Widgets,
        },

        {
          id: "speciality",
          title: "Программы обучения",
          path: "/speciality",
          icon: ArticleIcon,
        },
        {
          id: "education-levels",
          title: "Уровни обучения",
          path: "/education-levels",
          icon: SchoolIcon,
        },
        {
          id: "education-type",
          title: "Форма обучения",
          path: "/education-type",
          icon: TextSnippetIcon,
        },
        // {
        //   id: "education-language",
        //   title: "Язык обучения",
        //   path: "/education-language",
        //   icon: LanguageIcon,
        // },
        {
          id: "asked-questions",
          title: "Задаваемые вопросы",
          path: "/asked-questions",
          icon: QuestionAnswerIcon,
        },
      ];
