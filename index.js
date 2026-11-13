/* Al-Mahir Pro - data.js
   Berisi: bank mufrodat, kalimat, bacaan, percakapan, materi Nahwu & Shorof,
   serta fungsi utilitas dasar. Dimuat SEBELUM app.js */

/* ================= DATA ================= */
const DEFAULT_WORDS=[
{a:'كِتَابٌ',m:'Buku',c:'Sekolah',e:'📖'},{a:'قَلَمٌ',m:'Pena',c:'Sekolah',e:'✏️'},{a:'مَدْرَسَةٌ',m:'Sekolah',c:'Sekolah',e:'🏫'},{a:'طَالِبٌ',m:'Siswa',c:'Sekolah',e:'🧑‍🎓'},{a:'مُعَلِّمٌ',m:'Guru',c:'Sekolah',e:'👨‍🏫'},{a:'حَقِيبَةٌ',m:'Tas',c:'Sekolah',e:'🎒'},{a:'مِسْطَرَةٌ',m:'Penggaris',c:'Sekolah',e:'📏'},
{a:'بَيْتٌ',m:'Rumah',c:'Rumah',e:'🏠'},{a:'بَابٌ',m:'Pintu',c:'Rumah',e:'🚪'},{a:'نَافِذَةٌ',m:'Jendela',c:'Rumah',e:'🪟'},{a:'كُرْسِيٌّ',m:'Kursi',c:'Rumah',e:'🪑'},{a:'سَرِيرٌ',m:'Tempat tidur',c:'Rumah',e:'🛏️'},{a:'مِفْتَاحٌ',m:'Kunci',c:'Rumah',e:'🔑'},{a:'سَاعَةٌ',m:'Jam',c:'Rumah',e:'⏰'},{a:'مِصْبَاحٌ',m:'Lampu',c:'Rumah',e:'💡'},
{a:'أَبٌ',m:'Ayah',c:'Keluarga',e:'👨'},{a:'أُمٌّ',m:'Ibu',c:'Keluarga',e:'👩'},{a:'أَخٌ',m:'Saudara laki-laki',c:'Keluarga',e:'👦'},{a:'أُخْتٌ',m:'Saudara perempuan',c:'Keluarga',e:'👧'},{a:'جَدٌّ',m:'Kakek',c:'Keluarga',e:'👴'},{a:'جَدَّةٌ',m:'Nenek',c:'Keluarga',e:'👵'},
{a:'خُبْزٌ',m:'Roti',c:'Makanan',e:'🍞'},{a:'مَاءٌ',m:'Air',c:'Makanan',e:'💧'},{a:'تُفَّاحٌ',m:'Apel',c:'Makanan',e:'🍎'},{a:'مَوْزٌ',m:'Pisang',c:'Makanan',e:'🍌'},{a:'حَلِيبٌ',m:'Susu',c:'Makanan',e:'🥛'},{a:'سَمَكٌ',m:'Ikan',c:'Makanan',e:'🐟'},
{a:'قِطَّةٌ',m:'Kucing',c:'Hewan',e:'🐱'},{a:'كَلْبٌ',m:'Anjing',c:'Hewan',e:'🐶'},{a:'أَسَدٌ',m:'Singa',c:'Hewan',e:'🦁'},{a:'فِيلٌ',m:'Gajah',c:'Hewan',e:'🐘'},{a:'عُصْفُورٌ',m:'Burung',c:'Hewan',e:'🐦'},{a:'حِصَانٌ',m:'Kuda',c:'Hewan',e:'🐴'},
{a:'شَمْسٌ',m:'Matahari',c:'Alam',e:'☀️'},{a:'قَمَرٌ',m:'Bulan',c:'Alam',e:'🌙'},{a:'نَجْمٌ',m:'Bintang',c:'Alam',e:'⭐'},{a:'شَجَرَةٌ',m:'Pohon',c:'Alam',e:'🌳'},{a:'بَحْرٌ',m:'Laut',c:'Alam',e:'🌊'},{a:'سَمَاءٌ',m:'Langit',c:'Alam',e:'☁️'}
];
const SENTENCES=[
{ar:'أَنَا طَالِبٌ نَشِيطٌ',id:'Saya seorang siswa yang rajin'},
{ar:'هَذَا كِتَابٌ جَدِيدٌ',id:'Ini adalah buku baru'},
{ar:'الْبَيْتُ كَبِيرٌ جِدًّا',id:'Rumah itu sangat besar'},
{ar:'أَيْنَ الْمَدْرَسَةُ',id:'Di mana sekolah itu?'},
{ar:'أُمِّي تُحِبُّ الْقِطَّةَ',id:'Ibuku menyukai kucing'},
{ar:'ذَهَبَ الْوَلَدُ إِلَى الْمَدْرَسَةِ',id:'Anak laki-laki itu pergi ke sekolah'},
{ar:'أَشْرَبُ الْمَاءَ كُلَّ يَوْمٍ',id:'Saya minum air setiap hari'},
{ar:'الشَّمْسُ سَاطِعَةٌ فِي السَّمَاءِ',id:'Matahari bersinar di langit'}
];
const PASSAGES=[
{t:'Perkenalan',ar:'اِسْمِي أَحْمَدُ. أَنَا طَالِبٌ فِي الْمَدْرَسَةِ. أُحِبُّ الْكِتَابَ.',id:'Namaku Ahmad. Saya seorang siswa di sekolah. Saya suka buku.',qs:[{q:'Siapa nama anak itu?',o:['Ahmad','Umar','Ali','Zaid'],a:0},{q:'Di mana ia belajar?',o:['Di rumah','Di sekolah','Di pasar','Di masjid'],a:1},{q:'Apa yang ia sukai?',o:['Ikan','Bola','Buku','Roti'],a:2}]},
{t:'Keluargaku',ar:'هَذَا بَيْتِي. فِي الْبَيْتِ أَبِي وَأُمِّي وَأَخِي. نَحْنُ نُحِبُّ بَعْضَنَا.',id:'Ini rumahku. Di rumah ada ayahku, ibuku, dan saudara laki-lakiku. Kami saling menyayangi.',qs:[{q:'Siapa saja yang ada di rumah?',o:['Ayah, ibu, saudara laki-laki','Guru dan murid','Kakek saja','Hanya ibu'],a:0},{q:'Bagaimana perasaan keluarga itu?',o:['Saling membenci','Saling menyayangi','Saling marah','Saling lupa'],a:1}]},
{t:'Di Taman',ar:'الشَّمْسُ سَاطِعَةٌ. فِي الْحَدِيقَةِ شَجَرَةٌ كَبِيرَةٌ. تَحْتَ الشَّجَرَةِ قِطَّةٌ.',id:'Matahari bersinar terang. Di taman ada pohon besar. Di bawah pohon ada seekor kucing.',qs:[{q:'Apa yang ada di bawah pohon?',o:['Anjing','Kucing','Burung','Kuda'],a:1},{q:'Bagaimana pohonnya?',o:['Kecil','Besar','Layu','Baru'],a:1}]}
];
const EXTRA_DICT={'انا':'saya','في':'di / dalam','هذا':'ini','جديد':'baru','كبير':'besar','كبيره':'besar','جدا':'sangat','اين':'di mana','تحب':'menyukai','احب':'saya suka','ذهب':'pergi','الى':'ke','ولد':'anak laki-laki','اشرب':'saya minum','كل':'setiap','يوم':'hari','ساطعه':'bersinar terang','نشيط':'rajin','نحن':'kami','نحب':'kami suka','بعضنا':'satu sama lain','اسمي':'namaku','احمد':'Ahmad','بيتي':'rumahku','ابي':'ayahku','امي':'ibuku','اخي':'saudara lelakiku','تحت':'di bawah','حديقه':'taman','هي':'dia (pr)','هو':'dia (lk)'};
const AR_KEYS='ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي ة ء ئ ؤ ى أ إ آ'.split(' ');
const HARAKAT=['َ','ُ','ِ','ً','ٌ','ٍ','ّ','ْ'];
const HK='ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي ة ء ى ئ ؤ'.split(' ');

/* ================= UTIL ================= */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const strip=s=>String(s).replace(/[\u064B-\u0652\u0670\u0640]/g,'');
const nl=c=>({'أ':'ا','إ':'ا','آ':'ا','ٱ':'ا'}[c]||c);
const nrm=s=>[...strip(s).replace(/\s+/g,'')].map(nl).join('');
const rand=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const today=()=>new Date().toLocaleDateString('en-CA');
const dayHash=()=>[...today()].reduce((s,c)=>s+c.charCodeAt(0),0);
function toast(msg,t='info'){const d=document.createElement('div');d.className='toast '+t;d.textContent=msg;$('#toasts').appendChild(d);setTimeout(()=>d.remove(),3200)}
function closeM(id){$('#'+id).classList.remove('show')}
function openM(id){$('#'+id).classList.add('show')}

