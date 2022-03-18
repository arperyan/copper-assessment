export const convertDate = (value: string): {} => {
    const convertDate = new Date(parseInt(value));

    const getConvertMonthDay = `${convertDate.toLocaleString("en-gb", { month: "short" })} ${convertDate.getDate()}`;
    const getConvertTime = convertDate.getTime();

    return {
        getConvertMonthDay,
        getConvertTime,
    };
};

export const convertNumberFormat = (value: number): string =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
