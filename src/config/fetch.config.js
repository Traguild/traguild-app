const BASE_URL = "http://103.60.127.72/api";

export const API = {
  /* ***  GET METHOD *** */
  GET: async (obj) => {
    try {
      const url = BASE_URL + obj.url;
      const queryString = new URLSearchParams(obj?.data).toString();
      const fullURL = queryString === "" ? `${url}` : `${url}?${queryString}`;

      const response = await fetch(fullURL);

      const result = await response.json();

      if (result?.message?.includes("index_not_found_exception")) {
        return [];
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await result;
    } catch (error) {
      console.error(error);
    }
  },
  /* ***  POST METHOD *** */
  POST: async (obj) => {
    try {
      const url = BASE_URL + obj.url;
      const data = obj.data == null ? {} : obj.data;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = (await response?.json()) ?? {};

      if (result?.message?.includes("index_not_found_exception")) {
        return [];
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error(error);
    }
  },
  /* ***  PUT METHOD *** */
  PUT: async (obj) => {
    try {
      const url = BASE_URL + obj.url;
      const data = obj.data == null ? {} : obj.data;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result?.message?.includes("index_not_found_exception")) {
        return [];
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await result;
    } catch (error) {
      console.error(error);
    }
  },
  /* ***  DEL METHOD *** */
  DEL: async (obj) => {
    try {
      const url = BASE_URL + obj.url;
      const data = obj.data == null ? {} : obj.data;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.status === 200 ? "Delete Successful" : "Delete failed";
    } catch (error) {
      console.error(error);
    }
  },
};
