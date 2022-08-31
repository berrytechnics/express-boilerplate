import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
async function imageCompress(){
    const imageExists = fs.existsSync('public/images')
    if(imageExists){
        fs.rmdir('public/images',{recursive:true},(err)=>{
            if(err) return err
        })
    }
    const files = await imagemin(['src/images/*.{jpg,png}'], {
        destination: 'public/images',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
    console.log(`${files.length} images compressed.`)
    return null
}
