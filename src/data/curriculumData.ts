import { StoryChapter, VideoCheckpoint, InquiryStep, QuizQuestion, SimulationMissionMeta } from '../types/index.ts';

export const ASSET_IMAGES = {
  hero: '/src/assets/images/hero_math_storytelling_ratio_1792902361758.jpg',
  resep: '/src/assets/images/story_resep_kuliner_rasio_1792902361283.jpg',
  skala: '/src/assets/images/story_arsitektur_skala_candi_1792902364420.jpg',
  lab: '/src/assets/images/lab_simulasi_rasio_1792902362761.jpg',
};

export const SIMULATION_MISSIONS: SimulationMissionMeta[] = [
  {
    id: 'misi-1',
    missionNumber: 1,
    tpCode: 'TP 1.1',
    title: 'Lab Peracik Ramuan 3 Komponen',
    subtitle: 'Makna Rasio, Part-to-Part, Part-to-Whole & Penyederhanaan Ekuivalen',
    scope: 'Perbandingan multiplikatif; notasi rasio; bagian terhadap bagian & keseluruhan; rasio ekuivalen & FPB; rasio 3 bahan.',
    conceptSummary: 'Memahami bahwa rasio adalah perbandingan perkalian (bukan selisih penjumlahan). Menghitung rasio tiap bahan terhadap total minuman dan menyederhanakan rasio dengan membagi FPB.'
  },
  {
    id: 'misi-2',
    missionNumber: 2,
    tpCode: 'TP 1.2',
    title: 'Lab Penyetaraan Satuan Sejenis',
    subtitle: 'Rasio Dua atau Tiga Besaran Sejenis dengan Satuan Berbeda',
    scope: 'Konversi satuan panjang, massa, waktu, volume, dan banyak benda; penyamaan satuan sebelum membandingkan; rasio multivariat.',
    conceptSummary: 'Sebelum menyederhanakan rasio, satuan kedua besaran wajib disamakan terlebih dahulu ke satuan terkecil. Contoh: 45 cm : 1,5 m = 45 cm : 150 cm = 3 : 10.'
  },
  {
    id: 'misi-3',
    missionNumber: 3,
    tpCode: 'TP 2',
    title: 'Lab Komparator Hubungan Proporsional',
    subtitle: 'Senilai vs Berbalik Nilai vs Bukan Proporsional dengan Grafik Dinamis',
    scope: 'Ciri hubungan senilai (y = kx) vs berbalik nilai (y = k/x) vs bukan proporsional (y = kx + c); grafik garis lurus vs hiperbola; tabel konstanta k.',
    conceptSummary: 'Membuktikan apakah hasil bagi (y/x) atau hasil kali (x·y) yang konstan, serta mengamati perilaku grafik kartesius dan membedakannya dari hubungan bukan proporsional.'
  },
  {
    id: 'misi-4',
    missionNumber: 4,
    tpCode: 'TP 3',
    title: 'Studio Skala Cagar Budaya & Mikroskop',
    subtitle: 'Faktor Skala Denah & Maket vs Ukuran Sebenarnya (Pengecilan & Pembesaran)',
    scope: 'Makna skala 1 : n (pengecilan maket/peta) dan n : 1 (pembesaran mikroskopis); ukuran gambar vs sebenarnya; konversi satuan; uji kewajaran hasil nyata.',
    conceptSummary: 'Menghitung Jp = Js × Skala dan Js = Jp ÷ Skala. Menguji apakah dimensi maket muat di meja pameran serta melihat pembesaran mikroskop sel daun.'
  },
  {
    id: 'misi-5',
    missionNumber: 5,
    tpCode: 'TP 4',
    title: 'Arena Laju Satuan & Smart Shopper',
    subtitle: 'Rasio Besaran Berbeda Jenis (Harga Satuan, Kecepatan, & Debit Air)',
    scope: 'Rasio besaran berbeda jenis; laju satuan (unit rate); kecepatan (km/jam), debit keran (L/menit), harga satuan (Rp/ml); perbandingan efisiensi / Best-Buy.',
    conceptSummary: 'Menghitung nilai per 1 satuan untuk membandingkan mana kemasan belanja yang paling hemat atau keran/kendaraan mana yang paling efisien.'
  }
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'chapter-1',
    chapterNumber: 1,
    title: 'Rahasia Resep Sirup Markisa Nenek',
    subtitle: 'Menemukan Hakikat Rasio & Perbandingan Senilai dalam Kuliner',
    character: 'Rama sang Koki Muda',
    image: ASSET_IMAGES.resep,
    narrative: [
      'Pagi itu di kedai minuman tradisional "Rasa Nusantara", Rama sedang bersiap menyambut kedatangan 20 orang tamu reuni sekolah. Nenek memberikan catatan resep kuno sirup markisa legendaris keluarga.',
      'Di lembar catatan tertulis jelas: "Untuk 1 teko saji (isi 4 gelas), campurkan tepat 2 takar sirup markisa murni dengan 5 takar air matang sejuk. Jangan dikurangi, jangan dilebihkan, agar manis dan kesegarannya sempurna!"',
      'Rama tertegun sejenak. "Nenek, teko ini hanya cukup untuk 4 gelas. Kalau tamunya ada 20 orang, berarti aku butuh 5 kali lipat sajian teko. Bagaimana caraku memastikan rasa manisnya tetap sama persis dan tidak hambar atau terlalu kemanisan?"',
      'Nenek tersenyum hangat dan menepuk bahu Rama. "Itulah keajaiban matematika di dapur kita, Rama! Rahasianya terletak pada konsep RASIO (Perbandingan). Selama perbandingan antara sirup dan air tetap setara (senilai), rasa minuman tidak akan berubah walau dibuat sebanyak satu ember besar sekalipun!"'
    ],
    mathContext: 'Perbandingan Part-to-Part (Sirup : Air = 2 : 5) dan Part-to-Whole (Sirup : Total Campuran = 2 : 7). Untuk menghasilkan rasa yang identik pada skala berbeda, rasio harus senilai (ekuivalen): 2/5 = 10/25.',
    interactiveChallenge: {
      prompt: 'Bantu Rama menghitung bahan untuk 5 teko minuman!',
      question: 'Jika untuk 1 teko diperlukan 2 takar sirup dan 5 takar air, berapakah takaran sirup dan air yang diperlukan Rama untuk membuat 5 teko minuman agar rasanya sama persis?',
      options: [
        {
          text: '7 takar sirup dan 10 takar air',
          isCorrect: false,
          explanation: 'Keliru. Menambahkan bilangan yang sama (+5) mengubah rasio (7:10 ≠ 2:5), sehingga rasanya akan menjadi jauh lebih manis dan pekat!'
        },
        {
          text: '10 takar sirup dan 25 takar air',
          isCorrect: true,
          explanation: 'Tepat sekali! Mengalikan kedua komponen dengan pengali yang sama (2 × 5 = 10 dan 5 × 5 = 25) menjaga rasio tetap ekuivalen 10 : 25 = 2 : 5.'
        },
        {
          text: '10 takar sirup dan 20 takar air',
          isCorrect: false,
          explanation: 'Keliru. 10 : 20 sederhananya adalah 1 : 2, bukan 2 : 5. Minuman akan terlalu manis karena airnya kurang!'
        }
      ]
    }
  },
  {
    id: 'chapter-2',
    chapterNumber: 2,
    title: 'Misteri Skala Miniatur Candi Borobudur',
    subtitle: 'Eksplorasi Perbandingan Senilai pada Skala & Gambar Teknik',
    character: 'Sinta sang Calon Arsitek',
    image: ASSET_IMAGES.skala,
    narrative: [
      'Di ruang bengkel seni SMP Nusantara, Sinta terpilih mengikuti sayembara pembuatan maket edukasi cagar budaya Indonesia. Ia bertugas membuat miniatur Candi Borobudur yang proporsional untuk museum sekolah.',
      'Sinta membuka buku dokumentasi arkeologi: Tinggi candi asli dari permukaan tanah hingga puncak stupa induk adalah 35 meter (3.500 cm), sedangkan panjang sisi alas bujur sangkarnya adalah 120 meter (12.000 cm).',
      'Meja pameran di museum memiliki panjang 150 cm. Sinta harus memilih rasio SKALA yang tepat agar maket miniatur dapat berdiri megah di atas meja pameran tanpa terpotong dan tetap menyerupai bentuk aslinya.',
      'Pak Budi, guru matematika pembimbing, datang membawa penggaris skala segitiga. "Ingat prinsip skala, Sinta: Skala adalah rasio jarak/panjang pada gambar dibanding panjang sebenarnya (Jp : Js). Semua bagian candi harus mengecil dengan faktor skala yang persis sama!"'
    ],
    mathContext: 'Skala = Ukuran pada Gambar/Model : Ukuran Sebenarnya (satuan harus disamakan ke cm). Pada skala 1 : 100, setiap 1 cm pada maket mewakili 100 cm (1 meter) pada bangunan sesungguhnya.',
    interactiveChallenge: {
      prompt: 'Bantu Sinta menentukan tinggi miniatur candi!',
      question: 'Sinta menetapkan skala miniatur adalah 1 : 100. Jika tinggi candi Borobudur sebenarnya adalah 35 meter, berapakah tinggi stupa miniatur yang harus dibuat Sinta?',
      options: [
        {
          text: '3,5 cm',
          isCorrect: false,
          explanation: 'Keliru. 35 meter = 3.500 cm. Jika dibagi 100 hasilnya bukan 3,5 cm melainkan 35 cm.'
        },
        {
          text: '35 cm',
          isCorrect: true,
          explanation: 'Benar! Ubah satuan 35 meter ke cm (35 × 100 = 3.500 cm). Maka tinggi model = 3.500 cm ÷ 100 = 35 cm.'
        },
        {
          text: '350 cm',
          isCorrect: false,
          explanation: 'Keliru. 350 cm setara dengan 3,5 meter, terlalu tinggi untuk sebuah miniatur di atas meja!'
        }
      ]
    }
  },
  {
    id: 'chapter-3',
    chapterNumber: 3,
    title: 'Misi Ekspedisi Kurir & Pembangunan Jembatan',
    subtitle: 'Menyingkap Tabir Perbandingan Berbalik Nilai',
    character: 'Rama & Sinta Berkolaborasi',
    image: ASSET_IMAGES.lab,
    narrative: [
      'Desa Sukamaju sedang merenovasi jembatan penghubung antar-dusun yang rusak diterjang banjir. Kepala Desa mengumumkan bahwa dengan 6 orang pekerja berpengalaman, perbaikan jembatan diperkirakan selesai dalam 30 hari.',
      'Namun, musim hujan lebat diperkirakan datang 10 hari lagi! Warga desa sangat berharap jembatan dapat selesai dalam waktu hanya 10 hari saja agar aktivitas sekolah anak-anak tidak terputus.',
      'Rama dan Sinta yang sedang berada di posko relawan diajak berdiskusi. Rama bertanya: "Apakah kalau waktunya ingin lebih cepat (berkurang), pekerjanya juga dikurangi?"',
      'Sinta segera menyahut: "Bukan, Rama! Ini adalah Perbandingan Berbalik Nilai (Inverse Proportion). Semakin sedikit hari yang tersedia, justru pekerja yang dikerahkan harus SEMAKIN BANYAK! Perkalian antara jumlah pekerja dan jumlah hari harus konstan (tetap)!"'
    ],
    mathContext: 'Rasio Berbalik Nilai: x₁ · y₁ = x₂ · y₂. Beban kerja total = 6 pekerja × 30 hari = 180 "orang-hari". Jika ingin selesai dalam 10 hari, maka jumlah pekerja yang dibutuhkan = 180 ÷ 10 = 18 pekerja.',
    interactiveChallenge: {
      prompt: 'Hitung tambahan pekerja yang diperlukan!',
      question: 'Jika 6 pekerja menyelesaikan proyek dalam 30 hari, berapa banyak pekerja tambahan yang harus direkrut desa agar jembatan selesai dalam 10 hari?',
      options: [
        {
          text: '18 orang pekerja',
          isCorrect: false,
          explanation: 'Kurang teliti! 18 orang adalah TOTAL seluruh pekerja yang dibutuhkan. Soal menanyakan PEKERJA TAMBAHAN, jadi harus dikurangi 6 pekerja awal yang sudah ada (18 - 6 = 12 orang)!'
        },
        {
          text: '12 orang pekerja tambahan',
          isCorrect: true,
          explanation: 'Hebat dan teliti! Total pekerja = (6 × 30) / 10 = 18 orang. Tambahan pekerja yang dibutuhkan = 18 - 6 = 12 orang pekerja.'
        },
        {
          text: '2 orang pekerja tambahan',
          isCorrect: false,
          explanation: 'Keliru. Ini bukan pengurangan linear atau perbandingan senilai biasa.'
        }
      ]
    }
  }
];

