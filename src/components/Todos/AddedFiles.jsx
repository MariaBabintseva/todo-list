import { collection, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../service/firebaseConfig';

export const AddedFiles = ({ id, edit }) => {
    const [files, setFiles] = useState('')
    const query = collection(db, `todos/${id}/files`)
    const [items, loading, error] = useCollection(query)

    useEffect(() => {
        const files = []
        items?.forEach((item) => {
            files.push({ fileName: item.id, url: item.data().url });
        })
        setFiles(files)
    }, [items])

    const removeFileHandler = async (fileId) => {
        const docRef = doc(db, `todos/${id}/files`, fileId);
        await deleteDoc(docRef)
    }

    return (
        <>
            {loading && <p>Загрузка...</p>}
            {files &&
                <div className='added-files' >
                    {files?.map((item) =>
                        <div className='file-container'>
                            <img className='file' src={item.url} />
                            {edit && <button className='remove-file' onClick={() => removeFileHandler(item.fileName)} >
                                <img src='assets/img/close-selected.svg' />
                            </button>
                            }

                        </div>
                    )}
                </div>
            }
        </>
    )
}