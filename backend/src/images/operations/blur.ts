import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^-?\d+(\.\d+)?$/; //matches (number)
    return regex.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata ) => {

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    const softNumber = parseInt(prescriptions) > 100 ? 100 : parseInt(prescriptions)

    return {
        transformer: transformer.blur(softNumber),
        metadata
    }
}