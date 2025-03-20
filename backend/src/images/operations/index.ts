import bg from './background'
import blur from './blur'
import circle from './circle'
import crop from './crop'
import detail from './detail'
import fit from './fit'
import flip from './flip'
import gamma from './gamma'
import h from './height'
import negative from './negative'
import position from './position'
import resize from './resize'
import rotate from './rotate'
import sharpen from './sharpen'
import soften from './soften'
import trim from './trim'
import watermark from './watermark'
import w from './width'

import { OperationFunction } from 'src/helpers/interface'

export default {
    blur, // make it blur.. what do you think?
    bg, // add background to images (more visible on png)
    circle, // adds border radius to images, cropping out the rest to transparent
    crop, // crops out a square from the image, you chose where to start and how big
    detail,// choose how detailed you'd liek the image, less details is faster
    fit, //fit image into pixel space
    flip, //flip image by x or why axis
    gamma, // changes the gamma.. apperenly
    h, // change height
    negative, // makes it negative.. dude
    position, // position image in space
    resize, // resize image by percent or pixel (stretch or shrink)
    rotate, //rotate oriantation of images
    sharpen, // for sharpening images
    soften, // soften the pixels on an image.. make like smudge
    trim, // cuts off excess bacground
    w, //change width of image
    watermark// writes wartermarks on images
} as {
    [key: symbol]: OperationFunction
}

// trim and changing file format next