/* ================= DATA TAMBAHAN: MUFRODAT, KALIMAT, BACAAN, PERCAKAPAN ================= */
(function(){
const add=(c,rows)=>rows.forEach(r=>DEFAULT_WORDS.push({a:r[0],m:r[1],c:c,e:r[2]}));
add('Angka',[['وَاحِدٌ','Satu (1)','1️⃣'],['اثْنَانِ','Dua (2)','2️⃣'],['ثَلَاثَةٌ','Tiga (3)','3️⃣'],['أَرْبَعَةٌ','Empat (4)','4️⃣'],['خَمْسَةٌ','Lima (5)','5️⃣'],['سِتَّةٌ','Enam (6)','6️⃣'],['سَبْعَةٌ','Tujuh (7)','7️⃣'],['ثَمَانِيَةٌ','Delapan (8)','8️⃣'],['تِسْعَةٌ','Sembilan (9)','9️⃣'],['عَشَرَةٌ','Sepuluh (10)','🔟'],['مِائَةٌ','Seratus (100)','💯'],['أَلْفٌ','Seribu (1000)','🔢']]);
add('Warna',[['أَحْمَرُ','Merah','🔴'],['أَزْرَقُ','Biru','🔵'],['أَخْضَرُ','Hijau','🟢'],['أَصْفَرُ','Kuning','🟡'],['أَبْيَضُ','Putih','⚪'],['أَسْوَدُ','Hitam','⚫'],['بُرْتُقَالِيٌّ','Oranye','🟠'],['بُنِّيٌّ','Cokelat','🟤'],['رَمَادِيٌّ','Abu-abu','🌫️'],['وَرْدِيٌّ','Merah muda','🌸'],['بَنَفْسَجِيٌّ','Ungu','🟣']]);
add('Tubuh',[['رَأْسٌ','Kepala','👤'],['عَيْنٌ','Mata','👁️'],['أُذُنٌ','Telinga','👂'],['أَنْفٌ','Hidung','👃'],['فَمٌ','Mulut','👄'],['يَدٌ','Tangan','✋'],['رِجْلٌ','Kaki','🦵'],['سِنٌّ','Gigi','🦷'],['لِسَانٌ','Lidah','👅'],['قَلْبٌ','Hati / jantung','❤️'],['ظَهْرٌ','Punggung','🔙'],['شَعْرٌ','Rambut','💇'],['إِصْبَعٌ','Jari','☝️'],['بَطْنٌ','Perut','🍽️'],['وَجْهٌ','Wajah','🙂'],['رَقَبَةٌ','Leher','🦒'],['كَتِفٌ','Bahu','💪']]);
add('Pakaian',[['قَمِيصٌ','Kemeja','👕'],['بِنْطَالٌ','Celana panjang','👖'],['حِذَاءٌ','Sepatu','👟'],['قُبَّعَةٌ','Topi','🧢'],['ثَوْبٌ','Gamis / baju panjang','👘'],['جَوْرَبٌ','Kaus kaki','🧦'],['نَظَّارَةٌ','Kacamata','👓'],['فُسْتَانٌ','Gaun','👗'],['مِعْطَفٌ','Mantel','🧥'],['خَاتَمٌ','Cincin','💍'],['عِمَامَةٌ','Sorban','👳'],['حِجَابٌ','Hijab','🧕']]);
add('Makanan',[['بُرْتُقَالٌ','Jeruk','🍊'],['عِنَبٌ','Anggur','🍇'],['بِطِّيخٌ','Semangka','🍉'],['فَرَاوِلَةٌ','Stroberi','🍓'],['لَيْمُونٌ','Lemon','🍋'],['تَمْرٌ','Kurma','🌴'],['مَانْجُو','Mangga','🥭'],['أَنَانَاسٌ','Nanas','🍍'],['جَزَرٌ','Wortel','🥕'],['طَمَاطِمُ','Tomat','🍅'],['بَطَاطِسُ','Kentang','🥔'],['بَصَلٌ','Bawang merah','🧅'],['ثُومٌ','Bawang putih','🧄'],['ذُرَةٌ','Jagung','🌽'],['خِيَارٌ','Mentimun','🥒'],['فُلْفُلٌ','Cabai','🌶️'],['أَرُزٌّ','Nasi / beras','🍚'],['لَحْمٌ','Daging','🥩'],['دَجَاجٌ','Daging ayam','🍗'],['بَيْضٌ','Telur','🥚'],['جُبْنٌ','Keju','🧀'],['عَسَلٌ','Madu','🍯'],['شَايٌ','Teh','🍵'],['قَهْوَةٌ','Kopi','☕'],['عَصِيرٌ','Jus','🧃'],['سُكَّرٌ','Gula','🍬'],['مِلْحٌ','Garam','🧂'],['زُبْدَةٌ','Mentega','🧈'],['شُورْبَةٌ','Sup','🍲'],['حَلْوَى','Permen / kue manis','🍰']]);
add('Hewan',[['بَقَرَةٌ','Sapi','🐄'],['خَرُوفٌ','Domba','🐑'],['جَمَلٌ','Unta','🐪'],['حِمَارٌ','Keledai','🐴'],['دَجَاجَةٌ','Ayam betina','🐔'],['أَرْنَبٌ','Kelinci','🐰'],['قِرْدٌ','Monyet','🐒'],['ذِئْبٌ','Serigala','🐺'],['ثَعْلَبٌ','Rubah','🦊'],['دُبٌّ','Beruang','🐻'],['نَمِرٌ','Harimau','🐯'],['زَرَافَةٌ','Jerapah','🦒'],['ثُعْبَانٌ','Ular','🐍'],['سُلَحْفَاةٌ','Kura-kura','🐢'],['ضِفْدَعٌ','Katak','🐸'],['فَرَاشَةٌ','Kupu-kupu','🦋'],['نَحْلَةٌ','Lebah','🐝'],['نَمْلَةٌ','Semut','🐜'],['حُوتٌ','Paus','🐋'],['دُلْفِينٌ','Lumba-lumba','🐬'],['بَطَّةٌ','Bebek','🦆'],['نَسْرٌ','Elang','🦅'],['حَمَامَةٌ','Merpati','🕊️'],['فَأْرٌ','Tikus','🐭'],['عَقْرَبٌ','Kalajengking','🦂'],['بَبَّغَاءُ','Burung beo','🦜']]);
add('Tempat',[['مَسْجِدٌ','Masjid','🕌'],['سُوقٌ','Pasar','🛒'],['مُسْتَشْفَى','Rumah sakit','🏥'],['مَكْتَبَةٌ','Perpustakaan','📚'],['مَطْعَمٌ','Restoran','🍽️'],['حَدِيقَةٌ','Taman','🌷'],['مَطَارٌ','Bandara','🛫'],['مَحَطَّةٌ','Stasiun','🚉'],['شَارِعٌ','Jalan raya','🛣️'],['مَدِينَةٌ','Kota','🏙️'],['قَرْيَةٌ','Desa','🏘️'],['مَلْعَبٌ','Lapangan','⚽'],['مَكْتَبٌ','Kantor','🏢'],['بَنْكٌ','Bank','🏦'],['مَخْبَزٌ','Toko roti','🥖'],['صَيْدَلِيَّةٌ','Apotek','💊'],['جَامِعَةٌ','Universitas','🎓'],['فَصْلٌ','Ruang kelas','🧑‍🏫'],['مَطْبَخٌ','Dapur','🍳'],['غُرْفَةٌ','Kamar','🛋️'],['حَمَّامٌ','Kamar mandi','🚿'],['وَطَنٌ','Tanah air','🇮🇩']]);
add('Profesi',[['طَبِيبٌ','Dokter','👨‍⚕️'],['مُمَرِّضٌ','Perawat','🧑‍⚕️'],['مُهَنْدِسٌ','Insinyur','👷'],['شُرْطِيٌّ','Polisi','👮'],['طَبَّاخٌ','Koki','👨‍🍳'],['فَلَّاحٌ','Petani','👨‍🌾'],['تَاجِرٌ','Pedagang','🧑‍💼'],['سَائِقٌ','Sopir','🚖'],['طَيَّارٌ','Pilot','🧑‍✈️'],['جُنْدِيٌّ','Tentara','💂'],['نَجَّارٌ','Tukang kayu','🔨'],['خَيَّاطٌ','Penjahit','🧵'],['صَحَفِيٌّ','Wartawan','📰'],['رَسَّامٌ','Pelukis','🎨'],['مُحَاسِبٌ','Akuntan','🧮'],['إِمَامٌ','Imam','🕋'],['عَامِلٌ','Pekerja','🛠️'],['كَاتِبٌ','Penulis','✍️']]);
add('Transportasi',[['سَيَّارَةٌ','Mobil','🚗'],['حَافِلَةٌ','Bus','🚌'],['قِطَارٌ','Kereta api','🚆'],['طَائِرَةٌ','Pesawat','✈️'],['دَرَّاجَةٌ','Sepeda','🚲'],['سَفِينَةٌ','Kapal','🚢'],['شَاحِنَةٌ','Truk','🚚'],['قَارِبٌ','Perahu','⛵'],['مَرْكَبَةٌ','Kendaraan','🚙'],['دَرَّاجَةٌ نَارِيَّةٌ','Sepeda motor','🏍️']]);
add('Waktu',[['يَوْمٌ','Hari','📅'],['أُسْبُوعٌ','Pekan / minggu','🗓️'],['شَهْرٌ','Bulan (kalender)','🈷️'],['سَنَةٌ','Tahun','🎆'],['صَبَاحٌ','Pagi','🌅'],['مَسَاءٌ','Sore / petang','🌆'],['لَيْلٌ','Malam','🌃'],['ظُهْرٌ','Tengah hari','🌞'],['أَمْسِ','Kemarin','⏪'],['غَدًا','Besok','⏩'],['الْآنَ','Sekarang','⏱️'],['دَقِيقَةٌ','Menit','⏲️'],['وَقْتٌ','Waktu','⌚'],['صَيْفٌ','Musim panas','🏖️'],['شِتَاءٌ','Musim dingin','⛄'],['رَبِيعٌ','Musim semi','🌼'],['خَرِيفٌ','Musim gugur','🍂']]);
add('Hari',[['الْأَحَدُ','Hari Ahad / Minggu','1️⃣'],['الِاثْنَيْنِ','Hari Senin','2️⃣'],['الثُّلَاثَاءُ','Hari Selasa','3️⃣'],['الْأَرْبِعَاءُ','Hari Rabu','4️⃣'],['الْخَمِيسُ','Hari Kamis','5️⃣'],['الْجُمُعَةُ','Hari Jumat','🕌'],['السَّبْتُ','Hari Sabtu','6️⃣']]);
add('Islam',[['صَلَاةٌ','Salat','🤲'],['صَوْمٌ','Puasa','🌙'],['زَكَاةٌ','Zakat','💰'],['حَجٌّ','Haji','🕋'],['قُرْآنٌ',"Al-Qur'an",'📖'],['دُعَاءٌ','Doa','🙏'],['وُضُوءٌ','Wudu','🚿'],['قِبْلَةٌ','Kiblat','🧭'],['إِسْلَامٌ','Islam','☪️'],['إِيمَانٌ','Iman','💖'],['رَمَضَانُ','Ramadan','🌙'],['عِيدٌ','Hari raya','🎉'],['نَبِيٌّ','Nabi','🕌'],['رَسُولٌ','Rasul','✉️'],['مَلَكٌ','Malaikat','👼'],['جَنَّةٌ','Surga','🌳'],['ذِكْرٌ','Zikir','📿'],['سُورَةٌ','Surah','📜'],['آيَةٌ','Ayat','✨'],['تَوْبَةٌ','Tobat','😢'],['صَدَقَةٌ','Sedekah','🎁'],['أَذَانٌ','Azan','📢'],['مُسْلِمٌ','Muslim','🤍'],['رَكْعَةٌ','Rakaat','🧎']]);
add('Sifat',[['كَبِيرٌ','Besar','🐘'],['صَغِيرٌ','Kecil','🐜'],['طَوِيلٌ','Panjang / tinggi','📏'],['قَصِيرٌ','Pendek','✂️'],['جَمِيلٌ','Indah / cantik','🌺'],['قَبِيحٌ','Buruk rupa','👹'],['جَدِيدٌ','Baru','🆕'],['قَدِيمٌ','Lama / kuno','🏺'],['سَرِيعٌ','Cepat','⚡'],['بَطِيءٌ','Lambat','🐌'],['سَهْلٌ','Mudah','👌'],['صَعْبٌ','Sulit','🧗'],['حَارٌّ','Panas','🥵'],['بَارِدٌ','Dingin','🥶'],['سَعِيدٌ','Bahagia','😊'],['حَزِينٌ','Sedih','😭'],['غَنِيٌّ','Kaya','🤑'],['فَقِيرٌ','Miskin','😞'],['نَظِيفٌ','Bersih','🧼'],['وَسِخٌ','Kotor','🗑️'],['قَوِيٌّ','Kuat','💪'],['ضَعِيفٌ','Lemah','🤒'],['ذَكِيٌّ','Cerdas','🧠'],['كَسْلَانُ','Malas','😴'],['نَشِيطٌ','Rajin / aktif','🏃'],['جَائِعٌ','Lapar','🤤'],['عَطْشَانُ','Haus','🥤'],['تَعْبَانُ','Lelah','😩'],['مَرِيضٌ','Sakit','🤧'],['ثَقِيلٌ','Berat','🏋️'],['خَفِيفٌ','Ringan','🍃'],['قَرِيبٌ','Dekat','📍'],['بَعِيدٌ','Jauh','🌄'],['مَفْتُوحٌ','Terbuka','🔓'],['مُغْلَقٌ','Tertutup','🔒'],['حُلْوٌ','Manis','🍭'],['مُرٌّ','Pahit','😖'],['لَذِيذٌ','Lezat','😋'],['رَخِيصٌ','Murah','🏷️'],['غَالٍ','Mahal','💎'],['مُجْتَهِدٌ','Tekun / giat','📚'],['كَرِيمٌ','Dermawan','🤝'],['شُجَاعٌ','Berani','🦸'],['صَادِقٌ','Jujur','😇']]);
add('Kata Kerja',[['كَتَبَ','Menulis','✍️'],['قَرَأَ','Membaca','📖'],['ذَهَبَ','Pergi','🚶'],['جَلَسَ','Duduk','🪑'],['أَكَلَ','Makan','🍽️'],['شَرِبَ','Minum','🥛'],['نَامَ','Tidur','😴'],['فَتَحَ','Membuka','🔓'],['أَغْلَقَ','Menutup','🔒'],['دَخَلَ','Masuk','🚪'],['خَرَجَ','Keluar','🏃'],['سَمِعَ','Mendengar','👂'],['رَأَى','Melihat','👀'],['فَهِمَ','Memahami','💡'],['عَلِمَ','Mengetahui','🎓'],['دَرَسَ','Belajar','📝'],['لَعِبَ','Bermain','🎮'],['رَجَعَ','Kembali','↩️'],['نَزَلَ','Turun','⬇️'],['صَعِدَ','Naik','⬆️'],['حَمَلَ','Membawa','🎒'],['أَخَذَ','Mengambil','🤲'],['أَعْطَى','Memberi','🎁'],['ضَرَبَ','Memukul','👊'],['نَصَرَ','Menolong / membela','🤝'],['فَعَلَ','Melakukan','🔧'],['قَالَ','Berkata','🗣️'],['سَأَلَ','Bertanya','❓'],['أَجَابَ','Menjawab','💬'],['ضَحِكَ','Tertawa','😂'],['بَكَى','Menangis','😢'],['رَكَضَ','Berlari','🏃‍♂️'],['سَبَحَ','Berenang','🏊'],['طَبَخَ','Memasak','🍳'],['غَسَلَ','Mencuci','🧼'],['لَبِسَ','Memakai pakaian','👔'],['اشْتَرَى','Membeli','🛍️'],['بَاعَ','Menjual','💵'],['سَافَرَ','Bepergian','🧳'],['وَصَلَ','Tiba','📍'],['انْتَظَرَ','Menunggu','⌛'],['سَاعَدَ','Membantu','🙌'],['أَحَبَّ','Mencintai','😍'],['بَحَثَ','Mencari','🔍'],['زَارَ','Mengunjungi','🏡'],['تَعَلَّمَ','Mempelajari','🧑‍🎓'],['عَلَّمَ','Mengajar','👩‍🏫'],['رَسَمَ','Menggambar','🖍️'],['صَلَّى','Melaksanakan salat','🕌'],['طَلَبَ','Meminta','🙋'],['وَجَدَ','Menemukan','🔎'],['نَسِيَ','Lupa','🤯'],['تَذَكَّرَ','Mengingat','💭'],['سَكَنَ','Tinggal / menetap','🏠'],['وَقَفَ','Berdiri / berhenti','🧍'],['مَشَى','Berjalan','🚶‍♂️'],['كَسَرَ','Mematahkan','💥'],['جَمَعَ','Mengumpulkan','🧺'],['خَلَقَ','Menciptakan','🌍']]);
add('Kata Tanya',[['مَنْ','Siapa','🙋'],['مَا','Apa','🤔'],['أَيْنَ','Di mana','📍'],['مَتَى','Kapan','⏰'],['كَيْفَ','Bagaimana','🤷'],['لِمَاذَا','Mengapa','❓'],['كَمْ','Berapa','🔢'],['أَيُّ','Yang mana','👆'],['هَلْ','Apakah','❔']]);
add('Huruf & Penghubung',[['فِي','Di / dalam','📌'],['مِنْ','Dari','↩️'],['إِلَى','Ke','➡️'],['عَلَى','Di atas / pada','⬆️'],['عَنْ','Tentang / dari','🗨️'],['مَعَ','Bersama','👫'],['بَيْنَ','Di antara','↔️'],['تَحْتَ','Di bawah','⬇️'],['فَوْقَ','Di atas (posisi)','🔝'],['أَمَامَ','Di depan','⏭️'],['خَلْفَ','Di belakang','⏮️'],['عِنْدَ','Di sisi / memiliki','🧲'],['لَكِنْ','Tetapi','⚖️'],['لِأَنَّ','Karena','🔗'],['ثُمَّ','Kemudian','➰'],['أَوْ','Atau','🔀'],['نَعَمْ','Ya','✅'],['لَا','Tidak','❌'],['شُكْرًا','Terima kasih','🙏'],['عَفْوًا','Sama-sama / maaf','🙇'],['مَرْحَبًا','Halo','👋'],['أَهْلًا','Selamat datang','🤗'],['سَلَامٌ','Salam / damai','☮️'],['جِدًّا','Sangat','🔥'],['كَثِيرٌ','Banyak','📦'],['قَلِيلٌ','Sedikit','🤏']]);
add('Kata Ganti',[['أَنَا','Saya','🙋'],['أَنْتَ','Kamu (laki-laki)','👉'],['أَنْتِ','Kamu (perempuan)','👈'],['هُوَ','Dia (laki-laki)','🧍‍♂️'],['هِيَ','Dia (perempuan)','🧍‍♀️'],['نَحْنُ','Kami / kita','👥'],['هُمْ','Mereka (laki-laki)','👨‍👨‍👦'],['هُنَّ','Mereka (perempuan)','👭'],['أَنْتُمْ','Kalian (laki-laki)','👥'],['أَنْتُنَّ','Kalian (perempuan)','👯'],['هَذَا','Ini (laki-laki)','👇'],['هَذِهِ','Ini (perempuan)','☝️'],['ذَلِكَ','Itu (laki-laki)','👉'],['تِلْكَ','Itu (perempuan)','👈']]);
add('Keluarga',[['عَمٌّ','Paman (dari ayah)','👨‍🦱'],['خَالٌ','Paman (dari ibu)','🧔'],['عَمَّةٌ','Bibi (dari ayah)','👩‍🦱'],['خَالَةٌ','Bibi (dari ibu)','👩‍🦰'],['ابْنٌ','Anak laki-laki','👦'],['بِنْتٌ','Anak perempuan','👧'],['زَوْجٌ','Suami','🤵'],['زَوْجَةٌ','Istri','👰'],['طِفْلٌ','Bayi / anak kecil','🍼'],['صَدِيقٌ','Teman','🧑‍🤝‍🧑'],['جَارٌ','Tetangga','🏘️'],['ضَيْفٌ','Tamu','🛎️'],['عَائِلَةٌ','Keluarga (inti)','👪'],['حَفِيدٌ','Cucu','🧒']]);
add('Alam',[['مَطَرٌ','Hujan','🌧️'],['رِيحٌ','Angin','🌬️'],['ثَلْجٌ','Salju','❄️'],['سَحَابٌ','Awan','☁️'],['بَرْقٌ','Kilat','⚡'],['رَعْدٌ','Guntur','🌩️'],['جَبَلٌ','Gunung','⛰️'],['نَهْرٌ','Sungai','🏞️'],['صَحْرَاءُ','Gurun','🏜️'],['غَابَةٌ','Hutan','🌲'],['وَرْدَةٌ','Mawar','🌹'],['زَهْرَةٌ','Bunga','🌼'],['عُشْبٌ','Rumput','🌱'],['أَرْضٌ','Bumi / tanah','🌍'],['جَزِيرَةٌ','Pulau','🏝️'],['شَاطِئٌ','Pantai','🏖️'],['حَجَرٌ','Batu','🧱'],['رَمْلٌ','Pasir','⏳'],['بُرْكَانٌ','Gunung berapi','🌋'],['نَارٌ','Api','🔥'],['هَوَاءٌ','Udara','💨'],['طَقْسٌ','Cuaca','🌦️'],['ضَوْءٌ','Cahaya','🔆'],['ظَلَامٌ','Kegelapan','🌑']]);
add('Rumah',[['طَاوِلَةٌ','Meja','🛋️'],['ثَلَّاجَةٌ','Kulkas','🧊'],['تِلِفَازٌ','Televisi','📺'],['هَاتِفٌ','Telepon','📱'],['حَاسُوبٌ','Komputer','💻'],['سِكِّينٌ','Pisau','🔪'],['مِلْعَقَةٌ','Sendok','🥄'],['شَوْكَةٌ','Garpu','🍴'],['صَحْنٌ','Piring','🥣'],['كَأْسٌ','Gelas','🥂'],['مِرْآةٌ','Cermin','👤'],['سَجَّادَةٌ','Karpet / sajadah','🧶'],['مِظَلَّةٌ','Payung','☂️'],['كُرَةٌ','Bola','⚽'],['لُعْبَةٌ','Mainan','🧸'],['صُورَةٌ','Foto / gambar','🖼️'],['رِسَالَةٌ','Surat / pesan','✉️'],['نُقُودٌ','Uang','💰'],['سَلَّةٌ','Keranjang','🧺'],['مِكْنَسَةٌ','Sapu','🧹'],['شَمْعَةٌ','Lilin','🕯️'],['صَابُونٌ','Sabun','🧼'],['مِنْشَفَةٌ','Handuk','🛁'],['سَقْفٌ','Atap / langit-langit','🏚️'],['جِدَارٌ','Dinding','🧱'],['حَدِيقَةُ الْبَيْتِ','Halaman rumah','🏡']]);
add('Sekolah',[['دَرْسٌ','Pelajaran','📘'],['دَفْتَرٌ','Buku tulis','📓'],['سَبُّورَةٌ','Papan tulis','🧑‍🏫'],['مِمْحَاةٌ','Penghapus','🧽'],['مِقَصٌّ','Gunting','✂️'],['وَاجِبٌ','Pekerjaan rumah','📝'],['امْتِحَانٌ','Ujian','🧪'],['مُدِيرٌ','Kepala sekolah / direktur','🧑‍💼'],['لُغَةٌ','Bahasa','🗣️'],['رِيَاضِيَّاتٌ','Matematika','➗'],['عِلْمٌ','Ilmu','🔬'],['تَارِيخٌ','Sejarah','🏛️'],['جَدْوَلٌ','Jadwal','🗓️'],['سُؤَالٌ','Pertanyaan','🙋‍♀️'],['جَوَابٌ','Jawaban','💬'],['كَلِمَةٌ','Kata','🔤'],['جُمْلَةٌ','Kalimat','💭'],['حَرْفٌ','Huruf','🅰️'],['نَجَاحٌ','Kelulusan / sukses','🥇'],['شَهَادَةٌ','Ijazah / sertifikat','📜']]);
})();

