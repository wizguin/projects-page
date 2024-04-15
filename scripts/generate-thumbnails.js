import { readdirSync } from 'fs'
import { join, parse } from 'path'
import { spawn } from 'child_process'

const previews = join('assets/previews')
const thumbnails = join('assets/thumbnails')

const files = readdirSync(previews)

const width = 90
const height = 80
const filter = `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}`

files.forEach(file => {
    const inputFile = join(previews, file)
    const outputFile = join(thumbnails, `${parse(file).name}.jpg`)

    const child = spawn('ffmpeg', ['-y', '-i', inputFile, '-vframes', '1', '-vf', filter, outputFile])

    child.on('error', error => {
        console.log(`Error: ${error}`)
    })

    child.stdout.on('data', data => {
        console.log(data.toString())
    })

    child.stderr.on('data', data => {
        console.log(data.toString())
    })

    child.on('close', code => {
        console.log(code)
    })
})
