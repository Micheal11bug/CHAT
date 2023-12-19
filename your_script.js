// 替换 'YOUR_OPENAI_API_KEY' 为你的实际 API 密钥
const apiKey = 'YOUR_OPENAI_API_KEY';

async function generateResponse() {
    // 获取用户在文本框中输入的文本
    const userInput = document.getElementById('userInput').value;

    try {
        // 发送 POST 请求到 OpenAI API，向 ChatGPT 提供用户输入并获取响应
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`, // 使用你的 OpenAI API 密钥进行身份验证
            },
            body: JSON.stringify({
                prompt: userInput, // 用户输入的文本作为 ChatGPT 的输入
                max_tokens: 20000, // ChatGPT-4.0 允许的最大字数限制
            }),
        });

        // 解析 API 响应为 JSON 格式
        const responseData = await response.json();

        // 获取页面上用于显示聊天输出的元素
        const chatOutput = document.getElementById('chatOutput');

        // 将 ChatGPT 的响应添加到页面上
        chatOutput.innerHTML += `<div class="response">${responseData.choices[0].text}</div>`;
    } catch (error) {
        // 如果发生错误，将错误信息打印到浏览器的控制台中
        console.error('Error fetching response:', error);
    }
}
