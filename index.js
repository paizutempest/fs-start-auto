import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import chalk from "chalk";
import gradient from "gradient-string";
import { input, select } from "@inquirer/prompts";
import dayjs from "dayjs";
import fs from "fs";
import { table } from "table";

chromium.use(stealth());

// Banner Mewah Biru Laut Khas FS
function displayBanner() {
    console.clear();
    const seaBlue = gradient(['#00FFFF', '#0080FF', '#000080']);
    console.log(seaBlue(`
    ███████╗███████╗    ███████╗████████╗ █████╗ ██████╗ ████████╗
    ██╔════╝██╔════╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
    █████╗  ███████╗    ███████╗   ██║   ███████║██████╔╝   ██║   
    ██╔══╝  ╚════██║    ╚════██║   ██║   ██╔══██║██╔══██╗   ██║   
    ██║     ███████║    ███████║   ██║   ██║  ██║██║  ██║   ██║   
    ╚═╝     ╚══════╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
    FS START AUTO REGISTER - Deep Ocean Identity
    By Paizutempest | Header Injected
    `));
}

const log = {
    info: (msg) => console.log(`${chalk.cyan('ℹ')} [${dayjs().format('HH:mm:ss')}] ${msg}`),
    success: (msg) => console.log(`${chalk.green('✔')} [${dayjs().format('HH:mm:ss')}] ${msg}`),
    warn: (msg) => console.log(`${chalk.yellow('⚠')} [${dayjs().format('HH:mm:ss')}] ${msg}`),
    error: (msg) => console.log(`${chalk.red('✖')} [${dayjs().format('HH:mm:ss')}] ${msg}`),
    process: (msg) => console.log(`${chalk.blue('⚙')} [${dayjs().format('HH:mm:ss')}] ${chalk.italic(msg)}...`)
};

// --- IDENTITY GENERATOR (DEVICE AGNOSTIC) ---

