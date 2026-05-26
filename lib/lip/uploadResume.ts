import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "@/firebase";

export async function uploadResume(file: File, name: string, phone: string, role: string) {
  try {
    const storage = getStorage(app);

    const fileRef = ref(storage, `resumes/${Date.now()}_${file.name}`);

    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(fileRef);

    console.log("Resume uploaded:", {
      name,
      phone,
      role,
      url,
    });

    return "success";
  } catch (error) {
    console.error(error);
    return "error";
  }
}