export const INQUIRY_STEPS: InquiryStep[] = [
  {
    stepNumber: 1,
    title: 'Orientasi Masalah',
    subtitle: 'Mengidentifikasi fenomena rasio dalam konteks kehidupan nyata',
    iconName: 'Compass',
    description: 'Siswa mengamati situasi nyata (resep sirup markisa, skala maket candi, waktu pembangunan jembatan) dan merumuskan pertanyaan inti penyelidikan.',
    guidingQuestions: [
      'Apa yang terjadi pada rasa sirup jika air ditambah tanpa menambah sirup?',
      'Besaran apa saja yang saling mempengaruhi pada kasus pekerja dan waktu pengerjaan?',
      'Bagaimana cara membedakan hubungan yang senilai dengan hubungan yang berbalik nilai?'
    ]
  },
  {
    stepNumber: 2,
    title: 'Merumuskan Hipotesis',
    subtitle: 'Menyusun dugaan sementara yang terarah dan dapat diuji',
    iconName: 'HelpCircle',
    description: 'Berdasarkan pertanyaan pemantik, siswa membuat dugaan awal mengenai pola hubungan antar variabel sebelum melakukan uji coba pada simulator.',
    guidingQuestions: [
      'Jika variabel A diperbesar k kali, apakah variabel B akan ikut membesar atau justru mengecil?',
      'Apakah hasil bagi (A/B) atau hasil kali (A × B) yang bernilai konstan/tetap?'
    ]
  },
  {
    stepNumber: 3,
    title: 'Eksplorasi Simulator',
    subtitle: 'Melakukan eksperimen virtual dan mencatat tabel data',
    iconName: 'Sliders',
    description: 'Siswa memanipulasi parameter pada Lab Simulasi Interaktif, mengamati perubahan visual (kepekatan warna, tinggi miniatur, kecepatan kurva), lalu mencatat hasilnya ke dalam tabel eksperimen.',
    guidingQuestions: [
      'Catat minimal 4 variasi nilai pada simulator ke dalam tabel LKPD!',
      'Perhatikan pergerakan grafik: apakah berbentuk garis lurus melintasi titik (0,0) atau kurva hiperbola?'
    ]
  },
  {
    stepNumber: 4,
    title: 'Analisis & Pengujian Data',
    subtitle: 'Menguji hipotesis dengan kalkulasi konstanta perbandingan',
    iconName: 'CheckSquare',
    description: 'Siswa menghitung nilai konstanta perbandingan k. Untuk rasio senilai k = y/x; untuk rasio berbalik nilai k = x · y. Periksa apakah dugaan awal terbukti benar.',
    guidingQuestions: [
      'Apakah nilai perbandingan pada setiap baris data menghasilkan angka yang sama?',
      'Bagaimana membuktikan kesetaraan pecahan a/b = c/d dengan perkalian silang?'
    ]
  },
  {
    stepNumber: 5,
    title: 'Menarik Kesimpulan & Refleksi',
    subtitle: 'Mengonstruksi konsep matematika dan menggeneralisasi rumus',
    iconName: 'Award',
    description: 'Siswa menyimpulkan definisi formal perbandingan senilai dan berbalik nilai dengan kalimat sendiri, serta mengaitkannya dengan masalah kehidupan nyata.',
    guidingQuestions: [
      'Tuliskan kesimpulan perbedaan pokok antara Rasio Senilai dan Rasio Berbalik Nilai!',
      'Sebutkan 2 contoh nyata lain di sekitar rumahmu yang menerapkan prinsip rasio ini!'
    ]
  }
];

