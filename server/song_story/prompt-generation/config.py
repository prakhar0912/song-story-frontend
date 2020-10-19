from transformers import T5Tokenizer

BATCH_SIZE = 1
EPOCHS = 5
LEARNING_RATE = 3e-5
MAX_INPUT_LEN = 100
MAX_TARGET_LEN = 300
Tokenizer = T5Tokenizer.from_pretrained("t5-base")

model_path = "./models/t5-prompt.pt"