/* ---- Kalimat tambahan ---- */
SENTENCES.push(
{ar:'هَذَا قَلَمٌ أَزْرَقُ',id:'Ini adalah pena biru'},
{ar:'أَنَا أَسْكُنُ فِي بَيْتٍ جَمِيلٍ',id:'Saya tinggal di rumah yang indah'},
{ar:'الْمُعَلِّمُ يَشْرَحُ الدَّرْسَ',id:'Guru menjelaskan pelajaran'},
{ar:'أَحْمَدُ يَقْرَأُ الْقُرْآنَ كُلَّ صَبَاحٍ',id:'Ahmad membaca Al-Qur\'an setiap pagi'},
{ar:'ذَهَبْتُ إِلَى الْمَسْجِدِ لِلصَّلَاةِ',id:'Saya pergi ke masjid untuk salat'},
{ar:'فَاطِمَةُ تَطْبُخُ الْأَرُزَّ فِي الْمَطْبَخِ',id:'Fatimah memasak nasi di dapur'},
{ar:'السَّيَّارَةُ أَمَامَ الْبَيْتِ',id:'Mobil itu berada di depan rumah'},
{ar:'الْقِطَّةُ تَحْتَ الطَّاوِلَةِ',id:'Kucing itu di bawah meja'},
{ar:'اشْتَرَيْتُ كِتَابًا جَدِيدًا مِنَ الْمَكْتَبَةِ',id:'Saya membeli buku baru dari perpustakaan'},
{ar:'هَلْ أَنْتَ مِنْ إِنْدُونِيسِيَا',id:'Apakah kamu berasal dari Indonesia?'},
{ar:'مَا اسْمُكَ',id:'Siapa namamu?'},
{ar:'كَمْ عُمْرُكَ',id:'Berapa umurmu?'},
{ar:'أَيْنَ تَسْكُنُ',id:'Di mana kamu tinggal?'},
{ar:'أُحِبُّ اللُّغَةَ الْعَرَبِيَّةَ',id:'Saya suka bahasa Arab'},
{ar:'الْجَوُّ بَارِدٌ فِي الشِّتَاءِ',id:'Cuaca dingin di musim dingin'},
{ar:'يَلْعَبُ الْأَوْلَادُ فِي الْحَدِيقَةِ',id:'Anak-anak bermain di taman'},
{ar:'الْأَبُ يَعْمَلُ فِي الْمَكْتَبِ',id:'Ayah bekerja di kantor'},
{ar:'أَنَا جَائِعٌ فَآكُلُ الْخُبْزَ',id:'Saya lapar maka saya makan roti'},
{ar:'الْمَرِيضُ يَذْهَبُ إِلَى الْمُسْتَشْفَى',id:'Orang sakit pergi ke rumah sakit'},
{ar:'الطَّالِبَاتُ يَكْتُبْنَ الْوَاجِبَ',id:'Para siswi menulis PR'},
{ar:'لَا تَضْحَكْ فِي الصَّلَاةِ',id:'Jangan tertawa saat salat'},
{ar:'اُكْتُبِ الدَّرْسَ يَا أَحْمَدُ',id:'Tulislah pelajaran itu, wahai Ahmad'},
{ar:'الْعِلْمُ نُورٌ وَالْجَهْلُ ظَلَامٌ',id:'Ilmu adalah cahaya dan kebodohan adalah kegelapan'},
{ar:'الصَّدِيقُ وَقْتَ الضِّيقِ',id:'Teman sejati terlihat di waktu sulit'},
{ar:'اللَّهُ أَكْبَرُ',id:'Allah Maha Besar'},
{ar:'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',id:'Segala puji bagi Allah, Tuhan semesta alam'},
{ar:'رَمَضَانُ شَهْرُ الصِّيَامِ',id:'Ramadan adalah bulan puasa'},
{ar:'سَافَرَ أَبِي إِلَى مَكَّةَ',id:'Ayahku bepergian ke Mekah'},
{ar:'فِي الصَّفِّ عِشْرُونَ طَالِبًا',id:'Di kelas ada dua puluh siswa'}
);

/* ---- Bacaan tambahan ---- */
PASSAGES.push(
{t:'Pagi Hari',ar:'أَسْتَيْقِظُ فِي الصَّبَاحِ. أَغْسِلُ وَجْهِي. ثُمَّ أَشْرَبُ الْحَلِيبَ وَآكُلُ الْخُبْزَ. بَعْدَ ذَلِكَ أَذْهَبُ إِلَى الْمَدْرَسَةِ.',id:'Saya bangun di pagi hari. Saya mencuci wajah. Lalu saya minum susu dan makan roti. Setelah itu saya pergi ke sekolah.',qs:[{q:'Apa yang diminum di pagi hari?',o:['Teh','Susu','Kopi','Jus'],a:1},{q:'Setelah sarapan, ia pergi ke mana?',o:['Pasar','Masjid','Sekolah','Taman'],a:2}]},
{t:'Di Pasar',ar:'ذَهَبَتْ أُمِّي إِلَى السُّوقِ. اشْتَرَتْ تُفَّاحًا وَمَوْزًا وَخُبْزًا. التُّفَّاحُ أَحْمَرُ وَالْمَوْزُ أَصْفَرُ.',id:'Ibuku pergi ke pasar. Ia membeli apel, pisang, dan roti. Apelnya merah dan pisangnya kuning.',qs:[{q:'Siapa yang pergi ke pasar?',o:['Ayah','Ibu','Kakak','Guru'],a:1},{q:'Apa warna pisang?',o:['Merah','Hijau','Kuning','Biru'],a:2},{q:'Apa yang TIDAK dibeli ibu?',o:['Apel','Pisang','Roti','Ikan'],a:3}]},
{t:'Hari Jumat',ar:'يَوْمُ الْجُمُعَةِ يَوْمٌ مُبَارَكٌ. أَلْبَسُ ثَوْبًا نَظِيفًا. أَذْهَبُ مَعَ أَبِي إِلَى الْمَسْجِدِ وَنُصَلِّي الْجُمُعَةَ.',id:'Hari Jumat adalah hari yang diberkahi. Saya memakai baju bersih. Saya pergi bersama ayah ke masjid dan kami salat Jumat.',qs:[{q:'Ia pergi ke masjid bersama siapa?',o:['Ibu','Teman','Ayah','Guru'],a:2},{q:'Bagaimana pakaian yang dipakai?',o:['Kotor','Bersih','Lama','Sobek'],a:1}]},
{t:'Kebun Binatang',ar:'ذَهَبْنَا إِلَى حَدِيقَةِ الْحَيَوَانَاتِ. رَأَيْنَا أَسَدًا كَبِيرًا وَفِيلًا ضَخْمًا وَقِرْدًا صَغِيرًا. أَحْبَبْتُ الْقِرْدَ كَثِيرًا.',id:'Kami pergi ke kebun binatang. Kami melihat singa besar, gajah raksasa, dan monyet kecil. Aku sangat menyukai monyet itu.',qs:[{q:'Hewan mana yang paling disukai?',o:['Singa','Gajah','Monyet','Kuda'],a:2},{q:'Bagaimana singa yang mereka lihat?',o:['Kecil','Besar','Lapar','Tua'],a:1}]},
{t:'Sahabatku',ar:'صَدِيقِي اسْمُهُ يُوسُفُ. هُوَ طَالِبٌ ذَكِيٌّ وَصَادِقٌ. نَلْعَبُ الْكُرَةَ فِي الْمَلْعَبِ كُلَّ يَوْمٍ جُمُعَةٍ.',id:'Temanku bernama Yusuf. Dia siswa yang cerdas dan jujur. Kami bermain bola di lapangan setiap hari Jumat.',qs:[{q:'Siapa nama teman itu?',o:['Ahmad','Yusuf','Khalid','Umar'],a:1},{q:'Mereka bermain apa?',o:['Catur','Bola','Layang-layang','Petak umpet'],a:1},{q:'Bagaimana sifat Yusuf?',o:['Malas dan kikir','Cerdas dan jujur','Sedih dan lemah','Marah'],a:1}]},
{t:'Bulan Ramadan',ar:'جَاءَ شَهْرُ رَمَضَانَ. نَصُومُ مِنَ الْفَجْرِ إِلَى الْمَغْرِبِ. نَقْرَأُ الْقُرْآنَ وَنُصَلِّي التَّرَاوِيحَ. ثُمَّ نَحْتَفِلُ بِالْعِيدِ.',id:'Bulan Ramadan telah tiba. Kami berpuasa dari fajar hingga magrib. Kami membaca Al-Qur\'an dan salat tarawih. Lalu kami merayakan hari raya.',qs:[{q:'Puasa dilakukan dari kapan sampai kapan?',o:['Subuh hingga Zuhur','Fajar hingga Magrib','Magrib hingga Subuh','Pagi hingga Siang'],a:1},{q:'Apa yang dirayakan setelah Ramadan?',o:['Tahun baru','Hari raya','Hari guru','Maulid'],a:1}]},
{t:'Di Rumah Sakit',ar:'الطَّبِيبُ يَعْمَلُ فِي الْمُسْتَشْفَى. يَفْحَصُ الْمَرْضَى وَيُعْطِيهِمُ الدَّوَاءَ. الْمُمَرِّضَةُ تُسَاعِدُ الطَّبِيبَ.',id:'Dokter bekerja di rumah sakit. Ia memeriksa pasien dan memberi mereka obat. Perawat membantu dokter.',qs:[{q:'Siapa yang membantu dokter?',o:['Polisi','Perawat','Guru','Sopir'],a:1},{q:'Di mana dokter bekerja?',o:['Sekolah','Pasar','Rumah sakit','Kantor pos'],a:2}]}
);

/* ---- Kamus mini tambahan untuk Qira'ah (dinormalisasi otomatis) ---- */
[['أَسْتَيْقِظُ','saya bangun'],['أَغْسِلُ','saya mencuci'],['وَجْهِي','wajahku'],['بَعْدَ','setelah'],['ذَلِكَ','itu'],['أُمِّي','ibuku'],['اشْتَرَتْ','dia (pr) membeli'],['وَالْمَوْزُ','dan pisang itu'],['مُبَارَكٌ','diberkahi'],['أَلْبَسُ','saya memakai'],['نَصُومُ','kami berpuasa'],['مِنَ','dari'],['الْفَجْرِ','fajar'],['الْمَغْرِبِ','magrib'],['نُصَلِّي','kami salat'],['نَحْتَفِلُ','kami merayakan'],['بِالْعِيدِ','dengan hari raya'],['يَعْمَلُ','bekerja'],['يَفْحَصُ','memeriksa'],['الْمَرْضَى','para pasien'],['يُعْطِيهِمُ','memberi mereka'],['الدَّوَاءَ','obat'],['تُسَاعِدُ','membantu'],['ذَهَبْنَا','kami pergi'],['رَأَيْنَا','kami melihat'],['ضَخْمًا','besar sekali'],['أَحْبَبْتُ','saya menyukai'],['كَثِيرًا','banyak / sangat'],['اسْمُهُ','namanya'],['نَلْعَبُ','kami bermain'],['صَادِقٌ','jujur'],['ذَكِيٌّ','cerdas'],['هَلْ','apakah'],['مَا','apa'],['مِنْ','dari'],['يَشْرَحُ','menjelaskan'],['الدَّرْسَ','pelajaran'],['الْمَسْجِدِ','masjid'],['لِلصَّلَاةِ','untuk salat'],['تَطْبُخُ','memasak'],['أَمَامَ','di depan'],['اشْتَرَيْتُ','saya membeli'],['أُحِبُّ','saya suka'],['يَلْعَبُ','bermain'],['الْأَوْلَادُ','anak-anak'],['يَكْتُبْنَ','mereka (pr) menulis'],['تَضْحَكْ','kamu tertawa'],['نُورٌ','cahaya'],['الْجَهْلُ','kebodohan'],['ظَلَامٌ','kegelapan'],['شَهْرُ','bulan'],['سَافَرَ','bepergian'],['عِشْرُونَ','dua puluh'],['طَالِبًا','siswa'],['فِي','di'],['الصَّفِّ','kelas'],['أَسْكُنُ','saya tinggal'],['تَسْكُنُ','kamu tinggal'],['اسْمُكَ','namamu'],['عُمْرُكَ','umurmu'],['بَارِدٌ','dingin']].forEach(function(p){EXTRA_DICT[nrm(p[0])]=p[1]});

/* ---- Percakapan ---- */
const DIALOGS=[
{t:'Berkenalan',e:'🤝',l:[['A','السَّلَامُ عَلَيْكُمْ','Assalamu\'alaikum'],['B','وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللَّهِ','Wa\'alaikumussalam warahmatullah'],['A','مَا اسْمُكَ؟','Siapa namamu?'],['B','اسْمِي خَالِدٌ. وَمَا اسْمُكَ؟','Namaku Khalid. Siapa namamu?'],['A','اسْمِي أَحْمَدُ. تَشَرَّفْنَا','Namaku Ahmad. Senang berkenalan'],['B','أَهْلًا وَسَهْلًا','Selamat datang']]},
{t:'Di Sekolah',e:'🏫',l:[['A','صَبَاحُ الْخَيْرِ يَا أُسْتَاذُ','Selamat pagi, Pak Guru'],['B','صَبَاحُ النُّورِ يَا يُوسُفُ. كَيْفَ حَالُكَ؟','Selamat pagi, Yusuf. Apa kabarmu?'],['A','بِخَيْرٍ وَالْحَمْدُ لِلَّهِ','Baik, alhamdulillah'],['B','أَيْنَ كِتَابُكَ؟','Di mana bukumu?'],['A','كِتَابِي فِي الْحَقِيبَةِ','Bukuku ada di dalam tas'],['B','افْتَحِ الْكِتَابَ وَاقْرَأْ','Bukalah buku dan bacalah']]},
{t:'Di Pasar',e:'🛒',l:[['A','كَمْ سِعْرُ التُّفَّاحِ؟','Berapa harga apel?'],['B','سِعْرُ الْكِيلُو عَشَرَةُ رِيَالَاتٍ','Harganya sepuluh riyal per kilo'],['A','هَذَا غَالٍ. هَلْ يُمْكِنُ التَّخْفِيضُ؟','Ini mahal. Bolehkah dikurangi?'],['B','نَعَمْ، تِسْعَةُ رِيَالَاتٍ فَقَطْ','Ya, sembilan riyal saja'],['A','مُوَافِقٌ. أُرِيدُ كِيلُو وَاحِدًا','Setuju. Saya mau satu kilo'],['B','تَفَضَّلْ. شُكْرًا لَكَ','Silakan. Terima kasih']]},
{t:'Di Restoran',e:'🍽️',l:[['A','مَاذَا تُرِيدُ أَنْ تَأْكُلَ؟','Kamu mau makan apa?'],['B','أُرِيدُ أَرُزًّا وَدَجَاجًا','Saya mau nasi dan ayam'],['A','وَمَاذَا تَشْرَبُ؟','Dan kamu minum apa?'],['B','أَشْرَبُ عَصِيرَ بُرْتُقَالٍ','Saya minum jus jeruk'],['A','هَلْ تُرِيدُ حَلْوَى؟','Apakah kamu mau makanan manis?'],['B','لَا، شُكْرًا. أَنَا شَبْعَانُ','Tidak, terima kasih. Saya kenyang']]},
{t:'Menanyakan Jalan',e:'🧭',l:[['A','عَفْوًا، أَيْنَ الْمَسْجِدُ؟','Permisi, di mana masjid?'],['B','الْمَسْجِدُ قَرِيبٌ مِنْ هُنَا','Masjid dekat dari sini'],['A','كَيْفَ أَذْهَبُ إِلَيْهِ؟','Bagaimana saya ke sana?'],['B','اِمْشِ إِلَى الْأَمَامِ ثُمَّ انْعَطِفْ يَمِينًا','Berjalanlah lurus lalu belok kanan'],['A','جَزَاكَ اللَّهُ خَيْرًا','Semoga Allah membalasmu dengan kebaikan'],['B','عَفْوًا، لَا شُكْرَ عَلَى وَاجِبٍ','Sama-sama, tidak perlu berterima kasih']]},
{t:'Di Dokter',e:'🏥',l:[['A','مَا بِكَ؟','Kamu kenapa?'],['B','أَشْعُرُ بِأَلَمٍ فِي رَأْسِي','Saya merasa sakit di kepala'],['A','مُنْذُ مَتَى؟','Sejak kapan?'],['B','مُنْذُ يَوْمَيْنِ','Sejak dua hari'],['A','خُذْ هَذَا الدَّوَاءَ وَارْتَحْ','Minumlah obat ini dan istirahatlah'],['B','شُكْرًا يَا دُكْتُورُ. شَفَاكَ اللَّهُ','Terima kasih, Dok']]},
{t:'Menanyakan Waktu',e:'⏰',l:[['A','كَمِ السَّاعَةُ الْآنَ؟','Jam berapa sekarang?'],['B','السَّاعَةُ الثَّامِنَةُ صَبَاحًا','Jam delapan pagi'],['A','مَتَى يَبْدَأُ الدَّرْسُ؟','Kapan pelajaran dimulai?'],['B','يَبْدَأُ بَعْدَ نِصْفِ سَاعَةٍ','Dimulai setengah jam lagi'],['A','إِذَنْ نَذْهَبُ الْآنَ','Kalau begitu kita pergi sekarang'],['B','هَيَّا بِنَا','Ayo!']]},
{t:'Di Rumah',e:'🏠',l:[['A','يَا أُمِّي، أَنَا جَائِعٌ','Ibu, aku lapar'],['B','الطَّعَامُ جَاهِزٌ يَا بُنَيَّ','Makanan sudah siap, Nak'],['A','اغْسِلْ يَدَيْكَ أَوَّلًا','Cuci tanganmu dulu'],['B','حَاضِرٌ يَا أُمِّي','Baik, Bu'],['A','بِسْمِ اللَّهِ. الطَّعَامُ لَذِيذٌ','Bismillah. Makanannya lezat'],['B','بِالْهَنَاءِ وَالشِّفَاءِ','Selamat menikmati']]}
];

