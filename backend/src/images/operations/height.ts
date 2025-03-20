import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^\d+(px)?$/; //matches (number) eg.. 50(%) or (number)px eg.. 300px
    return regex.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata) => {

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    let height : number

    if(prescriptions.includes('px')){

        height = parseInt(prescriptions.replaceAll('px', ''));

    }else{

        const heightPercent = parseInt(prescriptions)// parseInt(prescriptions) < 1000 ?  parseInt(prescriptions) : 1000 // limits percent increase

        height = Math.round(metadata.height! * (heightPercent / 100));
    }

    return {
        transformer: transformer.resize({
            height,
        }),
        metadata:{
            ...metadata,
            height
        }
    }
}