function getDeepIdentity() {
    const devices = [
        // --- DESKTOP ---
        { ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', platform: 'Windows' },
        { ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', platform: 'MacIntel' },
        { ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', platform: 'Linux x86_64' },
        
        // --- MOBILE ANDROID (High-End) ---
        { ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', platform: 'Linux armv8l' },
        { ua: 'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', platform: 'Linux armv8l' },
        { ua: 'Mozilla/5.0 (Linux; Android 12; M2101K6G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', platform: 'Linux armv8l' },

        // --- MOBILE IOS (iPhone) ---
        { ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1', platform: 'iPhone' },
        { ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', platform: 'iPhone' },

        // --- TABLET ---
        { ua: 'Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1', platform: 'iPad' },
        { ua: 'Mozilla/5.0 (Linux; Android 13; SM-X906B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', platform: 'Linux armv8l' }
    ];
    const pick = devices[Math.floor(Math.random() * devices.length)];
    
    
    const screens = [
        { width: 1920, height: 1080 },
        { width: 1366, height: 768 },
        { width: 1440, height: 900 }
    ];
    const screen = screens[Math.floor(Math.random() * screens.length)];

    return { ...pick, screen };
}

// --- FUNGSI AMBIL EMAIL DARI GENERATOR.EMAIL ---
async function getEmailFromGenerator(browserContext) {
    const page = await browserContext.newPage();
    try {
        log.process("Mengambil email baru dari generator.email");
        await page.goto('https://generator.email/', { waitUntil: 'networkidle' });
        
        // Klik tombol "Generate new e-mail" sesuai elemen yang kamu kasih
        await page.click('button.e7m:has-text("Generate new e-mail")');
        await page.waitForTimeout(2000);

        // Ambil teks email yang muncul
        const email = await page.innerText('#email_ch_text');
        log.success(`Email Berhasil Di-generate: ${chalk.yellow(email)}`);
        
        await page.close();
        return email;
    } catch (err) {
        log.error("Gagal mengambil email dari generator: " + err.message);
        await page.close();
        return null;
    }
}

async function bruteForceClearPopups(page) {
    log.process("Pembersihan pop-up (Lapis Lottery detected)...");
    
    await page.evaluate(() => {
        const allElements = document.querySelectorAll('uni-view');
        allElements.forEach(el => {
            const style = window.getComputedStyle(el);
            const zIndex = parseInt(style.zIndex);
            const text = (el.innerText || "").toLowerCase();

            // Tambahkan deteksi teks lottery
            if (zIndex > 10 && (
                text.includes("ceo incubation") || 
                text.includes("check-in") || 
                text.includes("view details") || 
                text.includes("i also need help") ||
                text.includes("start lottery") || // Target baru!
                text.includes("draw once a day")  // Target baru!
            )) {
                el.style.display = 'none'; 
                
                // Cari mask/overlay di belakangnya yang biasanya z-index-nya n-1
                const prev = el.previousElementSibling;
                if (prev && (prev.classList.contains('uni-mask') || prev.classList.contains('u-mask'))) {
                    prev.style.display = 'none';
                }
            }

            // Hapus mask secara brutal jika masih ada
            if (el.classList.contains('uni-mask') || el.classList.contains('u-mask')) {
                el.style.display = 'none';
            }
        });

        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    });
    
    await page.waitForTimeout(2000);
}
async function clearAllPopups(page) {
    log.process("Memulai pembersihan pop-up bertingkat...");
    
    // List selector tombol yang harus diklik secara urut
    const popupActions = [
        { name: "Check-in", selector: 'text="Today\'s check-in"' },
        { name: "Boost Success", selector: '.openBtn:has-text("I also need help")' },
        { name: "Reward 2 USDT", selector: 'img[src*="close.png"]' }, // Klik X di kanan atas
        { name: "Sign-in Reward", selector: 'text="Close"' }
    ];

    for (const action of popupActions) {
        try {
            // Tunggu sebentar tiap lapis pop-up muncul
            await page.waitForTimeout(2000);
            const target = page.locator(action.selector);
            
            if (await target.isVisible()) {
                log.info(`Membersihkan Lapis: ${chalk.yellow(action.name)}`);
                await target.click();
                // Tunggu animasi pop-up hilang
                await page.waitForTimeout(1000);
            }
        } catch (e) {
            log.warn(`Lapis ${action.name} tidak muncul, lanjut...`);
        }
    }
    log.success("Layar bersih! Siap eksekusi adopsi NFT.");
}
async function startEngine(referralLink, count) {
    const refCode = referralLink.split('ref=')[1]?.split('&')[0] || referralLink;
    log.info(`Target Reff: ${chalk.yellow(refCode)}`);

    for (let i = 1; i <= count; i++) {
        const id = getDeepIdentity();
        log.process(`[Akun ${i}] Generating Identity (${id.platform})`);

        const browser = await chromium.launch({ 
            headless: true, 
            args: [
                '--disable-blink-features=AutomationControlled',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--no-first-run',
                '--no-zygote',
                '--disable-extensions',
                '--mute-audio', 
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding'
            ]
        }); 

        const context = await browser.newContext({
            userAgent: id.ua,
            viewport: id.screen,
            deviceScaleFactor: 1
        });

        // Tetap pakai block resource biar kenceng
        const page = await context.newPage();
        await page.route('**/*', (route) => {
            const type = route.request().resourceType();
            if (['image', 'media', 'font'].includes(type)) {
                route.abort();
            } else {
                route.continue();
            }
        });
        let capturedToken = 'NOT_FOUND';

        // Listener Token
        page.on('request', request => {
            const referer = request.headers()['referer'];
            if (referer && referer.includes('token=')) {
                const tokenMatch = referer.match(/token=([^&]+)/);
                if (tokenMatch) capturedToken = tokenMatch[1];
            }
        });

        try {
            // 1. REGISTRASI
            const email = await getEmailFromGenerator(browser); 
            if (!email) {
                log.error("Skip akun karena gagal ambil email.");
                await browser.close();
                continue;
            }

            const password = `Paizu${Math.floor(1000 + Math.random() * 9000)}#`;

            log.process(`Navigasi ke Abysea: ${chalk.cyan(email)}`);
            await page.goto(`https://www.abysea.org/#/SEC_REG?ref=${refCode}&language=en`, { waitUntil: 'networkidle' });

            await page.waitForTimeout(2000); 
            const autoInvitationCode = await page.$eval('input[type="number"]', el => el.value);
            log.info(`KODE UNDANGAN TERDETEKSI: ${chalk.yellow(autoInvitationCode)}`);

            await page.locator('.uni-input-input').nth(0).fill(email); 
            await page.locator('.uni-input-input').nth(1).fill(password); 
    
            const isChecked = await page.evaluate(() => {
                return document.querySelector('.u-checkbox__icon-wrap').classList.contains('u-checkbox__icon-wrap--checked');
            });
            if (!isChecked) await page.click('.u-checkbox__icon-wrap');

            await page.click('.changePassword_submit'); 
            log.success("Registrasi Sukses! Menunggu Token...");
            // Tunggu redirect ke awfs.net agar listener request menangkap token
    await page.waitForTimeout(7000); 

    if (capturedToken !== 'NOT_FOUND') {
        log.success(`Token Captured dari Referer: ${chalk.magenta(capturedToken)}`);
    } else {
        log.warn("Token tetap tidak ditemukan di Referer URL.");
    }
            // 2. PROSES ADOPSI FS01
            log.process("Sinkronisasi ke Home untuk Adopsi FS01");
            await page.goto(`https://www.awfs.net/?token=${capturedToken}`, { waitUntil: 'networkidle' });
            await page.waitForTimeout(3000);
            
            await clearAllPopups(page);
            
            log.process("Membuka Dashboard Utama...");
            await page.goto('https://www.awfs.net/#/pages/home/home', { waitUntil: 'networkidle' });
            await page.waitForTimeout(3000);
            
            // Bersihkan sisa pop-up (Lottery dll)
            await bruteForceClearPopups(page);

            log.process("Mencari FSx di Slider...");
            // Kita cari kartu yang punya teks 'Adoption Amount 40 USDT'
            const cardFSx = page.locator('uni-swiper-item').filter({ hasText: 'Adoption Amount 40 USDT' }).first();
            
            await cardFSx.waitFor({ state: 'visible', timeout: 10000 });
            // Klik tombol Purchase di DALAM kartu FSx
            const btnPurchaseFSx = cardFSx.locator('.home_vip_card_head_buy');
            await btnPurchaseFSx.evaluate(el => el.click()); // Pake evaluate biar tembus slider
            
            // Tunggu halaman konfirmasi muat sempurna
            await page.waitForURL(/chooseVipLevel=0/, { timeout: 10000 });
            await page.waitForTimeout(2000);

            // Klik Confirm Adoption (Selector sesuai HTML baru lu)
            log.process("Klik 'Confirm adoption' untuk FSx...");
            const btnConfirmFSx = page.locator('uni-view.affirm:has-text("Confirm adoption"), .affirm').first();
            await btnConfirmFSx.evaluate(el => el.click());
            log.success("NFT FSx Berhasil Diadopsi!");

            await page.waitForTimeout(3000);

            const btnStart = page.locator('.openBtn').or(page.locator('text="Start earning"')).first();
            if (await btnStart.isVisible()) {
                await btnStart.click({ force: true });
                log.success("Daily Income: ACTIVE");
            }

            // 4. SIMPAN DATA
            await page.goto('https://www.awfs.net/#/pages/member/member');
            const data = { email, password, token: capturedToken, date: dayjs().format('YYYY-MM-DD HH:mm') };
            let saved = fs.existsSync('fs_results.json') ? JSON.parse(fs.readFileSync('fs_results.json')) : [];
            saved.push(data);
            fs.writeFileSync('fs_results.json', JSON.stringify(saved, null, 2));
            log.success(`Akun ${i} disimpan.`);

        } catch (err) {
            log.error(`Gagal pada proses: ${err.message}`);
            await page.screenshot({ path: `error_akun_${i}.png` });
        } finally {
            await browser.close();
            log.info("Sesi ditutup.");
            await new Promise(r => setTimeout(r, 4000));
        }
    }
}

// --- MAIN CONTROL ---
(async function main() {
    displayBanner();
    const menu = await select({
        message: 'Deep Ocean Menu:',
        choices: [
            { name: '1. Start Auto Referral & Adopt', value: 'run' },
            { name: '2. Check Saved Tokens/Accounts', value: 'view' },
            { name: '0. Exit', value: 'exit' },
        ],
    });

    if (menu === 'run') {
        const link = await input({ message: "Masukkan Link Referral (IA8DAH2):" });
        const jml = await input({ message: "Jumlah akun yang ingin dibuat:", default: "1" });
        await startEngine(link, parseInt(jml));
    }

    if (menu === 'view') {
        if (!fs.existsSync("fs_results.json")) return log.error("Data kosong.");
        const accounts = JSON.parse(fs.readFileSync("fs_results.json"));
        const rows = accounts.map(a => [a.email, a.token.substring(0, 15) + '...', a.date]);
        console.log(table([["Email", "Token (Partial)", "Registered At"], ...rows]));
    }
    
    setTimeout(main, 2000);
})();