import fs from 'fs';
import path from 'path';

function appendToPlayList(filepath, musics) {

    let playList = fs.readFileSync(filepath).toString().split('\n');
    for (const i of musics) {
        playList.push(`#EXTINF:${i.length},${i.title}`)
        playList.push(path.relative(path.dirname(filepath), i.key))
    }
    fs.writeFileSync(filepath, playList.join('\n'))
}

function removeFromPlayList(filepath, musics) {
    let playList = fs.readFileSync(filepath).toString().split('\n');
    let titles = musics.map((val) => {
        return val.title
    })
    for (const index in playList) {
        for (const title of titles) {
            if (playList[index].indexOf(title) != -1) {
                playList.splice(index, 2)
            }
        }
    }
    fs.writeFileSync(filepath, playList.join('\n'))
}

export {
    appendToPlayList,
    removeFromPlayList
}