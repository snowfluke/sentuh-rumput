import {Color, Icons} from '../styles';

export const DB = [
  {
    id: 'loc1',
    latitude: -6.238653,
    longitude: 106.936136,
    open: true,
    img: require('../assets/misc/Taman1.png'),
    name: 'Taman Hutan Kota Kampung Sawah',
    rating: '4',
    official: true,
    by: 'Team Juara',
    reviews: [
      {
        from: 'saadhi***@gmail.com',
        text: 'Great spot for relaxing',
        rating: 4,
      },
      {
        from: 'galih***@gmail.com',
        text: 'Udaranya sejuk asli',
        rating: 4,
      },
    ],
    favorited: true,
  },
  {
    id: 'loc2',
    latitude: -6.207595,
    longitude: 106.894079,
    open: false,
    img: require('../assets/misc/Taman2.png'),
    name: 'Hutan Kota Kebon Pisang Penjaringan',
    rating: '5',
    official: true,
    by: 'Team Juara',
    reviews: [
      {
        from: 'slametc***@gmail.com',
        text: 'Sejuk, hijau asri, luas. Recommended',
        rating: 5,
      },
    ],
    favorited: true,
  },
];

export const RADIUS = 10;

export const CURRENT_LOCATION = {
  latitude: -6.22207,
  longitude: 106.8071,
};

export const IMAGES_CATEGORIES = [
  {
    name: 'Flora',
    image: require('../assets/gallery/images/flora.png'),
    list: [
      {
        img: require('../assets/misc/Flora1.png'),
        name: 'Bunga Rafflesia',
        by: 'Couleur',
        liked: false,
      },
      {
        img: require('../assets/misc/Flora2.jpg'),
        name: 'Bunga Mawar Biru',
        by: 'GLady',
        liked: false,
      },
      {
        img: require('../assets/misc/Flora3.jpg'),
        name: 'Bunga Matahari',
        by: 'Mircea Ploscar',
        liked: false,
      },
      {
        img: require('../assets/misc/Flora4.jpg'),
        name: 'Bunga Lily Air',
        by: 'NoName_13',
        liked: false,
      },
    ],
  },
  {
    name: 'Fauna',
    image: require('../assets/gallery/images/fauna.png'),
    list: [
      {
        img: require('../assets/misc/Fauna1.jpg'),
        name: 'Kapibara',
        by: 'Elsemargriet',
        liked: false,
      },
      {
        img: require('../assets/misc/Fauna2.jpg'),
        name: 'Belalang Gurun',
        by: 'Christel SAGNIEZ',
        liked: false,
      },
      {
        img: require('../assets/misc/Fauna3.jpg'),
        name: 'Kucing',
        by: 'Susann Mielke',
        liked: false,
      },
      {
        img: require('../assets/misc/Fauna4.jpg'),
        name: 'Burung Pekakak',
        by: 'David Mark',
        liked: false,
      },
    ],
  },
  {
    name: 'Lanskap',
    image: require('../assets/gallery/images/lanskap.png'),
    list: [
      {
        img: require('../assets/misc/Landscape1.jpg'),
        name: 'Dunrobin',
        by: 'Michael Drummond',
        liked: false,
      },
      {
        img: require('../assets/misc/Landscape2.jpg'),
        name: 'Jalan',
        by: 'bertvhul',
        liked: false,
      },
      {
        img: require('../assets/misc/Landscape3.jpg'),
        name: 'BJembatan',
        by: 'JamesDeMers',
        liked: false,
      },
      {
        img: require('../assets/misc/Landscape4.jpg'),
        name: 'Pohon',
        by: 'Joe',
        liked: false,
      },
    ],
  },
  {
    name: 'Aktivitas',
    image: require('../assets/gallery/images/aktivitas.png'),
    list: [
      {
        img: require('../assets/misc/Activity1.jpg'),
        name: 'Agrikultur',
        by: 'Sasin Tipcai',
        liked: false,
      },
      {
        img: require('../assets/misc/Activity2.jpg'),
        name: 'Bermain Air',
        by: 'Sasin Tipcai',
        liked: false,
      },
      {
        img: require('../assets/misc/Activity3.jpg'),
        name: 'Berkemah',
        by: 'Kanenori',
        liked: false,
      },
      {
        img: require('../assets/misc/Activity4.jpg'),
        name: 'Konstruksi',
        by: 'Alfred Derks',
        liked: false,
      },
    ],
  },
  {
    name: 'Cuaca',
    image: require('../assets/gallery/images/cuaca.png'),
    list: [
      {
        img: require('../assets/misc/Weather1.jpg'),
        name: 'Hujan',
        by: 'Roman Grac',
        liked: false,
      },
      {
        img: require('../assets/misc/Weather2.jpg'),
        name: 'Berawan',
        by: 'PublicDomainPictures',
        liked: false,
      },
      {
        img: require('../assets/misc/Weather3.jpg'),
        name: 'Salju',
        by: 'Alain Audet',
        liked: false,
      },
      {
        img: require('../assets/misc/Weather4.jpg'),
        name: 'Panas',
        by: 'Joe',
        liked: false,
      },
    ],
  },
];

