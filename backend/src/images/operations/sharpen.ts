import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    return /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata ) => {

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    const presets = [
        { sigma: 0.3, m1: 0.5, m2: 1.0, x1: 1.0, y2: 5.0, y3: 10.0 },
        { sigma: 0.6, m1: 0.8, m2: 1.5, x1: 1.5, y2: 6.0, y3: 12.0 },
        { sigma: 1.0, m1: 1.0, m2: 2.0, x1: 2.0, y2: 7.0, y3: 14.0 },
        { sigma: 1.2, m1: 1.2, m2: 2.5, x1: 2.5, y2: 8.0, y3: 16.0 },
        { sigma: 1.5, m1: 1.5, m2: 3.0, x1: 3.0, y2: 10.0, y3: 18.0 },
        { sigma: 2.0, m1: 2.0, m2: 3.5, x1: 3.5, y2: 12.0, y3: 20.0 },
        { sigma: 2.5, m1: 2.5, m2: 4.0, x1: 4.0, y2: 14.0, y3: 22.0 },
        { sigma: 3.0, m1: 3.0, m2: 5.0, x1: 5.0, y2: 16.0, y3: 24.0 },
        { sigma: 4.0, m1: 4.0, m2: 6.0, x1: 6.0, y2: 18.0, y3: 26.0 },
        { sigma: 5.0, m1: 5.0, m2: 7.0, x1: 7.0, y2: 20.0, y3: 30.0 },
    ]

    const choice = presets[parseInt(prescriptions) - 1]

    return {
        transformer: transformer.sharpen(choice),
        metadata
    }
}