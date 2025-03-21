import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex =  /^([^,]*)?(?:,(\d+))?$/;
//     (hello,123)	✅ Yes
// (hello)	✅ Yes
// (,123)	✅ Yes
// ()	✅ Yes
// (123,hello)	❌ No
// hello,123	❌ No
// (hello,123,456)	❌ No
// (hello123)	✅ Yes
// (,456)	✅ Yes
    return regex.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata) => {

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    let [background, threshold] : (string|number)[] = prescriptions.replaceAll(' ', '').split(',')

    background = /^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(background) ? '#'+background : background
    threshold = parseInt(threshold)

    let trimObject : {background?: string, threshold?: number} = {}

    background ? trimObject.background = background : null
    threshold ? trimObject.threshold = threshold : null

    return {
        transformer: transformer.trim(trimObject),
        metadata
    }
}