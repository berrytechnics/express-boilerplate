import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import imageminPngquant from 'imagemin-pngquant'
import fs from 'fs'
import sass from 'sass'

const build = {
	imgCompress: async function(){
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
		})
		return console.log('\x1b[36m%s\x1b[0m', `${files.length} images compressed to public/images/.`) 
	},
	scss: async function(){
		const cssExists = fs.existsSync('public/main.css')
		if(cssExists){
			fs.unlinkSync('public/main.css')
		}
		const file = await sass.compile('src/main.scss')
		fs.writeFileSync('public/main.css',file.css)
		return console.log('\x1b[36m%s\x1b[0m', 'public/main.css generated') 
	}
}

build.imgCompress()
	.then(()=>build.scss())
	.catch(e=>console.log('\x1b[31m%s\x1b[0m',e))
        
export default build