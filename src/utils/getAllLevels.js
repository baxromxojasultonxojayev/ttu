import educationLevelsService from "../services/educationLevelsService";

export default function getAllLevels(setEducationLevel) {
  return educationLevelsService
    .getList({ limit: 100 })
    .then(({ education_levels }) => {
      const computed = education_levels.map((el) => {
        return {
          label: el.name_uz,
          value: el.id,
        };
      });
      setEducationLevel(computed);
    })
    .catch((err) => console.log(err));
}
