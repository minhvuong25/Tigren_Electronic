const isOutdated = function(activeFrom, activeTo) {
    if (!activeFrom && !activeTo) {
        return false;
    }

    const currentDate = new Date();
    const activeFromDate = activeFrom && new Date(activeFrom);
    const activeToDate = activeTo && new Date(activeTo);
    return (
        (activeFromDate && !activeToDate && currentDate < activeFromDate) ||
        (!activeFromDate && activeToDate && currentDate > activeToDate) ||
        (activeFromDate &&
            activeToDate &&
            (currentDate < activeFromDate || currentDate > activeToDate))
    );
};

export default isOutdated;
