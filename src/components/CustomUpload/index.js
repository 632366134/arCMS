import * as uploadStatus from './status'
import CustomUploadFile from './uploadFile.vue'
import CustomUploadZip from './uploadZip.vue'
import CustomUploadPic from './uploadPic.vue'
import CustomUpload from './upload.vue'
CustomUpload.uploadStatus = CustomUploadZip.uploadStatus = CustomUploadFile.uploadStatus = CustomUploadPic.uploadStatus = uploadStatus
export {
    CustomUploadFile,
    CustomUploadZip,
    CustomUploadPic,
    CustomUpload
}
