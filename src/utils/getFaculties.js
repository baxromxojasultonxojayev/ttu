import facultyService from "../services/facultyService";

export default function getFaculties(setFaculties) {
  return facultyService
    .getList()
    .then(({ faculties }) => {
      const computed = faculties.map((item) => {
        return {
          label: item.name_uz,
          value: item.id,
        };
      });
      setFaculties(computed);
    })
    .catch((err) => console.log(err));
}
