import React, {useContext} from 'react';
import {ScrollableScreen} from '../../layouts';
import {Container, H3, H2, P, Icon, Spacing} from '../../components';
import {TouchableOpacity} from 'react-native';
import {Color} from '../../styles';
import {MUSIC_LIST} from '../../helpers/constant';
import {GlobalContext} from '../../context/global-context';

export const Music = ({route, navigation}) => {
  const {music} = useContext(GlobalContext);
  const selectedMusic = music.get();

  return (
    <ScrollableScreen noGradient>
      <Container>
        {MUSIC_LIST.map((el, id) => {
          if (el.categoryHeader) {
            return (
              <React.Fragment key={id}>
                <Spacing />
                <H3>{el.categoryHeader}</H3>

                <MusicCard
                  title={el.name}
                  state={selectedMusic}
                  setState={music.set}
                  id={id}
                />
              </React.Fragment>
            );
          }

          return (
            <MusicCard
              key={id}
              title={el.name}
              state={selectedMusic}
              setState={music.set}
              id={id}
            />
          );
        })}
      </Container>
    </ScrollableScreen>
  );
};

const MusicCard = ({title, state, setState, id}) => {
  const selected = id == state;
  return (
    <TouchableOpacity
      onPress={() => setState(id)}
      style={{
        flexDirection: 'row',
        paddingLeft: selected ? 30 : 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderBottomColor: Color.text3,
        borderBottomWidth: 1,
      }}>
      <Icon
        name="music-note"
        size={24}
        color={selected ? Color.accent600 : Color.text}
      />
      <H2
        variant={'light'}
        style={{
          color: selected ? Color.accent600 : Color.text,
          marginLeft: 10,
        }}>
        {title}
      </H2>
    </TouchableOpacity>
  );
};
