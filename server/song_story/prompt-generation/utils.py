def encode(batch, tokenizer, max_len):
    """
    This function takes in a batch and a tokenizer and outputs encoded batch
    """
    return tokenizer.encode_plus(
        batch, None, add_special_tokens=True, max_length=max_len, pad_to_max_length=True
    )
