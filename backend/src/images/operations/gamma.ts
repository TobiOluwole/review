import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^-?\d+(\.\d+)?$/; //matches (number)
    return regex.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata ) => {

    if(
        !isValidPrescription(prescriptions) ||
        parseFloat(prescriptions) < 1.0 ||
        parseFloat(prescriptions) > 3.0 
    ) return {transformer, metadata} // consider returning 422 errors instead

    const softNumber = parseFloat(prescriptions) > 100 ? 100 : parseFloat(prescriptions)

    return {
        transformer: transformer.gamma(softNumber),
        metadata
    }
}