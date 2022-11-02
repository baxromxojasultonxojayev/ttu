import { useEffect } from "react";
import { useDispatch } from "react-redux";



const GlobalFunctionsProvider = () => {
  const dispatch = useDispatch()

  useEffect(() => {

  }, [dispatch])


  return null;
}
 
export default GlobalFunctionsProvider;