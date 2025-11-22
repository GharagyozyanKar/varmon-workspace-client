import type { Case } from "../../../../../../../types"
import { FormItem } from "../"
import styles from "./styles.module.scss"


interface IProps {
    form: Partial<Case>
    handleChange: (val: string, key: keyof Case) => void
    error?: boolean 
}

const MainInfoSection = ( {form, handleChange, error = false }: IProps ) => {
  return (
    <div className={styles.main_info_fields}>
            <FormItem
              type="date"
              label="Մուտքի ամսաթիվ"
              value={form.entryDate as string || ""}
              handleChange={(val) => handleChange(val, "entryDate")}
            />

            <FormItem
              type="text"
              label="Մուտքի համար"
              value={form.entryNumber || ""}
              required={true}
              error={error}
              handleChange={(val) => handleChange(val, "entryNumber")}
            />

            <FormItem
              type="text"
              label="Քաղ․ գործի համար"
              value={form.caseNumber || ""}
              handleChange={(val) => handleChange(val, "caseNumber")}
            />

            <FormItem
              type="text"
              label="Դատավոր"
              value={form.judge || ""}
              handleChange={(val) => handleChange(val, "judge")}
            />


            <FormItem
              type="text"
              label="Հայցվոր"
              value={form.plaintiff || ""}
              handleChange={(val) => handleChange(val, "plaintiff")}
            />

            <FormItem
              type="text"
              label="Պատասխանող"
              value={form.defendant || ""}
              handleChange={(val) => handleChange(val, "defendant")}
            />

            <FormItem
              type="text"
              label="Հետազոտվող հասցե"
              value={form.investigatedAddress || ""}
              handleChange={(val) => handleChange(val, "investigatedAddress")}
            />

            <FormItem
              type="text"
              label="Գույքի տեսակ"
              value={form.propertyType || ""}
              handleChange={(val) => handleChange(val, "propertyType")}
            />

            <FormItem
              type="text"
              label="Գործի տեսակ"
              value={form.caseType || ""}
              handleChange={(val) => handleChange(val, "caseType")}
            />
          </div>
  )
}

export default MainInfoSection