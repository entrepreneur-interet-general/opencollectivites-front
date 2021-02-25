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

const countObjectProperties = obj => {
    if (typeof obj === 'object') {
        return Object.keys(obj).length
    }
    return 0
}

export { formatNumber, shortnamedCommunes, countObjectProperties }