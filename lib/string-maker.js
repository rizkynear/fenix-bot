module.exports = {
    ytSearch: (datas) => {
        let result = '';
        let i = 1;

        for (data of datas) {
            if (i > 3) {
                break;
            }

            result += `${data.title}
${data.url}

`;
            i++;
        }

        return `Fenix chan menemukan 3 hasil teratas \n(￣ω￣)
        
${result}`;
    },
    find: (data, withMention) => {
        let id;

        if (withMention) {
            id = `@${data.id}`
        } else {
            id = `${data.id.replace('@c.us', '')}`
        }

        return `Fenix menemukan data anggota

IGN : ${data.name}
Squad : ${data.squad}
Jabatan : ${data.status}
Kontak : ${id}`
    }
}