/* ---- Ungkapan harian ---- */
const EXPRESSIONS=[
['السَّلَامُ عَلَيْكُمْ','Semoga keselamatan atasmu (salam)'],['وَعَلَيْكُمُ السَّلَامُ','Dan atasmu keselamatan (jawaban salam)'],['صَبَاحُ الْخَيْرِ','Selamat pagi'],['صَبَاحُ النُّورِ','Selamat pagi (jawaban)'],['مَسَاءُ الْخَيْرِ','Selamat sore / malam'],['تُصْبِحُ عَلَى خَيْرٍ','Selamat tidur'],['كَيْفَ حَالُكَ','Apa kabarmu?'],['الْحَمْدُ لِلَّهِ','Segala puji bagi Allah'],['بِسْمِ اللَّهِ','Dengan nama Allah'],['إِنْ شَاءَ اللَّهُ','Jika Allah menghendaki'],['مَا شَاءَ اللَّهُ','Atas kehendak Allah (kekaguman)'],['جَزَاكَ اللَّهُ خَيْرًا','Semoga Allah membalasmu dengan kebaikan'],['بَارَكَ اللَّهُ فِيكَ','Semoga Allah memberkahimu'],['لَا بَأْسَ','Tidak apa-apa'],['تَفَضَّلْ','Silakan'],['مِنْ فَضْلِكَ','Tolong / mohon'],['آسِفٌ','Maaf (saya menyesal)'],['سُبْحَانَ اللَّهِ','Maha Suci Allah'],['أَسْتَغْفِرُ اللَّهَ','Saya memohon ampun kepada Allah'],['مَعَ السَّلَامَةِ','Selamat tinggal / sampai jumpa'],['إِلَى اللِّقَاءِ','Sampai bertemu lagi'],['كُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ','Selamat hari raya / semoga selalu baik'],['شَفَاكَ اللَّهُ','Semoga Allah menyembuhkanmu'],['لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ','Tiada daya dan kekuatan kecuali dengan Allah'],['هَنِيئًا لَكَ','Selamat untukmu']
];

