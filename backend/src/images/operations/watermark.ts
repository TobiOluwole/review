import * as sharp from "sharp";

const isValidPrescription = (str: string): boolean => {
    const regex = /^\(\s*([a-zA-Z\s]+)\s*,\s*([a-zA-Z]+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/; 
    /**
     * (text,color,font size (px),setting)
✅ (red,blue,50,75)
✅ (foo,bar,123,456)
✅ ( text1 , text2 , 9 , 34 ) (Spaces allowed)
     */
    return regex.test(str);
};


export default async ( transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata) => {


    if(!isValidPrescription(prescriptions)) return {transformer, metadata} // consider returning 422 errors instead

    let [text, color, fontSize, setting] = prescriptions.replaceAll('(','').replaceAll(')','').split(',')

    color = /^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(color) ? '#'+ color : color
    
    const waterMarkStyle = [
        `
        <svg width="${metadata.width}" height="${metadata.height}">
        <text x="${metadata.width! * 0.5}" y="${metadata.height! * 0.5}" 
                font-size="${fontSize}" 
                font-family="Arial" 
                fill="${color}"
                text-anchor="middle"
                opacity="0.4">
            ${text}
        </text>
        </svg>
        `,`
        <svg width="${metadata.width}" height="${metadata.height}">
            <defs>
                <pattern id="watermarkPattern" patternUnits="userSpaceOnUse" width="${(text.length *  parseInt(fontSize))/2}" height="${(text.length * parseInt(fontSize))/2}">
                <text x="20" y="20" font-size="${fontSize}" font-family="Arial" fill="${color}" opacity="0.4" transform="rotate(${45})">
                    ${text}
                </text>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#watermarkPattern)"/>
        </svg>`
    ]

    return {
        transformer: sharp(
            await transformer.composite([
            {input: Buffer.from(waterMarkStyle[parseInt(setting) - 1])}
        ]).toBuffer()
    ),
        metadata
    }
}