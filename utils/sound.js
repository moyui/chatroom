const sounds = {
    default: require('@/assets/audios/default.mp3'),
    apple: require('@/assets/audios/apple.mp3'),
    pcqq: require('@/assets/audios/pcqq.mp3'),
    mobileqq: require('@/assets/audios/mobileqq.mp3'),
    momo: require('@/assets/audios/momo.mp3'),
    huaji: require('@/assets/audios/huaji.mp3'),
};

let pervType = 'default';
const _audio = document.createElement('audio');
const _source = document.createElement('source');
_source.setAttribute('type', 'audio/mp3');
_source.setAttribute('src', sounds[pervType]);
_audio.appendChild(_source);
document.body.appendChild(_audio);

let isPlaying = false;

export default function sound(type = 'default') {
    if (type !== pervType) {
        _source.setAttribute('src', sounds[type]);
        _audio.load();
        pervType = type;
    }
    if (!isPlaying) {
        isPlaying = true;
        _audio.play().then(() => {
            isPlaying = false;
        });
    }
}