/* ================= PELAJARAN NAHWU & SHOROF ================= */
const Q=(q,o,a)=>({q:q,o:o,a:a});
const NAHWU=[
{t:"Kalimah: Isim, Fi'il, Huruf",ar:'أَقْسَامُ الْكَلِمَةِ',e:'🧱',
intro:"Setiap kalimat bahasa Arab tersusun dari tiga jenis kata (kalimah): isim, fi'il, dan huruf.",
pts:["<b>Isim</b> = kata benda (orang, benda, tempat, sifat). Tanda isim: bertanwin, berawalan ال, didahului huruf jar, dan bisa menjadi mudhaf.","<b>Fi'il</b> = kata kerja yang terikat waktu. Tanda fi'il: didahului قَدْ, سَ atau سَوْفَ, diakhiri ta' ta'nits sakinah (ـتْ) atau ta' fa'il (ـتُ).","<b>Huruf</b> = kata yang maknanya baru jelas bila bergabung dengan kata lain, misalnya فِي، مِنْ، عَلَى، هَلْ.","<b>Kalam mufid</b> (kalimat sempurna) minimal terdiri dari dua unsur: mubtada' + khabar, atau fi'il + fa'il."],
tbl:{h:['Jenis','Contoh','Tanda'],r:[['Isim','كِتَابٌ - الْبَيْتُ','Tanwin, ال, huruf jar'],["Fi'il",'كَتَبَ - يَكْتُبُ','قَدْ، سَ، ـتْ'],['Huruf','فِي - مِنْ - هَلْ','Tidak punya tanda isim/fi\'il']]},
ex:[{ar:'قَدْ ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ',id:"Siswa itu telah pergi ke sekolah (قَدْ + fi'il, إِلَى huruf, الطَّالِبُ isim)"},{ar:'الْوَلَدُ يَقْرَأُ فِي الْبَيْتِ',id:"Anak itu membaca di rumah"}],
q:[Q("Kata كِتَابٌ termasuk jenis kalimah apa?",["Isim","Fi'il","Huruf","Jumlah"],0),Q("Manakah yang termasuk huruf?",["فِي","كَتَبَ","مَدْرَسَةٌ","طَالِبٌ"],0),Q("Tanda fi'il yang benar adalah...",["Bertanwin","Didahului قَدْ","Berawalan ال","Didahului huruf jar"],1)]},

{t:"Ma'rifah dan Nakirah",ar:'الْمَعْرِفَةُ وَالنَّكِرَةُ',e:'🔎',
intro:"Isim terbagi menjadi nakirah (umum/belum tentu) dan ma'rifah (khusus/sudah tertentu).",
pts:["<b>Nakirah</b> = isim yang menunjuk sesuatu secara umum, biasanya bertanwin: كِتَابٌ (sebuah buku).","<b>Ma'rifah</b> = isim yang menunjuk sesuatu tertentu: الْكِتَابُ (buku itu).","Ma'rifah ada 6: dhamir, 'alam (nama), isim isyarah, isim maushul, isim berawalan ال, dan mudhaf kepada ma'rifah.","Ciri praktis: kata berawalan ال tidak boleh bertanwin."],
tbl:{h:["Macam Ma'rifah",'Contoh'],r:[['Dhamir','أَنَا - هُوَ'],["'Alam (nama)",'أَحْمَدُ - مَكَّةُ'],['Isim isyarah','هَذَا - تِلْكَ'],['Isim maushul','الَّذِي'],['Berawalan ال','الْبَيْتُ'],['Mudhaf ke ma\'rifah','بَيْتُ أَحْمَدَ']]},
ex:[{ar:'هَذَا قَلَمٌ، وَالْقَلَمُ أَزْرَقُ',id:"Ini sebuah pena (nakirah), dan pena itu biru (ma'rifah)"}],
q:[Q("Manakah yang nakirah?",["قَلَمٌ","الْقَلَمُ","هَذَا","أَنَا"],0),Q("Kata الْبَيْتُ adalah...",["Ma'rifah","Nakirah","Fi'il","Huruf"],0),Q("Dhamir termasuk jenis...",["Ma'rifah","Nakirah","Fi'il","Mashdar"],0)]},

{t:"I'rab dan Tanda-tandanya",ar:'الْإِعْرَابُ وَعَلَامَاتُهُ',e:'🎚️',
intro:"I'rab adalah perubahan akhir kata karena perbedaan fungsinya dalam kalimat. Ada 4 keadaan: rafa', nashab, jar, dan jazm.",
pts:["<b>Marfu'</b> (rafa') tanda asli dhammah. Untuk isim dan fi'il mudhari'.","<b>Manshub</b> (nashab) tanda asli fathah. Untuk isim dan fi'il mudhari'.","<b>Majrur</b> (jar) tanda asli kasrah. Khusus isim.","<b>Majzum</b> (jazm) tanda asli sukun. Khusus fi'il mudhari'.","Tanda pengganti (far'iyah): marfu' dengan wawu (الْمُسْلِمُونَ), alif (الْكِتَابَانِ), nun (يَكْتُبُونَ); manshub dengan ya', alif, kasrah (الْمُسْلِمَاتِ), dan hapus nun; majrur dengan ya' atau fathah (untuk isim ghairu munsharif); majzum dengan hapus nun atau hapus huruf illat."],
tbl:{h:['I\'rab','Tanda asli','Contoh'],r:[["Marfu'",'Dhammah','جَاءَ الطَّالِبُ'],['Manshub','Fathah','رَأَيْتُ الطَّالِبَ'],['Majrur','Kasrah','مَرَرْتُ بِالطَّالِبِ'],['Majzum','Sukun','لَمْ يَكْتُبْ']]},
ex:[{ar:'جَاءَ الْمُسْلِمُونَ',id:"Orang-orang muslim datang (marfu' dengan wawu)"},{ar:'رَأَيْتُ الْمُسْلِمِينَ',id:"Saya melihat orang-orang muslim (manshub dengan ya')"},{ar:'سَلَّمْتُ عَلَى الْمُسْلِمِينَ',id:"Saya memberi salam kepada orang-orang muslim (majrur dengan ya')"}],
q:[Q("Tanda asli i'rab nashab adalah...",["Fathah","Dhammah","Kasrah","Sukun"],0),Q("I'rab yang khusus untuk isim adalah...",["Jar","Jazm","Keduanya","Tidak ada"],0),Q("Jamak mudzakkar salim marfu' ditandai dengan...",["Wawu","Alif","Fathah","Sukun"],0),Q("I'rab yang khusus untuk fi'il mudhari' adalah...",["Jazm","Jar","Rafa'","Nashab"],0)]},

{t:"Jumlah Ismiyyah (Mubtada' & Khabar)",ar:'الْجُمْلَةُ الِاسْمِيَّةُ',e:'🏛️',
intro:"Jumlah ismiyyah adalah kalimat yang diawali isim. Unsurnya: mubtada' (subjek) dan khabar (predikat).",
pts:["Mubtada' dan khabar keduanya <b>marfu'</b>.","Mubtada' biasanya <b>ma'rifah</b>, khabar biasanya <b>nakirah</b>.","Khabar menyesuaikan mubtada' dalam jenis (mudzakkar/muannats) dan jumlah (mufrad/mutsanna/jamak).","Khabar bisa berupa mufrad, jumlah, atau syibhul jumlah (jar majrur / zharaf)."],
tbl:{h:["Mubtada'",'Khabar','Arti'],r:[['الطَّالِبُ','مُجْتَهِدٌ','Siswa itu tekun'],['الطَّالِبَةُ','مُجْتَهِدَةٌ','Siswi itu tekun'],['الطَّالِبَانِ','مُجْتَهِدَانِ','Dua siswa itu tekun'],['الطُّلَّابُ','مُجْتَهِدُونَ','Para siswa itu tekun'],['الْكِتَابُ','عَلَى الْمَكْتَبِ','Buku itu di atas meja']]},
ex:[{ar:'الْبَيْتُ كَبِيرٌ',id:'Rumah itu besar'},{ar:'الْمُعَلِّمَةُ مَاهِرَةٌ',id:'Guru perempuan itu terampil'},{ar:'الْكِتَابُ عَلَى الْمَكْتَبِ',id:'Buku itu di atas meja'}],
q:[Q("I'rab mubtada' dan khabar adalah...",["Keduanya marfu'","Mubtada' marfu', khabar manshub","Keduanya manshub","Keduanya majrur"],0),Q("Khabar untuk الطَّالِبَةُ yang benar adalah...",["مُجْتَهِدَةٌ","مُجْتَهِدٌ","مُجْتَهِدُونَ","مُجْتَهِدَانِ"],0),Q("Jumlah ismiyyah diawali dengan...",["Isim","Fi'il","Huruf jar","Fa'il"],0)]},

{t:"Jumlah Fi'liyyah (Fi'il, Fa'il, Maf'ul)",ar:'الْجُمْلَةُ الْفِعْلِيَّةُ',e:'⚙️',
intro:"Jumlah fi'liyyah diawali fi'il. Unsurnya: fi'il, fa'il (pelaku), dan maf'ul bih (objek).",
pts:["<b>Fa'il</b> selalu marfu'.","<b>Maf'ul bih</b> selalu manshub.","Urutan lazim: fi'il + fa'il + maf'ul bih.","Jika fa'il isim zhahir (bukan dhamir), fi'il tetap <b>mufrad</b> walau fa'ilnya jamak: كَتَبَ الطُّلَّابُ.","Fi'il menyesuaikan jenis fa'il: كَتَبَ الطَّالِبُ, كَتَبَتِ الطَّالِبَةُ."],
tbl:{h:["Fi'il",'Fa\'il','Maf\'ul bih','Arti'],r:[['كَتَبَ','الطَّالِبُ','الدَّرْسَ','Siswa menulis pelajaran'],['قَرَأَ','أَحْمَدُ','الْكِتَابَ','Ahmad membaca buku'],['يَشْرَبُ','الْوَلَدُ','الْحَلِيبَ','Anak minum susu'],['فَتَحَتْ','الْبِنْتُ','النَّافِذَةَ','Anak perempuan membuka jendela']]},
ex:[{ar:'كَتَبَ الطَّالِبُ الدَّرْسَ',id:'Siswa itu menulis pelajaran'},{ar:'كَتَبَتِ الطَّالِبَةُ الْوَاجِبَ',id:'Siswi itu menulis PR'},{ar:'ذَهَبَ الطُّلَّابُ إِلَى الْمَسْجِدِ',id:'Para siswa pergi ke masjid'}],
q:[Q("I'rab fa'il adalah...",["Marfu'","Manshub","Majrur","Majzum"],0),Q("I'rab maf'ul bih adalah...",["Manshub","Marfu'","Majrur","Majzum"],0),Q("Jika fa'il berupa isim zhahir jamak, fi'ilnya...",["Tetap mufrad","Harus jamak","Harus mutsanna","Dibuang"],0)]},

{t:"Idhafah (Mudhaf & Mudhaf Ilaih)",ar:'الْإِضَافَةُ',e:'🔗',
intro:"Idhafah adalah rangkaian dua isim yang menyatakan kepemilikan atau keterkaitan. Contoh: كِتَابُ الطَّالِبِ (bukunya siswa).",
pts:["Isim pertama = <b>mudhaf</b>. Tidak boleh bertanwin dan tidak berawalan ال. I'rabnya mengikuti kedudukannya dalam kalimat.","Isim kedua = <b>mudhaf ilaih</b>. Selalu <b>majrur</b>.","Mudhaf kepada ma'rifah menjadi ma'rifah: بَيْتُ أَحْمَدَ.","Untuk memiliki: pakai dhamir muttashil: كِتَابِي (bukuku), كِتَابُكَ (bukumu)."],
tbl:{h:['Mudhaf','Mudhaf ilaih','Arti'],r:[['كِتَابُ','الطَّالِبِ','Buku siswa'],['بَابُ','الْبَيْتِ','Pintu rumah'],['مُدِيرُ','الْمَدْرَسَةِ','Kepala sekolah'],['قَلَمُ','أَخِي','Pena saudaraku']]},
ex:[{ar:'هَذَا كِتَابُ الطَّالِبِ',id:'Ini buku siswa'},{ar:'ذَهَبْتُ إِلَى بَيْتِ الْمُعَلِّمِ',id:'Saya pergi ke rumah guru'}],
q:[Q("I'rab mudhaf ilaih adalah...",["Majrur","Marfu'","Manshub","Majzum"],0),Q("Mudhaf tidak boleh...",["Bertanwin dan berawalan ال","Marfu'","Berupa isim","Berupa nama"],0),Q("Bentuk idhafah yang benar adalah...",["بَابُ الْبَيْتِ","الْبَابُ الْبَيْتِ","بَابٌ الْبَيْتِ","بَابُ بَيْتٌ"],0)]},

{t:"Na'at dan Man'ut (Sifat)",ar:'النَّعْتُ وَالْمَنْعُوتُ',e:'🎀',
intro:"Na'at (sifat) menjelaskan man'ut (yang disifati). Letaknya setelah man'ut.",
pts:["Na'at mengikuti man'ut dalam <b>4 hal</b>: i'rab, ma'rifah/nakirah, mufrad/mutsanna/jamak, dan mudzakkar/muannats.","Contoh nakirah: كِتَابٌ جَدِيدٌ. Contoh ma'rifah: الْكِتَابُ الْجَدِيدُ.","Perbedaan dengan jumlah ismiyyah: الْكِتَابُ جَدِيدٌ (kalimat) vs الْكِتَابُ الْجَدِيدُ (frasa)."],
tbl:{h:["Man'ut + Na'at",'Arti'],r:[['كِتَابٌ جَدِيدٌ','Sebuah buku baru'],['الْكِتَابُ الْجَدِيدُ','Buku yang baru itu'],['طَالِبَةٌ مُجْتَهِدَةٌ','Siswi yang tekun'],['رَأَيْتُ طَالِبًا مُجْتَهِدًا','Saya melihat siswa tekun'],['ذَهَبْتُ إِلَى الْمَدْرَسَةِ الْكَبِيرَةِ','Saya pergi ke sekolah besar']]},
ex:[{ar:'هَذِهِ سَيَّارَةٌ جَدِيدَةٌ',id:'Ini mobil baru'},{ar:'قَرَأْتُ الْكِتَابَ الْمُفِيدَ',id:'Saya membaca buku yang bermanfaat'}],
q:[Q("Na'at harus mengikuti man'ut dalam berapa hal?",["4","2","3","1"],0),Q("Manakah yang berupa kalimat (jumlah ismiyyah), bukan frasa?",["الْكِتَابُ جَدِيدٌ","الْكِتَابُ الْجَدِيدُ","كِتَابٌ جَدِيدٌ","الْبَيْتُ الْكَبِيرُ"],0),Q("Bentuk yang benar untuk 'siswi yang tekun' adalah...",["طَالِبَةٌ مُجْتَهِدَةٌ","طَالِبَةٌ مُجْتَهِدٌ","طَالِبٌ مُجْتَهِدَةٌ","طَالِبَةٌ مُجْتَهِدُونَ"],0)]},

{t:"Huruf Jar dan Majrur",ar:'حُرُوفُ الْجَرِّ',e:'📌',
intro:"Huruf jar membuat isim sesudahnya menjadi majrur. Bersama majrurnya disebut jar majrur (syibhul jumlah).",
pts:["Huruf jar utama: مِنْ (dari), إِلَى (ke), عَنْ (tentang/dari), عَلَى (di atas), فِي (di dalam), بِ (dengan/di), لِ (untuk/milik), كَ (seperti).","Huruf lain: حَتَّى (sampai), رُبَّ (barangkali banyak), مُنْذُ dan مُذْ (sejak).","Isim setelah huruf jar harus majrur dengan kasrah (atau tanda penggantinya)."],
tbl:{h:['Huruf jar','Contoh','Arti'],r:[['مِنْ','مِنَ الْبَيْتِ','Dari rumah'],['إِلَى','إِلَى الْمَدْرَسَةِ','Ke sekolah'],['فِي','فِي الْفَصْلِ','Di dalam kelas'],['عَلَى','عَلَى الْكُرْسِيِّ','Di atas kursi'],['عَنْ','عَنِ الدَّرْسِ','Tentang pelajaran'],['بِ','بِالْقَلَمِ','Dengan pena'],['لِ','لِلْمُعَلِّمِ','Untuk guru']]},
ex:[{ar:'جَلَسَ الْوَلَدُ عَلَى الْكُرْسِيِّ',id:'Anak itu duduk di atas kursi'},{ar:'كَتَبْتُ بِالْقَلَمِ',id:'Saya menulis dengan pena'}],
q:[Q("Isim setelah huruf jar berstatus...",["Majrur","Marfu'","Manshub","Majzum"],0),Q("Arti إِلَى adalah...",["Ke","Dari","Di atas","Tentang"],0),Q("Manakah huruf jar?",["عَلَى","هَلْ","ثُمَّ","لَنْ"],0)]},

{t:"Dhamir (Kata Ganti)",ar:'الضَّمَائِرُ',e:'🙋',
intro:"Dhamir adalah kata ganti. Ada yang berdiri sendiri (munfashil) dan yang bersambung (muttashil).",
pts:["<b>Munfashil</b> berdiri sendiri, biasanya jadi mubtada': أَنَا طَالِبٌ.","<b>Muttashil</b> menempel pada kata lain: كِتَابُهُ (bukunya), كَتَبْتُ (aku menulis), رَأَيْتُكَ (aku melihatmu).","Pada fi'il madhi, dhamir muttashil menjadi fa'il: كَتَبْتُ، كَتَبْنَا.","Pada isim, dhamir muttashil menjadi mudhaf ilaih: بَيْتِي، بَيْتُكَ.","Pada fi'il, dhamir muttashil menjadi maf'ul: رَآنِي، رَآكَ، رَآهُ."],
tbl:{h:['Orang','Munfashil','Muttashil (pada isim)'],r:[['Saya','أَنَا','ـِي'],['Kami','نَحْنُ','ـنَا'],['Kamu (lk)','أَنْتَ','ـكَ'],['Kamu (pr)','أَنْتِ','ـكِ'],['Kalian (lk)','أَنْتُمْ','ـكُمْ'],['Dia (lk)','هُوَ','ـهُ'],['Dia (pr)','هِيَ','ـهَا'],['Mereka (lk)','هُمْ','ـهُمْ'],['Mereka (pr)','هُنَّ','ـهُنَّ']]},
ex:[{ar:'هَذَا كِتَابِي وَذَلِكَ كِتَابُكَ',id:'Ini bukuku dan itu bukumu'},{ar:'أَنَا أُحِبُّهُ وَهُوَ يُحِبُّنِي',id:'Aku menyukainya dan dia menyukaiku'}],
q:[Q("Dhamir untuk 'dia (perempuan)' yang berdiri sendiri adalah...",["هِيَ","هُوَ","هُنَّ","أَنْتِ"],0),Q("Bentuk 'bukunya (laki-laki)' adalah...",["كِتَابُهُ","كِتَابُهَا","كِتَابِي","كِتَابُكَ"],0),Q("Dhamir muttashil pada isim berkedudukan sebagai...",["Mudhaf ilaih","Fa'il","Mubtada'","Khabar"],0)]},

{t:"Isim Isyarah (Kata Tunjuk)",ar:'أَسْمَاءُ الْإِشَارَةِ',e:'👉',
intro:"Isim isyarah dipakai untuk menunjuk benda yang dekat atau jauh.",
pts:["Dekat: هَذَا (ini, lk), هَذِهِ (ini, pr), هَذَانِ / هَذَيْنِ (dua ini, lk), هَاتَانِ / هَاتَيْنِ (dua ini, pr), هَؤُلَاءِ (ini, jamak).","Jauh: ذَلِكَ (itu, lk), تِلْكَ (itu, pr), أُولَئِكَ (itu, jamak).","Isim isyarah adalah ma'rifah. Jika setelahnya ada isim ber-ال, itu menjadi na'at/badal: هَذَا الْكِتَابُ.","Jika setelahnya nakirah, kalimat menjadi jumlah ismiyyah: هَذَا كِتَابٌ."],
tbl:{h:['Jarak','Mudzakkar','Muannats'],r:[['Dekat (mufrad)','هَذَا','هَذِهِ'],['Dekat (mutsanna)','هَذَانِ','هَاتَانِ'],['Dekat (jamak)','هَؤُلَاءِ','هَؤُلَاءِ'],['Jauh (mufrad)','ذَلِكَ','تِلْكَ'],['Jauh (jamak)','أُولَئِكَ','أُولَئِكَ']]},
ex:[{ar:'هَذَا كِتَابٌ وَهَذِهِ مَسْطَرَةٌ',id:'Ini buku dan ini penggaris'},{ar:'تِلْكَ الشَّجَرَةُ كَبِيرَةٌ',id:'Pohon itu besar'},{ar:'هَؤُلَاءِ طُلَّابٌ',id:'Mereka ini siswa-siswa'}],
q:[Q("Kata tunjuk 'itu' untuk muannats adalah...",["تِلْكَ","ذَلِكَ","هَذِهِ","هَذَا"],0),Q("Kata tunjuk jamak dekat adalah...",["هَؤُلَاءِ","أُولَئِكَ","هَذَانِ","هَاتَانِ"],0),Q("هَذَا + كِتَابٌ (nakirah) membentuk...",["Jumlah ismiyyah","Frasa na'at","Jumlah fi'liyyah","Idhafah"],0)]},

{t:"Isim Maushul (Kata Penghubung)",ar:'الْأَسْمَاءُ الْمَوْصُولَةُ',e:'🪢',
intro:"Isim maushul berarti 'yang'. Ia butuh shilah (kalimat penjelas) dan 'a'id (dhamir yang kembali ke maushul).",
pts:["Mudzakkar: الَّذِي. Muannats: الَّتِي.","Mutsanna mudzakkar: اللَّذَانِ / اللَّذَيْنِ. Mutsanna muannats: اللَّتَانِ / اللَّتَيْنِ.","Jamak mudzakkar: الَّذِينَ. Jamak muannats: اللَّاتِي / اللَّوَاتِي.","مَنْ untuk manusia ('siapa yang'), مَا untuk selain manusia ('apa yang').","Shilah berupa jumlah (kalimat), diletakkan sesudah maushul."],
tbl:{h:['Bentuk','Mudzakkar','Muannats'],r:[['Mufrad','الَّذِي','الَّتِي'],['Mutsanna','اللَّذَانِ','اللَّتَانِ'],['Jamak','الَّذِينَ','اللَّاتِي']]},
ex:[{ar:'جَاءَ الطَّالِبُ الَّذِي نَجَحَ',id:'Siswa yang lulus itu datang'},{ar:'هَذِهِ الْبِنْتُ الَّتِي تَقْرَأُ',id:'Ini anak perempuan yang sedang membaca'},{ar:'رَأَيْتُ الطُّلَّابَ الَّذِينَ يَلْعَبُونَ',id:'Saya melihat para siswa yang sedang bermain'}],
q:[Q("'Yang' untuk perempuan tunggal adalah...",["الَّتِي","الَّذِي","الَّذِينَ","اللَّذَانِ"],0),Q("'Yang' untuk jamak laki-laki adalah...",["الَّذِينَ","الَّتِي","الَّذِي","اللَّاتِي"],0),Q("Isim maushul harus diikuti...",["Shilah","Na'at","Mudhaf","Tamyiz"],0)]},

{t:"Kana dan Saudaranya",ar:'كَانَ وَأَخَوَاتُهَا',e:'🔁',
intro:"Kana dan saudaranya masuk ke jumlah ismiyyah dan mengubah i'rab khabarnya.",
pts:["Mubtada' menjadi <b>isim kana</b> (tetap marfu').","Khabar menjadi <b>khabar kana</b> (menjadi manshub).","Anggota: كَانَ (adalah/telah), أَصْبَحَ (menjadi di pagi hari), أَمْسَى (menjadi di sore hari), ظَلَّ (tetap), بَاتَ (bermalam/menjadi), صَارَ (menjadi), لَيْسَ (bukan), مَا زَالَ (masih).","Contoh perubahan: الْجَوُّ جَمِيلٌ → كَانَ الْجَوُّ جَمِيلًا."],
tbl:{h:['Kalimat awal','Setelah kana','Arti'],r:[['الْجَوُّ جَمِيلٌ','كَانَ الْجَوُّ جَمِيلًا','Cuaca dulu indah'],['الْوَلَدُ نَشِيطٌ','أَصْبَحَ الْوَلَدُ نَشِيطًا','Anak itu menjadi rajin'],['الْكِتَابُ قَدِيمٌ','لَيْسَ الْكِتَابُ قَدِيمًا','Buku itu tidak lama'],['الطَّالِبُ مُجْتَهِدٌ','مَا زَالَ الطَّالِبُ مُجْتَهِدًا','Siswa itu masih tekun']]},
ex:[{ar:'كَانَ الطَّقْسُ بَارِدًا',id:'Cuaca dulu dingin'},{ar:'صَارَ الْمَاءُ بَارِدًا',id:'Air itu menjadi dingin'}],
q:[Q("Khabar kana berstatus...",["Manshub","Marfu'","Majrur","Majzum"],0),Q("Isim kana berstatus...",["Marfu'","Manshub","Majrur","Majzum"],0),Q("Manakah yang bermakna 'bukan'?",["لَيْسَ","كَانَ","صَارَ","ظَلَّ"],0)]},

{t:"Inna dan Saudaranya",ar:'إِنَّ وَأَخَوَاتُهَا',e:'🔄',
intro:"Inna dan saudaranya masuk ke jumlah ismiyyah. Kebalikan kana: isimnya manshub, khabarnya tetap marfu'.",
pts:["Mubtada' menjadi <b>isim inna</b> (manshub).","Khabar menjadi <b>khabar inna</b> (tetap marfu').","إِنَّ dan أَنَّ = sesungguhnya (penegas), كَأَنَّ = seakan-akan, لَكِنَّ = tetapi, لَيْتَ = andai saja, لَعَلَّ = semoga/barangkali.","Contoh: الْبَيْتُ كَبِيرٌ → إِنَّ الْبَيْتَ كَبِيرٌ."],
tbl:{h:['Huruf','Arti','Contoh'],r:[['إِنَّ','Sesungguhnya','إِنَّ اللَّهَ غَفُورٌ'],['كَأَنَّ','Seakan-akan','كَأَنَّ الْوَلَدَ أَسَدٌ'],['لَكِنَّ','Tetapi','لَكِنَّ الْمَدْرَسَةَ بَعِيدَةٌ'],['لَيْتَ','Andai saja','لَيْتَ الْوَقْتَ طَوِيلٌ'],['لَعَلَّ','Semoga','لَعَلَّ الطَّقْسَ جَمِيلٌ']]},
ex:[{ar:'إِنَّ الْعِلْمَ نُورٌ',id:'Sesungguhnya ilmu itu cahaya'},{ar:'لَعَلَّ الطَّالِبَ نَاجِحٌ',id:'Semoga siswa itu lulus'}],
q:[Q("Isim inna berstatus...",["Manshub","Marfu'","Majrur","Majzum"],0),Q("Khabar inna berstatus...",["Marfu'","Manshub","Majrur","Majzum"],0),Q("Arti لَيْتَ adalah...",["Andai saja","Sesungguhnya","Tetapi","Seakan-akan"],0)]},

{t:"Fi'il Mudhari': Marfu', Manshub, Majzum",ar:'إِعْرَابُ الْفِعْلِ الْمُضَارِعِ',e:'🎯',
intro:"Fi'il mudhari' pada dasarnya marfu'. Ia berubah manshub atau majzum bila didahului alat tertentu.",
pts:["<b>Marfu'</b> (tanpa alat): يَكْتُبُ.","<b>Manshub</b> setelah أَنْ، لَنْ، كَيْ، إِذَنْ، لِ (ta'lil): لَنْ يَكْتُبَ.","<b>Majzum</b> setelah لَمْ، لَمَّا، لَا (larangan), لِ (perintah), إِنْ: لَمْ يَكْتُبْ.","Tanda: manshub = fathah (atau hapus nun), majzum = sukun (atau hapus nun / huruf illat)."],
tbl:{h:['Alat','Contoh','Hukum'],r:[['أَنْ','أُرِيدُ أَنْ أَقْرَأَ','Manshub'],['لَنْ','لَنْ أَنْسَى','Manshub'],['كَيْ','ذَهَبْتُ كَيْ أَتَعَلَّمَ','Manshub'],['لَمْ','لَمْ يَحْضُرِ الطَّالِبُ','Majzum'],['لَا (nahi)','لَا تَكْسَلْ','Majzum'],['لِ (amr)','لِيَكْتُبْ','Majzum']]},
ex:[{ar:'لَنْ يَذْهَبَ الْوَلَدُ',id:'Anak itu tidak akan pergi'},{ar:'لَمْ يَذْهَبِ الْوَلَدُ',id:'Anak itu belum/tidak pergi'},{ar:'لَا تَذْهَبْ',id:'Jangan pergi'}],
q:[Q("Fi'il mudhari' setelah لَنْ adalah...",["Manshub","Marfu'","Majzum","Majrur"],0),Q("Fi'il mudhari' setelah لَمْ adalah...",["Majzum","Manshub","Marfu'","Majrur"],0),Q("Mudhari' tanpa alat apa pun berstatus...",["Marfu'","Manshub","Majzum","Majrur"],0),Q("Larangan (nahi) memakai...",["لَا","لَنْ","لَمْ","أَنْ"],0)]},

{t:"Kalimat Tanya dan Negasi",ar:'الِاسْتِفْهَامُ وَالنَّفْيُ',e:'❓',
intro:"Bahasa Arab memakai alat khusus untuk bertanya dan menafikan.",
pts:["<b>Tanya ya/tidak</b>: هَلْ dan أَ. Jawab: نَعَمْ (ya) atau لَا (tidak).","<b>Tanya isi</b>: مَنْ (siapa), مَا / مَاذَا (apa), أَيْنَ (di mana), مَتَى (kapan), كَيْفَ (bagaimana), كَمْ (berapa), لِمَاذَا (mengapa), أَيُّ (yang mana).","<b>Negasi</b>: مَا dan لَا untuk fi'il, لَيْسَ untuk jumlah ismiyyah, لَمْ untuk lampau (dengan mudhari' majzum), لَنْ untuk masa depan.","هَلْ tidak dipakai bersama أَمْ muttashilah; أَ boleh untuk dua pilihan."],
tbl:{h:['Alat','Contoh','Arti'],r:[['هَلْ','هَلْ أَنْتَ طَالِبٌ؟','Apakah kamu siswa?'],['مَنْ','مَنْ هَذَا؟','Siapa ini?'],['أَيْنَ','أَيْنَ الْمَدْرَسَةُ؟','Di mana sekolah?'],['كَمْ','كَمْ كِتَابًا عِنْدَكَ؟','Berapa buku yang kamu punya?'],['لَيْسَ','لَيْسَ الْكِتَابُ جَدِيدًا','Buku itu tidak baru'],['مَا','مَا ذَهَبَ الْوَلَدُ','Anak itu tidak pergi']]},
ex:[{ar:'هَلْ أَنْتَ طَالِبٌ؟ نَعَمْ، أَنَا طَالِبٌ',id:'Apakah kamu siswa? Ya, saya siswa'},{ar:'لِمَاذَا تَدْرُسُ الْعَرَبِيَّةَ؟',id:'Mengapa kamu belajar bahasa Arab?'}],
q:[Q("Alat tanya untuk 'apakah' adalah...",["هَلْ","مَنْ","أَيْنَ","كَيْفَ"],0),Q("Arti مَتَى adalah...",["Kapan","Siapa","Di mana","Berapa"],0),Q("Negasi untuk jumlah ismiyyah adalah...",["لَيْسَ","لَمْ","لَنْ","هَلْ"],0)]},

{t:"Hal dan Tamyiz",ar:'الْحَالُ وَالتَّمْيِيزُ',e:'🎭',
intro:"Hal dan tamyiz adalah dua isim nakirah manshub yang memberi penjelasan tambahan.",
pts:["<b>Hal</b> = menjelaskan keadaan pelaku/objek saat perbuatan terjadi (menjawab 'dalam keadaan bagaimana?'). Nakirah, manshub: جَاءَ الطَّالِبُ ضَاحِكًا.","<b>Tamyiz</b> = menjelaskan sesuatu yang samar (angka, takaran, ukuran). Nakirah, manshub: اِشْتَرَيْتُ عِشْرِينَ كِتَابًا.","Hal biasanya musytaq (sifat), tamyiz biasanya jamid (kata benda).","Keduanya harus <b>manshub</b> dan <b>nakirah</b>."],
tbl:{h:['Jenis','Contoh','Arti'],r:[['Hal','جَاءَ الطَّالِبُ ضَاحِكًا','Siswa datang sambil tertawa'],['Hal','رَجَعَ الْوَلَدُ مَسْرُورًا','Anak pulang dalam keadaan gembira'],['Tamyiz','عِنْدِي عِشْرُونَ كِتَابًا','Aku punya dua puluh buku'],['Tamyiz','فِي الْفَصْلِ ثَلَاثُونَ طَالِبًا','Di kelas ada tiga puluh siswa']]},
ex:[{ar:'دَخَلَ الْمُعَلِّمُ مُبْتَسِمًا',id:'Guru masuk sambil tersenyum'},{ar:'اِشْتَرَيْتُ خَمْسِينَ قَلَمًا',id:'Saya membeli lima puluh pena'}],
q:[Q("I'rab hal adalah...",["Manshub","Marfu'","Majrur","Majzum"],0),Q("Tamyiz menjelaskan...",["Sesuatu yang samar","Pelaku","Tempat","Waktu"],0),Q("Hal berbentuk...",["Nakirah","Ma'rifah","Fi'il","Huruf"],0)]},

{t:"Bilangan ('Adad)",ar:'الْعَدَدُ وَالْمَعْدُودُ',e:'🔢',
intro:"Penggunaan bilangan dalam bahasa Arab punya aturan khusus terhadap jenis benda yang dihitung (ma'dud).",
pts:["Angka 1 dan 2 <b>sesuai</b> jenis ma'dud: كِتَابٌ وَاحِدٌ، طَالِبَةٌ وَاحِدَةٌ، كِتَابَانِ اثْنَانِ.","Angka 3 sampai 10 <b>berlawanan</b> jenis dengan ma'dud: ثَلَاثَةُ كُتُبٍ (kitab mudzakkar, angka pakai ta'), ثَلَاثُ طَالِبَاتٍ (muannats, angka tanpa ta').","Ma'dud untuk 3 sampai 10 berupa jamak majrur (mudhaf ilaih).","Ma'dud untuk 11 sampai 99 berupa mufrad manshub (tamyiz)."],
tbl:{h:["Ma'dud",'Angka','Arti'],r:[['كِتَابٌ (mudzakkar)','ثَلَاثَةُ كُتُبٍ','3 buku'],['طَالِبَةٌ (muannats)','ثَلَاثُ طَالِبَاتٍ','3 siswi'],['قَلَمٌ (mudzakkar)','أَرْبَعَةُ أَقْلَامٍ','4 pena'],['سَيَّارَةٌ (muannats)','خَمْسُ سَيَّارَاتٍ','5 mobil'],['رَجُلٌ (mudzakkar)','عَشَرَةُ رِجَالٍ','10 laki-laki'],['بِنْتٌ (muannats)','عَشْرُ بَنَاتٍ','10 anak perempuan']]},
ex:[{ar:'عِنْدِي ثَلَاثَةُ كُتُبٍ وَخَمْسُ مَجَلَّاتٍ',id:'Saya punya tiga buku dan lima majalah'}],
q:[Q("Angka 3 sampai 10 jenisnya...",["Berlawanan dengan ma'dud","Sama dengan ma'dud","Selalu mudzakkar","Selalu muannats"],0),Q("Bentuk benar untuk '3 siswi' adalah...",["ثَلَاثُ طَالِبَاتٍ","ثَلَاثَةُ طَالِبَاتٍ","ثَلَاثَةُ طَالِبَةٍ","ثَلَاثُ طَالِبٍ"],0),Q("Ma'dud untuk 3 sampai 10 berupa...",["Jamak majrur","Mufrad manshub","Mufrad marfu'","Mutsanna"],0)]}
];

