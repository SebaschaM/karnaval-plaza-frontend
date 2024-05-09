import { AxiosError } from "axios";
import { karnavalApi } from "../api/karnavalApi";
import { handleManagmentError } from "../helpers/HookManagmentError";

const useClient = () => {
  const addPersonalInformation = async (data: any) => {
    try {
      const response = await karnavalApi.post("/insert-data", data);
      return response.data;
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  return { addPersonalInformation };
};

export default useClient;
