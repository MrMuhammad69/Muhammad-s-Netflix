import axios from "axios"
import { ENV_VARS } from "../Config/envVars.js";




export const fetchFromTMBD = async (url)=> {
    const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + ENV_VARS.TMBD_API_KEY
        }
      };
      
      const response = await axios.get(url, options)

      if(response.status !==200){
        throw new Error("Failed to fetch data from TMBD" + response.statusText)
      }

      return response.data

}