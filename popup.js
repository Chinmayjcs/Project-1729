document.getElementById("btnIntuition").addEventListener("click", () => handleRequest("intuition"));
document.getElementById("btnOptimal").addEventListener("click", () => handleRequest("optimal"));

async function handleRequest(type) {
  const problemTitle = document.getElementById("problemInput").value.trim();
  const language = document.getElementById("languageSelect").value;

  if (!problemTitle) {
    document.getElementById("responseBox").innerText = "Please enter a problem title.";
    return;
  }

  let prompt = "";

  if (type === "intuition") {
    prompt = `
Explain how to solve the LeetCode problem titled "${problemTitle}".

Start with a brute-force solution and explain its weaknesses.

Then describe how to move to an optimal approach.

Explain the intuition clearly.

Finally, give clean code in ${language}.
    `.trim();
  } else {
    prompt = `
Give an optimal solution in ${language} for the LeetCode problem titled "${problemTitle}".
Explain your algorithm briefly and provide clean, well-commented code.
    `.trim();
  }

  const response = await getGeminiResponse(prompt);
  document.getElementById("responseBox").innerText = response;
}

async function getGeminiResponse(prompt) {
  console.log("Prompt:", prompt);

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpnDPoW20eQSDv0CMDXz0xaEABg07lU10", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  console.log("Gemini API response:", data);
  
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";
}
