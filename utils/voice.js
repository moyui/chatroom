import axios from 'axios';
import fetch from './fetch';
import sleep from 'sleep';

let baiduToken = '';
const taskQueue = [];
const _audio = document.createElement('audio');
const _source = document.createElement('source');
_source.setAttribute('type', 'audio/mp3');
_source.setAttribute('src', '');
_audio.appendChild(_source);
document.body.appendChild(_audio);

const voice = {
    async read(text, cuid) {
        if (!baiduToken) {
            const [err, result] = await fetch('getBaiduToken');
            if (err) return;
            baiduToken = result.token;
        }
        const res = await axios.get(`https://tsn.baidu.com/text2audio?tex=${text}&tok=${baiduToken}&cuid=${cuid}&ctp=1&lan=zh&per=4`, { responseType: 'blob' });
        const blob = res.data;
        if (blob.type === 'application/json') {
            console.warn('合成语言失败');
            const reader = new FileReader();
            reader.onload = function() {
                console.warn(JSON.parse(this.result));
            };
            reader.readAsText(blob);
        } else {
            _source.setAttribute('src', URL.createObjectURL(blob));
            _audio.load();
            const promise = new Promise((resolve) => {
                _audio.addEventListener('ended', resolve);
            });
            _audio.play();
            await promise;
        }
    },
    push(text, cuid) {
        taskQueue.push({text, cuid});
    }
}

async function handleTaskQueue() {
    const task = taskQueue.shift();
    if (task) {
        await voice.read(task.text, task.cuid);
        await sleep(200);
        await handleTaskQueue();
    } else {
        setTimeout(handleTaskQueue, 500);
    }
}
handleTaskQueue();

export default voice;