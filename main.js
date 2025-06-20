const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// 📥 IPC Handler from index.html
ipcMain.handle('run-test', async (event, testId, jdType, resumeType, promptFormat, outputFormat) => {
  const baseDir = 'D:/latency_test';  // or use your actual folder path
  const jdPath = path.join(baseDir, `job_description.${jdType}`);
  const resumePath = path.join(baseDir, `resume.${resumeType}`);
  const outputPath = path.join(baseDir, `output_test_${testId}.${outputFormat}`);
  const promptPath = path.join(baseDir, 'prompt.txt');

  try {
    // 🔄 Read JD and Resume
    const jdRaw = fs.readFileSync(jdPath, 'utf8');
    const resumeRaw = fs.readFileSync(resumePath, 'utf8');

    const jd = jdType === 'json' ? JSON.stringify(JSON.parse(jdRaw), null, 2) : jdRaw;
    const resume = resumeType === 'json' ? JSON.stringify(JSON.parse(resumeRaw), null, 2) : resumeRaw;

    // 🧠 Build prompt (either plain or JSON)
    let prompt;
    if (promptFormat === 'json') {
      prompt = JSON.stringify({
        job_description: jdType === 'json' ? JSON.parse(jdRaw) : jd,
        resume: resumeType === 'json' ? JSON.parse(resumeRaw) : resume,
        question: "Why are you a good fit for this role?"
      }, null, 2);
    } else {
      prompt = `You are preparing for an interview. Use the following job description and resume to answer the interview question.\n\nJob Description:\n${jd}\n\nResume:\n${resume}\n\nQuestion:\nWhy are you a good fit for this role?`;
    }

    fs.writeFileSync(promptPath, prompt, 'utf8');

    // 🕒 Start timer
    const start = Date.now();

    return new Promise((resolve) => {
      const command = `type "${promptPath}" | ollama run mistral`;

      exec(command, (err, stdout) => {
        const end = Date.now();
        const elapsedMs = end - start;

        if (err) {
          return resolve({ success: false, error: 'Execution failed' });
        }

        const result = stdout.trim();
        const tokenEstimate = Math.round(result.length / 4);

        // 💾 Save result
        if (outputFormat === 'json') {
          fs.writeFileSync(outputPath, JSON.stringify({ response: result }, null, 2));
        } else {
          fs.writeFileSync(outputPath, result);
        }

        resolve({
          success: true,
          length: result.length,
          time: elapsedMs,
          tokens: tokenEstimate
        });
      });
    });

  } catch (err) {
    return { success: false, error: err.message };
  }
});
