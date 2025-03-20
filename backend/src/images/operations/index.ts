import bg from './background'
import circle from './circle'
import crop from './crop'
import detail from './detail'
import fit from './fit'
import flip from './flip'
import h from './height'
import position from './position'
import resize from './resize'
import rotate from './rotate'
import sharpen from './sharpen'
import trim from './trim'
import watermark from './watermark'
import w from './width'

import { OperationFunction } from 'src/helpers/interface'

export default {
    bg, // add background to images (more visible on png)
    circle, // adds border radius to images, cropping out the rest to transparent
    crop, // crops out a square from the image, you chose where to start and how big
    detail,// choose how detailed you'd liek the image, less details is faster
    fit, //fit image into pixel space
    flip, //flip image by x or why axis
    h, // change height
    position, // position image in space
    resize, // resize image by percent or pixel (stretch or shrink)
    rotate, //rotate oriantation of images
    sharpen, // for sharpening images
    trim, // cuts off excess bacground
    w, //change width of image
    watermark// writes wartermarks on images
} as {
    [key: symbol]: OperationFunction
}

// trim and changing file format next
