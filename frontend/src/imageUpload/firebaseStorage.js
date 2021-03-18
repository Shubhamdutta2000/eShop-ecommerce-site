import { storage, firebase } from "./firebase.config";
import imageCompression from "browser-image-compression";

export const firebaseStorage = async (
  file,
  category,
  setUploading,
  setImage
) => {
  const fileType = file.type;
  const fileName = file.name;

  // if file type is image
  if (fileType.includes("image")) {
    //  Compress image  //
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options); // compressed image

    const storageRef = storage.ref();

    // Upload file and metadata to the object 'images/category/image.jpeg'
    const metaData = {
      type: "image/jpeg",
    };
    var uploadTask = storageRef
      .child(`images/${category}/` + fileName)
      .put(compressedFile, metaData);

    setUploading(true);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        setUploading(true);
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        setUploading(false);

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            alert(error);
            break;

          case "storage/canceled":
            // User canceled the upload
            alert(error);
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            alert(error);
            break;

          default:
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
          setUploading(false);
        });
      }
    );
  } else {
    alert(`Cannot upload file of type ${fileType}`);
  }
};
