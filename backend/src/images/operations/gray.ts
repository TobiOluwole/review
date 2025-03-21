import * as sharp from "sharp";

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata ) => {
    return {
        transformer: transformer.greyscale(),
        metadata
    }
}