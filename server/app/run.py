import os
import re
import random
import json
from dotenv import load_dotenv
from rake_nltk import Rake

from flask import Flask
from flask import request, jsonify
from flask_cors import CORS

import spacy
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer, GPT2Config
from transformers import T5Tokenizer, T5ForConditionalGeneration


from song_story import SpacyModel
from song_story import TextRank
from song_story import GPT2, T5
from song_story import GeniusClient

load_dotenv()


class App(Flask):
    def __init__(self, name):
        super(App, self).__init__(name)

        # Load models
        print("[INFO] Loading models")

        cur_dir =  os.path.dirname(os.path.realpath(__file__))

        # Loading GPT2
        gpt2_tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
        # add the EOS token as PAD token to avoid warnings
        gpt2_model = GPT2LMHeadModel.from_pretrained(
            "gpt2", pad_token_id=gpt2_tokenizer.eos_token_id
        )

        # Initializing T5 Model
        t5_model = T5ForConditionalGeneration.from_pretrained("t5-base")
        t5_tokenizer = T5Tokenizer.from_pretrained("t5-base")
        t5_state_path = os.path.join(cur_dir, "../../models/final.pt")
        t5_model.load_state_dict(torch.load(t5_state_path))

        # Initializing classes
        print("[INFO] Initializing classes")

        self.spacy_model = SpacyModel(size="md")
        self.gpt2 = GPT2(gpt2_tokenizer, gpt2_model)
        self.t5 = T5(t5_tokenizer, t5_model, 100)
        self.r = Rake()

        token = os.getenv("ACCESS_TOKEN")

        # Load lists of artists
        dataset = os.path.join(cur_dir, '../data/artists.txt')
        self.artists = open(dataset).readlines()

        

        self.client = GeniusClient(token)


app = App(__name__)
CORS(app)

@app.route("/status", methods=["GET"])
def status():
    return {"status": "success", "message": "Server up and running"}

@app.route("/artist", methods=["GET"])
def get_artists():
    name = request.args.get("name")

    r = re.compile("{}*".format(name), re.IGNORECASE)
    search_list = list(filter(r.match, app.artists)) 
    artists = ','.join(search_list)
    return jsonify({
        'artists': artists,
    })

@app.route("/prompt", methods=["GET"])
def get_prompt():

    keys = request.args.get("keywords")
    prompt = app.t5.get_prompt(keys, 300)

@app.route("/context", methods=["GET"])
def get_context():

    name = request.args.get("name")
    print(name)
    artist = app.client.search_artist(name)

    # Choose a random song
    seed = random.randint(0, len(artist.songs) - 1)

    _id = artist.songs[seed][0]
    title = artist.songs[seed][1]
    image = artist.image_url

    context = app.client.get_referents(_id)

    return jsonify(
        {
            "status": "success",
            "message": "Some story",
            "story": context,
            "title": title,
            "image": image
        }
    )


@app.route("/keywords", methods=["POST"])
def get_keywords():
    data = json.loads(request.data)
    text = data["text"]
    app.r.extract_keywords_from_text(text)
    keys = app.r.get_ranked_phrases()
    keys = [key.lower().strip() for key in keys]

    return {"phrase": " ".join(keys)}


@app.route("/story", methods=["POST"])
def get_story():
    data = json.loads(request.data)
    prompt = data["prompt"]
    story = app.gpt2.story_from_prompt(prompt, 500)
    return {"story": story}


if __name__ == "__main__":
    app.run(debug=True, port=3000)
