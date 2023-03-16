import React, {useContext, useEffect, useState} from 'react';
import {ScrollableScreen} from '../../layouts';
import {TouchableOpacity, View} from 'react-native';
import {
  Icon,
  H3,
  Header,
  Spacing,
  P,
  Img,
  NoFlexContainer,
  H2,
} from '../../components';
import {Color, Icons} from '../../styles';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import {
  displayToastShort,
  formatMusicTime,
  retriveEncrypted,
  storeEncrypted,
} from '../../helpers';
import {IMAGES_CATEGORIES, MUSIC_LIST} from '../../helpers/constant';
import {GlobalContext} from '../../context/global-context';
import Sound from 'react-native-sound';

export const Relaxation = ({route, navigation}) => {
  const {images, music, user} = useContext(GlobalContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingTime, setPlayingTime] = useState(0);
  const [subImages, setSubImages] = useState([]);
  const [selectedSub, setSelectedSub] = useState(0);

  const selectedImages = images.get();
  const selectedMusic = music.get();

  const [playback, setPlayback] = useState(
    new Sound(MUSIC_LIST[selectedMusic].file, error => {
      if (error) return displayToastShort('Gagal memuat audio');
    }),
  );

  const nextMusic = () => {
    playback.release();
    setIsPlaying(false);
    if (selectedMusic + 1 == MUSIC_LIST.length) {
      return music.set(0);
    }

    music.set(selectedMusic + 1);
  };

  const prevMusic = () => {
    playback.release();
    setIsPlaying(false);
    if (selectedMusic == 0) {
      return music.set(MUSIC_LIST.length - 1);
    }
    music.set(selectedMusic - 1);
  };

  const nextSelectedSub = () => {
    if (selectedSub + 1 == subImages.length) {
      return setSelectedSub(0);
    }

    setSelectedSub(sub => sub + 1);
  };

  const reRenderLiked = async () => {
    const userId = user.get()?.id;
    let likedSub = (await retriveEncrypted(userId)) || [];
    const newSub = IMAGES_CATEGORIES[selectedImages].list.map(el => {
      if (likedSub.includes(`${el.name} ${el.by}`)) {
        return {...el, liked: true};
      }

      return el;
    });

    setSelectedSub(0);
    setSubImages(newSub);
  };

  useEffect(() => {
    reRenderLiked();
  }, [selectedImages]);

  useEffect(() => {
    setPlayingTime(0);
    playback.release();
    setPlayback(
      new Sound(MUSIC_LIST[selectedMusic].file, error => {
        if (error) return displayToastShort('Gagal memuat audio');
      }),
    );
  }, [selectedMusic]);

  const toggleFav = obj => {
    try {
      const imgId = obj?.name + ' ' + obj?.by;
      // const userId = user.get()?.id;
      const newSub = subImages.map(el =>
        el.name + ' ' + el.by == imgId
          ? {
              ...obj,
              liked: !obj.liked,
            }
          : el,
      );

      setSubImages(newSub);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const nextTick = () => {
      if (playingTime > playback.getDuration() - 1) {
        setPlayingTime(0);
        return nextMusic();
      }

      playback.getCurrentTime(seconds => setPlayingTime(Math.floor(seconds)));
    };

    if (!isPlaying) return;
    const interval = setInterval(nextTick, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);

  return (
    <ScrollableScreen>
      <NoFlexContainer>
        <Header
          text={'Relaksasi diri dengan kekuatan dari alam!'}
          navigation={navigation}
        />

        <H3>Relaksasi mata</H3>
        <TouchableOpacity
          onPress={() => navigation.navigate('Galeri gambar')}
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <H2
            variant={'light'}
            style={{textAlign: 'center', color: Color.text}}>
            {IMAGES_CATEGORIES[selectedImages].name}
          </H2>
          <Icon
            name={'expand-more'}
            color={Color.text}
            size={30}
            style={{marginLeft: 15}}
          />
        </TouchableOpacity>
      </NoFlexContainer>
      <View
        style={{
          width: '100%',
          maxHeight: 250,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={{
            position: 'absolute',
            zIndex: 99,
            bottom: 0,
            width: '100%',
            height: 150,
            justifyContent: 'flex-end',
          }}>
          <NoFlexContainer>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => toggleFav(subImages[selectedSub])}>
                  <Icon
                    name={Icons.favorite}
                    size={40}
                    color={
                      subImages[selectedSub]?.liked
                        ? Color.main
                        : Color.background
                    }
                  />
                </TouchableOpacity>
                <View style={{flex: 1, marginHorizontal: 10}}>
                  <H2 variant={'regular'} style={{color: Color.background}}>
                    {subImages[selectedSub]?.name}
                  </H2>
                  <P style={{color: Color.background}}>
                    oleh {subImages[selectedSub]?.by}
                  </P>
                </View>
                <TouchableOpacity onPress={nextSelectedSub}>
                  <Icon name={Icons.next} size={40} color={Color.background} />
                </TouchableOpacity>
              </View>
            </View>
          </NoFlexContainer>
        </LinearGradient>
        <Img src={subImages[selectedSub]?.img} />
      </View>
      <NoFlexContainer>
        <H3>Relaksasi telinga</H3>
        <H2 variant={'light'} style={{color: Color.text}}>
          {MUSIC_LIST[selectedMusic].name}
        </H2>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <P style={{flex: 0.1, textAlign: 'center'}}>
            {formatMusicTime(playingTime)}
          </P>

          <Slider
            style={{flex: 0.8, height: 60}}
            value={playingTime}
            minimumValue={0}
            maximumValue={playback?.getDuration() || 0}
            minimumTrackTintColor={Color.main}
            maximumTrackTintColor={Color.text}
            step={1}
            onSlidingComplete={n => {
              if (playback) {
                playback.setCurrentTime(Math.floor(n));
                setPlayingTime(Math.floor(n));
              }
            }}
            onSlidingStart={() => {
              if (playback) {
                playback.pause();
                setIsPlaying(false);
              }
            }}
          />
          <P style={{flex: 0.1, textAlign: 'center'}}>
            {formatMusicTime(playback?.getDuration())}
          </P>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name={Icons.loop} size={32} color={Color.text2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={prevMusic}>
            <Icon name={Icons.playPrev} size={50} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (playback) {
                if (playback.isPlaying()) {
                  playback.pause();
                  setIsPlaying(false);
                  return;
                }

                playback.play(success => playback.release());
                setIsPlaying(true);
              }
            }}>
            <Icon name={isPlaying ? Icons.pause : Icons.play} size={80} />
          </TouchableOpacity>
          <TouchableOpacity onPress={nextMusic}>
            <Icon name={Icons.playNext} size={50} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Galeri audio')}>
            <Icon name={Icons.playlist} size={32} color={Color.text2} />
          </TouchableOpacity>
        </View>
      </NoFlexContainer>
      <Spacing height={60} />
    </ScrollableScreen>
  );
};
