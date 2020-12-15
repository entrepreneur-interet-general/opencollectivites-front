const formatNumber = number => {
    try {
        return number.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
    } catch (error) {
        // console.error(error);
        return "";
    }
}

const shortnamedCommunes = [
    "by",
    "bu",
    "eu",
    "gy",
    "oz",
    "oo",
    "py",
    "ri",
    "ry",
    "sy",
    "ur",
    "us",
    "uz",
    "y",
];

export { formatNumber, shortnamedCommunes }