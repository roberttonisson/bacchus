import Axios from 'axios';

export abstract class BaseService {

    /*
    Create new axios with configurations, used to make request to the API.
    Request are made through proxy server to avoid CORS-policy at http://localhost:3080.
    More information about the app can be found at https://github.com/Rob--W/cors-anywhere/ and https://cors-anywhere.herokuapp.com/ .
    */
    static axios = Axios.create(
        {

            baseURL: "http://localhost:3080/api/Auction",

            headers: {
                'Content-Type': 'application/json',
                'Target-URL': 'http://uptime-auction-api.azurewebsites.net'
            }
        }
    );

    /*Generic method to make all the GET request without the id.*/
    //TODO: needs better error handling.
    static async getEntities<T>(): Promise<T[]> {
        try {
            const response = await this.axios
                .get('');
            // OK Response
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            }
            // something went wrong
            return [];

        } catch (reason) {
            return [];
        }
    }

}
