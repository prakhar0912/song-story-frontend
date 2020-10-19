import torch
from transformers import T5Tokenizer, T5ForConditionalGeneration


class T5_Model:
    """
    This class provides functions to generate text using gpt2 model
    """

    def __init__(self, tokenizer, model, max_input_len):
        """
        Constructor class for GPT2
        """

        self.device = (
            torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
        )

        self.tokenizer = tokenizer

        self.model = model
        self.model.to(self.device)
        self.model.eval()

        self.max_input_len = max_input_len

    def get_prompt(self, keywords, max_output_len):
        """
        This generates prompts
        """

        with torch.no_grad():
            encoded = self.encode(keywords, self.tokenizer, self.max_input_len)

            ids = (
                torch.tensor(encoded["input_ids"], dtype=torch.long)
                .to(self.device)
                .reshape(1, self.max_input_len)
            )  # Modify this if you are using different batch_size
            mask = (
                torch.tensor(encoded["attention_mask"], dtype=torch.long)
                .to(self.device)
                .reshape(1, self.max_input_len)
            )  # Modify this if you are using different batch_size

            generated_ids = self.model.generate(
                input_ids=ids,
                attention_mask=mask,
                num_beams=1,
                max_length=max_output_len,
                repetition_penalty=2.5,
                length_penalty=1.0,
                early_stopping=True,
                use_cache=True,
            )

            preds = [
                self.tokenizer.decode(
                    g, skip_special_tokens=True, clean_up_tokenization_spaces=True
                )
                for g in generated_ids
            ]

        return preds

    def encode(self, batch, tokenizer, max_len):
        """
        This function takes in a batch and a tokenizer and outputs encoded batch
        """

        return tokenizer.encode_plus(
            batch,
            None,
            add_special_tokens=True,
            max_length=max_len,
            pad_to_max_length=True,
        )
