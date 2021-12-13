import '../node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js';

export const ckeditorIni = () => {

    window.ckeditors = [];

    document.querySelectorAll(".ckeditor").forEach(editor => {
        ckeditorReplace(editor)
    });
}

export const ckeditorReplace = (elem) => {
    ClassicEditor
        .create(elem)
        .then(editor => {
            ckeditors.push(editor)
        })
        .catch(error => {
            console.error(error);
        });
}

export const ckEditor = (editorId) => {
    let selected = ckeditors.filter(editor => editor.sourceElement.id === editorId);
    return selected[0];
}

export const ckEditorsFormDataAppendAll= (formData) => {
    ckeditors.forEach(editor => {
        formData.append(editor.sourceElement.name, editor.getData() )
    }); 
}
