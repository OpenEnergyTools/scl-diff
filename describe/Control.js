import { describeDataSet } from "./DataSetDescription.js";
import { describeNaming } from "./Naming.js";
export function describeControl(element) {
    const datSet = element.getAttribute("datSet");
    if (!datSet)
        return { ...describeNaming(element) };
    const dataSet = Array.from(element.parentElement?.children ?? []).find((child) => child.tagName === "DataSet" &&
        child.getAttribute("name") &&
        child.getAttribute("name") === datSet);
    if (!dataSet)
        return;
    const dataSetDescription = describeDataSet(dataSet);
    if (!dataSetDescription)
        return;
    return { ...describeNaming(element), dataSet: dataSetDescription };
}
//# sourceMappingURL=Control.js.map