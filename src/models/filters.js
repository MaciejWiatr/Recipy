import { recipes } from "./recipe";

const filters = {
    query: "",
};

const getFilters = () => filters;

const updateFilters = (updates) => {
    if (typeof updates.query === "string") {
        filters.query = updates.query;
    }
};

export { getFilters, updateFilters };
