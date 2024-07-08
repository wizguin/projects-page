import { mkdirSync, readdirSync } from 'fs'
import { join, parse } from 'path'
import { spawn } from 'child_process'
import { rimraf } from 'rimraf'

const previews = join('public/previews')
const thumbnails = join('public/thumbnails')

const files = readdirSync(previews)

const width = 90
const height = 80
const filter = `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}`

// Clear directory
rimraf.sync(thumbnails)
mkdirSync(thumbnails)

files.forEach(file => {
    const inputFile = join(previews, file)
    const outputFile = join(thumbnails, `${parse(file).name}.jpg`)

    const child = spawn('ffmpeg', [
        '-y',
        '-i', inputFile,
        '-vframes', '1',
        '-vf', filter,
        '-loglevel', 'error',
        outputFile
    ])

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
        console.log(`${file} closed with code ${code}`)
    })
})
