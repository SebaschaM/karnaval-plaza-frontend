import { AxiosError } from "axios";
import { karnavalApi } from "../api/karnavalApi";
import { handleManagmentError } from "../helpers/HookManagmentError";

const useClient = () => {
  const addPersonalInformation = async (data: any) => {
    try {
      const response = await karnavalApi.post("/client/insert-data", data);
      return response.data;
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const getPersonalInformation = async () => {
    try {
      const response = await karnavalApi.get("/client/get-data");
      return response.data;
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  return { addPersonalInformation, getPersonalInformation };
};

export default useClient;
