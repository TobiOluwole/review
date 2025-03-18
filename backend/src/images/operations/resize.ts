import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^\d+(\d+x\d+)?$/; //matches (number) eg.. 50(%) or (number)x(number) eg.. 300x500 (width x height)
    return regex.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata) => {

    if(!isValidPrescription(prescriptions)) return transformer // consider returning 422 errors instead

    let newWidth : number, newHeight : number;

    if(prescriptions.includes('x')){

        const dimensions = prescriptions.split('x');

        newWidth = parseInt(dimensions[0])
        newHeight = parseInt(dimensions[1])

    }else{

        const width = parseInt(prescriptions) // parseInt(prescriptions) < 1000 ?  parseInt(prescriptions) : 1000
        const height = parseInt(prescriptions)// parseInt(prescriptions) < 1000 ?  parseInt(prescriptions) : 1000

        newWidth = Math.round(metadata.width! * ( width / 100));
        newHeight = Math.round(metadata.height! * (height / 100));
    }

    return {
        transformer: transformer.resize({
            width: newWidth,
            height: newHeight,
            // fit: sharp.fit.inside, // Keeps aspect ratio
        }),
        metadata:{
            ...metadata,
            width: newWidth,
            height: newHeight,
        }
    }
}