import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    return ['x','y'].includes(str.toLowerCase());
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata ) => {

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    return {
        transformer: prescriptions.toLowerCase() == 'y' ? transformer.flip() : transformer.flop(),
        metadata
    }
}