export const MUSIC_LIST = [
  {
    categoryHeader: 'Fauna',
    name: 'Suara jangkrik malam',
    file: require('../assets/audio/suara_jangkrik_malam.m4a'),
  },
  {
    name: 'Kicauan burung',
    file: require('../assets/audio/kicauan_burung.m4a'),
  },
  {
    name: 'Nyanyian lumba-lumba',
    file: require('../assets/audio/nyanyian_lumba.m4a'),
  },
  {
    categoryHeader: 'Hujan gerimis',
    file: require('../assets/audio/hujan_gerimis.m4a'),
    name: 'Hujan gerimis',
  },
  {
    name: 'Kilatan petir dan hujan deras',
    file: require('../assets/audio/hujan_deras.m4a'),
  },
  {
    categoryHeader: 'Latar belakang',
    name: 'Seruling bambu sejuk',
    file: require('../assets/audio/seruling_bambu.m4a'),
  },
  {
    name: 'Musik kalimba sedih',
    file: require('../assets/audio/kalimba_sedih.m4a'),
  },
];

export const RECOMMENDATION = [
  {
    name: 'Aktivitas Fisik',
    img: require('../assets/illustrations/undraw_Pilates_ftsd.png'),
    icon: Icons.run,
    color: Color.danger,
    articleList: [
      {
        category: 'Olahraga',
        title: 'Yoga di Taman Kota',
        image: {
          src: require('../assets/articles/yoga_di_taman_kota.jpg'),
        },
        content: require('../assets/articles/yoga_di_taman_kota.json').text,
      },
      {
        category: 'Kegiatan Keluarga',
        title: 'Rekomendasi Aktivitas Keluarga di RTH',
        image: {
          src: require('../assets/articles/rekomendasi_aktivitas_keluarga_di_rth.jpg'),
        },
        content:
          require('../assets/articles/rekomendasi_aktivitas_keluarga_di_rth.json')
            .text,
      },
      {
        category: 'Ekstrim',
        title: 'Rekomendasi Aktivitas Ekstrim di RTH',
        image: {
          src: require('../assets/articles/rekomendasi_aktivitas_ekstrim_di_rth.jpg'),
        },
        content:
          require('../assets/articles/rekomendasi_aktivitas_ekstrim_di_rth.json')
            .text,
      },
    ],
  },
  {
    name: 'Perubahan Iklim',
    img: require('../assets/illustrations/undraw_among_nature_p1xb.png'),
    icon: Icons.fire,
    color: Color.red,
    articleList: [
      {
        category: 'Penanaman Pohon',
        title: 'Menanam Pohon di Taman Kota',
        image: {
          src: require('../assets/articles/menanam_pohon_di_taman_kota.jpg'),
        },
        content: require('../assets/articles/menanam_pohon_di_taman_kota.json')
          .text,
      },
      {
        category: 'Ramah Lingkungan',
        title: 'Cara Ramah Lingkungan',
        image: {
          src: require('../assets/articles/cara_ramah_lingkungan.jpg'),
        },
        content: require('../assets/articles/cara_ramah_lingkungan.json').text,
      },
      {
        category: 'Penghematan Air',
        title: 'Bagaimana Cara Menghemat Air',
        image: {
          src: require('../assets/articles/bagaimana_cara_menghemat_air.jpg'),
        },
        content: require('../assets/articles/bagaimana_cara_menghemat_air.json')
          .text,
      },
    ],
  },
  {
    name: 'Rekreasi Luar Ruang',
    img: require('../assets/illustrations/undraw_Outdoor_adventure_re_j3b7.png'),
    icon: Icons.recreation,
    color: Color.info,
    articleList: [
      {
        category: 'Bersepeda',
        title: 'Bersepeda di Jalur Hijau',
        image: {
          src: require('../assets/articles/bersepeda_di_jalur_hijau.jpg'),
        },
        content: require('../assets/articles/bersepeda_di_jalur_hijau.json')
          .text,
      },
      {
        category: 'Berkemah',
        title: 'Rekomendasi Alat-Alat Berkemah dan Merknya',
        image: {
          src: require('../assets/articles/rekomendasi_alat_berkemah_dan_merknya.jpg'),
        },
        content:
          require('../assets/articles/rekomendasi_alat_berkemah_dan_merknya.json')
            .text,
      },
      {
        category: 'Pemandangan',
        title: 'Bagaimana Melihat Pemandangan Alam Secara Filosofis',
        image: {
          src: require('../assets/articles/bagaimana_melihat_pemandangan_alam_secara_filosofis.jpg'),
        },
        content:
          require('../assets/articles/bagaimana_melihat_pemandangan_alam_secara_filosofis.json')
            .text,
      },
    ],
  },
  {
    name: 'Flora Fauna Langka',
    img: require('../assets/illustrations/undraw_Playful_cat_re_ac9g.png'),
    icon: Icons.nature,
    color: Color.warning,
    articleList: [
      {
        category: 'Mengamati Burung',
        title: 'Mengamati Burung di Taman Nasional',
        image: {
          src: require('../assets/articles/mengamati_burung_di_taman_nasional.jpg'),
        },
        content:
          require('../assets/articles/mengamati_burung_di_taman_nasional.json')
            .text,
      },
      {
        category: 'Penelusuran Satwa Liar',
        title: 'Daftar 10 Satwa Liar di Indonesia',
        image: {
          src: require('../assets/articles/daftar_10_satwa_liar_di_indonesia.jpg'),
        },
        content:
          require('../assets/articles/daftar_10_satwa_liar_di_indonesia.json')
            .text,
      },
      {
        category: 'Konservasi Tanaman',
        title: 'Daftar 10 Tanaman Langka yang Hampir Punah',
        image: {
          src: require('../assets/articles/daftar_10_tanaman_langka_yang_hampir_punah.jpg'),
        },
        content:
          require('../assets/articles/daftar_10_tanaman_langka_yang_hampir_punah.json')
            .text,
      },
    ],
  },
];