const SHOROF=[
{t:"Pengantar Shorof dan Wazan",ar:'مُقَدِّمَةُ الصَّرْفِ وَالْمِيزَانِ',e:'⚖️',
intro:"Shorof mempelajari perubahan bentuk kata. Setiap kata punya wazan (timbangan) memakai kerangka ف ع ل.",
pts:["Huruf asli kata disebut: <b>ف</b> (fa' fi'il), <b>ع</b> ('ain fi'il), <b>ل</b> (lam fi'il).","Kata كَتَبَ berwazan فَعَلَ. Kata كَاتِبٌ berwazan فَاعِلٌ. Kata مَكْتُوبٌ berwazan مَفْعُولٌ.","Tashrif istilahi: perubahan satu kata dasar menjadi bentuk madhi, mudhari', mashdar, isim fa'il, isim maf'ul, amr, dan nahi.","Fi'il tsulatsi = fi'il yang huruf aslinya tiga."],
tbl:{h:["Madhi","Mudhari'","Mashdar","Isim Fa'il","Isim Maf'ul","Amr","Nahi"],r:[['كَتَبَ','يَكْتُبُ','كِتَابَةٌ','كَاتِبٌ','مَكْتُوبٌ','اُكْتُبْ','لَا تَكْتُبْ'],['نَصَرَ','يَنْصُرُ','نَصْرٌ','نَاصِرٌ','مَنْصُورٌ','اُنْصُرْ','لَا تَنْصُرْ'],['فَتَحَ','يَفْتَحُ','فَتْحٌ','فَاتِحٌ','مَفْتُوحٌ','اِفْتَحْ','لَا تَفْتَحْ']]},
ex:[{ar:'كَتَبَ يَكْتُبُ كِتَابَةً فَهُوَ كَاتِبٌ وَذَاكَ مَكْتُوبٌ',id:'Menulis, sedang menulis, penulisan; pelakunya penulis, dan itu tertulis'}],
q:[Q("Wazan untuk كَتَبَ adalah...",["فَعَلَ","فَاعِلٌ","مَفْعُولٌ","أَفْعَلُ"],0),Q("Wazan untuk كَاتِبٌ adalah...",["فَاعِلٌ","فَعَلَ","مَفْعُولٌ","فِعَالٌ"],0),Q("Huruf 'ain fi'il adalah...",["ع","ف","ل","ك"],0)]},

{t:"Tashrif Fi'il Madhi",ar:'تَصْرِيفُ الْفِعْلِ الْمَاضِي',e:'⏪',
intro:"Fi'il madhi menunjukkan perbuatan yang sudah terjadi. Ia berubah mengikuti 14 dhamir.",
pts:["Madhi biasanya dasar: fathah pada huruf terakhir (كَتَبَ).","Ia berubah akhirannya menurut dhamir (pelaku): ـَتْ untuk perempuan, ـُوا untuk jamak lk, ـْتُ untuk saya, dst.","Ada 14 bentuk: 6 gaib (dia), 6 mukhathab (kamu), 2 mutakallim (saya/kami)."],
tbl:{h:['Dhamir','Madhi','Arti'],r:[['هُوَ','كَتَبَ','Dia (lk) telah menulis'],['هُمَا','كَتَبَا','Mereka berdua (lk)'],['هُمْ','كَتَبُوا','Mereka (lk)'],['هِيَ','كَتَبَتْ','Dia (pr)'],['هُمَا','كَتَبَتَا','Mereka berdua (pr)'],['هُنَّ','كَتَبْنَ','Mereka (pr)'],['أَنْتَ','كَتَبْتَ','Kamu (lk)'],['أَنْتُمَا','كَتَبْتُمَا','Kalian berdua'],['أَنْتُمْ','كَتَبْتُمْ','Kalian (lk)'],['أَنْتِ','كَتَبْتِ','Kamu (pr)'],['أَنْتُنَّ','كَتَبْتُنَّ','Kalian (pr)'],['أَنَا','كَتَبْتُ','Saya'],['نَحْنُ','كَتَبْنَا','Kami']]},
ex:[{ar:'كَتَبْتُ الدَّرْسَ وَكَتَبَتْ أُخْتِي الْوَاجِبَ',id:'Saya menulis pelajaran dan saudariku menulis PR'}],
q:[Q("Madhi dari كَتَبَ untuk هُمْ adalah...",["كَتَبُوا","كَتَبْنَ","كَتَبَا","كَتَبْتُمْ"],0),Q("Madhi dari كَتَبَ untuk أَنَا adalah...",["كَتَبْتُ","كَتَبْنَا","كَتَبَتْ","كَتَبْتَ"],0),Q("Madhi dari كَتَبَ untuk هِيَ adalah...",["كَتَبَتْ","كَتَبْتِ","كَتَبْنَ","كَتَبَتَا"],0)]},

{t:"Tashrif Fi'il Mudhari'",ar:'تَصْرِيفُ الْفِعْلِ الْمُضَارِعِ',e:'⏩',
intro:"Fi'il mudhari' menunjukkan perbuatan sekarang atau akan datang. Ia diawali salah satu huruf: أ ن ي ت (أَنَيْتُ).",
pts:["Awalan: أ (saya), ن (kami), ي (dia lk / mereka), ت (kamu, dia pr).","Akhiran: ـَانِ untuk mutsanna, ـُونَ untuk jamak lk, ـِينَ untuk mukhathabah, ـْنَ untuk jamak pr.","Dalam keadaan marfu', mudhari' berakhir dhammah atau nun."],
tbl:{h:['Dhamir','Mudhari\'','Arti'],r:[['هُوَ','يَكْتُبُ','Dia (lk) menulis'],['هُمَا','يَكْتُبَانِ','Mereka berdua (lk)'],['هُمْ','يَكْتُبُونَ','Mereka (lk)'],['هِيَ','تَكْتُبُ','Dia (pr)'],['هُمَا','تَكْتُبَانِ','Mereka berdua (pr)'],['هُنَّ','يَكْتُبْنَ','Mereka (pr)'],['أَنْتَ','تَكْتُبُ','Kamu (lk)'],['أَنْتُمَا','تَكْتُبَانِ','Kalian berdua'],['أَنْتُمْ','تَكْتُبُونَ','Kalian (lk)'],['أَنْتِ','تَكْتُبِينَ','Kamu (pr)'],['أَنْتُنَّ','تَكْتُبْنَ','Kalian (pr)'],['أَنَا','أَكْتُبُ','Saya'],['نَحْنُ','نَكْتُبُ','Kami']]},
ex:[{ar:'أَنَا أَكْتُبُ وَهُمْ يَقْرَؤُونَ',id:'Saya menulis dan mereka membaca'}],
q:[Q("Awalan mudhari' untuk 'saya' adalah...",["أ","ن","ي","ت"],0),Q("Mudhari' dari كَتَبَ untuk هُمْ adalah...",["يَكْتُبُونَ","يَكْتُبْنَ","تَكْتُبُونَ","يَكْتُبَانِ"],0),Q("Mudhari' untuk أَنْتِ (kamu pr) adalah...",["تَكْتُبِينَ","تَكْتُبُونَ","تَكْتُبْنَ","تَكْتُبَانِ"],0)]},

{t:"Fi'il Amr dan Nahi",ar:'فِعْلُ الْأَمْرِ وَالنَّهْيِ',e:'📣',
intro:"Fi'il amr = perintah. Nahi = larangan. Keduanya dibentuk dari mudhari' mukhathab.",
pts:["<b>Amr</b>: buang huruf ت mudhari', jazm-kan, lalu tambah hamzah washal jika perlu. Contoh: تَكْتُبُ → اُكْتُبْ.","Hamzah washal mengikuti harakat 'ain mudhari': dhammah jika mudhari' ber-dhammah (اُكْتُبْ), kasrah jika kasrah atau fathah (اِضْرِبْ، اِفْتَحْ).","<b>Nahi</b>: لَا + mudhari' majzum: لَا تَكْتُبْ.","Bentuk bergantung pada orang: mufrad lk (اُكْتُبْ), mutsanna (اُكْتُبَا), jamak lk (اُكْتُبُوا), mufradah (اُكْتُبِي), jamak pr (اُكْتُبْنَ)."],
tbl:{h:['Kepada','Amr','Nahi'],r:[['أَنْتَ','اُكْتُبْ','لَا تَكْتُبْ'],['أَنْتُمَا','اُكْتُبَا','لَا تَكْتُبَا'],['أَنْتُمْ','اُكْتُبُوا','لَا تَكْتُبُوا'],['أَنْتِ','اُكْتُبِي','لَا تَكْتُبِي'],['أَنْتُنَّ','اُكْتُبْنَ','لَا تَكْتُبْنَ']]},
ex:[{ar:'اِفْتَحِ الْبَابَ وَلَا تُغْلِقِ النَّافِذَةَ',id:'Bukalah pintu dan jangan tutup jendela'},{ar:'اُدْخُلْ وَاجْلِسْ',id:'Masuklah dan duduklah'}],
q:[Q("Amr untuk أَنْتَ dari يَكْتُبُ adalah...",["اُكْتُبْ","كَتَبَ","اُكْتُبُوا","لَا تَكْتُبْ"],0),Q("Nahi untuk أَنْتَ dari يَضْرِبُ adalah...",["لَا تَضْرِبْ","اِضْرِبْ","لَمْ يَضْرِبْ","لَنْ تَضْرِبَ"],0),Q("Amr untuk أَنْتُمْ dari كَتَبَ adalah...",["اُكْتُبُوا","اُكْتُبِي","اُكْتُبَا","اُكْتُبْنَ"],0)]},

{t:"Enam Bab Fi'il Tsulatsi Mujarrad",ar:'أَبْوَابُ الثُّلَاثِيِّ الْمُجَرَّدِ',e:'📚',
intro:"Fi'il tsulatsi mujarrad (tiga huruf tanpa tambahan) terbagi menjadi 6 bab menurut harakat 'ain pada madhi dan mudhari'.",
pts:["Cara menghafal: pasangkan harakat 'ain madhi dengan 'ain mudhari'.","Bab 1: فَعَلَ - يَفْعُلُ (fathah-dhammah).","Bab 2: فَعَلَ - يَفْعِلُ (fathah-kasrah).","Bab 3: فَعَلَ - يَفْعَلُ (fathah-fathah, biasanya huruf halaq).","Bab 4: فَعِلَ - يَفْعَلُ (kasrah-fathah).","Bab 5: فَعُلَ - يَفْعُلُ (dhammah-dhammah, biasanya sifat).","Bab 6: فَعِلَ - يَفْعِلُ (kasrah-kasrah, jarang)."],
tbl:{h:['Bab','Wazan','Madhi','Mudhari\''],r:[['1','فَعَلَ يَفْعُلُ','نَصَرَ','يَنْصُرُ'],['2','فَعَلَ يَفْعِلُ','ضَرَبَ','يَضْرِبُ'],['3','فَعَلَ يَفْعَلُ','فَتَحَ','يَفْتَحُ'],['4','فَعِلَ يَفْعَلُ','عَلِمَ','يَعْلَمُ'],['5','فَعُلَ يَفْعُلُ','كَرُمَ','يَكْرُمُ'],['6','فَعِلَ يَفْعِلُ','حَسِبَ','يَحْسِبُ']]},
ex:[{ar:'نَصَرَ يَنْصُرُ، ضَرَبَ يَضْرِبُ، فَتَحَ يَفْتَحُ',id:'Contoh tiga bab pertama'}],
q:[Q("Contoh bab kedua (فَعَلَ يَفْعِلُ) adalah...",["ضَرَبَ يَضْرِبُ","نَصَرَ يَنْصُرُ","فَتَحَ يَفْتَحُ","عَلِمَ يَعْلَمُ"],0),Q("Contoh bab keempat adalah...",["عَلِمَ يَعْلَمُ","كَرُمَ يَكْرُمُ","نَصَرَ يَنْصُرُ","ضَرَبَ يَضْرِبُ"],0),Q("Fi'il bab ke-5 biasanya menunjukkan...",["Sifat","Perbuatan","Tempat","Waktu"],0),Q("Jumlah bab tsulatsi mujarrad adalah...",["6","4","5","8"],0)]},

{t:"Isim Fa'il, Isim Maf'ul, Mashdar",ar:'اسْمُ الْفَاعِلِ وَاسْمُ الْمَفْعُولِ وَالْمَصْدَرُ',e:'🧩',
intro:"Tiga turunan penting dari fi'il tsulatsi: pelaku, yang dikenai, dan nama kejadian.",
pts:["<b>Isim fa'il</b> (pelaku) berwazan فَاعِلٌ: كَاتِبٌ (penulis).","<b>Isim maf'ul</b> (yang dikenai) berwazan مَفْعُولٌ: مَكْتُوبٌ (yang ditulis).","<b>Mashdar</b> (nama perbuatan) bentuknya bervariasi (sima'i): كِتَابَةٌ، قِرَاءَةٌ، ذَهَابٌ، جُلُوسٌ.","Fi'il yang hamzah/mu'tal punya perubahan tambahan: قَرَأَ → قَارِئٌ، مَقْرُوءٌ."],
tbl:{h:["Fi'il",'Isim Fa\'il','Isim Maf\'ul','Mashdar'],r:[['كَتَبَ','كَاتِبٌ','مَكْتُوبٌ','كِتَابَةٌ'],['قَرَأَ','قَارِئٌ','مَقْرُوءٌ','قِرَاءَةٌ'],['ذَهَبَ','ذَاهِبٌ','مَذْهُوبٌ بِهِ','ذَهَابٌ'],['فَتَحَ','فَاتِحٌ','مَفْتُوحٌ','فَتْحٌ'],['حَمَلَ','حَامِلٌ','مَحْمُولٌ','حَمْلٌ'],['دَرَسَ','دَارِسٌ','مَدْرُوسٌ','دِرَاسَةٌ']]},
ex:[{ar:'الْكَاتِبُ يَكْتُبُ، وَالدَّرْسُ مَكْتُوبٌ',id:'Penulis itu menulis dan pelajaran itu tertulis'}],
q:[Q("Isim fa'il dari دَرَسَ adalah...",["دَارِسٌ","مَدْرُوسٌ","دِرَاسَةٌ","اُدْرُسْ"],0),Q("Isim maf'ul dari فَتَحَ adalah...",["مَفْتُوحٌ","فَاتِحٌ","فَتْحٌ","اِفْتَحْ"],0),Q("Mashdar dari كَتَبَ adalah...",["كِتَابَةٌ","كَاتِبٌ","مَكْتُوبٌ","يَكْتُبُ"],0)]},

{t:"Isim Zaman, Makan, dan Alat",ar:'اسْمُ الزَّمَانِ وَالْمَكَانِ وَالْآلَةِ',e:'🏫',
intro:"Dari fi'il tsulatsi kita bisa membentuk nama tempat, waktu, dan alat.",
pts:["<b>Isim makan/zaman</b> (tempat/waktu) berwazan مَفْعَلٌ atau مَفْعِلٌ: مَكْتَبٌ (kantor, tempat menulis), مَلْعَبٌ (lapangan), مَدْرَسَةٌ (sekolah), مَسْجِدٌ (masjid).","<b>Isim alat</b> berwazan مِفْعَلٌ، مِفْعَالٌ، atau مِفْعَلَةٌ: مِفْتَاحٌ (kunci), مِكْنَسَةٌ (sapu), مِسْطَرَةٌ (penggaris), مِقَصٌّ (gunting), مِرْآةٌ (cermin).","Cara kenal praktis: awalan <b>م</b> + fathah/kasrah = tempat/alat."],
tbl:{h:['Akar kata','Isim makan/alat','Arti'],r:[['كَتَبَ','مَكْتَبٌ','Kantor / tempat menulis'],['لَعِبَ','مَلْعَبٌ','Lapangan'],['سَجَدَ','مَسْجِدٌ','Tempat sujud (masjid)'],['فَتَحَ','مِفْتَاحٌ','Kunci (alat membuka)'],['كَنَسَ','مِكْنَسَةٌ','Sapu'],['سَطَرَ','مِسْطَرَةٌ','Penggaris']]},
ex:[{ar:'فَتَحْتُ الْبَابَ بِالْمِفْتَاحِ',id:'Saya membuka pintu dengan kunci'},{ar:'نَلْعَبُ فِي الْمَلْعَبِ',id:'Kami bermain di lapangan'}],
q:[Q("Wazan alat adalah...",["مِفْعَلٌ","فَاعِلٌ","مَفْعُولٌ","فَعَلَ"],0),Q("Kata مَلْعَبٌ berarti...",["Lapangan","Pemain","Mainan","Bermain"],0),Q("مِفْتَاحٌ berasal dari fi'il...",["فَتَحَ","فَهِمَ","فَعَلَ","قَتَلَ"],0)]},

{t:"Mudzakkar dan Muannats",ar:'الْمُذَكَّرُ وَالْمُؤَنَّثُ',e:'⚤',
intro:"Isim Arab punya jenis: mudzakkar (maskulin) dan muannats (feminin).",
pts:["Tanda muannats: <b>ta' marbuthah</b> (ـةٌ), <b>alif maqshurah</b> (ـى), <b>alif mamdudah</b> (ـاءُ).","Muannats haqiqi: jelas perempuan (أُمٌّ، بِنْتٌ). Muannats majazi: tidak bernyawa tetapi dianggap muannats (شَمْسٌ، أَرْضٌ).","Beberapa isim muannats tanpa tanda ta': شَمْسٌ، أَرْضٌ، يَدٌ، عَيْنٌ، أُذُنٌ، رِجْلٌ، سِنٌّ، نَارٌ، رِيحٌ.","Ubah mudzakkar ke muannats: tambah ـَةٌ: طَالِبٌ → طَالِبَةٌ."],
tbl:{h:['Mudzakkar','Muannats','Arti'],r:[['طَالِبٌ','طَالِبَةٌ','Siswa'],['مُعَلِّمٌ','مُعَلِّمَةٌ','Guru'],['كَبِيرٌ','كَبِيرَةٌ','Besar'],['جَدِيدٌ','جَدِيدَةٌ','Baru'],['أَحْمَرُ','حَمْرَاءُ','Merah'],['أَزْرَقُ','زَرْقَاءُ','Biru']]},
ex:[{ar:'الْوَلَدُ ذَكِيٌّ وَالْبِنْتُ ذَكِيَّةٌ',id:'Anak laki-laki itu cerdas dan anak perempuan itu cerdas'}],
q:[Q("Manakah isim muannats tanpa ta' marbuthah?",["شَمْسٌ","كِتَابٌ","قَلَمٌ","بَابٌ"],0),Q("Muannats dari مُعَلِّمٌ adalah...",["مُعَلِّمَةٌ","مُعَلِّمَانِ","مُعَلِّمُونَ","مَعْلُومَةٌ"],0),Q("Muannats dari أَحْمَرُ adalah...",["حَمْرَاءُ","أَحْمَرَةٌ","حَامِرٌ","حَمْرَةٌ"],0)]},

{t:"Mufrad, Mutsanna, dan Jamak Salim",ar:'الْمُفْرَدُ وَالْمُثَنَّى وَجَمْعُ السَّلَامَةِ',e:'👥',
intro:"Jumlah dalam bahasa Arab ada tiga: mufrad (satu), mutsanna (dua), jamak (tiga atau lebih).",
pts:["<b>Mutsanna</b>: tambah ـَانِ (rafa') atau ـَيْنِ (nashab/jar): كِتَابَانِ / كِتَابَيْنِ.","<b>Jamak mudzakkar salim</b>: tambah ـُونَ (rafa') atau ـِينَ (nashab/jar): مُعَلِّمُونَ / مُعَلِّمِينَ.","<b>Jamak muannats salim</b>: buang ـةٌ, tambah ـَاتٌ: طَالِبَةٌ → طَالِبَاتٌ.","Jamak mudzakkar salim hanya untuk laki-laki yang berakal (muslim, mu'allim, mudarris)."],
tbl:{h:['Mufrad','Mutsanna','Jamak salim'],r:[['مُعَلِّمٌ','مُعَلِّمَانِ','مُعَلِّمُونَ'],['مُسْلِمٌ','مُسْلِمَانِ','مُسْلِمُونَ'],['مُعَلِّمَةٌ','مُعَلِّمَتَانِ','مُعَلِّمَاتٌ'],['طَالِبَةٌ','طَالِبَتَانِ','طَالِبَاتٌ'],['سَيَّارَةٌ','سَيَّارَتَانِ','سَيَّارَاتٌ'],['كِتَابٌ','كِتَابَانِ','-']]},
ex:[{ar:'الْمُسْلِمُونَ إِخْوَةٌ وَالْمُسْلِمَاتُ أَخَوَاتٌ',id:'Muslim laki-laki adalah saudara dan muslimah adalah saudari'}],
q:[Q("Mutsanna dari كِتَابٌ (rafa') adalah...",["كِتَابَانِ","كِتَابَيْنِ","كِتَابُونَ","كُتُبٌ"],0),Q("Jamak muannats salim dari طَالِبَةٌ adalah...",["طَالِبَاتٌ","طَالِبُونَ","طُلَّابٌ","طَالِبَتَانِ"],0),Q("Jamak mudzakkar salim dari مُسْلِمٌ (rafa') adalah...",["مُسْلِمُونَ","مُسْلِمَاتٌ","مُسْلِمَانِ","مُسْلِمِينَ"],0)]},

{t:"Jamak Taksir (Jamak Tak Beraturan)",ar:'جَمْعُ التَّكْسِيرِ',e:'💥',
intro:"Jamak taksir adalah jamak yang bentuk mufradnya berubah. Pola ini tidak beraturan, jadi perlu dihafal.",
pts:["Pola umum: أَفْعَالٌ (أَقْلَامٌ), فُعُولٌ (بُيُوتٌ), فِعَالٌ (رِجَالٌ), فُعُلٌ (كُتُبٌ), أَفْعِلَاءُ (أَصْدِقَاءُ), مَفَاعِلُ (مَدَارِسُ).","Jamak taksir selain manusia berakal diperlakukan sebagai muannats mufrad: الْكُتُبُ جَدِيدَةٌ.","Untuk manusia berakal, ikuti jenis sebenarnya: الطُّلَّابُ مُجْتَهِدُونَ."],
tbl:{h:['Mufrad','Jamak taksir','Arti'],r:[['كِتَابٌ','كُتُبٌ','Buku'],['قَلَمٌ','أَقْلَامٌ','Pena'],['رَجُلٌ','رِجَالٌ','Laki-laki'],['بَيْتٌ','بُيُوتٌ','Rumah'],['وَلَدٌ','أَوْلَادٌ','Anak'],['مَدْرَسَةٌ','مَدَارِسُ','Sekolah'],['طَالِبٌ','طُلَّابٌ','Siswa'],['بَابٌ','أَبْوَابٌ','Pintu'],['مَسْجِدٌ','مَسَاجِدُ','Masjid'],['مَدِينَةٌ','مُدُنٌ','Kota'],['شَجَرَةٌ','أَشْجَارٌ','Pohon'],['صَدِيقٌ','أَصْدِقَاءُ','Teman'],['مِفْتَاحٌ','مَفَاتِيحُ','Kunci'],['يَوْمٌ','أَيَّامٌ','Hari'],['شَهْرٌ','أَشْهُرٌ','Bulan'],['أَخٌ','إِخْوَةٌ','Saudara lk'],['أُخْتٌ','أَخَوَاتٌ','Saudara pr'],['ابْنٌ','أَبْنَاءٌ','Anak lk'],['نَهْرٌ','أَنْهَارٌ','Sungai'],['جَبَلٌ','جِبَالٌ','Gunung'],['عَيْنٌ','عُيُونٌ','Mata']]},
ex:[{ar:'الْكُتُبُ جَدِيدَةٌ وَالْأَقْلَامُ كَثِيرَةٌ',id:'Buku-buku itu baru dan pena itu banyak'}],
q:[Q("Jamak taksir dari كِتَابٌ adalah...",["كُتُبٌ","كِتَابَانِ","كَاتِبُونَ","كِتَابَةٌ"],0),Q("Jamak taksir dari بَيْتٌ adalah...",["بُيُوتٌ","أَبْيَاتٌ","بَيْتَانِ","بَيْتُونَ"],0),Q("Jamak taksir dari مَدْرَسَةٌ adalah...",["مَدَارِسُ","مَدْرَسَاتٌ","مُدَرِّسُونَ","دُرُوسٌ"],0),Q("Jamak dari رَجُلٌ adalah...",["رِجَالٌ","رَجُلَانِ","أَرْجُلٌ","رَجُلَاتٌ"],0)]},

{t:"Fi'il Lazim dan Muta'addi",ar:'الْفِعْلُ اللَّازِمُ وَالْمُتَعَدِّي',e:'🚦',
intro:"Fi'il dibagi berdasarkan kebutuhan objeknya: lazim (tidak butuh maf'ul) dan muta'addi (butuh maf'ul bih).",
pts:["<b>Lazim</b>: cukup dengan fa'il. Contoh: جَلَسَ، ذَهَبَ، نَامَ، سَافَرَ، ضَحِكَ، بَكَى.","<b>Muta'addi</b>: butuh maf'ul bih manshub. Contoh: كَتَبَ الدَّرْسَ، فَتَحَ الْبَابَ، قَرَأَ الْكِتَابَ، شَرِبَ الْمَاءَ.","Fi'il lazim bisa jadi muta'addi dengan huruf jar: ذَهَبَ إِلَى الْمَدْرَسَةِ (tetap lazim secara makna, objek memakai jar).","Beberapa fi'il bisa menerima dua maf'ul: أَعْطَى الْمُعَلِّمُ الطَّالِبَ كِتَابًا."],
tbl:{h:['Jenis','Contoh','Arti'],r:[['Lazim','جَلَسَ الْوَلَدُ','Anak itu duduk'],['Lazim','نَامَ الطِّفْلُ','Bayi itu tidur'],["Muta'addi",'فَتَحَ الْوَلَدُ الْبَابَ','Anak itu membuka pintu'],["Muta'addi",'شَرِبَ الطِّفْلُ الْحَلِيبَ','Bayi itu minum susu']]},
ex:[{ar:'جَلَسَ الْمُعَلِّمُ وَكَتَبَ الدَّرْسَ',id:'Guru duduk dan menulis pelajaran'}],
q:[Q("Fi'il lazim yang benar adalah...",["نَامَ","كَتَبَ","فَتَحَ","شَرِبَ"],0),Q("Fi'il muta'addi membutuhkan...",["Maf'ul bih","Hal","Khabar","Tamyiz"],0),Q("Contoh kalimat muta'addi adalah...",["قَرَأَ الْوَلَدُ الْكِتَابَ","جَلَسَ الْوَلَدُ","ذَهَبَ الْوَلَدُ","نَامَ الْوَلَدُ"],0)]},

{t:"Fi'il Mazid (Tambahan Huruf)",ar:'الْفِعْلُ الْمَزِيدُ',e:'➕',
intro:"Fi'il mazid adalah fi'il tsulatsi yang ditambah satu sampai tiga huruf sehingga maknanya berkembang.",
pts:["أَفْعَلَ (أَكْرَمَ): umumnya membuat transitif (menjadikan).","فَعَّلَ (عَلَّمَ): intensif / menjadikan.","فَاعَلَ (سَاعَدَ): saling / melibatkan pihak lain.","تَفَعَّلَ (تَعَلَّمَ): reflektif / hasil dari فَعَّلَ.","تَفَاعَلَ (تَعَاوَنَ): saling melakukan.","اِنْفَعَلَ (اِنْكَسَرَ): kena / menjadi.","اِفْتَعَلَ (اِجْتَمَعَ): kesungguhan / refleksif.","اِسْتَفْعَلَ (اِسْتَغْفَرَ): memohon / menganggap."],
tbl:{h:['Wazan','Madhi','Mudhari\'','Mashdar'],r:[['أَفْعَلَ','أَكْرَمَ','يُكْرِمُ','إِكْرَامٌ'],['فَعَّلَ','عَلَّمَ','يُعَلِّمُ','تَعْلِيمٌ'],['فَاعَلَ','سَاعَدَ','يُسَاعِدُ','مُسَاعَدَةٌ'],['تَفَعَّلَ','تَعَلَّمَ','يَتَعَلَّمُ','تَعَلُّمٌ'],['تَفَاعَلَ','تَعَاوَنَ','يَتَعَاوَنُ','تَعَاوُنٌ'],['اِنْفَعَلَ','اِنْكَسَرَ','يَنْكَسِرُ','اِنْكِسَارٌ'],['اِفْتَعَلَ','اِجْتَمَعَ','يَجْتَمِعُ','اِجْتِمَاعٌ'],['اِسْتَفْعَلَ','اِسْتَغْفَرَ','يَسْتَغْفِرُ','اِسْتِغْفَارٌ']]},
ex:[{ar:'عَلَّمَ الْمُعَلِّمُ الطُّلَّابَ فَتَعَلَّمُوا',id:'Guru mengajar para siswa sehingga mereka belajar'},{ar:'اِسْتَغْفَرَ الرَّجُلُ رَبَّهُ',id:'Lelaki itu memohon ampun kepada Tuhannya'}],
q:[Q("Wazan عَلَّمَ adalah...",["فَعَّلَ","أَفْعَلَ","فَاعَلَ","تَفَعَّلَ"],0),Q("Mashdar dari أَكْرَمَ adalah...",["إِكْرَامٌ","تَكْرِيمٌ","كَرَمٌ","مُكَارَمَةٌ"],0),Q("Wazan اِسْتَغْفَرَ adalah...",["اِسْتَفْعَلَ","اِفْتَعَلَ","اِنْفَعَلَ","تَفَاعَلَ"],0),Q("Mudhari' dari تَعَلَّمَ adalah...",["يَتَعَلَّمُ","يُعَلِّمُ","يَعْلَمُ","يُعْلِمُ"],0)]},

{t:"Fi'il Mu'tal dan Mahmuz",ar:'الْفِعْلُ الْمُعْتَلُّ وَالْمَهْمُوزُ',e:'🌀',
intro:"Fi'il mu'tal adalah fi'il yang salah satu huruf aslinya huruf illat (و ا ي). Fi'il mahmuz memuat hamzah. Mudha'af memuat huruf kembar.",
pts:["<b>Mitsal</b>: fa' fi'il huruf illat: وَصَلَ - يَصِلُ (wawu gugur di mudhari').","<b>Ajwaf</b>: 'ain fi'il huruf illat: قَالَ - يَقُولُ، بَاعَ - يَبِيعُ. Saat bertemu dhamir sukun, alif gugur: قُلْتُ، بِعْتُ.","<b>Naqish</b>: lam fi'il huruf illat: دَعَا - يَدْعُو، رَمَى - يَرْمِي، بَكَى - يَبْكِي.","<b>Mahmuz</b>: ada hamzah: أَكَلَ - يَأْكُلُ، سَأَلَ - يَسْأَلُ، قَرَأَ - يَقْرَأُ.","<b>Mudha'af</b>: 'ain dan lam sama: مَدَّ - يَمُدُّ، عَدَّ - يَعُدُّ.","Amr dari ajwaf: قُلْ (katakanlah), بِعْ (juallah)."],
tbl:{h:['Jenis','Ciri','Contoh madhi - mudhari\''],r:[['Mitsal','Fa\' fi\'il illat','وَصَلَ - يَصِلُ'],['Ajwaf','\'Ain fi\'il illat','قَالَ - يَقُولُ'],['Naqish','Lam fi\'il illat','دَعَا - يَدْعُو'],['Mahmuz','Ada hamzah','أَكَلَ - يَأْكُلُ'],['Mudha\'af','Huruf kembar','مَدَّ - يَمُدُّ']]},
ex:[{ar:'قُلْتُ لَهُ الْحَقَّ وَبِعْتُ الْكِتَابَ',id:'Saya berkata benar kepadanya dan saya menjual buku itu'}],
q:[Q("Fi'il قَالَ termasuk jenis...",["Ajwaf","Mitsal","Naqish","Mudha'af"],0),Q("Fi'il وَصَلَ termasuk jenis...",["Mitsal","Ajwaf","Naqish","Mahmuz"],0),Q("Fi'il أَكَلَ termasuk jenis...",["Mahmuz","Ajwaf","Mitsal","Naqish"],0),Q("Fi'il مَدَّ termasuk jenis...",["Mudha'af","Naqish","Ajwaf","Mahmuz"],0)]},

{t:"Isim Nisbah",ar:'الِاسْمُ الْمَنْسُوبُ',e:'🏷️',
intro:"Isim nisbah adalah isim yang menunjuk hubungan/asal, dibentuk dengan menambah ya' bertasydid (ـِيٌّ) di akhir isim.",
pts:["Rumus: isim + ـِيٌّ. Contoh: مِصْرُ → مِصْرِيٌّ (orang Mesir).","Buang ال atau ta' marbuthah bila ada: مَدِينَةٌ → مَدَنِيٌّ (kota/sipil), مَكَّةُ → مَكِّيٌّ.","Isim nisbah muannats: tambah ta' marbuthah: مِصْرِيَّةٌ.","Isim nisbah berfungsi sebagai sifat: كِتَابٌ عَرَبِيٌّ، لُغَةٌ عَرَبِيَّةٌ."],
tbl:{h:['Asal','Nisbah (lk)','Nisbah (pr)'],r:[['عَرَبٌ','عَرَبِيٌّ','عَرَبِيَّةٌ'],['مِصْرُ','مِصْرِيٌّ','مِصْرِيَّةٌ'],['إِنْدُونِيسِيَا','إِنْدُونِيسِيٌّ','إِنْدُونِيسِيَّةٌ'],['إِسْلَامٌ','إِسْلَامِيٌّ','إِسْلَامِيَّةٌ'],['مَكَّةُ','مَكِّيٌّ','مَكِّيَّةٌ'],['مَدْرَسَةٌ','مَدْرَسِيٌّ','مَدْرَسِيَّةٌ']]},
ex:[{ar:'أَنَا طَالِبٌ إِنْدُونِيسِيٌّ',id:'Saya siswa Indonesia'},{ar:'هِيَ مُعَلِّمَةٌ مِصْرِيَّةٌ',id:'Dia guru perempuan Mesir'}],
q:[Q("Nisbah dari عَرَبٌ adalah...",["عَرَبِيٌّ","عَرَابٌ","عَرَبَةٌ","أَعْرَابٌ"],0),Q("Nisbah muannats dari مِصْرِيٌّ adalah...",["مِصْرِيَّةٌ","مِصْرِيَّاتٌ","مِصْرِيَانِ","مِصْرُ"],0),Q("Isim nisbah diakhiri...",["ـِيٌّ","ـُونَ","ـَانِ","ـَاتٌ"],0)]},

{t:"Isim Tafdhil (Perbandingan)",ar:'اسْمُ التَّفْضِيلِ',e:'🏆',
intro:"Isim tafdhil menyatakan tingkat lebih (komparatif) atau paling (superlatif). Wazan utamanya أَفْعَلُ.",
pts:["Rumus: أَفْعَلُ + مِنْ + yang dibandingkan. Contoh: أَحْمَدُ أَطْوَلُ مِنْ خَالِدٍ (Ahmad lebih tinggi daripada Khalid).","Superlatif: أَفْعَلُ bentuk mudhaf atau ber-ال: أَطْوَلُ الطُّلَّابِ (tertinggi di antara siswa).","Dari sifat: كَبِيرٌ → أَكْبَرُ، صَغِيرٌ → أَصْغَرُ، جَمِيلٌ → أَجْمَلُ، سَرِيعٌ → أَسْرَعُ، سَهْلٌ → أَسْهَلُ.","Bentuk khusus: خَيْرٌ (lebih baik), شَرٌّ (lebih buruk), كَثِيرٌ → أَكْثَرُ، قَلِيلٌ → أَقَلُّ."],
tbl:{h:['Sifat','Tafdhil','Arti'],r:[['كَبِيرٌ','أَكْبَرُ','Lebih besar'],['صَغِيرٌ','أَصْغَرُ','Lebih kecil'],['طَوِيلٌ','أَطْوَلُ','Lebih panjang / tinggi'],['جَمِيلٌ','أَجْمَلُ','Lebih indah'],['سَرِيعٌ','أَسْرَعُ','Lebih cepat'],['سَهْلٌ','أَسْهَلُ','Lebih mudah'],['كَثِيرٌ','أَكْثَرُ','Lebih banyak'],['قَلِيلٌ','أَقَلُّ','Lebih sedikit'],['جَيِّدٌ','خَيْرٌ','Lebih baik']]},
ex:[{ar:'الْفِيلُ أَكْبَرُ مِنَ الْأَسَدِ',id:'Gajah lebih besar daripada singa'},{ar:'اللَّهُ أَكْبَرُ',id:'Allah Maha Besar'}],
q:[Q("Wazan tafdhil adalah...",["أَفْعَلُ","فَاعِلٌ","مَفْعُولٌ","فَعْلَانُ"],0),Q("Tafdhil dari جَمِيلٌ adalah...",["أَجْمَلُ","أَجْمَالٌ","جَمَالٌ","مُجَامِلٌ"],0),Q("Setelah tafdhil perbandingan memakai huruf...",["مِنْ","فِي","عَلَى","إِلَى"],0)]},

{t:"Alif Lam: Syamsiyah dan Qamariyah",ar:'اللَّامُ الشَّمْسِيَّةُ وَالْقَمَرِيَّةُ',e:'🌞',
intro:"Huruf ال (alif lam ta'rif) dibaca berbeda tergantung huruf berikutnya.",
pts:["<b>Qamariyah</b>: lam dibaca jelas. Huruf: ا ب ج ح خ ع غ ف ق ك م ه و ي (14 huruf). Contoh: الْقَمَرُ (al-qamaru).","<b>Syamsiyah</b>: lam melebur ke huruf berikutnya (huruf bertasydid). Huruf: ت ث د ذ ر ز س ش ص ض ط ظ ل ن (14 huruf). Contoh: الشَّمْسُ (asy-syamsu).","Syamsiyah: huruf pertama kata setelah ال diberi tasydid, lam tidak dibaca.","Keduanya sama dalam tulisan, hanya cara baca yang berbeda."],
tbl:{h:['Jenis','Contoh','Dibaca'],r:[['Qamariyah','الْكِتَابُ','Al-kitaabu'],['Qamariyah','الْبَيْتُ','Al-baitu'],['Qamariyah','الْمَسْجِدُ','Al-masjidu'],['Syamsiyah','الشَّمْسُ','Asy-syamsu'],['Syamsiyah','النُّورُ','An-nuuru'],['Syamsiyah','الدَّرْسُ','Ad-darsu']]},
ex:[{ar:'الشَّمْسُ وَالْقَمَرُ مِنْ آيَاتِ اللَّهِ',id:'Matahari dan bulan termasuk tanda-tanda Allah'},{ar:'الدَّرْسُ فِي الْكِتَابِ',id:'Pelajaran ada di dalam buku'}],
q:[Q("الْقَمَرُ termasuk...",["Qamariyah","Syamsiyah","Tidak keduanya","Mudhaf"],0),Q("النُّورُ dibaca...",["An-nuuru","Al-nuuru","Nuuru","Lan-nuuru"],0),Q("Jumlah huruf syamsiyah adalah...",["14","10","28","7"],0)]}
];

