import specialityService from "../services/specialityService";

export default function getAllSpecialities(setSpecialities) {
  return specialityService
    .getList({
      limit: 100,
    })
    .then(({ specialities }) => {
      const computed = specialities.map((el) => {
        return {
          label: el?.info_uz?.name,
          value: el.id,
        };
      });
      setSpecialities(computed);
    })
    .catch((err) => console.log(err));
}
