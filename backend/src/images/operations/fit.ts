import * as sharp from "sharp";

type prescriptionType = 'cover'|'contain'|'fill'|'inside'|'outside'

const isValidPrescription = (str: string): boolean => {
    const options = ['cover','contain','fill','inside','outside']
    return options.includes(str)
};

export default async ( transformer: sharp.Sharp, prescriptions: prescriptionType, metadata: sharp.Metadata ) => {

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    return {
        transformer: transformer.resize({
            fit: prescriptions,
        }),
        metadata
    }
}