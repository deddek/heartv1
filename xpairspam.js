const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");


    const color = [
        '\x1b[31m', 
        '\x1b[32m', 
        '\x1b[33m', 
        '\x1b[34m', 
        '\x1b[35m', 
        '\x1b[36m', 
        '\x1b[37m',
        '\x1b[90m' 
    ];
    const gutoColor = color[Math.floor(Math.random() * color.length)];

const xColor = '\x1b[0m';

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
};

async function gutoProject() {
    const { state } = await useMultiFileAuthState('./80/QR code');
    const uwu = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });
    try {
        // Ask for phone number
        const phoneNumber = await question(gutoColor + 'Insira o número de destino🫀 : ' + xColor);
        
        // Request the desired number of pairing codes
        const gutoCodes = parseInt(await question(gutoColor + 'Quantia 🩸 : '+ xColor));

        if (isNaN(gutoCodes) || gutoCodes <= 0) {
            console.log('example : 20.');
            return;
        }

        // Get and display pairing code
        for (let i = 0; i < gutoCodes; i++) {
            try {
                let code = await uwu.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(gutoColor + `${phoneNumber} [${i + 1}/${gutoCodes}]`+ xColor);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    } catch (error) {
                 console.error('error') ;
}

    return uwu;
}
console.log(gutoColor + `═╗ ╦┌─┐┌─┐┌┐┌  ╔═╗┌─┐┌─┐┌┬┐  ╔╗╔┌─┐┌┬┐┬┌─┐┬┌─┐┌─┐┌┬┐┬┌─┐┌┐┌
╔╩╦╝├┤ │ ││││  ╚═╗├─┘├─┤│││  ║║║│ │ │ │├┤ ││  ├─┤ │ ││ ││││
╩ ╚═└─┘└─┘┘└┘  ╚═╝┴  ┴ ┴┴ ┴  ╝╚╝└─┘ ┴ ┴└  ┴└─┘┴ ┴ ┴ ┴└─┘┘└┘` + xColor);

gutoProject();