/* ---- I'rab Detektif ---- */
const IRAB=[
{s:'كَتَبَ [الطَّالِبُ] الدَّرْسَ',a:0,w:"Fa'il → marfu'"},
{s:'كَتَبَ الطَّالِبُ [الدَّرْسَ]',a:1,w:"Maf'ul bih → manshub"},
{s:'ذَهَبْتُ إِلَى [الْمَدْرَسَةِ]',a:2,w:'Setelah huruf jar → majrur'},
{s:'[الْكِتَابُ] جَدِيدٌ',a:0,w:"Mubtada' → marfu'"},
{s:'الْكِتَابُ [جَدِيدٌ]',a:0,w:"Khabar → marfu'"},
{s:'إِنَّ [اللَّهَ] غَفُورٌ',a:1,w:'Isim inna → manshub'},
{s:'إِنَّ اللَّهَ [غَفُورٌ]',a:0,w:"Khabar inna → marfu'"},
{s:'كَانَ [الْجَوُّ] جَمِيلًا',a:0,w:'Isim kana → marfu\''},
{s:'كَانَ الْجَوُّ [جَمِيلًا]',a:1,w:'Khabar kana → manshub'},
{s:'هَذَا كِتَابُ [الطَّالِبِ]',a:2,w:'Mudhaf ilaih → majrur'},
{s:'لَنْ [يَذْهَبَ] الْوَلَدُ',a:1,w:'Setelah لَنْ → manshub'},
{s:'لَمْ [يَكْتُبْ] الطَّالِبُ',a:3,w:'Setelah لَمْ → majzum'},
{s:'قَرَأْتُ [الْقُرْآنَ]',a:1,w:"Maf'ul bih → manshub"},
{s:'جَلَسَ [الْمُعَلِّمُ] عَلَى الْكُرْسِيِّ',a:0,w:"Fa'il → marfu'"},
{s:'جَلَسَ الْمُعَلِّمُ عَلَى [الْكُرْسِيِّ]',a:2,w:'Setelah huruf jar → majrur'},
{s:'رَأَيْتُ طَالِبًا [مُجْتَهِدًا]',a:1,w:"Na'at dari manshub → manshub"},
{s:'يَشْرَبُ الْوَلَدُ [الْمَاءَ]',a:1,w:"Maf'ul bih → manshub"},
{s:'[يَشْرَبُ] الْوَلَدُ الْمَاءَ',a:0,w:"Mudhari' tanpa alat → marfu'"},
{s:'لَا [تَكْسَلْ]',a:3,w:'Setelah nahi → majzum'},
{s:'أُرِيدُ أَنْ [أَقْرَأَ]',a:1,w:'Setelah أَنْ → manshub'},
{s:'هَذِهِ سَيَّارَةُ [الْمُدِيرِ]',a:2,w:'Mudhaf ilaih → majrur'},
{s:'مَرَرْتُ بِرَجُلٍ [كَرِيمٍ]',a:2,w:"Na'at dari majrur → majrur"},
{s:'أَصْبَحَ [الْوَلَدُ] نَشِيطًا',a:0,w:'Isim أَصْبَحَ → marfu\''},
{s:'لَيْسَ الطَّقْسُ [بَارِدًا]',a:1,w:'Khabar لَيْسَ → manshub'},
{s:'[الْمُعَلِّمُ] يَشْرَحُ الدَّرْسَ',a:0,w:"Mubtada' → marfu'"},
{s:'فَتَحَتِ [الْبِنْتُ] النَّافِذَةَ',a:0,w:"Fa'il → marfu'"},
{s:'جَاءَ الطَّالِبُ [ضَاحِكًا]',a:1,w:'Hal → manshub'},
{s:'اِشْتَرَيْتُ عِشْرِينَ [كِتَابًا]',a:1,w:'Tamyiz → manshub'},
{s:'لَمْ [يَحْضُرِ] الطَّالِبُ',a:3,w:'Setelah لَمْ → majzum'}
];

