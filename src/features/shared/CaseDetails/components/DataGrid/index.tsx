import styles from "./styles.module.scss";
import type { Case } from "../../../../../types";
import DataGridItem from "./components/DataGridItem";
import { transformValue } from "../../../../../helpers/transformFieldValue";

interface IMainInfo {
    entryDate: { label: string };
    entryNumber: { label: string };
    caseNumber: { label: string };
    judge: { label: string };
    plaintiff: { label: string };
    defendant: { label: string };
    investigatedAddress: { label: string };
    propertyType: { label: string };
    caseType: { label: string };
    payment_type?: { label: string };
    price?: { label: string };
    isPaid?: { label: string };
}


interface IProps {
    data: IMainInfo;
    caseData: Case;
    onFieldChange: (field: keyof Case, value: string) => void;
}


const DataGrid = ({ data, caseData, onFieldChange }: IProps) => {
    
    return (
        <div className={styles.dataGrid}>
            {Object.entries(data).map(([field, { label }]) => {
                const disabled = 
                    caseData.payment_type === 'for_free' &&
                    (field === "isPaid" || field === "price");
                
                const val = field as keyof Case;     
                return (
                    <DataGridItem
                        key={field}
                        field={field}
                        label={label}
                        disabled={disabled}
                        value={transformValue(val, (disabled ? 0 : caseData[val]) as string ?? "")}
                        onChange={(val) => onFieldChange(field as keyof Case, val)}
                    />
                )
            })}
        </div>
    );
};

export default DataGrid;