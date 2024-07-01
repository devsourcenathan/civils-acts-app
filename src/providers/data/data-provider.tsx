import { CrudFilter, CrudFilters, DataProvider, LogicalFilter } from "@refinedev/core";
import { API_URL, CV_ID_KEY, CV_ROLE_KEY } from "..";



const fetcher = async (url: string, options?: RequestInit) => fetch(url, {
    ...options,
    headers: {
        ...options?.headers,
        'Content-Type': 'application/json'
    },
});



export const dataProvider: DataProvider = {

    getList: async ({ resource }) => {

        if (resource === "dashboard") {
            return null
        }

        const token = localStorage.getItem(CV_ROLE_KEY);
        if (!token) {
            return null;
        }
        const response = await fetcher(`${API_URL}/${resource}`);

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json();


        return {
            data
        };

    },
    any: async ({ resource, ids, meta }) => {

        const token = localStorage.getItem(CV_ROLE_KEY);
        if (!token) {
            return null;
        }

        const response = await fetcher(`${API_URL}/${resource}/${ids}`)

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json();

        return {
            data
        };
    },

    create: async ({ resource, variables, meta }) => {



        const token = localStorage.getItem(CV_ROLE_KEY);
        const ID = localStorage.getItem(CV_ID_KEY) ?? 0;
        if (!token) {
            return null;
        }

        const response = await fetcher(`${API_URL}/${resource}`, {
            method: "POST",
            body: JSON.stringify({ ...variables, idutilisateurs: Number(ID) }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json();
        return {
            data
        };

    },

    update: async ({ resource, id, variables, meta }) => {

        console.log("update", {
            resource,
            id,
            variables,
            meta,
        });

        // TODO: send request to the API
        // const response = await httpClient.post(url, {});

        return {
            data: {} as any,
        };

    },

    getOne: async ({ resource, id, meta }) => {

        const token = localStorage.getItem(CV_ROLE_KEY);
        if (!token) {
            return null;
        }

        const response = await fetcher(`${API_URL}/${resource}/${id}`)

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json();

        return {
            data
        };

    },

    deleteOne: async ({ resource, id, variables, meta }) => {

        console.log("deleteOne", {
            resource,
            id,
            variables,
            meta,
        });

        // TODO: send request to the API
        // const response = await httpClient.post(url, {});

        return {
            data: {} as any,
        };

    },

    getApiUrl: () => {
        return API_URL;
    },

    custom: async ({
        url,
        method,
        filters,
        sorters,
        payload,
        query,
        headers,
        meta,
    }) => {
        console.log("custom", {
            url,
            method,
            filters,
            sorters,
            payload,
            query,
            headers,
            meta,
        });

        // TODO: send request to the API
        // const requestMethod = meta.method
        // const response = await httpClient[requestMethod](url, {});

        return {} as any;
    },

};

