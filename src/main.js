import './reset.css'
import './normalize.css'
import gameCanvas from './gameCanvas/comp'
import gameBlock from './gameBlock/comp'


const app = document.querySelector('#app')

new gameCanvas(app, 256).render()

new gameBlock(document.getElementsByClassName("gameCanvas")[0]).render()
new gameBlock(document.getElementsByClassName("gameCanvas")[0]).render()
new gameBlock(document.getElementsByClassName("gameCanvas")[0]).render()
new gameBlock(document.getElementsByClassName("gameCanvas")[0]).render()
new gameBlock(document.getElementsByClassName("gameCanvas")[0]).render()
new gameBlock(document.getElementsByClassName("gameCanvas")[0]).render()
new gameBlock(document.getElementsByClassName("gameCanvas")[0]).render()
new gameBlock(document.getElementsByClassName("gameCanvas")[0]).render()


