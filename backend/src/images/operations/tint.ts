import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^(\d+(\.\d+)?,\d+(\.\d+)?,\d+(\.\d+)?,\d+(\.\d+)?|\d+(\.\d+)?,\d+(\.\d+)?,\d+(\.\d+)?|\w+)$/; //matches (number),(number),(number) for rgba
    return regex.test(str);
};
// alpha not owrking ye
export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata ) => {

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    let tint;

    const [r, g, b, a] = prescriptions.replaceAll(' ', '').split(',');

    if (prescriptions.split(',').length === 4) {
        tint = { r: parseInt(r), g: parseInt(g), b: parseInt(b), alpha: parseFloat(a) };
    } else if (prescriptions.split(',').length === 3) {
        tint = { r: parseInt(r), g: parseInt(g), b: parseInt(b) };
    } else if (/^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(prescriptions)) {
        tint = `#${prescriptions}`;
    } else {
        tint = prescriptions;
    }

    return {
        transformer: transformer.tint(tint),
        metadata
    }
}