export const VIDEO_CHECKPOINTS: VideoCheckpoint[] = [
  {
    timeInSeconds: 30,
    question: 'Di resep awal, rasio sirup dan air adalah 2 : 5. Disebut apakah jenis perbandingan antara bagian sirup terhadap bagian air?',
    options: [
      'Perbandingan Bagian terhadap Keseluruhan (Part-to-Whole)',
      'Perbandingan Bagian terhadap Bagian (Part-to-Part)',
      'Perbandingan Berbalik Nilai'
    ],
    correctAnswer: 1,
    explanation: 'Rasio 2 : 5 membandingkan bahan sirup (bagian 1) langsung dengan air (bagian 2), sehingga disebut Part-to-Part.'
  },
  {
    timeInSeconds: 75,
    question: 'Jika Rama ingin membuat total campuran sebanyak 21 gelas, berapakah takaran sirup yang dibutuhkan dengan rasio 2 : 5?',
    options: [
      '6 gelas sirup',
      '10 gelas sirup',
      '14 gelas sirup'
    ],
    correctAnswer: 0,
    explanation: 'Total bagian = 2 + 5 = 7 bagian. Nilai 1 bagian = 21 ÷ 7 = 3 gelas. Maka sirup = 2 × 3 = 6 gelas.'
  },
  {
    timeInSeconds: 120,
    question: 'Pada peta berskala 1 : 250.000, jarak kota A ke kota B adalah 4 cm. Berapakah jarak sebenarnya di permukaan bumi?',
    options: [
      '1.000 km',
      '10 km',
      '1 km'
    ],
    correctAnswer: 1,
    explanation: 'Jarak sebenarnya = 4 cm × 250.000 = 1.000.000 cm = 10.000 m = 10 km.'
  },
  {
    timeInSeconds: 175,
    question: 'Manakah dari situasi berikut yang merupakan contoh Perbandingan Berbalik Nilai?',
    options: [
      'Banyaknya buku tulis yang dibeli dan total uang yang harus dibayar',
      'Kecepatan rata-rata berkendara dan waktu tempuh untuk jarak tertentu',
      'Banyaknya bahan bakar yang terpakai dan jarak perjalanan mobil'
    ],
    correctAnswer: 1,
    explanation: 'Semakin tinggi kecepatan, semakin SEDIKIT waktu tempuh yang dibutuhkan (kecepatan naik, waktu turun). Ini adalah ciri khas perbandingan berbalik nilai!'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: 'dasar_rasio',
    question: 'Bentuk paling sederhana dari perbandingan 36 cm terhadap 1,2 meter adalah...',
    options: ['3 : 1', '3 : 10', '1 : 3', '36 : 12'],
    correctIndex: 1,
    explanation: 'Samakan satuan terlebih dahulu: 1,2 m = 120 cm. Perbandingan menjadi 36 cm : 120 cm. Bagi kedua bilangan dengan FPB yaitu 12: (36 ÷ 12) : (120 ÷ 12) = 3 : 10.',
    difficulty: 'Dasar'
  },
  {
    id: 2,
    type: 'dasar_rasio',
    question: 'Di kelas VII-B terdapat 32 siswa. Jika jumlah siswa laki-laki adalah 12 orang, maka perbandingan jumlah siswa perempuan terhadap seluruh siswa di kelas adalah...',
    options: ['3 : 8', '5 : 8', '3 : 5', '5 : 3'],
    correctIndex: 1,
    explanation: 'Jumlah siswa perempuan = 32 - 12 = 20 orang. Rasio perempuan : seluruh siswa = 20 : 32. Disederhanakan dengan membagi 4: (20 ÷ 4) : (32 ÷ 4) = 5 : 8.',
    difficulty: 'Dasar'
  },
  {
    id: 3,
    type: 'senilai',
    question: 'Harga 5 kg jeruk medan di pasar buah adalah Rp60.000,00. Berapakah uang yang harus dibayarkan Ibu jika ingin membeli 8 kg jeruk yang sama?',
    options: ['Rp84.000,00', 'Rp96.000,00', 'Rp100.000,00', 'Rp120.000,00'],
    correctIndex: 1,
    explanation: 'Harga per kg = Rp60.000 ÷ 5 = Rp12.000,00. Maka harga 8 kg jeruk = 8 × Rp12.000 = Rp96.000,00 (Perbandingan Senilai: a₁/b₁ = a₂/b₂).',
    difficulty: 'Dasar'
  },
  {
    id: 4,
    type: 'senilai',
    question: 'Sebuah mobil menghabiskan 4 liter bensin untuk menempuh jarak 64 km. Dengan kondisi jalan yang sama, jarak yang dapat ditempuh jika mobil tersebut diisi 11 liter bensin adalah...',
    options: ['160 km', '176 km', '180 km', '192 km'],
    correctIndex: 1,
    explanation: 'Jarak per 1 liter bensin = 64 ÷ 4 = 16 km/liter. Jarak tempuh untuk 11 liter bensin = 11 × 16 km = 176 km.',
    difficulty: 'Sedang'
  },
  {
    id: 5,
    type: 'skala',
    question: 'Jarak antara Kota Bandung dan Cirebon pada peta adalah 6 cm. Jika jarak sebenarnya kedua kota tersebut adalah 150 km, maka skala peta tersebut adalah...',
    options: ['1 : 25.000', '1 : 250.000', '1 : 2.500.000', '1 : 25.000.000'],
    correctIndex: 2,
    explanation: 'Ubah jarak sebenarnya ke cm: 150 km = 150 × 100.000 = 15.000.000 cm. Skala = Jp : Js = 6 : 15.000.000 = 1 : 2.500.000.',
    difficulty: 'Sedang'
  },
  {
    id: 6,
    type: 'skala',
    question: 'Sebuah denah rumah digambar dengan skala 1 : 150. Jika ukuran ruang tamu pada denah adalah 4 cm × 3 cm, maka luas sebenarnya ruang tamu tersebut adalah...',
    options: ['18 m²', '27 m²', '36 m²', '54 m²'],
    correctIndex: 1,
    explanation: 'Panjang sebenarnya = 4 cm × 150 = 600 cm = 6 meter. Lebar sebenarnya = 3 cm × 150 = 450 cm = 4,5 meter. Luas sebenarnya = 6 m × 4,5 m = 27 m².',
    difficulty: 'HOTS'
  },
  {
    id: 7,
    type: 'berbalik_nilai',
    question: 'Suatu pekerjaan dapat diselesaikan oleh 12 orang pekerja dalam waktu 20 hari. Jika pekerjaan tersebut harus selesai dalam waktu 15 hari, berapa banyak pekerja yang dibutuhkan secara keseluruhan?',
    options: ['15 orang', '16 orang', '18 orang', '20 orang'],
    correctIndex: 1,
    explanation: 'Gunakan rumus perbandingan berbalik nilai: x₁ × y₁ = x₂ × y₂ -> 12 × 20 = x₂ × 15 -> 240 = 15 × x₂ -> x₂ = 240 ÷ 15 = 16 orang.',
    difficulty: 'Sedang'
  },
  {
    id: 8,
    type: 'berbalik_nilai',
    question: 'Seorang peternak memiliki persediaan pakan yang cukup untuk 40 ekor ayam selama 15 hari. Jika peternak membeli lagi 10 ekor ayam tanpa menambah pakan, persediaan pakan tersebut akan habis dalam...',
    options: ['10 hari', '12 hari', '14 hari', '18 hari'],
    correctIndex: 1,
    explanation: 'Total ayam sekarang = 40 + 10 = 50 ekor. Hubungan berbalik nilai: 40 × 15 = 50 × h₂ -> 600 = 50 × h₂ -> h₂ = 600 ÷ 50 = 12 hari.',
    difficulty: 'Sedang'
  },
  {
    id: 9,
    type: 'berbalik_nilai',
    question: 'Pak Arman mengendarai mobil dari kota P ke kota Q dengan kecepatan rata-rata 60 km/jam dalam waktu 4 jam. Jika ia ingin sampai di tujuan 1 jam lebih cepat, maka kecepatan rata-rata mobil harus ditingkatkan menjadi...',
    options: ['75 km/jam', '80 km/jam', '85 km/jam', '90 km/jam'],
    correctIndex: 1,
    explanation: 'Jarak P ke Q = 60 km/jam × 4 jam = 240 km. Waktu baru = 4 - 1 = 3 jam. Kecepatan yang diperlukan = 240 km ÷ 3 jam = 80 km/jam.',
    difficulty: 'HOTS'
  },
  {
    id: 10,
    type: 'senilai',
    question: 'Dalam sebuah resep kue bolu, perbandingan berat tepung terigu, gula pasir, dan mentega adalah 5 : 3 : 2. Jika total berat ketiga bahan tersebut adalah 800 gram, berapakah berat gula pasir yang digunakan?',
    options: ['160 gram', '240 gram', '320 gram', '400 gram'],
    correctIndex: 1,
    explanation: 'Jumlah perbandingan = 5 + 3 + 2 = 10 bagian. Nilai 1 bagian = 800 gram ÷ 10 = 80 gram. Berat gula pasir = 3 bagian × 80 gram = 240 gram.',
    difficulty: 'HOTS'
  }
];

