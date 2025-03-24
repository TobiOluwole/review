import * as sharp from "sharp";

type prescriptionType = 'jpeg'| 'jpg'| 'png'| 'webp'| 'tiff'| 'gif'| 'avif'| 'svg'

const isValidPrescription = (str: string): boolean => {
    const options = ['jpeg' ,'jpg', 'png', 'webp', 'tiff', 'gif', 'avif', 'svg']
    return options.includes(str)
};

export default async ( transformer: sharp.Sharp, prescriptions: prescriptionType, metadata: sharp.Metadata ) => {

    if(!isValidPrescription(prescriptions.toLowerCase())) return {transformer, metadata} // consider returning 422 errors instead

    return {
        transformer: ['jpeg', 'jpg'].includes(prescriptions.toLowerCase()) ? transformer.toFormat(prescriptions.toLowerCase() as prescriptionType) : transformer.toFormat(prescriptions.toLowerCase() as prescriptionType),
        metadata:{
            ...metadata,
            format: prescriptions
        }
    }
}