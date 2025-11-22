import React, { useState } from 'react'
import type { Case, User } from '../../../../../../../types'
import styles from './styles.module.scss'
import { IoIosMore } from "react-icons/io";
import { useAppDispatch, useAppSelector } from '../../../../../../../store/hooks'
import { getWaitingCases } from '../../../../../../../api/case'
import { ConfirmModal } from '../../../../../../../components'
import CustomMenu, { type MenuItemData } from '../../../../../../../components/CustomMenu'
import { deleteUser } from '../../../../../../../api/user'
import { setUsers } from '../../../../../../../store/slices/users.slice'
import { useNavigate } from 'react-router'
import AssignmentModal from './components/AssignmentModal';


const UserItem = ({ user }: { user: User }) => {
  const users = useAppSelector(state => state.users.users);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cases, setCases] = useState<Case[]>([]);
  const dispatch = useAppDispatch()

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const handleAssignmentModal = async () => {
    handleClose();
    setOpenModal(true);
    setLoading(true);
    await getWaitingCases()
      .then(res => setCases(res.payload as Case[]))
      .finally(() => setLoading(false));
  }

  const handleConfirm = () => {
    deleteUser(user.id)
      .then(res => {
        const updatedUsers = users.filter(user => user.id !== (res.payload as User).id);
        dispatch(setUsers(updatedUsers))
      })
  }

  const menuItems: MenuItemData[] = [
    {
      label: 'Նոր գործ',
      onClick: handleAssignmentModal,
      className: styles.menu_item
    },
    {
      label: 'Հեռացնել',
      onClick: () => {
        handleClose();
        setOpenConfirmModal(true);
      },
      className: styles.menu_item
    }
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.body}>
          <div className={styles.info}>
            <span className={styles.name}>
              {user.first_name} {user.last_name}
            </span>
            <span className={styles.info_title}>
              Ընթացիկ գործ։ <span className={styles.info_item}>{user._count?.cases}</span>
            </span>
          </div>

          <div className={styles.menu}>
            <div
              className={styles.menu_icon_wrapper}
              onClick={handleOpen}
              style={open ? { backgroundColor: '#F7FBFF' } : {}}
            >
              <div className={styles.menu_icon}>
                <IoIosMore />
              </div>
            </div>
            <CustomMenu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              menuItems={menuItems}
            />
          </div>
        </div>
        <div className={`${styles.footer} ${user.status !== 'inactive' ? styles.footer_no_status : ''}`}>
          {
            user.status === 'inactive' && <span className={styles.status}>Ոչ ակտիվ</span>
          }
          <a className={styles.more} onClick={() => navigate(`/admin/user/${user.id}`)}>Ավելին</a>
        </div>
      </div>
      <AssignmentModal open={openModal} setOpen={setOpenModal} cases={cases} user={user} loading={loading} />
      <ConfirmModal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)} handleConfirm={handleConfirm} />
    </div>
  )
}

export default UserItem
