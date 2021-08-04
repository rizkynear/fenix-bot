const { decryptMedia } = require('@open-wa/wa-automate');
const messages = require('../constants/messages');;
const axios = require('axios');
const translate = require('../lib/translate');
const yts = require('yt-search');
const stringMaker = require('../lib/string-maker');
const yt = require('../lib/yt');
const fs = require('fs');

module.exports = {
    menu: function (client, message) {
        client.reply(message.from, messages.menu, message.id);
    },
    everyone: async function (client, message) {
        let admins = await client.getGroupAdmins(message.from);

        if (admins.includes(message.sender.id)) {
            let text = '';
            let participants = await client.getGroupMembers(message.chatId);

            for (let participant of participants) {
                const contact = participant.id.replace('@c.us', '');

                text += `@${contact} `;
            }

            client.sendTextWithMentions(message.chatId, text);
        } else {
            client.reply(
                message.from,
                'Maaf senpai, hanya admin grup dan master yang bisa menggunakan perintah m(｡_｡；))m',
                message.id
            );
        }
    },
    master: async function (client, message) {
        client.sendContact(message.chatId, '6285739020631@c.us').then(() => {
            client.sendText(message.chatId, 'Ini masternya fenix senpai (￣ω￣)')
        });
    },
    sticker: async function (client, message) {
        if (message.type == 'image') {
            client
                .reply(message.from, messages.loading, message.id)
                .then(async () => {
                    const mediaData = await decryptMedia(message);
                    const dataImage =
                        'data:' +
                        message.mimetype +
                        ';' +
                        'base64,' +
                        mediaData.toString('base64');

                    client
                        .sendImageAsSticker(message.chatId, dataImage)
                        .then(() => {
                            const sender = message.sender.id.replace(
                                '@c.us',
                                ''
                            );

                            client.sendTextWithMentions(
                                message.chatId,
                                `Ini stickernya senpai, @${sender} (￣ω￣)`
                            );
                        });
                });
        } else {
            client.reply(message.from, messages.wrongFormat, message.id);
        }
    },
    stickerGif: async function (client, message) {
        if (message.mimetype == 'video/mp4') {
            if (message.duration < 6) {
                client
                    .reply(message.from, messages.loading, message.id)
                    .then(async () => {
                        const mediaData = await decryptMedia(message);
                        const dataImage =
                            'data:' +
                            message.mimetype +
                            ';' +
                            'base64,' +
                            mediaData.toString('base64');

                        client.sendMp4AsSticker(message.from, dataImage).then(() => {
                            const sender = message.sender.id.replace(
                                '@c.us',
                                ''
                            );

                            client.sendTextWithMentions(
                                message.chatId,
                                `Ini stickernya senpai, @${sender} (￣ω￣)`
                            );
                        });
                    });
            } else {
                client.reply(
                    message.from,
                    'Maaf senpai, durasi video maksimal 5 detik m(｡_｡；))m',
                    message.id
                );
            }
        } else {
            client.reply(message.from, messages.wrongFormat, message.id);
        }
    },
    translate: async function(client, message, params) {
        const lang = params.slice(0, 2);
        const text = params.slice(3);

        client.reply(message.from, messages.loading, message.id).then(async () => {
            translate(text, lang).then((result) => {
                client.reply(message.from, result, message.id);
            }).catch((err) => {
                client.reply(message.from, 'Maaf senpai, kode bahasa salah m(｡_｡；))m', message.id);
            })
        });
    },
    ytSearch: async function(client, message, params) {
        client.reply(message.from, messages.loading, message.id).then(async () => {
            const result = await yts(params);

            if (result.videos.length > 0) {
                client.reply(message.from, stringMaker.ytSearch(result.videos), message.id);
            } else {
                client.reply(message.from, 'Maaf senpai, fenix tidak menemukan hasilnya m(｡_｡；))m', message.id);
            }
        })
    },
    find: async function(client, message, params) {
        fs.readFile('data-member.json', async (err, data) => {
            if (err) client.reply(message.from, 'Ada yang eror', message.id);

            let members = JSON.parse(data);

            let result = await members.filter((member) => {
                return member['name'].toLowerCase().indexOf(params.toLowerCase()) != -1;
            });

            let participants = await client.getGroupMembers(message.chatId);

            if (result.length > 0) {
                let isExists = participants.filter((participant) => {
                    return participant.id == result[0].id 
                });

                if (isExists.length > 0) {
                    client.sendTextWithMentions(message.chatId, stringMaker.find(result[0], true));
                } else {
                    client.sendText(message.chatId, stringMaker.find(result[0], false));
                }
            } else {
                client.reply(message.from, 'Maaf senpai, fenix tidak menemukan hasilnya m(｡_｡；))m', message.id);
            }
        });
    }
    // ytMp3: async function(client, message, params) {
    //     client.reply(message.from, messages.loading, message.id).then(async () => {
    //         const result = await yt(params, 'lowestaudio');

    //         if (result.includes('https:')) {
    //             client.sendFileFromUrl(message.from, result, 'result.mp3', '', message.id, {method: 'get'}, false, true);
    //         } else {
    //             client.reply(message.from, result, message.id);
    //         }
    //     });
    // },
    // ytMp4: async function(client, message, params) {
    //     client.reply(message.from, messages.loading, message.id).then(async () => {
    //         const result = await yt(params, '18');

    //         if (result.includes('https:')) {
    //             client.sendFileFromUrl(message.from, result, 'result.mp4', '', message.id);
    //         } else {
    //             client.reply(message.from, result, message.id);
    //         }
    //     });
    // },
};
