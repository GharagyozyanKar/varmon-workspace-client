import styles from './styles.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Case } from '../../../../types'
import StatusButton from '../../../StatusButton'
import ConfirmModal from '../../../ConfirmModal'
import AssignmentButton from '../../../AssignmentButton'
import CustomMenu, { type MenuItemData } from '../../../CustomMenu'
import { useSnackbar } from '../../../../hooks/useSnackbar'
import { transformValue } from '../../../../helpers/transformFieldValue'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { cutName } from '../../../../helpers/textCutter'
import { deleteCaseThunk } from '../../../../store/thunks/cases.thunk'


interface IProps {
  caseItem: Case,
  mode?: 'default' | 'archive'
}

const CaseItem = ({ caseItem, mode = 'default' }: IProps) => {
  const userRole = useAppSelector(state => state.auth.user?.role)
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [confirmModal, setConfirmModal] = useState<boolean>(false)
  const open = Boolean(anchorEl)
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const showSnackbar = useSnackbar()

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMore = () => {
    handleClose()
    navigate(`/case/${caseItem.id}`)
  }

  const handleDelete = () => {
    handleClose()
    setConfirmModal(true)
  }

  const confirmDelete = () => {
    try {
      dispatch(deleteCaseThunk({ caseId: caseItem.id, mode })).unwrap();
      showSnackbar("Գործը հեռացված է", 'success');
    } catch (error) {
      console.error(error);
      showSnackbar("Չհաջողվեց հեռացնել գործը", 'error');
    }
  }

  const createMenuItems = () => {
    const menuItems: MenuItemData[] = [
      {
        label: 'Ավելին',
        onClick: handleMore,
        className: styles.menu_item
      }
    ];

    if (userRole === "admin") {
      menuItems.push(
        {
          label: 'Հեռացնել',
          onClick: handleDelete,
          className: styles.menu_item
        }
      )
    }
    return menuItems
  }




  return (

    <>
      <td className={"truncate"}>{new Date(caseItem.entryDate).toLocaleDateString("en-CA")}</td>
      <td className={"truncate"}>{caseItem.entryNumber}</td>
      <td className={"truncate"}>{caseItem.caseNumber}</td>
      <td className={"truncate"}>{caseItem.investigatedAddress}</td>
      <td className={"truncate"}>
        {mode === 'default' ? (
          <AssignmentButton
            caseId={caseItem.id}
            user={
              caseItem.assignedEmployee ?
                {
                  first_name: caseItem.assignedEmployee.first_name,
                  last_name: caseItem.assignedEmployee.last_name,
                  id: caseItem.assignedEmployee.id,
                }
                : null
            }
          />
        ) : (
          <span className="truncate">
            {cutName(caseItem.assignedEmployee?.first_name || '', caseItem.assignedEmployee?.last_name || '')}
          </span>
        )}
      </td>
      <td>
        {
          mode === 'default' ? (
            <StatusButton
              value={caseItem.status}
              caseId={caseItem.id}
            />
          ) : (
            <span className={`${styles[caseItem.status]} ${styles.status} truncate`}>
              {transformValue("status", caseItem.status)}
            </span>
          )
        }
      </td>
      <td>

        <div className={styles.menu}>
          <div
            className={styles.menu_icon_wrapper}
            onClick={handleOpen}
            style={open ? { backgroundColor: '#D9EAFE' } : {}}
          >
            <span className={styles.menu_icon}>⋮</span>
          </div>
          <CustomMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            menuItems={createMenuItems()}
          />
        </div>
      </td>

      <ConfirmModal
        open={confirmModal}
        onClose={setConfirmModal}
        handleConfirm={confirmDelete}
      />

    </>
  )
}

export default CaseItem