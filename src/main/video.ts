const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)


export async function trimVideo(inputPath: string, outputPath: string, start: number, duration: number) {
    return new Promise<void>((resolve, reject) => {
        ffmpeg(inputPath)
            .setStartTime(start)
            .setDuration(duration)
            .on('end', (err: any) => {
                if (!err) resolve()
            })
            .on('error', (err: any) => {
                reject(err)
            })
            .save(outputPath)
    })
}

