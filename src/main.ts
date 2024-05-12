import './style.css'
import { imageClipboard } from '../lib/main'

const { getImage } = imageClipboard()

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
         <button id="counter" type="button">getImage</button>
  </div>
`
const hanlder = async () => {
    const result = await getImage()
    console.log(result)
}

document.querySelector('#counter')?.addEventListener('click', hanlder)
