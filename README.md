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

| Test # | JD | Resume | Prompt | Output | Time (ms) | Chars | Tokens |
|--------|----|--------|--------|--------|-----------|--------|--------|
| 1 | txt | txt | txt | txt | 20023 | 1644 | 411 |
| 2 | txt | txt | txt | json | 22458 | 2011 | 503 |
| 3 | txt | txt | json | txt | 8219 | 802 | 201 |
| 4 | txt | txt | json | json | 7609 | 632 | 158 |
| 5 | txt | json | txt | txt | 17673 | 1617 | 404 |
| 6 | txt | json | txt | json | 16012 | 1330 | 333 |
| 7 | txt | json | json | txt | 9145 | 912 | 228 |
| 8 | txt | json | json | json | 14661 | 1362 | 341 |
| 9 | json | txt | txt | txt | 21798 | 1985 | 496 |
| 10 | json | txt | txt | json | 21363 | 2060 | 515 |
| 11 | json | txt | json | txt | 15688 | 1491 | 373 |
| 12 | json | txt | json | json | 20903 | 1901 | 475 |
| 13 | json | json | txt | txt | 17564 | 1590 | 398 |
| 14 | json | json | txt | json | 19846 | 1798 | 450 |
| 15 | json | json | json | txt | 13673 | 1508 | 377 |
| 16 | json | json | json | json | 11142 | 935 | 234 |

## 📈 Chart: Average Time by Prompt Format

![Time Chart](avg_time_by_prompt_format.png)

## 🧠 Conclusion

- 🔥 Fastest: JSON prompt + JSON output (Test #16) → ~11s
- 🐢 Slowest: TXT prompt + JSON output (Test #2) → ~22s
- 📋 JSON prompts consistently reduce latency and token count
- 📌 Recommended setup: `promptFormat = json`, `outputFormat = json`

---

Made with ❤️ for reproducible LLM performance testing.
