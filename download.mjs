import fs from "fs/promises";
import https from "https";

const downloadFile = (url, path) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        fs.writeFile(path, data).then(resolve).catch(reject);
      });
    }).on("error", reject);
  });
};

async function main() {
  await fs.mkdir(".stitch", { recursive: true });
  await downloadFile("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzcyODUzYWQ2OGE2ODQ0NzE4MzE2MWI0ZGZlNjIwNWZkEgsSBxCL8pHupR4YAZIBIwoKcHJvamVjdF9pZBIVQhM5MDY1MjYzMjc2MTE2NDUxNDg4&filename=&opi=89354086", ".stitch/results.html");
  await downloadFile("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzZhNTQ4MmYzYjAzZDRiODViYTQ5MGM2NjdjOGQzZjE4EgsSBxCL8pHupR4YAZIBIwoKcHJvamVjdF9pZBIVQhM5MDY1MjYzMjc2MTE2NDUxNDg4&filename=&opi=89354086", ".stitch/analyze.html");
  await downloadFile("https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzVkZjcyMGVkZGE0YjQxNTY4NWVjY2FjYzA3N2NhMWE3EgsSBxCL8pHupR4YAZIBIwoKcHJvamVjdF9pZBIVQhM5MDY1MjYzMjc2MTE2NDUxNDg4&filename=&opi=89354086", ".stitch/landing.html");
  console.log("Downloaded successfully");
}

main();
