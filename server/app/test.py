import spacy
import os
import torch
from song_story import SpacyModel
from song_story import TextRank
from song_story import GPT2, T5
from transformers import GPT2LMHeadModel, GPT2Tokenizer, GPT2Config
from transformers import T5Tokenizer, T5ForConditionalGeneration


if __name__ == "__main__":
    # Load models
    print("[INFO] Loading models")

    # Loading GPT2
    # gpt2_tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
    # # add the EOS token as PAD token to avoid warnings
    # gpt2_model = GPT2LMHeadModel.from_pretrained(
    #     "gpt2", pad_token_id=gpt2_tokenizer.eos_token_id
    # )

    print(os.getcwd())
    
    # Initializing T5 Model
    t5_model = T5ForConditionalGeneration.from_pretrained("t5-base")
    t5_tokenizer = T5Tokenizer.from_pretrained("t5-base")
    t5_state_path = "../../models/final.pt"
    
  
    t5_model.load_state_dict(torch.load(t5_state_path))

    # Initializing classes
    print("[INFO] Initializing classes")
    # spacy_model = SpacyModel(size="md")
    # gpt2 = GPT2(gpt2_tokenizer, gpt2_model)
    t5 = T5(t5_tokenizer, t5_model, 100)

    # # Summarize text
    # print("[INFO] Summarizing text")
    # text = open("./data/coldplay.txt").read()
    # summarizer = TextRank(spacy_model)
    # summary = summarizer.summarize(text, 1)

    # Generate prompt
    print("[INFO] Generating prompt")
    prompt = t5.get_prompt("generate prompt: alien moon egg invasion attack ", 100)
    print(prompt)

    # # Generate language
    # print("[INFO] Generating story")
    # story = gpt2.get_story(summary, 60)

    # print("STORY")
    # print("-" * 50)

    # print(story)
