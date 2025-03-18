import * as sharp from "sharp";

type prescriptionType = 
    'center'|
    'top'|
    'right-top'|
    'right'|
    'right-bottom'|
    'bottom'|
    'left-bottom'|
    'left'|
    'left-top'|
    'entropy'|
    'attention';


const isValidPrescription = (str: string): boolean => {
    const options = [
        'center',
        'top',
        'right-top',
        'right',
        'right-bottom',
        'bottom',
        'left-bottom',
        'left',
        'left-top',
        'entropy',
        'attention'
    ]
    return options.includes(str)
};

export default async ( transformer: sharp.Sharp, prescriptions: prescriptionType, metadata: sharp.Metadata) => {

    if(!isValidPrescription(prescriptions)) return transformer // consider returning 422 errors instead

    return {
        transformer: transformer.resize({
            position: prescriptions.replace('-', ' '),
        }), 
        metadata
    }
}