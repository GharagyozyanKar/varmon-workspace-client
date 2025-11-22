import { customButtonSx, customFieldSx } from '../../../../../styles/customSx'
import styles from './styles.module.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { addNote, deleteNote, getNotesByCaseId } from '../../../../../api/notes';
import type { Note } from '../../../../../types';
import { IoClose } from "react-icons/io5";
interface IProps {
    caseId: number | string
}

const Notes = ({ caseId }: IProps) => {
    const [noteData, setNoteData] = useState<Partial<Note>>({ title: "", description: "" })
    const [notes, setNotes] = useState<Note[]>([])


    useEffect(() => {
        getNotesByCaseId(caseId)
            .then(res => {
                setNotes(res.payload as Note[])
            })
    }, [caseId])


    const handleAdd = () => {
        addNote(caseId, noteData)
            .then(res => {
                setNotes(prev => [res.payload as Note, ...prev])
                setNoteData({ title: "", description: "" })
            })
            .catch(err => console.error(err));
    }

    const handleDelete = (id: string | number) => {
        deleteNote(id)
            .then(() => {
                setNotes(prev => prev.filter(note => note.id !== id))
            })
    }

    return (
        <div className={styles.notes}>
            <div className={styles.addNote}>
                <TextField
                    placeholder="Վերնագիր"
                    size="small"
                    sx={customFieldSx}
                    value={noteData.title}
                    onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
                />
                <TextField
                    placeholder="Նշում"
                    size="small"
                    multiline
                    rows={5}
                    sx={customFieldSx}
                    className={styles.description}
                    value={noteData.description}
                    onChange={(e) => setNoteData({ ...noteData, description: e.target.value })}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className={styles.addNoteBtn}
                    sx={customButtonSx}
                    onClick={handleAdd}
                >
                    Ավելացնել
                </Button>
            </div>
            <div className={styles.notesList}>
                {
                    notes.length > 0 ?
                        notes.map(note => (
                            <div key={note.id} className={styles.note}>
                                <div className={styles.info}>
                                    <span className={styles.title}>{note.title}</span>
                                    <p className={styles.description}>
                                        {note.description}
                                    </p>
                                </div>
                                <div className={styles.delete}>
                                    <IoClose onClick={() => handleDelete(note.id)} size={20}/>
                                </div>
                            </div>
                        ))
                        :
                        <div className={styles.emptyList}>
                            <p>Մուտքագրված նշումներ չկան</p>
                        </div>
                }

            </div>
        </div>
    )
}

export default Notes
