import educationLanguagesService from "../services/educationLanguagesServices";

export default function getLanguages(setLanguages) {
  return educationLanguagesService
    .getList()
    .then(({ faculty_languages }) => {
      const computed = faculty_languages.map((item) => {
        return {
          label: item.name_uz,
          value: item.id,
        };
      });
      setLanguages(computed);
    })
    .catch((err) => console.log(err));
}
