import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^\(\s*(\d+px?|\d+)\s*,\s*(\d+px?|\d+)\s*,\s*(\d+px?|\d+)\s*,\s*(\d+px?|\d+)\s*\)$/; 
    /**
     * examples of match
     * 
     * (100,200,300,400)
     * (100px,200,300px,400px)
     * ( 50 , 60px , 70 , 80px )
     * 
     */
    return regex.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata ) => {

    if(!isValidPrescription(prescriptions)) return transformer // consider returning 422 errors instead

    let [left, top, width, height] : (number | string)[] = prescriptions.replace(' ', '').replace('(', '').replace(')', '').split(',')

    left = left.endsWith('px') ? parseInt(left.replace('px', '')) : Math.round(metadata.width! * ( parseInt(left) / 100))
    top = top.endsWith('px') ? parseInt(top.replace('px', '')) : Math.round(metadata.height! * ( parseInt(top) / 100))
    width = width.endsWith('px') ? parseInt(width.replace('px', '')) : Math.round(metadata.width! * ( parseInt(width) / 100))
    height = height.endsWith('px') ? parseInt(height.replace('px', '')) : Math.round(metadata.height! * ( parseInt(height) / 100))


    return {
        transformer: transformer.extract({
            left, top, width, height
        }),
        metadata:{
            ...metadata,
            height,
            width
        }
    }
}