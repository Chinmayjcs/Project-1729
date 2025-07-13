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
Explain how to solve the LeetCode problem number "${problemTitle}".

Start with what is given in the question explain the topics the solution will require(like stack,queue,slidding window,dynamic programming etc)

Then provide Brute-force solution which solves the problem but not in the optimal way 
and generate the brute force code in ${language} with proper indentation and simple and understandable variable names.

Then explain the drawbacks of the brute force solution.

Then explain the approch and intuition (clearly) of the optimal solution and how it solves the isuues faced by the brute force solution.

At the end explain the workflow of the programm along with its time complexity and space complexity 
also produce a workflow diagram to understand the problem in a better in a simple manner

Also if any edge case exits then explain how the soolution is dealing with the edge case and 
suggest simillar leetcode question number that is very is simillar to the current one



Finally, give clean opyimal code in ${language} with proper indentation and simple-understandable variable names.
    `.trim();
  } else {
    prompt = `
          Give an optimal solution in ${language} for the LeetCode problem number "${problemTitle}" with proper indentation and simple-understandable variable names .
          Explain your algorithm briefly.
          the time complexity and space complexity.
          suggest the simillar leetcode question number.
          at the end mentioned the topics covered in the problem (like array,queue,slidding window,tree,graph etc..)
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
