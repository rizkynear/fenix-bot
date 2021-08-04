module.exports = [
    {
        keyword: ['everyone', 'tagall', 'tegal'],
        private: false,
        group: true,
        params: false,
        callback: 'everyone',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'master',
        private: true,
        group: true,
        params: false,
        callback: 'master',
        ownerOnly: false,
        active: true
    },
    {
        keyword: ['sticker', 'stiker'],
        private: true,
        group: true,
        params: false,
        callback: 'sticker',
        ownerOnly: false,
        active: true
    },
    {
        keyword: ['stickergif', 'stikergif'],
        private: true,
        group: true,
        params: false,
        callback: 'stickerGif',
        ownerOnly: false,
        active: true
    },
    {
        keyword: ['menu', 'list'],
        private: true,
        group: true,
        params: false,
        callback: 'menu',
        ownerOnly: false,
        active: true
    },
    {
        keyword: ['translate', 'tl'],
        private: true,
        group: true,
        params: true,
        callback: 'translate',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'ytsearch',
        private: true,
        group: true,
        params: true,
        callback: 'ytSearch',
        ownerOnly: false,
        active: true
    },
    {
        keyword: 'find',
        private: false,
        group: true,
        params: true,
        callback: 'find',
        ownerOnly: false,
        active: true
    },
    // {
    //     keyword: 'ytmp3',
    //     private: true,
    //     group: true,
    //     params: true,
    //     callback: 'ytMp3',
    //     ownerOnly: false,
    //     active: true
    // },
    // {
    //     keyword: 'ytmp4',
    //     private: true,
    //     group: true,
    //     params: true,
    //     callback: 'ytMp4',
    //     ownerOnly: false,
    //     active: true
    // },
];
