class Artist:
    def __init__(self, _id, _name, _image_url, _songs):

        self.id = _id
        self.name = _name
        self.image_url = _image_url

        self.songs = _songs

    def id(self):
        return self.id

    def name(self):
        return self.name

    def image(self):
        return self.image_url

    def songs(self):
        return self.songs
