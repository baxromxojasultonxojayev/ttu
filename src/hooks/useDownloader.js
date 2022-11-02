import axios from "axios";
import { useCallback, useState } from "react";
import request from "../utils/request";

const useDownloader = () => {
  const [loader, setLoader] = useState(false);

  const download = useCallback(async (url) => {
    setLoader(true);
    try {
      // const res = await request.get(url, {
      //     responseType: "blob",
      // });

      // const imageObjectURL = URL.createObjectURL(res);

      // console.log("RES --->", imageObjectURL);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Заявки");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }, []);

  return [download, loader];
};

export default useDownloader;
