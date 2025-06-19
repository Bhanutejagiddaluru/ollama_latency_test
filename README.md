# 🧪 Ollama Latency Test

This project benchmarks the performance of different prompt/output format combinations when sending structured inputs to an Ollama-powered LLM using an Electron-based GUI.

## 📦 Project Structure

- `main.js`: Electron backend — builds prompts and runs `ollama`
- `index.html`: Frontend with test table and result logging
- `D:/latency_test/`: Input/output files (JD/resume/prompt/output)

## ✅ Pre-requisites

- Node.js + Electron
- Ollama CLI installed locally
- Test files in `D:/latency_test/`:
  - `job_description.txt`, `job_description.json`
  - `resume.txt`, `resume.json`

## 📊 Test Matrix
## results 1: 
![test1_results](https://github.com/user-attachments/assets/3528ee62-cb59-49b1-b939-b84cdb0e3b61)


## results 2:
![test2_results](https://github.com/user-attachments/assets/45234f63-67ba-46ea-94c9-c95ef5447979)

## 📈 Chart: Average Time by Prompt Format

![avg_time_by_prompt_format](https://github.com/user-attachments/assets/e880dcf0-b8bf-4bca-96a3-c48452eb642a)


## 🧠 Conclusion

- 🔥 Fastest: JSON prompt + JSON output (Test #16) → ~11s
- 🐢 Slowest: TXT prompt + JSON output (Test #2) → ~22s
- 📋 JSON prompts consistently reduce latency and token count
- 📌 Recommended setup: `promptFormat = json`, `outputFormat = json`

---

Made with ❤️ for reproducible LLM performance testing.
