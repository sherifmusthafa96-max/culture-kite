const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function convertFolder(folder) {
    const files = fs.readdirSync(folder);

    for (const file of files) {
        if (file.endsWith(".png")) {
            const input = path.join(folder, file);
            const output = path.join(
                folder,
                file.replace(".png", ".webp")
            );

            await sharp(input)
                .webp({ quality: 80 })
                .toFile(output);

            console.log(`Converted: ${file}`);
        }
    }
}

(async () => {
    await convertFolder("./public");
    await convertFolder("./public/client-logos");

    console.log("Done ✅");
})();