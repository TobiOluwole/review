import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^(\d+),\s*(\d+)(?:,\s*(\d+))?$/; 
    /**
     * ✅ 12, 34
✅ 12, 34, 56
❌ 12, (missing second number)
❌ , 34, 56 (missing first number)
     */
    return regex.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata ) => {

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    let [width, height, maxSlope] = prescriptions.replaceAll(' ','').split(',')

    return {
        transformer: transformer.clahe({
            width: parseInt(width), 
            height: parseInt(height),
            maxSlope: maxSlope ? parseInt(maxSlope) : 3
        }),
        metadata
    }
}