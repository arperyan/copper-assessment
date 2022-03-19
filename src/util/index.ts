export const convertDate = (
    value: string
): { getConvertMonth: string; getConvertTime: string; getConvertDay: number } => {
    const convertDate = new Date(parseInt(value));
    const getConvertMonth = convertDate.toLocaleString("en-gb", { month: "short" });
    const getConvertDay = convertDate.getDate();
    const getConvertTime = convertDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    console.log(convertDate);
    return {
        getConvertMonth,
        getConvertDay,
        getConvertTime,
    };
};

export const convertNumberFormat = (value: number): string =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
