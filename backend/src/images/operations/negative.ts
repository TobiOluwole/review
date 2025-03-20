import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^\((true|false)\)$/i; //matches (true)|(false)
    return regex.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata ) => {

    // if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    const negateTransaprent = prescriptions.replaceAll('(', '').replaceAll(')', '').replaceAll(' ','')

    return {
        transformer: transformer.negate({alpha: negateTransaprent == 'true'}),
        metadata
    }
}