export const INITIAL_WORKSHEET_DATA = {
  studentName: '',
  studentClass: 'VII - A',
  schoolName: 'SMP Negeri Nusantara',
  problemOrientation: 'Mengapa takaran rasa sirup markisa pada 1 teko dan 5 teko bisa tetap sama manisnya, sedangkan waktu penyelesaian jembatan justru memendek ketika jumlah pekerja ditambah?',
  hypothesis: 'Pada takaran sirup, rasio sirup dan air bersifat senilai (jika air bertambah k kali, sirup juga bertambah k kali). Sedangkan pada proyek jembatan, hubungannya berbalik nilai (jika pekerja berlipat ganda, waktu terbagi menjadi setengahnya).',
  experimentData: [
    { trial: 1, valA: 2, valB: 5, ratio: '2 : 5', kValue: '0.40', note: 'Takaran 1 teko standar (Rasa Pas)' },
    { trial: 2, valA: 4, valB: 10, ratio: '4 : 10 = 2 : 5', kValue: '0.40', note: 'Takaran 2 teko (Rasa Tetap Pas)' },
    { trial: 3, valA: 6, valB: 15, ratio: '6 : 15 = 2 : 5', kValue: '0.40', note: 'Takaran 3 teko (Rasa Tetap Pas)' },
    { trial: 4, valA: 10, valB: 25, ratio: '10 : 25 = 2 : 5', kValue: '0.40', note: 'Takaran 5 teko (Rasa Tetap Pas)' }
  ],
  analysisAnswer1: 'Nilai perbandingan y/x selalu menghasilkan bilangan konstan k = 0,4 (atau 2/5). Ini membuktikan bahwa sirup dan air berbanding lurus/senilai.',
  analysisAnswer2: 'Pada percobaan kedua (pekerja vs hari), hasil kali x · y selalu bernilai 180 orang-hari. Ketika pekerjanya bertambah, harinya berkurang.',
  conclusion: 'Perbandingan Senilai terjadi jika pertambahan variabel pertama menyebabkan pertambahan proporsional pada variabel kedua (y = k · x). Perbandingan Berbalik Nilai terjadi jika pertambahan variabel pertama menyebabkan penurunan proporsional pada variabel kedua (x · y = k).',
  selfReflection: 'Saya kini memahami penerapan rasio dalam memasak, membaca peta wisata, dan menghitung estimasi waktu tugas kelompok.'
};
