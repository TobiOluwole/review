import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    return /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata ) => {

    // if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    return {
        transformer: transformer.threshold(parseInt(prescriptions) || 128),
        metadata
    }
}