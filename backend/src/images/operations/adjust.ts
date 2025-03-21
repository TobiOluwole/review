import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*$/; 
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

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    let [brightness, saturation, hue, lightness] = prescriptions.replaceAll(' ','').split(',')

    return {
        transformer: transformer.modulate({
            brightness: parseInt(brightness),
            saturation: parseInt(saturation),
            hue: parseInt(hue),
            lightness: parseInt(lightness),
        }),
        metadata
    }
}