import adjust from './adjust'
import background from './background'
import blackandwhite from './blackandwhite'
import blur from './blur'
import circle from './circle'
import crop from './crop'
import detail from './detail'
import enhance from './enhance'
import fit from './fit'
import flip from './flip'
import gamma from './gamma'
import gray from './gray'
import height from './height'
import negative from './negative'
import normalize from './normalize'
import position from './position'
import resize from './resize'
import rotate from './rotate'
import sharpen from './sharpen'
import smooth from './smooth'
import tint from './tint'
import trim from './trim'
import watermark from './watermark'
import width from './width'

import { OperationFunction } from 'src/helpers/interface'

export default {
    adjust, // adjusts brightness, saturation, hue, lightness
    baw: blackandwhite,
    bw: blackandwhite,
    blackandwhite, //makes image black and white
    blur, // make it blur.. what do you think?
    background,
    bg: background, // add background to images (more visible on png)
    circle, // adds border radius to images, cropping out the rest to transparent
    crop, // crops out a square from the image, you chose where to start and how big
    detail,// choose how detailed you'd liek the image, less details is faster
    enhance, //sharp clache function.. whatever that does
    fit, //fit image into pixel space
    flip, //flip image by x or why axis
    gamma, // changes the gamma.. apperenly
    gray, //add grayscale
    grey: gray,
    h: height, // change height
    height,
    negative, // makes it negative.. dude
    normalize, // reduces the distance between highest and lowest pixel
    position, // position image in space
    resize, // resize image by percent or pixel (stretch or shrink)
    rotate, //rotate oriantation of images
    sharpen, // for sharpening images
    smooth, // soften the pixels on an image.. make like smudge
    tint, // apply rgb tint to image
    trim, // cuts off excess bacground
    w: width, //change width of image
    width,
    watermark// writes wartermarks on images
} as {
    [key: symbol]: OperationFunction
}

// trim and changing file format next
