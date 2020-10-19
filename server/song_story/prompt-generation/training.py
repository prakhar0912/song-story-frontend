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


class PromptDataset(Dataset):
    def __init__(self, data, tokenizer):
        self.data = data
        self.tokenizer = tokenizer

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        source = encode(
            "generate prompt: " + self.data.iloc[idx]["source"],
            self.tokenizer,
            config.MAX_INPUT_LEN,
        )
        target = encode(
            self.data.iloc[idx]["target"], self.tokenizer, config.MAX_TARGET_LEN
        )

        target = target["input_ids"]
        input_ids = source["input_ids"]
        mask = source["attention_mask"]

        return {
            "input_ids": torch.tensor(input_ids, dtype=torch.long),
            "mask": torch.tensor(mask, dtype=torch.long),
            "target": torch.tensor(target, dtype=torch.long),
        }


# Set device
device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")

# Load data
df = pd.read_csv("../input/prompt/data.csv")

# Dataset and dataloader
data = PromptDataset(df, config.Tokenizer)
train_loader = DataLoader(data, batch_size=1)


# Loading Model and adding our new tokens
model = T5ForConditionalGeneration.from_pretrained("t5-base")

# Training Function
def train_fn(data_loader, model, optimizer, device, scheduler, epoch):
    """
    This is training function for model training
    """
    model.train()

    for bi, d in enumerate(data_loader):
        ids = d["input_ids"]
        mask = d["mask"]
        labels = d["target"]

        ids = ids.to(device, dtype=torch.long)
        mask = mask.to(device, dtype=torch.long)
        labels = labels.to(device, dtype=torch.long)

        optimizer.zero_grad()
        outputs = model(input_ids=ids, attention_mask=mask, lm_labels=labels)

        loss = outputs[0]
        loss.backward()

        optimizer.step()
        if scheduler is not None:
            scheduler.step()

        if (bi + 1) % 50 == 0:
            print(
                "Epoch [{}/{}], bi[{}/{}], Loss: {:.4f}".format(
                    epoch + 1, config.EPOCHS, bi + 1, len(data_loader), loss.item()
                )
            )


def run():

    model.to(device)

    num_train_steps = int(len(train_loader) / config.BATCH_SIZE * config.EPOCHS)

    optimizer = AdamW(model.parameters(), lr=config.LEARNING_RATE)
    scheduler = get_linear_schedule_with_warmup(
        optimizer, num_warmup_steps=0, num_training_steps=num_train_steps
    )

    for epoch in range(config.EPOCHS):
        print(f"EPOCH {epoch+1} started" + "=" * 30)
        train_fn(train_loader, model, optimizer, device, scheduler, epoch=epoch)

        models_folder = "/T5-base"  # add path where you want to save your model here
        if not os.path.exists(models_folder):
            os.mkdir(models_folder)
        torch.save(
            model.state_dict(),
            os.path.join(models_folder, "T5_large_emotions_{}.pt".format(str(epoch))),
        )
