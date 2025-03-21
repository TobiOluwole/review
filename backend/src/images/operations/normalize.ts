import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^\d+(\.\d+)?,\d+(\.\d+)?$/; //matches (number),(number)
    return regex.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata ) => {

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    const [lower, upper] = prescriptions.replaceAll(' ', '').split(',')

    if(parseInt(lower) >= parseInt(upper))  return {transformer, metadata} 

    return {
        transformer: transformer.normalise({lower: parseInt(lower), upper: parseInt(upper)}),
        metadata
    }
}