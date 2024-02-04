
from openai import OpenAI
GPT_APIKey = ""

client = OpenAI(api_key= GPT_APIKey) 

def genImage(dream):
  #note that for this we use dall-e-2 but we can also use dall-e-3
    response = client.images.generate(
        model = "dall-e-3",
        prompt = dream,
        size= "1024x1024",
        quality = "standard",
        n = 1
    )
    return response.data[0].url
# print(genImage()) 

def getDreamSynopsis(dream):
    response = client.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": "You will be provided with a dream and you will create a summary using only regular text"},
            {"role": "user", "content": f"{dream}" }
        ],
        temperature = 0.8,
        max_tokens = 100
    )
    return response.choices[0].message.content
# print(getDreamSynopsis(dream))

def getDreamEmoji(dream):
    response = client.chat.completions.create(
        model = "gpt-3.5-turbo",
        messages = [
            {"role": "system", "content": "You will be provided with a dream and you will create a summary using only emojis and no regular text"},
            {"role": "user", "content": f"{dream}" }
        ],
        temperature = 0.8,
        max_tokens = 100
    )
    return response.choices[0].message.content
# print(getDreamEmoji(dream))