export default async function readDiskFile(resultType = 'blob', accept = '*/*') {
    const result = await new Promise((resolve) => {
        const _input = document.createElement('input');
        _input.style.display = 'none';
        _input.setAttribute('type', 'file');
        _input.setAttribute('accept', accept);
        _input.onclick = () => {
            _input.value = null;
            document.body.onfocus = () => {
                setTimeout(() => {
                    if (_input.value.length === 0) {
                        resolve(null);
                    }
                    document.body.onfocus = null;
                }, 500);
            }
        };
        _input.onchange = (e) => {
            const file = e.target.file[0];
            if (!file) {
                return;
            }

            const reader = new FileReader();
            reader.onload = function() {
                resolve({
                    filename: file.name,
                    ext: file.name.split('.').pop().toLowerCase(),
                    type: file.type,
                    result: this.result,
                    length: resultType === 'blob' ? this.result.byteLenght : this.result.length,
                });
            }
        };

        switch (resultType) {
            case 'blob': {
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'base64': {
                reader.readAsDataURL(file);
                break;
            }
            default: {
                reader.readAsArrayBuffer(file);
            }
        };
        //主动触发一次
        _input.click();
    });
    if (result && resultType === 'blob') {
        result.result = new Blob([new Uint8Array(result.result)], { type: result.type });
    }
    return result;
}