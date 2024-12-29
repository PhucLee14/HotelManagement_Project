const formatNumber = (number) => {
    if (number === null || number === undefined) {
        return "0";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default formatNumber;