/* ---- Tashrif Master ---- */
const TASHRIF=[
{m:'كَتَبَ',x:'يَكْتُبُ',s:'كِتَابَةٌ',f:'كَاتِبٌ',o:'مَكْتُوبٌ',r:'اُكْتُبْ',t:'menulis'},
{m:'نَصَرَ',x:'يَنْصُرُ',s:'نَصْرٌ',f:'نَاصِرٌ',o:'مَنْصُورٌ',r:'اُنْصُرْ',t:'menolong'},
{m:'ضَرَبَ',x:'يَضْرِبُ',s:'ضَرْبٌ',f:'ضَارِبٌ',o:'مَضْرُوبٌ',r:'اِضْرِبْ',t:'memukul'},
{m:'فَتَحَ',x:'يَفْتَحُ',s:'فَتْحٌ',f:'فَاتِحٌ',o:'مَفْتُوحٌ',r:'اِفْتَحْ',t:'membuka'},
{m:'عَلِمَ',x:'يَعْلَمُ',s:'عِلْمٌ',f:'عَالِمٌ',o:'مَعْلُومٌ',r:'اِعْلَمْ',t:'mengetahui'},
{m:'فَهِمَ',x:'يَفْهَمُ',s:'فَهْمٌ',f:'فَاهِمٌ',o:'مَفْهُومٌ',r:'اِفْهَمْ',t:'memahami'},
{m:'سَمِعَ',x:'يَسْمَعُ',s:'سَمْعٌ',f:'سَامِعٌ',o:'مَسْمُوعٌ',r:'اِسْمَعْ',t:'mendengar'},
{m:'جَلَسَ',x:'يَجْلِسُ',s:'جُلُوسٌ',f:'جَالِسٌ',o:null,r:'اِجْلِسْ',t:'duduk'},
{m:'دَخَلَ',x:'يَدْخُلُ',s:'دُخُولٌ',f:'دَاخِلٌ',o:null,r:'اُدْخُلْ',t:'masuk'},
{m:'خَرَجَ',x:'يَخْرُجُ',s:'خُرُوجٌ',f:'خَارِجٌ',o:null,r:'اُخْرُجْ',t:'keluar'},
{m:'حَمَلَ',x:'يَحْمِلُ',s:'حَمْلٌ',f:'حَامِلٌ',o:'مَحْمُولٌ',r:'اِحْمِلْ',t:'membawa'},
{m:'أَخَذَ',x:'يَأْخُذُ',s:'أَخْذٌ',f:'آخِذٌ',o:'مَأْخُوذٌ',r:'خُذْ',t:'mengambil'},
{m:'أَكَلَ',x:'يَأْكُلُ',s:'أَكْلٌ',f:'آكِلٌ',o:'مَأْكُولٌ',r:'كُلْ',t:'makan'},
{m:'شَرِبَ',x:'يَشْرَبُ',s:'شُرْبٌ',f:'شَارِبٌ',o:'مَشْرُوبٌ',r:'اِشْرَبْ',t:'minum'},
{m:'دَرَسَ',x:'يَدْرُسُ',s:'دِرَاسَةٌ',f:'دَارِسٌ',o:'مَدْرُوسٌ',r:'اُدْرُسْ',t:'belajar'},
{m:'قَرَأَ',x:'يَقْرَأُ',s:'قِرَاءَةٌ',f:'قَارِئٌ',o:'مَقْرُوءٌ',r:'اِقْرَأْ',t:'membaca'}
];