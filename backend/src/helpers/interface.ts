import sharp from "sharp"

export const IOperation = {
    
}


export type IImageOptions = {
  operation: string
}

export type OperationFunction = 
            (transformer: sharp.Sharp, prescriptions: string, metadata: sharp.Metadata) => 
                {transformer: sharp.Sharp, metadata: sharp.Metadata}

