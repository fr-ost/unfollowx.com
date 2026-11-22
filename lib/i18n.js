import fs from 'node:fs';
import path from 'node:path';

// Localized landing pages (/es, /pt-br, /hi, /id, /tr, /ar).
// Body copy comes from the developer's official Chrome Web Store translations
// (fr-ost/UNFOLLOWX → STORE_LISTING.md → "Translated listings"), extracted to
// content/i18n/<slug>.json. Only the short interface strings below were
// written for the website.

export const LOCALES = [
  {
    slug: 'es', hreflang: 'es', ogLocale: 'es_ES', name: 'Español', dir: 'ltr',
    ui: {
      cta: 'Añadir a Chrome — Gratis', trust: ['Gratis para siempre', 'Sin registro', 'Sin suscripción', 'Sin contraseña de X'],
      shots: 'La extensión real', caption: 'Interfaz real de la extensión (en inglés) · cuentas de ejemplo',
      privacy: 'Política de privacidad (en inglés)', english: 'Leer en inglés', languages: 'Idiomas',
      featureNote: 'Si está activado el uso anónimo de funciones (activado en las instalaciones nuevas), también envía qué funciones se usan y si funcionan, solo con recuentos y valores fijos. Puedes desactivarlo en Ajustes.',
      bandTitle: 'Tu lista de seguidos en X. Tus reglas.', bandText: 'Herramientas potentes para gestionar a quién sigues, sin pagar ninguna suscripción.'
    }
  },
  {
    slug: 'pt-br', hreflang: 'pt-BR', ogLocale: 'pt_BR', name: 'Português (Brasil)', dir: 'ltr',
    ui: {
      cta: 'Adicionar ao Chrome — Grátis', trust: ['Grátis para sempre', 'Sem cadastro', 'Sem assinatura', 'Sem senha do X'],
      shots: 'A extensão de verdade', caption: 'Interface real da extensão (em inglês) · contas de exemplo',
      privacy: 'Política de privacidade (em inglês)', english: 'Ler em inglês', languages: 'Idiomas',
      featureNote: 'Se o uso anônimo de recursos estiver ativado (ativado em novas instalações), ela também envia quais recursos são usados e se funcionam, apenas com contagens e valores fixos. Você pode desativar nas Configurações.',
      bandTitle: 'Sua lista de seguidos no X. Suas regras.', bandText: 'Ferramentas poderosas para gerenciar quem você segue, sem pagar assinatura.'
    }
  },
  {
    slug: 'hi', hreflang: 'hi', ogLocale: 'hi_IN', name: 'हिन्दी', dir: 'ltr',
    ui: {
      cta: 'Chrome में जोड़ें — मुफ़्त', trust: ['हमेशा के लिए मुफ़्त', 'कोई साइन-अप नहीं', 'कोई सब्सक्रिप्शन नहीं', 'X पासवर्ड की ज़रूरत नहीं'],
      shots: 'असली एक्सटेंशन', caption: 'एक्सटेंशन का असली इंटरफ़ेस (अंग्रेज़ी में) · नमूना अकाउंट',
      privacy: 'गोपनीयता नीति (अंग्रेज़ी में)', english: 'अंग्रेज़ी में पढ़ें', languages: 'भाषाएँ',
      featureNote: 'अगर गुमनाम फ़ीचर-उपयोग साझा करना चालू है (नए इंस्टॉलेशन में यह चालू रहता है), तो यह यह भी भेजता है कि कौन-से फ़ीचर इस्तेमाल होते हैं और वे काम करते हैं या नहीं — सिर्फ़ गिनती और तय मान। आप इसे सेटिंग्स में बंद कर सकते हैं।',
      bandTitle: 'आपकी X फ़ॉलोइंग लिस्ट। आपके नियम।', bandText: 'बिना किसी सब्सक्रिप्शन के, फ़ॉलोइंग मैनेज करने के दमदार टूल।'
    }
  },
  {
    slug: 'id', hreflang: 'id', ogLocale: 'id_ID', name: 'Bahasa Indonesia', dir: 'ltr',
    ui: {
      cta: 'Tambahkan ke Chrome — Gratis', trust: ['Gratis selamanya', 'Tanpa daftar', 'Tanpa langganan', 'Tanpa kata sandi X'],
      shots: 'Ekstensi aslinya', caption: 'Antarmuka asli ekstensi (dalam bahasa Inggris) · akun contoh',
      privacy: 'Kebijakan privasi (dalam bahasa Inggris)', english: 'Baca dalam bahasa Inggris', languages: 'Bahasa',
      featureNote: 'Jika berbagi penggunaan fitur secara anonim aktif (aktif pada pemasangan baru), ekstensi juga mengirim fitur mana yang digunakan dan apakah berfungsi — hanya berupa jumlah dan nilai tetap. Anda dapat mematikannya di Pengaturan.',
      bandTitle: 'Daftar mengikuti X Anda. Aturan Anda.', bandText: 'Alat canggih untuk mengelola akun yang Anda ikuti, tanpa membayar langganan.'
    }
  },
  {
    slug: 'tr', hreflang: 'tr', ogLocale: 'tr_TR', name: 'Türkçe', dir: 'ltr',
    ui: {
      cta: 'Chrome’a ekle — Ücretsiz', trust: ['Sonsuza dek ücretsiz', 'Kayıt yok', 'Abonelik yok', 'X şifresi gerekmez'],
      shots: 'Gerçek eklenti', caption: 'Eklentinin gerçek arayüzü (İngilizce) · örnek hesaplar',
      privacy: 'Gizlilik politikası (İngilizce)', english: 'İngilizce oku', languages: 'Diller',
      featureNote: 'Anonim özellik kullanımı paylaşımı açıksa (yeni kurulumlarda açıktır), hangi özelliklerin kullanıldığı ve çalışıp çalışmadığı da gönderilir; yalnızca sayılar ve sabit değerler. Ayarlar’dan kapatabilirsin.',
      bandTitle: 'X takip listen. Senin kuralların.', bandText: 'Abonelik ödemeden, takip listeni yönetmek için güçlü araçlar.'
    }
  },
  {
    slug: 'ar', hreflang: 'ar', ogLocale: 'ar_AR', name: 'العربية', dir: 'rtl',
    ui: {
      cta: 'أضِف إلى Chrome — مجانًا', trust: ['مجاني للأبد', 'بدون تسجيل', 'بدون اشتراك', 'بدون كلمة مرور X'],
      shots: 'الإضافة الحقيقية', caption: 'واجهة الإضافة الحقيقية (بالإنجليزية) · حسابات تجريبية',
      privacy: 'سياسة الخصوصية (بالإنجليزية)', english: 'اقرأ بالإنجليزية', languages: 'اللغات',
      featureNote: 'إذا كانت مشاركة استخدام الميزات بشكل مجهول مفعّلة (وهي مفعّلة في التثبيتات الجديدة)، فإن الإضافة ترسل أيضًا الميزات المستخدمة وما إذا كانت تعمل، بأعداد وقيم ثابتة فقط. يمكنك إيقافها من الإعدادات.',
      bandTitle: 'قائمة متابعاتك على X. بقواعدك أنت.', bandText: 'أدوات قوية لإدارة من تتابعهم، دون دفع أي اشتراك.'
    }
  }
];

