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


### 🔎 Format Comparison Summary

| Format                | Avg Time (ms) | Avg Tokens | Trend                                                                 |
|----------------------|----------------|------------|-----------------------------------------------------------------------|
| `Prompt: txt`        | 17,500–22,000  | 400–500    | ✏️ Richer language, more verbose → slower responses                    |
| `Prompt: json`       | 7,600–15,000   | 150–300    | ⚡ More concise, less context bloat → faster, leaner responses         |
| `Output: json`       | ~ same or faster | -        | JSON output is compact and easy to handle                             |
| `JD/Resume: json`    | Neutral         | -          | JD/resume format has minimal impact alone                             |

### 🏁 Fastest Combinations

| Test # | JD   | Resume | Prompt | Output | Time (ms) | Chars | Tokens |
|--------|------|--------|--------|--------|-----------|--------|--------|
| #4     | txt  | txt    | json   | json   | **7609**  | 632    | 158    |
| #16    | json | json   | json   | json   | **11142** | 935    | 234    |

### 🐌 Slowest Combinations

| Test # | JD   | Resume | Prompt | Output | Time (ms) | Chars | Tokens |
|--------|------|--------|--------|--------|-----------|--------|--------|
| #2     | txt  | txt    | txt    | json   | **22458** | 2011   | 503    |
| #1     | txt  | txt    | txt    | txt    | **21375** | 1953   | 488    |

### ✅ Recommendations

- ✅ Use `promptFormat = json` for faster, focused results
- ✅ Pair with `outputFormat = json` for structured, lightweight output
- 🆗 `JD/Resume` format (txt/json) is flexible — choose based on your pipeline
- ⚖️ `promptFormat = txt` yields longer, more expressive answers, but is slower

---

## 🧠 Conclusion

- 🔥 Fastest: JSON prompt + JSON output (Test #16) → ~11s
- 🐢 Slowest: TXT prompt + JSON output (Test #2) → ~22s
- 📋 JSON prompts consistently reduce latency and token count
- 📌 Recommended setup: `promptFormat = json`, `outputFormat = json`

---

Made with ❤️ for reproducible LLM performance testing.
