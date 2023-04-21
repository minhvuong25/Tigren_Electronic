/* Using to convert object that include available classes to classes string.
Example:
combineClasses({
   class_1: true,
   class_2: false,
   class_3: true
}) => "class_1 class_3"
 */
const combineClasses = (values = {}) => {
    return Object.entries(values)
        .reduce((result, [className, isShow]) => {
            if (isShow) result.push(className);
            return result;
        }, [])
        .join(' ');
};

export default combineClasses;
