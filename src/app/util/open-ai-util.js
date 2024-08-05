import { preparePostRequest } from "./request-helper";
export async function openai(inputQuestion) {
  const move_url = new URL(
    "https://hqph2xdzlf.execute-api.us-east-1.amazonaws.com/openai"
  );

  const prompt =
    '{"prompt": "' +
    inputQuestion +
    '\\n Assistant:", "max_tokens_to_sample": 300, "temperature": 1}';
  const postRequest = preparePostRequest(
    JSON.stringify({
      modelId: "gpt-3.5-turbo",
      body: prompt,
    })
  );
  try {
    const response = await fetch(move_url, postRequest);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
