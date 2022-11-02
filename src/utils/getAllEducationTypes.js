import educationTypeService from "../services/educationTypeService";

export default function getAllEducationTypes(setEducationType) {
  return educationTypeService
    .getList({ limit: 100 })
    .then(({ education_types }) => {
      const computed = education_types.map((el) => {
        return {
          label: el.name_uz,
          value: el.id,
        };
      });
      setEducationType(computed);
    })
    .catch((err) => console.log(err));
}
