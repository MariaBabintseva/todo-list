import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "./firebaseConfig";


export const addFile = (file, todoId) => {

    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
        },

        (err) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                const data = {
                    url: url,
                }
                const docRef = doc(db, `todos/${todoId}/files`, file.name)


                setDoc(docRef, data)

            })
        }
    );
}