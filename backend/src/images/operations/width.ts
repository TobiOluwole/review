import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^\d+(px)?$/; //matches (number) eg.. 50(%) or (number)px eg.. 300px
    return regex.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata) => {

    if(!isValidPrescription(prescriptions)) return transformer // consider returning 422 errors instead

    let width : number

    if(prescriptions.includes('px')){

        width = parseInt(prescriptions.replace('px', ''));

    }else{

        const widthPercent = parseInt(prescriptions)// parseInt(prescriptions) < 1000 ?  parseInt(prescriptions) : 1000 // limits percent increase

        width = Math.round(metadata.width! * (widthPercent / 100));
    }

    return {
        transformer: transformer.resize({
            width,
        }),
        metadata:{
            ...metadata,
            width
        }
    }
}