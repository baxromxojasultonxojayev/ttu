import { useMemo } from "react";
import { useSelector } from "react-redux";
import { elements } from "./elements";
import * as icons from "@mui/icons-material";

const useSidebarElements = () => {
  const constructorElements = useSelector(
    (state) => state.constructorTable.list
  );

  const computedElements = useMemo(() => {
    const computedConstructorElements = constructorElements
      .filter((el) => el.show_in_menu)
      .map((el) => ({
        ...el,
        title: el.label,
        path: `/object/${el.slug}`,
      }));

    return [...computedConstructorElements, ...elements];
  }, [constructorElements]);

  return { elements: computedElements ?? [] };
};

export default useSidebarElements;
