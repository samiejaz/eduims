import { fileURLToPath } from "url"
import path from "path"
import fs from "fs-extra"
import { execSync } from "child_process"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  try {
    console.log("Running Vite build... 🛠️")
    execSync("npm run localbuild", { stdio: "inherit" })

    const buildFolder = path.resolve(__dirname, "../dist")

    const iisBuildFolder = "C:/inetpub/wwwroot/eduims"

    // console.log("Stopping IIS server... ⏸️")
    // execSync("iisreset /stop")

    console.log("Clearing IIS build folder... 🗑️")
    await fs.emptyDir(iisBuildFolder)

    console.log("Copying new build files... 📂")
    await fs.copy(buildFolder, iisBuildFolder)

    // console.log("Starting IIS server... ▶️")
    // execSync("iisreset /start")

    console.log("Deployment to IIS server completed successfully. ✅")
  } catch (err) {
    console.error("Error deploying to IIS server:", err)
  }
}

main()
