from abc import ABC, abstractmethod


class Target(ABC):
    @abstractmethod
    def play(self):
        raise NotImplementedError


class AudioPlayer(Target):
    def play(self):
        print("Play audio")


class VideoAdapter(Target):

    def __init__(self, adaptee):
        self.__adaptee = adaptee

    def play(self):
        # aqui viria a adaptação
        return self.__adaptee.play_mp4()


class VideoPlayer:
    def play_mp4(self):
        print("Play MP4")


class MediaPlayer:
    def __init__(self, player):
        self.__player = player

    def execute(self):
        self.__player.play()


MediaPlayer(AudioPlayer()).execute()
MediaPlayer(VideoAdapter(VideoPlayer())).execute()
        
