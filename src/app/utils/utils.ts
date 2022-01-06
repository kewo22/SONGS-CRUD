export default class Utils {
    static validateFileSize(file: File, maxFileSize = 5): boolean {
        const uploadedFileSize = file.size / 1024 / 1024;
        if (uploadedFileSize > maxFileSize) {
            // setHelperText(`File Size Should Not Exceed ${size}MB`)
            return false
        } else {
            // setHelperText('')
            return true
        }
    }
}