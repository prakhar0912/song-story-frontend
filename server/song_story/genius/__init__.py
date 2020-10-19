import os
import requests
import urllib
from dotenv import load_dotenv
from .artist import Artist

load_dotenv()


class Client:
    def __init__(self, access_token):
        """
        Constructor for API object
        """
        self._access_token = "Bearer {}".format(access_token)
        self.api_root = "https://api.genius.com/"

    def _make_request(self, path, method="GET"):
        """
        Make request to API
        """
        try:
            _url = self.api_root + path
            if method == "GET":
                response = requests.get(
                    _url, headers={"Authorization": self._access_token}
                )
            return True, response.json()

        except Exception as error:
            return False, None

    def get_referents(self, _id):
        """
        Gets song data
        """
        path = "referents?song_id={}".format(_id)
        valid, response = self._make_request(path)

        if valid:

            referents = response["response"]["referents"]

            texts = []
            for referent in referents:
                for anot in referent["annotations"]:
                    for body in anot["body"]["dom"]["children"]:
                        if isinstance(body, dict):
                            for text in body["children"]:
                                if isinstance(text, str):
                                    texts.append(text)
                text = referent["fragment"]
                texts.append(text)

        return " ".join(texts)

    def sanitize_songs(self, results):
        """
        Cleans the songs returned by Genius
        """
        songs = []
        for result in results:

            data = result["result"]
            song = (
                data["id"],
                data["title"],
            )
            songs.append(song)

        return songs

    def search_artist(self, query, max_songs=10):
        """
        Search for artist
        """
        try:
            # query = '%20'.join(query.split(' '))
            f = {"q": query}
            query = urllib.parse.urlencode(f)
            path = "search?" + query
            valid, response = self._make_request(path)

            if valid:

                artist_data = response["response"]["hits"][0]["result"][
                    "primary_artist"
                ]
                results = response["response"]["hits"]

            else:
                return None

            _songs = self.sanitize_songs(results)

            artist = Artist(
                artist_data["id"], artist_data["name"], artist_data["image_url"], _songs
            )
            return artist

        except Exception as error:

            return None


token = os.getenv("ACCESS_TOKEN")

client = Client(token)


def get_client():
    return client
