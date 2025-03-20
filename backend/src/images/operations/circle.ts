import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^\d+(px)?$/; //matches (number) eg.. 50(%) or (number)px eg.. 300px
    return regex.test(str);
};

export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata) => {

    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    let diameter : number

    if(prescriptions.includes('px')){

        diameter = parseInt(prescriptions.replaceAll('px', ''));

    }else{

        const diameterPercent = parseInt(prescriptions)// parseInt(prescriptions) < 1000 ?  parseInt(prescriptions) : 1000 // limits percent increase

        diameter = Math.round(metadata.width! * (diameterPercent / 100));
    }

    const radius = diameter / 2

    const mask = Buffer.from(
        `<svg width="${metadata.width!}" height="${metadata.height}">
          <rect x="0" y="0" width="${metadata.width!}" height="${metadata.height}" rx="${radius}" ry="${radius}" fill="black"/>
        </svg>`
      );

    return {
        transformer: sharp(
                await transformer.composite([
                { input: mask, blend: 'dest-in' } // Apply mask using 'dest-in' blend mode
            ]).toBuffer()
        ),
        metadata
    }
}