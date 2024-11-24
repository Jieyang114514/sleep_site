import { preparePostRequest } from "./request-helper";
export async function openai(inputQuestion) {
  const move_url = new URL(
    "https://x1p2l4yqj0.execute-api.us-east-1.amazonaws.com/openai"
  );
  const prompt = `{\"prompt\": \"Human:'${inputQuestion}'}\\n Assistant:\", \"max_tokens_to_sample\": 300, \"temperature\": 1}`;
  const postRequest = preparePostRequest(
    JSON.stringify({
      accessKey: "Zjytest20241123",
      modelId: "gpt-3.5-turbo",
      body: prompt,
    })
  );
  try {
    console.log(`!!!===发出请求是postRequest:${JSON.stringify(postRequest)}`);
    const response = await fetch(move_url, postRequest);
    const result = await response.json();
    console.log(`!!!===回答是result:${JSON.stringify(result)}`);
    return result;
  } catch (error) {
    throw error;
  }
}
