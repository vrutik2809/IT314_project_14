export const capitalize = (s) => {
    if (!s || typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
};
