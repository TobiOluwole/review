import * as sharp from "sharp";

type kernalType = 'nearest'|'cubic'|'mitchell'|'lanczos2'|'lanczos3'
type prescriptionType = '1'|'2'|'3'|'4'|'5'

const isValidPrescription = (str: string): boolean => {
    const options = ['1','2','3','4','5']
    return options.includes(str)
};

export default async ( transformer: sharp.Sharp, prescriptions: prescriptionType, metadata: sharp.Metadata ) => {

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    const kernels: kernalType[] = [
        'nearest',
        'cubic',
        'mitchell',
        'lanczos2',
        'lanczos3'
    ]

    const kernel = kernels[parseInt(prescriptions) - 1]

    return {
        transformer: transformer.resize({
            kernel: kernel,
        }),
        metadata
    }
}