export const LOCALE_SLUGS = LOCALES.map((l) => l.slug);

/** hreflang → path map shared by the homepage, localized pages and sitemap. */
export const LANGUAGE_ALTERNATES = {
  en: '/',
  ...Object.fromEntries(LOCALES.map((l) => [l.hreflang, `/${l.slug}`])),
  'x-default': '/'
};

const DIR = path.join(process.cwd(), 'content', 'i18n');

// Page titles / H1s: the official store titles with only the “and unlimited”
// words removed, so the headline leads with “free” and fits ~60 characters.
// No new translation — every remaining word is from the store listing.
const TITLES = {
  es: 'UnfollowX Pro – Dejar de seguir en masa en X (Twitter), gratis',
  'pt-br': 'UnfollowX Pro – Unfollow em massa no X (Twitter), grátis',
  hi: 'UnfollowX Pro – X (Twitter) के लिए मुफ़्त मास अनफ़ॉलो',
  id: 'UnfollowX Pro – Unfollow Massal di X (Twitter), Gratis',
  tr: 'UnfollowX Pro – X (Twitter) Toplu Takipten Çıkma, Ücretsiz',
  ar: 'UnfollowX Pro – إلغاء المتابعة الجماعي على X (تويتر) مجانًا'
};

export function getLocale(slug) {
  const meta = LOCALES.find((l) => l.slug === slug);
  if (!meta) return null;
  const content = JSON.parse(fs.readFileSync(path.join(DIR, `${slug}.json`), 'utf8'));
  return { ...meta, ...content, storeTitle: content.title, title: TITLES[slug] || content.title };
}

/** Store headings are ALL CAPS; render them in sentence case (scripts without case are unchanged). */
export function headingCase(text, hreflang) {
  const lower = text.toLocaleLowerCase(hreflang);
  if (lower === text) return text;
  const first = lower.charAt(0).toLocaleUpperCase(hreflang) + lower.slice(1);
  return first.replace(/\bx\b/g, 'X').replace(/\btwitter\b/gi, 'Twitter');
}
