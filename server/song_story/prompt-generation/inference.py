import os
import pandas as pd
import numpy as np
import re

# Pytorch
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Dataset

# Transformers
from transformers import T5Tokenizer, T5ForConditionalGeneration
from transformers import AdamW, get_linear_schedule_with_warmup

# Warning
import warnings

warnings.filterwarnings("ignore")

# Import configuration
import config

# Import utils
from utils import encode

# Initializing pretrained model
model = T5ForConditionalGeneration.from_pretrained("t5-base")

# Load trained weights
model.load_state_dict(torch.load(config.model_path))

# Set device
device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")

model.to(device)


def predict(test_example):
    """
    This function generates prediction for given input
    """
    model.eval()
    with torch.no_grad():
        encoded = encode(test_example, config.Tokenizer, config.MAX_INPUT_LEN)

        ids = (
            torch.tensor(encoded["input_ids"], dtype=torch.long)
            .to(device)
            .reshape(1, config.MAX_INPUT_LEN)
        )  # Modify this if you are using different batch_size
        mask = (
            torch.tensor(encoded["attention_mask"], dtype=torch.long)
            .to(device)
            .reshape(1, config.MAX_INPUT_LEN)
        )  # Modify this if you are using different batch_size

        generated_ids = model.generate(
            input_ids=ids,
            attention_mask=mask,
            num_beams=1,
            max_length=config.MAX_TARGET_LEN,
            repetition_penalty=2.5,
            length_penalty=1.0,
            early_stopping=True,
            use_cache=True,
        )

        preds = [
            config.Tokenizer.decode(
                g, skip_special_tokens=True, clean_up_tokenization_spaces=True
            )
            for g in generated_ids
        ]

    print(preds)


# Generate prompts by passing string of keywords to model
predict("captain blue waters ship")
