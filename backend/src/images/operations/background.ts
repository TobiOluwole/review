import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex =  /^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?([0-9a-fA-F]{2})?$|^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$|^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0(\.\d+)?|1(\.0)?)\s*\)$|^[a-zA-Z]+$/; //matches #(hex color) rgba() and rgb and color names like red
    return regex.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata) => {

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    return {
        transformer: transformer.flatten({
            background: /^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(prescriptions) ? '#'+prescriptions : prescriptions,
        }),
        metadata
    }
}