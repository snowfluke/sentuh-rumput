import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Screens Import
import {
  Home,
  Relaxation,
  Recommendation,
  Search,
  Login,
  Images,
  Music,
  ArticleList,
  ArticleDetails,
  Profile,
  Favorite,
  Settings,
  Support,
  Location,
  Submission,
} from '../menu';
import {TabBar} from './tabBar';
import {Color, Icons} from '../../styles';
import {CustomDrawer} from './drawer';

// Navigation type
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="SBeranda"
    screenOptions={{
      ...TransitionPresets.ModalSlideFromBottomIOS,
      headerShown: false,
    }}>
    <Stack.Screen name="SBeranda" component={Home} />
  </Stack.Navigator>
);

const RelaxationStack = () => (
  <Stack.Navigator
    initialRouteName="SRelaksasi"
    screenOptions={{
      ...TransitionPresets.ModalSlideFromBottomIOS,
      headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
      },
    }}>
    <Stack.Screen
      name="SRelaksasi"
      options={{headerShown: false}}
      component={Relaxation}
    />
    <Stack.Screen name="Galeri gambar" component={Images} />
    <Stack.Screen name="Galeri audio" component={Music} />
  </Stack.Navigator>
);

const RecommendationStack = () => (
  <Stack.Navigator
    initialRouteName="SRekomendasi"
    screenOptions={{
      ...TransitionPresets.ModalSlideFromBottomIOS,
      headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
      },
    }}>
    <Stack.Screen
      name="SRekomendasi"
      options={{headerShown: false}}
      component={Recommendation}
    />
    <Stack.Screen name="Daftar rekomendasi" component={ArticleList} />
    <Stack.Screen name="Detail" component={ArticleDetails} />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator
    initialRouteName="SEksplorasi"
    screenOptions={{
      ...TransitionPresets.ModalSlideFromBottomIOS,
      headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
      },
    }}>
    <Stack.Screen
      name="SEksplorasi"
      options={{headerShown: false}}
      component={Search}
    />
    <Stack.Screen name="Detail lokasi" component={Location} />
    <Stack.Screen name="Submisi lokasi" component={Submission} />
  </Stack.Navigator>
);

const TabNavigator = ({route, navigation}) => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Beranda"
      tabBar={props => <TabBar {...props} />}>
      <BottomTab.Screen
        name={'Beranda'}
        options={{
          tabBarLabel: Icons.home,
        }}
        component={HomeStack}
      />

      <BottomTab.Screen
        name={'Relaksasi'}
        options={{
          tabBarLabel: Icons.relaxation,
        }}
        component={RelaxationStack}
      />

      <BottomTab.Screen
        name={'Saran'}
        options={{
          tabBarLabel: Icons.recommendation,
        }}
        component={RecommendationStack}
      />

      <BottomTab.Screen
        name={'Eksplorasi'}
        options={{
          tabBarLabel: Icons.search,
        }}
        component={SearchStack}
      />
    </BottomTab.Navigator>
  );
};

// App Navigator
export const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Color.main,
        drawerActiveBackgroundColor: Color.text4,
        drawerInactiveTintColor: Color.text,
      }}
      backBehavior="none"
      initialRouteName="Masuk"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Masuk" component={Login} />
      <Drawer.Screen name="DBeranda" component={TabNavigator} />
      <Drawer.Screen name="Profil" component={Profile} />
      <Drawer.Screen name="Favorit" component={Favorite} />
      <Drawer.Screen name="Pengaturan" component={Settings} />
      <Drawer.Screen name="Dukungan" component={Support} />
    </Drawer.Navigator>
  </NavigationContainer>
);
