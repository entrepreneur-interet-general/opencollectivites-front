const formatNumber = number => {
    try {
        return number.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
    } catch (error) {
        console.error(error);
        return "";
    }
}

export { formatNumber }